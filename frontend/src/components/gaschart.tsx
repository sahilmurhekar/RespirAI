"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState } from 'react';

const data = [
  {
    name: "O₂",
    morning: 61,
    night: 40,
  },
  {
    name: "CO",
    morning: 70,
    night: 60,
  },
  {
    name: "CO₂",
    morning: 90,
    night: 75,
  },
  {
    name: "H₂S",
    morning: 90,
    night: 75,
  },
  {
    name: "CH₄",
    morning: 65,
    night: 55,
  },
];

const GasChart = () => {
  const [activeBar, setActiveBar] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const morningColor = '#FFB74D';
  const morningHoverColor = '#FFA726';
  const nightColor = '#64B5F6';
  const nightHoverColor = '#42A5F5';

  const handleBarMouseEnter = (dataKey: string, index: number) => {
    setActiveBar(dataKey);
    setActiveIndex(index);
  };

  const handleBarMouseLeave = () => {
    setActiveBar(null);
    setActiveIndex(null);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 h-full
      shadow-lg border border-gray-100/20 transition-all duration-300
      hover:shadow-xl hover:bg-gray-100 group">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-gray-800 group-hover:text-gray-900">Gas Levels</h1>
          <p className="text-sm text-gray-500 group-hover:text-gray-600">Daily Comparison</p>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-200/80 
          transition-colors duration-200">
          <Image src="/moreDark.png" alt="More options" width={20} height={20} />
        </button>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={28}
          barGap={8}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e5e5"
            opacity={0.8}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickLine={false}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickLine={false}
            tickCount={6}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              border: "1px solid #f0f0f0",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              padding: "12px",
            }}
            cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            iconSize={10}
            iconType="circle"
            wrapperStyle={{
              paddingTop: "20px",
              paddingBottom: "30px",
              fontSize: "13px",
            }}
            onMouseEnter={(e) => setActiveBar(e.dataKey)}
            onMouseLeave={handleBarMouseLeave}
          />
          <Bar
            dataKey="morning"
            name="Morning Levels"
            radius={[8, 8, 0, 0]}
            onMouseEnter={(data, index) => handleBarMouseEnter('morning', index)}
            onMouseLeave={handleBarMouseLeave}
          >
            {data.map((entry, index) => (
              <Cell
                key={`morning-${index}`}
                fill={activeBar === 'morning' && activeIndex === index ? morningHoverColor : morningColor}
                className="transition-all duration-200"
              />
            ))}
          </Bar>
          <Bar
            dataKey="night"
            name="Night Levels"
            radius={[8, 8, 0, 0]}
            onMouseEnter={(data, index) => handleBarMouseEnter('night', index)}
            onMouseLeave={handleBarMouseLeave}
          >
            {data.map((entry, index) => (
              <Cell
                key={`night-${index}`}
                fill={activeBar === 'night' && activeIndex === index ? nightHoverColor : nightColor}
                className="transition-all duration-200"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GasChart;
