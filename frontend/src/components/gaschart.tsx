// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const GasChart: React.FC = () => {
//   const [data, setData] = useState([{
//     timestamp: new Date().toLocaleTimeString(),
//     LPG_Concentration: 90.85,
//     CO_Concentration: 131.76,
//     Methane_Concentration: 74.38,
//     Hydrogen_Concentration: 86.18,
//     NH3_Concentration: 123.50,
//     CO2_Concentration: 123.48,
//     Alcohol_Concentration: 90.04
//   }]);

//   const gasColors = {
//     LPG_Concentration: "#FF5733",
//     CO_Concentration: "#33FF57",
//     Methane_Concentration: "#3357FF",
//     Hydrogen_Concentration: "#F3FF33",
//     NH3_Concentration: "#A133FF",
//     CO2_Concentration: "#FF33A1",
//     Alcohol_Concentration: "#33FFF1",
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post("http://localhost:4000/api/probability/gas");
        
//         if (response.data && response.data.success) {
//           const newEntry = {
//             timestamp: new Date().toLocaleTimeString([], {
//               hour: '2-digit',
//               minute: '2-digit',
//               second: '2-digit'
//             }),
//             LPG_Concentration: Number(response.data.LPG_Concentration),
//             CO_Concentration: Number(response.data.CO_Concentration),
//             Methane_Concentration: Number(response.data.Methane_Concentration),
//             Hydrogen_Concentration: Number(response.data.Hydrogen_Concentration),
//             NH3_Concentration: Number(response.data.NH3_Concentration),
//             CO2_Concentration: Number(response.data.CO2_Concentration),
//             Alcohol_Concentration: Number(response.data.Alcohol_Concentration)
//           };

//           setData(prevData => {
//             if (prevData.length >= 20) {
//               return [...prevData.slice(1), newEntry];
//             }
//             return [...prevData, newEntry];
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/20 transition-all duration-300 hover:shadow-xl hover:bg-gray-100 group h-[600px]">
//       <div className="flex justify-between items-center mb-4">
//         <div className="space-y-1">
//           <h1 className="text-xl font-bold text-gray-800 group-hover:text-gray-900">
//             Gas Levels
//           </h1>
//           <p className="text-sm text-gray-500 group-hover:text-gray-600">
//             Real-time Comparison
//           </p>
//         </div>
//       </div>

//       <div className="w-full h-[480px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={data}
//             margin={{ top: 20, right: 35, left: -15, bottom: 100 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
//             <XAxis
//               dataKey="timestamp"
//               tick={{ fill: "#6B7280", fontSize: 11 }}
//               tickLine={false}
//               angle={-45}
//               textAnchor="end"
//               height={90}
//               dy={50}
//               interval={0}
//             />
//             <YAxis
//               tick={{ fill: "#6B7280", fontSize: 12 }}
//               tickLine={false}
//               domain={[0, 'auto']}
//               dx={-5}
//             />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "rgba(255, 255, 255, 0.95)",
//                 borderRadius: "12px",
//                 border: "none",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
//               }}
//             />
//             <Legend
//               align="left"
//               verticalAlign="top"
//               iconSize={10}
//               wrapperStyle={{ 
//                 paddingTop: "5px",
//                 fontSize: "12px",
//                 marginBottom: "15px"
//               }}
//             />

//             {Object.entries(gasColors).map(([key, color]) => (
//               <Line
//                 key={key}
//                 type="monotone"
//                 dataKey={key}
//                 stroke={color}
//                 strokeWidth={2}
//                 dot={false}
//                 activeDot={{ r: 4 }}
//                 isAnimationActive={false}
//                 connectNulls={true}
//               />
//             ))}
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default GasChart;


"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface GasData {
  LPG_Concentration: string;
  CO_Concentration: string;
  Methane_Concentration: string;
  Hydrogen_Concentration: string;
  NH3_Concentration: string;
  CO2_Concentration: string;
  Alcohol_Concentration: string;
}

interface GasChartProps {
  gasData?: GasData;
}

const GasChart: React.FC<GasChartProps> = ({ gasData }) => {
  const [data, setData] = useState([{
    timestamp: new Date().toLocaleTimeString(),
    LPG_Concentration: 90.85,
    CO_Concentration: 131.76,
    Methane_Concentration: 74.38,
    Hydrogen_Concentration: 86.18,
    NH3_Concentration: 123.50,
    CO2_Concentration: 123.48,
    Alcohol_Concentration: 90.04
  }]);

  const gasColors = {
    LPG_Concentration: "#4F46E5", // Deep Blue (matches LPG card)
    CO_Concentration: "#DC2626", // Red (matches CO card)
    Methane_Concentration: "#3B82F6", // Bright Blue (matches Methane in chart)
    Hydrogen_Concentration: "#FACC15", // Yellow (matches Hydrogen in chart)
    NH3_Concentration: "#EA580C", // Orange (matches NH3 card)
    CO2_Concentration: "#16A34A", // Green (matches CO2 card)
    Alcohol_Concentration: "#E879F9", // Light Purple-Pink (matches Alcohol in chart)
  };
  
  

  useEffect(() => {
    if (gasData) {
      const newEntry = {
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        LPG_Concentration: Number(gasData.LPG_Concentration),
        CO_Concentration: Number(gasData.CO_Concentration),
        Methane_Concentration: Number(gasData.Methane_Concentration),
        Hydrogen_Concentration: Number(gasData.Hydrogen_Concentration),
        NH3_Concentration: Number(gasData.NH3_Concentration),
        CO2_Concentration: Number(gasData.CO2_Concentration),
        Alcohol_Concentration: Number(gasData.Alcohol_Concentration)
      };

      setData(prevData => {
        if (prevData.length >= 20) {
          return [...prevData.slice(1), newEntry];
        }
        return [...prevData, newEntry];
      });
    }
  }, [gasData]);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/20 transition-all duration-300 hover:shadow-xl hover:bg-gray-100 group h-[600px]">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-gray-800 group-hover:text-gray-900">
            Gas Levels
          </h1>
          <p className="text-sm text-gray-500 group-hover:text-gray-600">
            Real-time Comparison
          </p>
        </div>
      </div>

      <div className="w-full h-[480px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 35, left: -15, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis
              dataKey="timestamp"
              tick={{ fill: "#6B7280", fontSize: 11 }}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              height={90}
              dy={50}
              interval={0}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickLine={false}
              domain={[0, 'auto']}
              dx={-5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            />
            <Legend
              align="left"
              verticalAlign="top"
              iconSize={10}
              wrapperStyle={{ 
                paddingTop: "5px",
                fontSize: "12px",
                marginBottom: "15px"
              }}
            />

            {Object.entries(gasColors).map(([key, color]) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
                connectNulls={true}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GasChart;









