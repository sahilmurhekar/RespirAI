"use client";
import { useState, useCallback, useMemo } from "react";
import {
  RadialBarChart,
  RadialBar,
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

interface CountChartProps {
  gasData?: GasData;
}

const CountChart: React.FC<CountChartProps> = ({ gasData }) => {
  const initialGasData = [
    { name: "Total", count: 100, fill: "#f5f5f5" },
    { name: "LPG", count: Number(gasData?.LPG_Concentration) || 0, fill: "#9575CD" },
    { name: "CO", count: Number(gasData?.CO_Concentration) || 0, fill: "#64B5F6" },
    { name: "Methane", count: Number(gasData?.Methane_Concentration) || 0, fill: "#FFB74D" },
    { name: "Hydrogen", count: Number(gasData?.Hydrogen_Concentration) || 0, fill: "#81C784" },
    { name: "NH3", count: Number(gasData?.NH3_Concentration) || 0, fill: "#BA68C8" },
    { name: "CO2", count: Number(gasData?.CO2_Concentration) || 0, fill: "#4DB6AC" },
    { name: "Alcohol", count: Number(gasData?.Alcohol_Concentration) || 0, fill: "#FFB74D" }
  ];

  const [hoveredGas, setHoveredGas] = useState<string | null>(null);

  const handleGasMouseEnter = useCallback((name: string) => {
    setHoveredGas(name);
  }, []);

  const handleGasMouseLeave = useCallback(() => {
    setHoveredGas(null);
  }, []);

  const modifiedGasData = useMemo(() => 
    initialGasData.map(item => ({
      ...item,
      count: hoveredGas === item.name ? item.count * 1.1 : item.count,
      opacity: hoveredGas ? (hoveredGas === item.name ? 1 : 0.5) : 1,
    }))
  , [hoveredGas, initialGasData]);

  return (
    <div className="bg-white hover:bg-gray-100 rounded-xl w-full h-[400px] p-3 transition-all duration-200 ease-in-out overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-semibold">Gas Concentrations</h1>
        <div className="text-sm opacity-80">Real-time</div>
      </div>

      <div className="relative w-full h-[55%]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="85%"
            barSize={15}
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

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[25%] aspect-square rounded-full flex items-center justify-center bg-white shadow-sm">
          <div className="text-center w-full p-1">
            {hoveredGas ? (
              <>
                <div className="text-base font-bold mb-0.5"
                     style={{ color: initialGasData.find(d => d.name === hoveredGas)?.fill }}>
                  {hoveredGas}
                </div>
                <div className="text-lg font-bold">
                  {initialGasData.find(d => d.name === hoveredGas)?.count.toFixed(3) ?? "0.000"}
                </div>
              </>
            ) : (
              <div className="text-base font-bold text-gray-600">Gas Level</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-2 overflow-hidden">
        {initialGasData.slice(1).map(item => (
          <div
            key={item.name}
            onMouseEnter={() => handleGasMouseEnter(item.name)}
            onMouseLeave={handleGasMouseLeave}
            className={`flex items-center gap-2 p-1.5 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 ${
              hoveredGas === item.name ? "scale-[1.02] shadow-sm" : ""
            }`}
            style={{ opacity: hoveredGas ? (hoveredGas === item.name ? 1 : 0.5) : 1 }}
          >
            <div
              className="w-3 h-3 rounded-full transition-all duration-200 flex-shrink-0"
              style={{
                backgroundColor: item.fill,
                transform: hoveredGas === item.name ? 'scale(1.1)' : 'scale(1)'
              }}
            />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-medium text-gray-700 truncate">{item.name}</span>
              <span className="text-xs text-gray-600">{item.count.toFixed(3)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountChart;
