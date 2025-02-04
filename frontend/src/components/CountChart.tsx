"use client";
import { useState, useCallback, useMemo } from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const CountChart = () => {
  const gasData = useMemo(() => [
    { name: "Total", count: 100, fill: "#f5f5f5" },
    { name: "N2", count: 78.084, fill: "#9575CD" },
    { name: "O2", count: 20.946, fill: "#64B5F6" },
    { name: "Ar", count: 0.934, fill: "#FFB74D" },
    { name: "CO2", count: 0.036, fill: "#81C784" },
  ], []);

  const [hoveredGas, setHoveredGas] = useState<string | null>(null);

  const handleGasMouseEnter = useCallback((name: string) => {
    setHoveredGas(name);
  }, []);

  const handleGasMouseLeave = useCallback(() => {
    setHoveredGas(null);
  }, []);

  // Compute modified data with hover effect
  const modifiedGasData = useMemo(() => 
    gasData.map(item => ({
      ...item,
      count: hoveredGas === item.name ? item.count * 1.1 : item.count,
      opacity: hoveredGas ? (hoveredGas === item.name ? 1 : 0.5) : 1,
    }))
  , [hoveredGas, gasData]);

  return (
    <div className="bg-white hover:bg-gray-100 rounded-xl w-full h-full p-4 transition-all duration-200 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Atmospheric Composition</h1>
        <div className="text-sm opacity-80">2024/25</div>
      </div>

      {/* Radial Chart */}
      <div className="relative w-full h-[70%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="90%"
            barSize={20}
            data={modifiedGasData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              background
              dataKey="count"
              cornerRadius={12}
              animationDuration={200}
              animationEasing="ease-out"
              onMouseEnter={(e) => handleGasMouseEnter(e?.payload?.name ?? "")}
              onMouseLeave={handleGasMouseLeave}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Hover Info */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[25%] aspect-square rounded-full flex items-center justify-center bg-white shadow-md">
          <div className="text-center w-full p-2">
            {hoveredGas ? (
              <>
                <div className="text-xl font-bold mb-1"
                     style={{ color: gasData.find(d => d.name === hoveredGas)?.fill }}>
                  {hoveredGas}
                </div>
                <div className="text-2xl font-bold">
                  {gasData.find(d => d.name === hoveredGas)?.count.toFixed(3) ?? "0.000"}%
                </div>
              </>
            ) : (
              <div className="text-xl font-bold text-gray-600">Air</div>
            )}
          </div>
        </div>
      </div>

      {/* Gas List */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {gasData.slice(1).map(item => (
          <div
            key={item.name}
            onMouseEnter={() => handleGasMouseEnter(item.name)}
            onMouseLeave={handleGasMouseLeave}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 ${
              hoveredGas === item.name ? "scale-105 shadow-md" : ""
            }`}
            style={{ opacity: hoveredGas ? (hoveredGas === item.name ? 1 : 0.5) : 1 }}
          >
            <div
              className="w-4 h-4 rounded-full transition-all duration-200"
              style={{
                backgroundColor: item.fill,
                transform: hoveredGas === item.name ? 'scale(1.2)' : 'scale(1)'
              }}
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
              <span className="text-xs text-gray-600">{item.count.toFixed(3)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountChart;
