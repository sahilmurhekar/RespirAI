// import GasChart from "@/components/gaschart";
// import CountChart from "@/components/CountChart";
// import UserCard from "@/components/UserCard";

// const AdminPage = () => {
//   return (
//     <div className="container mx-auto p-4">
//       {/* Main Content */}
//       <div className="w-full space-y-6">
//         {/* Gas Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <UserCard 
//             type="O2" 
//             displayName="Oxygen (O₂)"
//             percentage="20.925"
//           />
//           <UserCard 
//             type="CO2" 
//             displayName="Carbon Dioxide (CO₂)"
//             percentage="0.040"
//           />
//           <UserCard 
//             type="H2O" 
//             displayName="Water Vapor (H₂O)"
//             percentage="0.250"
//           />
//           <UserCard 
//             type="CO" 
//             displayName="Carbon Monoxide (CO)"
//             percentage="0.010"
//           />
//         </div>
        
//         {/* Charts Section */}
//         <div className="flex flex-col lg:flex-row gap-4">
//           {/* Count Chart */}
//           <div className="w-full lg:w-1/3">
//             <div className="bg-white rounded-lg shadow p-4 h-[400px]">
//               <CountChart />
//             </div>
//           </div>
          
//           {/* Gas Composition Chart */}
//           <div className="w-full lg:w-2/3">
//             <div className="bg-white rounded-lg shadow p-4 h-[400px]">
//               <GasChart />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import GasChart from "@/components/gaschart";
// import CountChart from "@/components/CountChart";
// import UserCard from "@/components/UserCard";

// const AdminPage = () => {
//   const [gasData, setGasData] = useState(null);
//   const [probability, setProbability] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchGasData = async () => {
//       try {
//         const gasResponse = await axios.post("http://localhost:4000/api/probability/gas");
//         setGasData(gasResponse.data);
        
//         const probResponse = await axios.post("http://localhost:4000/api/probability/value");
//         setProbability(probResponse.data.probability);
//       } catch (err) {
//         console.log(gasData);
//         console.log(probability);
//         setError("Failed to fetch sensor data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGasData();

//     // Refresh data every 10 seconds
//     const interval = setInterval(fetchGasData, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="container mx-auto p-4">
//       {/* Main Content */}
//       <div className="w-full space-y-6">
//         {/* Gas Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <UserCard 
//             type="O2" 
//             displayName="Oxygen (O₂)"
//             percentage="20.925"
//           />
//           <UserCard 
//             type="CO2" 
//             displayName="Carbon Dioxide (CO₂)"
//             percentage={gasData?.CO2_Concentration || "N/A"}
//           />
//           <UserCard 
//             type="H2O" 
//             displayName="Water Vapor (H₂O)"
//             percentage="0.250"
//           />
//           <UserCard 
//             type="CO" 
//             displayName="Carbon Monoxide (CO)"
//             percentage={gasData?.CO_Concentration || "N/A"}
//           />
//         </div>

//         {/* Probability Display */}
//         <div className="bg-white shadow rounded-lg p-4 text-center">
//           <h2 className="text-xl font-bold">Suffocation Probability</h2>
//           <p className="text-2xl text-blue-600 font-semibold mt-2">
//             {probability !== null ? `${(probability * 100).toFixed(2)}%` : "N/A"}
//           </p>
//         </div>

//         {/* Charts Section */}
//         <div className="flex flex-col lg:flex-row gap-4">
//           {/* Count Chart */}
//           <div className="w-full lg:w-1/3">
//             <div className="bg-white rounded-lg shadow p-4 h-[400px]">
//               <CountChart />
//             </div>
//           </div>

//           {/* Gas Composition Chart */}
//           <div className="w-full lg:w-2/3">
//             <div className="bg-white rounded-lg shadow p-4 h-[400px]">
//               <GasChart gasData={gasData} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import GasChart from "@/components/gaschart";
import CountChart from "@/components/CountChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  const [gasData, setGasData] = useState(null);
  const [lastValidGasData, setLastValidGasData] = useState(null); // Store previous valid data
  const [probability, setProbability] = useState(null);
  const [lastValidProbability, setLastValidProbability] = useState(null); // Store previous valid probability
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGasData = async () => {
      try {
        const gasResponse = await axios.post("http://localhost:4000/api/probability/gas");
        const gasData = gasResponse.data;

        // Check if the response contains valid numerical data
        if (gasData && gasData.success) {
          setGasData(gasData);
          setLastValidGasData(gasData); // Update last valid value
        }

        const probResponse = await axios.post("http://localhost:4000/api/probability/value");
        let probValue = parseFloat(probResponse.data.probability);

        // Check if probability is a valid number
        if (!isNaN(probValue)) {
          setProbability(probValue);
          setLastValidProbability(probValue); // Update last valid probability
        } else {
          setProbability(lastValidProbability); // Use last valid probability
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch sensor data");
      } finally {
        setLoading(false);
      }
    };

    fetchGasData();

    // Refresh data every 10 seconds
    const interval = setInterval(fetchGasData, 1000);
    return () => clearInterval(interval);
  }, [lastValidProbability, lastValidGasData]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Main Content */}
      <div className="w-full space-y-6">
        {/* Gas Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <UserCard 
            type="O2" 
            displayName="LPG"
            percentage={
              !isNaN(gasData?.LPG_Concentration) 
                ? gasData?.LPG_Concentration 
                : lastValidGasData?.LPG_Concentration || "N/A"
            }
          />
          <UserCard 
            type="CO2" 
            displayName="Carbon Dioxide (CO₂)"
            percentage={
              !isNaN(gasData?.CO2_Concentration) 
                ? gasData?.CO2_Concentration 
                : lastValidGasData?.CO2_Concentration || "N/A"
            }
          />
          <UserCard 
            type="H2O" 
            displayName="Ammonia (NH3)"
            percentage={
              !isNaN(gasData?.NH3_Concentration) 
                ? gasData?.NH3_Concentration 
                : lastValidGasData?.NH3_Concentration || "N/A"
            }
          />
          <UserCard 
            type="CO" 
            displayName="Carbon Monoxide (CO)"
            percentage={
              !isNaN(gasData?.CO_Concentration) 
                ? gasData?.CO_Concentration 
                : lastValidGasData?.CO_Concentration || "N/A"
            }
          />
        </div>

        {/* Probability Display */}
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h2 className="text-xl font-bold">Suffocation Probability</h2>
          <p className="text-2xl text-blue-600 font-semibold mt-2">
            {probability !== null 
              ? `${(probability * 100).toFixed(2)}%` 
              : lastValidProbability !== null 
                ? `${(lastValidProbability * 100).toFixed(2)}%`
                : "N/A"
            }
          </p>
        </div>

        {/* Charts Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Count Chart */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-4 h-[400px]">
              <CountChart />
            </div>
          </div>

          {/* Gas Composition Chart */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow p-4 h-[400px]">
              <GasChart gasData={gasData || lastValidGasData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
