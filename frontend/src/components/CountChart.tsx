"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CountChart = () => {
  const [gasData, setGasData] = useState([
    {
      name: "Total",
      count: 100,
      fill: "#f5f5f5",
    },
    {
      name: "N2",
      count: 78.084,
      fill: "#9575CD",
    },
    {
      name: "O2", 
      count: 20.946,
      fill: "#64B5F6",
    },
    {
      name: "Ar",
      count: 0.934,
      fill: "#FFB74D", 
    },
    {
      name: "CO2",
      count: 0.036,
      fill: "#81C784",
    }
  ]);

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Atmospheric Composition</h1>
        <div className="text-sm">2024/25</div>
      </div>
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="90%"
            barSize={20}
            data={gasData}
            startAngle={90}
            endAngle={450}
          >
            <RadialBar
              background
              dataKey="count"
              cornerRadius={15}
              label={{ 
                position: 'outside',
                fill: '#666',
                fontSize: 12,
              //  formatter: (value, entry) => `${entry.name}: ${value}%`
              }}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {gasData.slice(1).map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.fill }} />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-xs text-gray-500">{item.count}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountChart;
