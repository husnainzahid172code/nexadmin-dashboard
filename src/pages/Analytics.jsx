import Navbar from "../components/Navbar";
import { revenueData, categoryData } from "../data/dummyData";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function Analytics() {
  return (
    <>
      <Navbar title="Analytics" />
      <main style={{ padding: "24px 28px", flex: 1 }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f1f5f9", padding: "20px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>Revenue trend</h2>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 20px" }}>Monthly revenue — line chart</p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false}
                  tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5}
                  dot={{ fill: "#6366f1", r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f1f5f9", padding: "20px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>Sales by category</h2>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 20px" }}>Revenue breakdown — pie chart</p>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={90}
                  dataKey="value" nameKey="name" label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={true}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f1f5f9", padding: "20px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>Revenue vs orders</h2>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 20px" }}>Monthly comparison — bar chart</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "13px" }} />
              <Bar yAxisId="left" dataKey="revenue" name="Revenue ($)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="orders" name="Orders" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </>
  );
}
