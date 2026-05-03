import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "Admin User");
  const [email, setEmail] = useState(user?.email || "admin@nexadmin.com");
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, orders: true, reports: false });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggle = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  const Toggle = ({ on, onToggle }) => (
    <button onClick={onToggle} style={{
      width: "44px", height: "24px", borderRadius: "12px",
      background: on ? "#6366f1" : "#e2e8f0", border: "none",
      cursor: "pointer", position: "relative", transition: "background .2s",
    }}>
      <span style={{
        position: "absolute", top: "3px",
        left: on ? "23px" : "3px",
        width: "18px", height: "18px", borderRadius: "50%",
        background: "white", transition: "left .2s",
      }} />
    </button>
  );

  return (
    <>
      <Navbar title="Settings" />
      <main style={{ padding: "24px 28px", flex: 1, maxWidth: "720px" }}>

        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f1f5f9", padding: "24px", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>Profile settings</h2>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 20px" }}>Update your account information</p>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              background: "#6366f1", display: "flex", alignItems: "center",
              justifyContent: "center", color: "white", fontSize: "22px", fontWeight: 600,
            }}>
              {name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </div>
            <button style={{
              background: "transparent", border: "1px solid #e2e8f0",
              borderRadius: "8px", padding: "8px 16px", fontSize: "13px",
              cursor: "pointer", color: "#475569",
            }}>Change photo</button>
          </div>

          <form onSubmit={handleSave}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Full name</label>
                <input value={name} onChange={e => setName(e.target.value)} style={{
                  width: "100%", padding: "9px 12px", borderRadius: "8px",
                  border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box",
                }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} style={{
                  width: "100%", padding: "9px 12px", borderRadius: "8px",
                  border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box",
                }} />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button type="submit" style={{
                background: "#6366f1", color: "white", border: "none",
                padding: "9px 20px", borderRadius: "8px", fontSize: "13px",
                fontWeight: 500, cursor: "pointer",
              }}>Save changes</button>
              {saved && <span style={{ fontSize: "13px", color: "#10b981", fontWeight: 500 }}>Changes saved!</span>}
            </div>
          </form>
        </div>

        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f1f5f9", padding: "24px", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>Notifications</h2>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 20px" }}>Manage your notification preferences</p>
          {[
            { key: "email", label: "Email notifications", desc: "Receive updates via email" },
            { key: "orders", label: "New order alerts", desc: "Get notified for every new order" },
            { key: "reports", label: "Weekly reports", desc: "Receive weekly performance reports" },
          ].map(({ key, label, desc }) => (
            <div key={key} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 0", borderBottom: "1px solid #f8fafc",
            }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "#0f172a", margin: "0 0 2px" }}>{label}</p>
                <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>{desc}</p>
              </div>
              <Toggle on={notifications[key]} onToggle={() => toggle(key)} />
            </div>
          ))}
        </div>

        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f1f5f9", padding: "24px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>Change password</h2>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 20px" }}>Use a strong password you don't use elsewhere</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "340px" }}>
            {["Current password", "New password", "Confirm new password"].map(label => (
              <div key={label}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>{label}</label>
                <input type="password" placeholder="••••••••" style={{
                  width: "100%", padding: "9px 12px", borderRadius: "8px",
                  border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box",
                }} />
              </div>
            ))}
            <button style={{
              background: "#0f172a", color: "white", border: "none",
              padding: "9px 20px", borderRadius: "8px", fontSize: "13px",
              fontWeight: 500, cursor: "pointer", alignSelf: "flex-start", marginTop: "4px",
            }}>Update password</button>
          </div>
        </div>
      </main>
    </>
  );
}
