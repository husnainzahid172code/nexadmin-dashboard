import { useAuth } from "../context/AuthContext";
import { Bell, Search } from "lucide-react";

export default function Navbar({ title }) {
  const { user } = useAuth();
  const initials = user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";

  return (
    <header style={{
      height: "64px", background: "white", borderBottom: "1px solid #f1f5f9",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", position: "sticky", top: 0, zIndex: 50,
    }}>
      <div>
        <h1 style={{ fontSize: "18px", fontWeight: 600, color: "#0f172a", margin: 0 }}>{title}</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px",
          padding: "7px 12px",
        }}>
          <Search size={15} color="#94a3b8" />
          <input placeholder="Search..." style={{
            border: "none", background: "transparent", outline: "none",
            fontSize: "13px", color: "#475569", width: "160px",
          }} />
        </div>
        <button style={{
          background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px",
          padding: "8px", cursor: "pointer", display: "flex", alignItems: "center",
        }}>
          <Bell size={16} color="#64748b" />
        </button>
        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          background: "#6366f1", display: "flex", alignItems: "center",
          justifyContent: "center", color: "white", fontSize: "13px", fontWeight: 600,
          cursor: "pointer",
        }}>
          {initials}
        </div>
      </div>
    </header>
  );
}
