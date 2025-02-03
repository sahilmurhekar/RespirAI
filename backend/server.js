import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import { SerialPort } from 'serialport';

// app config
const app = express()
const port = process.env.PORT || 4000;

const PORT_NAME = 'COM3'; // Change this to your actual port
const BAUD_RATE = 9600;

// Initialize Serial Port
const port1 = new SerialPort({
  path: PORT_NAME,
  baudRate: BAUD_RATE,
});

let buffer = ""; // Buffer for accumulating data chunks

function sleepSync(milliseconds) {
  const start = Date.now();
  while (Date.now() - start < milliseconds) {}
}
// Function to process incoming serial data
const processData = (rawData) => {
  if (!rawData) return; // Fix for "undefined" issue
  
  buffer += rawData.toString("utf-8"); // Convert Buffer to string

  // Check if we have a full line (ends with \r\n or \n)
  if (buffer.includes("\n")) {
    const lines = buffer.split("\n");
    buffer = lines.pop(); // Keep any incomplete data for next read

    lines.forEach((line) => {
      const cleanLine = line.replace("\r", "").trim(); // Remove CR (\r) and trim spaces
      console.log("🔹 Complete Line Received:", cleanLine);

      if (cleanLine) {
        const values = cleanLine.split(",").map((val) => val.trim()); // Split CSV data

        if (values.length === 7) { // Now expecting exactly 6 values
          const [MQ5A0, MQ5D0, MQ135A0, MQ135D0, DHT11_T, DHT11_H, p] = values.map(Number);

          const sensorData = {
            MQ5A0,
            MQ5D0,
            MQ135A0,
            MQ135D0,
            DHT11_T,
            DHT11_H,
            p,
          };

          if(sensorData == undefined){
            console.log("No No data");
          }
          else{

            console.log(" Processed Data:", sensorData);
            let processData_final = -4.7566971426 + (0.0000294670 * sensorData.MQ5A0) + (-0.1580552106 * sensorData.MQ5D0) + (0.0012048012 * sensorData.MQ135A0) + (0.1435473991 * sensorData.DHT11_T) + (0.0040330661 * sensorData.DHT11_H);
            console.log(" Processed Data (final): ", processData_final);
            // let probability= (Math.pow(processData_final,2.718))/(1+(Math.pow(processData_final,2.718)));
            console.log("processData_final:", processData_final);
            let powResult = Math.exp(processData_final);
            let maxVal = 1e10;  // Example maximum value
            // powResult = Math.min(Math.max(powResult, -maxVal), maxVal);
            // if(powResult == NaN){
            //   powResult=maxVal;
            //   console.log("powResult:", powResult);
            //   let probability = powResult / (1 + powResult);
            //   console.log(" Probability Data: ", probability);
            // }
            // else{
            //   console.log("Probability data: ",p);
            // }

            console.log("powResult:", powResult);
            let probability = powResult / (1 + powResult);
            console.log(" Probability Data: ", probability);
            
            return sensorData;
          }

          
        } else {
          console.warn("⚠️ Invalid data received (wrong format or missing values):\n", cleanLine);
        }
      }
    });
  }
};

// Function to handle incoming data
export const startSerialListener = (callback) => {
  port1.on('data', (data) => {
    if (!data || data.length === 0) {
      console.warn("⚠️ Received empty or undefined data");
      return;
    }
    // const message = data.toString().trim();
    // const message = data;
    const message = processData(data);
    if(message == undefined){
      console.log("No data");
    }
    else{
      console.log('Received:', message);
    }
    
    if (callback) callback(message);
  });

  port1.on('error', (err) => {
    console.error('Serial Port Error:', err.message);
  });
};

// Start listening to serial data
// startSerialListener((data) => {
//   console.log('Processed Data:', data);
// });
startSerialListener((data) => {

  sleepSync(2000);
});


console.log(`Listening on ${PORT_NAME} at ${BAUD_RATE} baud...`);


// middlewares
app.use(express.json())
app.use(cors())

// db connection
// connectDB()

// api endpoints
app.use("/api/user", userRouter)
// app.use("/images",express.static('uploads'))



app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))