import Navbar from "../components/Navbar";
import { revenueData, recentOrders } from "../data/dummyData";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { TrendingUp, ShoppingCart, Users, Package } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "$97,200", change: "+12.5%", up: true, icon: TrendingUp, color: "#6366f1", bg: "#eef2ff" },
  { label: "Total Orders", value: "880", change: "+8.2%", up: true, icon: ShoppingCart, color: "#10b981", bg: "#ecfdf5" },
  { label: "Active Users", value: "3,412", change: "+5.1%", up: true, icon: Users, color: "#f59e0b", bg: "#fffbeb" },
  { label: "Products", value: "142", change: "-2.4%", up: false, icon: Package, color: "#ef4444", bg: "#fef2f2" },
];

const statusStyle = (status) => {
  const map = {
    Delivered: { background: "#ecfdf5", color: "#065f46" },
    Processing: { background: "#fffbeb", color: "#92400e" },
    Shipped: { background: "#eff6ff", color: "#1e40af" },
  };
  return { ...map[status], padding: "2px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 500 };
};

export default function Dashboard() {
  return (
    <>
      <Navbar title="Dashboard" />
      <main style={{ padding: "24px 28px", flex: 1 }}>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {stats.map(({ label, value, change, up, icon: Icon, color, bg }) => (
            <div key={label} style={{
              background: "white", borderRadius: "12px", border: "1px solid #f1f5f9",
              padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            }}>
              <div>
                <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 8px" }}>{label}</p>
                <p style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px" }}>{value}</p>
                <span style={{ fontSize: "12px", color: up ? "#10b981" : "#ef4444", fontWeight: 500 }}>
                  {change} from last month
                </span>
              </div>
              <div style={{ background: bg, padding: "10px", borderRadius: "10px" }}>
                <Icon size={20} color={color} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "16px", marginBottom: "24px" }}>
          <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f1f5f9", padding: "20px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>Revenue overview</h2>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 20px" }}>Monthly revenue for 2024</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false}
                  tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2}
                  fill="url(#revGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f1f5f9", padding: "20px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>Orders per month</h2>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 20px" }}>Order count 2024</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f1f5f9", padding: "20px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", margin: "0 0 16px" }}>Recent orders</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                {["Order ID", "Customer", "Product", "Amount", "Date", "Status"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                  <td style={{ padding: "12px", color: "#6366f1", fontWeight: 500 }}>{order.id}</td>
                  <td style={{ padding: "12px", color: "#0f172a" }}>{order.customer}</td>
                  <td style={{ padding: "12px", color: "#475569" }}>{order.product}</td>
                  <td style={{ padding: "12px", color: "#0f172a", fontWeight: 500 }}>${order.amount}</td>
                  <td style={{ padding: "12px", color: "#94a3b8" }}>{order.date}</td>
                  <td style={{ padding: "12px" }}><span style={statusStyle(order.status)}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
