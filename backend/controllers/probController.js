import { SerialPort } from "serialport";

const PORT_NAME = "COM3"; // Change this as per your port
const BAUD_RATE = 9600;

const readSerialData = async () => {
  return new Promise((resolve, reject) => {
    try {
      const port1 = new SerialPort({
        path: PORT_NAME,
        baudRate: BAUD_RATE,
        autoOpen: false, // Prevent auto-open
      });

      let buffer = "";

      // Open the port explicitly
      port1.open((err) => {
        if (err) {
          return reject(new Error("Failed to open serial port: " + err.message));
        }
      });

      const onData = (data) => {
        buffer += data.toString("utf-8");

        if (buffer.includes("\n")) {
          const lines = buffer.split("\n");
          buffer = lines.pop(); // Keep incomplete data

          const cleanLine = lines[0]?.replace("\r", "").trim();
          if (cleanLine) {
            const values = cleanLine.split(",").map((val) => val.trim());
            if (values.length === 7) {
              const [MQ5A0, MQ5D0, MQ135A0, MQ135D0, DHT11_T, DHT11_H, p] =
                values.map(Number);

              const sensorData = {
                MQ5A0,
                MQ5D0,
                MQ135A0,
                MQ135D0,
                DHT11_T,
                DHT11_H,
                p,
              };

              cleanup();
              return resolve(sensorData);
            } else {
              cleanup();
              return reject(new Error("Invalid sensor data format"));
            }
          }
        }
      };

      // Function to clean up the serial connection
      const cleanup = () => {
        if (port1 && port1.isOpen) {
          port1.removeListener("data", onData);
          port1.close((err) => {
            if (err) console.error("Error closing port:", err.message);
          });
        }
      };

      port1.on("data", onData);

      port1.on("error", (err) => {
        cleanup();
        return reject(new Error("Serial Port Error: " + err.message));
      });

      // Timeout to prevent hanging requests
      setTimeout(() => {
        cleanup();
        return reject(new Error("Timeout: No data received from sensor"));
      }, 5000);
    } catch (error) {
      return reject(error);
    }
  });
};

// **Controller for Probability Calculation**
const probValue = async (req, res) => {
  try {
    const sensorData = await readSerialData();

    // Suffocation probability calculation
    let processData_final =
      -4.7566971426 +
      0.000029467 * sensorData.MQ5A0 +
      -0.1580552106 * sensorData.MQ5D0 +
      0.0012048012 * sensorData.MQ135A0 +
      0.1435473991 * sensorData.DHT11_T +
      0.0040330661 * sensorData.DHT11_H;

    let powResult = Math.exp(processData_final);
    let probability = powResult / (1 + powResult);

    return res.json({ success: true, probability: probability.toFixed(4) });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// **Controller for Gas Concentration Calculation**
const gasValue = async (req, res) => {
  try {
    const sensorData = await readSerialData();

    // Gas-specific constants (A, B) from datasheets
    const GAS_CONSTANTS = {
      LPG: { A: 200, B: -0.45 },
      CO: { A: 300, B: -0.35 },
      Methane: { A: 150, B: -0.4 },
      Hydrogen: { A: 180, B: -0.42 },
      NH3: { A: 250, B: -0.3 },
      CO2: { A: 400, B: -0.5 },
      Alcohol: { A: 220, B: -0.38 },
    };

    // Function to calculate gas concentration
    const calculateGasConcentration = (sensorValue, A, B) => {
      let VRL = (sensorValue / 1023.0) * 5.0; // Convert ADC value to voltage
      let RS = ((5.0 - VRL) / VRL) * 10; // Sensor resistance (assuming RL = 10kΩ)
      return A * Math.pow(RS / 10, B); // Calculate concentration
    };

    // Calculate gas concentrations
    let LPG_Concentration = calculateGasConcentration(
      sensorData.MQ5A0,
      GAS_CONSTANTS.LPG.A,
      GAS_CONSTANTS.LPG.B
    );
    let CO_Concentration = calculateGasConcentration(
      sensorData.MQ135A0,
      GAS_CONSTANTS.CO.A,
      GAS_CONSTANTS.CO.B
    );
    let Methane_Concentration = calculateGasConcentration(
      sensorData.MQ5A0,
      GAS_CONSTANTS.Methane.A,
      GAS_CONSTANTS.Methane.B
    );
    let Hydrogen_Concentration = calculateGasConcentration(
      sensorData.MQ5A0,
      GAS_CONSTANTS.Hydrogen.A,
      GAS_CONSTANTS.Hydrogen.B
    );
    let NH3_Concentration = calculateGasConcentration(
      sensorData.MQ135A0,
      GAS_CONSTANTS.NH3.A,
      GAS_CONSTANTS.NH3.B
    );
    let CO2_Concentration = calculateGasConcentration(
      sensorData.MQ135A0,
      GAS_CONSTANTS.CO2.A,
      GAS_CONSTANTS.CO2.B
    );
    let Alcohol_Concentration = calculateGasConcentration(
      sensorData.MQ135A0,
      GAS_CONSTANTS.Alcohol.A,
      GAS_CONSTANTS.Alcohol.B
    );

    res.json({
      success: true,
      LPG_Concentration: LPG_Concentration.toFixed(2),
      CO_Concentration: CO_Concentration.toFixed(2),
      Methane_Concentration: Methane_Concentration.toFixed(2),
      Hydrogen_Concentration: Hydrogen_Concentration.toFixed(2),
      NH3_Concentration: NH3_Concentration.toFixed(2),
      CO2_Concentration: CO2_Concentration.toFixed(2),
      Alcohol_Concentration: Alcohol_Concentration.toFixed(2),
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { probValue, gasValue };

