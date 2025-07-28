// components/AppointmentChart.tsx
"use client";

import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

export function AppointmentChart({ userId }: { userId: string }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await fetch(`/api/chart/weekly-appointments?userId=${userId}`);
      const json = await res.json();
      setData(json);
    }
    loadData();
  }, [userId]);

  return (
    <div className="rounded-xl bg-white p-6 shadow-md text-zinc-800">
      <h2 className="text-sm font-semibold">Agendamentos da Semana</h2>
      <p className="text-xs text-zinc-500 mb-4">
        Veja como seus agendamentos estão comparados com sua média.
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /> 
          <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
          <YAxis hide />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === "current") return [value, "Agendamentos"];
              if (name === "average") return [value, "Média"];
              return [value, name];
            }}
            labelFormatter={(label) => `Dia: ${label}`}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              color: "#111"
            }}
            labelStyle={{ fontSize: 12 }}
            itemStyle={{ fontSize: 12 }}
          />

          <Line
            type="monotone"
            dataKey="average"
            stroke="#d1d5db" 
            strokeWidth={2}
            dot={{ stroke: '#d1d5db', strokeWidth: 1, r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="current"
            stroke="#76A6BA" 
            strokeWidth={2}
            dot={{ stroke: '#AECAD6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
