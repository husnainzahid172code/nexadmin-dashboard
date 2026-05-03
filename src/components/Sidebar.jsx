import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, Package, BarChart2, Settings, LogOut, Zap,
} from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/products", label: "Products", icon: Package },
  { path: "/analytics", label: "Analytics", icon: BarChart2 },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside style={{
      width: "220px", minHeight: "100vh", background: "#0f172a",
      display: "flex", flexDirection: "column", padding: "0",
      position: "fixed", left: 0, top: 0, zIndex: 100,
    }}>
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Zap size={18} color="white" />
          </div>
          <span style={{ color: "white", fontWeight: 600, fontSize: "16px" }}>NexAdmin</span>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink key={path} to={path} style={({ isActive }) => ({
            display: "flex", alignItems: "center", gap: "12px",
            padding: "10px 12px", borderRadius: "8px", marginBottom: "4px",
            textDecoration: "none", fontSize: "14px", fontWeight: 500,
            color: isActive ? "white" : "#94a3b8",
            background: isActive ? "#1e293b" : "transparent",
            transition: "all 0.15s",
          })}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: "16px 12px", borderTop: "1px solid #1e293b" }}>
        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "10px 12px", borderRadius: "8px", width: "100%",
          background: "transparent", border: "none", cursor: "pointer",
          color: "#94a3b8", fontSize: "14px", fontWeight: 500,
        }}>
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}
