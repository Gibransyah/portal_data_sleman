"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { year: 2019, value: 49.2 },
  { year: 2020, value: 49.7 },
  { year: 2021, value: 50.3 },
  { year: 2022, value: 51.0 },
  { year: 2023, value: 51.4 },
];

export default function TrendMiniChart() {
  return (
    <section className="py-20 bg-blue-50 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Tren Pertumbuhan Penduduk Sleman (2019–2023)
        </h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#dbeafe"
              />
              <XAxis
                dataKey="year"
                stroke="#1e3a8a"
                tick={{ fill: "#1e3a8a" }}
              />
              <YAxis
                stroke="#1e3a8a"
                tick={{ fill: "#1e3a8a" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e3a8a",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#f9fafb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                }}
                labelStyle={{ color: "#93c5fd" }}
                itemStyle={{ color: "#f9fafb" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb" // 💙 Biru vivid modern
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "#2563eb",
                  stroke: "#1e3a8a",
                  strokeWidth: 2,
                }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
