import express  from "express";
import cors from 'cors';
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import probRouter from "./routes/probRoute.js";
import 'dotenv/config';
import { SerialPort } from 'serialport';

// app config
const app = express();
const port = process.env.PORT || 4000;

// const PORT_NAME = 'COM3'; // Change this to your actual port
// const BAUD_RATE = 9600;

// // Initialize Serial Port
// const port1 = new SerialPort({
//   path: PORT_NAME,
//   baudRate: BAUD_RATE,
// });

// let buffer = ""; // Buffer for accumulating data chunks

// function sleepSync(milliseconds) {
//   const start = Date.now();
//   while (Date.now() - start < milliseconds) {}
// }

// // Gas-specific constants (A, B) from datasheets
// const GAS_CONSTANTS = {
//   LPG: { A: 200, B: -0.45 },
//   CO: { A: 300, B: -0.35 },
//   Methane: { A: 150, B: -0.40 },
//   Hydrogen: { A: 180, B: -0.42 },
//   NH3: { A: 250, B: -0.30 },
//   CO2: { A: 400, B: -0.50 },
//   Alcohol: { A: 220, B: -0.38 },
// };

// // Function to calculate gas concentration
// const calculateGasConcentration = (sensorValue, A, B) => {
//   let VRL = (sensorValue / 1023.0) * 5.0; // Convert ADC value to voltage
//   let RS = ((5.0 - VRL) / VRL) * 10; // Sensor resistance (assuming RL = 10kΩ)
//   return A * Math.pow(RS / 10, B); // Calculate concentration
// };

// // Function to process incoming serial data
// const processData = (rawData) => {
//   if (!rawData) return; // Fix for "undefined" issue
  
//   buffer += rawData.toString("utf-8"); // Convert Buffer to string

//   // Check if we have a full line (ends with \r\n or \n)
//   if (buffer.includes("\n")) {
//     const lines = buffer.split("\n");
//     buffer = lines.pop(); // Keep any incomplete data for next read

//     lines.forEach((line) => {
//       const cleanLine = line.replace("\r", "").trim(); // Remove CR (\r) and trim spaces
//       console.log("🔹 Complete Line Received:", cleanLine);

//       if (cleanLine) {
//         const values = cleanLine.split(",").map((val) => val.trim()); // Split CSV data

//         if (values.length === 7) { // Ensure correct format
//           const [MQ5A0, MQ5D0, MQ135A0, MQ135D0, DHT11_T, DHT11_H, p] = values.map(Number);

//           const sensorData = {
//             MQ5A0,
//             MQ5D0,
//             MQ135A0,
//             MQ135D0,
//             DHT11_T,
//             DHT11_H,
//             p,
//           };

//           if (sensorData == undefined) {
//             // console.log("No data");
//           } else {
//             console.log("Processed Data:", sensorData);

//             // Calculate gas concentrations
//             let LPG_Concentration = calculateGasConcentration(MQ5A0, GAS_CONSTANTS.LPG.A, GAS_CONSTANTS.LPG.B);
//             let CO_Concentration = calculateGasConcentration(MQ135A0, GAS_CONSTANTS.CO.A, GAS_CONSTANTS.CO.B);
//             let Methane_Concentration = calculateGasConcentration(MQ5A0, GAS_CONSTANTS.Methane.A, GAS_CONSTANTS.Methane.B);
//             let Hydrogen_Concentration = calculateGasConcentration(MQ5A0, GAS_CONSTANTS.Hydrogen.A, GAS_CONSTANTS.Hydrogen.B);
//             let NH3_Concentration = calculateGasConcentration(MQ135A0, GAS_CONSTANTS.NH3.A, GAS_CONSTANTS.NH3.B);
//             let CO2_Concentration = calculateGasConcentration(MQ135A0, GAS_CONSTANTS.CO2.A, GAS_CONSTANTS.CO2.B);
//             let Alcohol_Concentration = calculateGasConcentration(MQ135A0, GAS_CONSTANTS.Alcohol.A, GAS_CONSTANTS.Alcohol.B);

//             // Log concentrations
//             console.log(` LPG: ${LPG_Concentration.toFixed(2)} ppm, CO: ${CO_Concentration.toFixed(2)} ppm`);
//             console.log(`Methane: ${Methane_Concentration.toFixed(2)} ppm, Hydrogen: ${Hydrogen_Concentration.toFixed(2)} ppm`);
//             console.log(`NH3: ${NH3_Concentration.toFixed(2)} ppm, CO2: ${CO2_Concentration.toFixed(2)} ppm`);
//             console.log(`Alcohol: ${Alcohol_Concentration.toFixed(2)} ppm`);

//             // Suffocation probability calculation
//             let processData_final = -4.7566971426 + (0.0000294670 * MQ5A0) + (-0.1580552106 * MQ5D0) + (0.0012048012 * MQ135A0) + (0.1435473991 * DHT11_T) + (0.0040330661 * DHT11_H);
//             let powResult = Math.exp(processData_final);
//             let probability = powResult / (1 + powResult);
//             console.log("✅ Probability of Suffocation:", probability);

//             return sensorData;
//           }
//         } else {
//           console.warn("⚠ Invalid data received (wrong format or missing values):\n", cleanLine);
//         }
//       }
//     });
//   }
// };

// // Function to handle incoming data
// export const startSerialListener = (callback) => {
//   port1.on('data', (data) => {
//     if (!data || data.length === 0) {
//       console.warn("⚠ Received empty or undefined data");
//       return;
//     }
//     const message = processData(data);
//     if (message == undefined) {
//       // console.log("No data");
//     } else {
//       // console.log('Received:', message);
//     }

//     if (callback) callback(message);
//   });

//   port1.on('error', (err) => {
//     console.error('Serial Port Error:', err.message);
//   });
// };

// // Start listening to serial data
// startSerialListener((data) => {
//   sleepSync(2000);
// });

// console.log(`Listening on ${PORT_NAME} at ${BAUD_RATE} baud...`);

// middlewares
app.use(express.json());
app.use(cors());

// db connection
// connectDB()

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/probability", probRouter);
// app.use("/images",express.static('uploads'))

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));