import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Zap, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("admin@nexadmin.com");
  const [password, setPassword] = useState("password123");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      // Demo mode — bypass backend if not running
      if (email === "admin@nexadmin.com" && password === "password123") {
        login({ name: "Admin User", email }, "demo-token-123");
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Try admin@nexadmin.com / password123");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f8fafc",
    }}>
      <div style={{
        background: "white", borderRadius: "16px", border: "1px solid #e2e8f0",
        padding: "40px", width: "100%", maxWidth: "400px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "12px",
            background: "#6366f1", display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 16px",
          }}>
            <Zap size={24} color="white" />
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px" }}>
            Welcome back
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
            Sign in to your NexAdmin account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
              Email address
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{
                width: "100%", padding: "10px 14px", borderRadius: "8px",
                border: "1px solid #e2e8f0", fontSize: "14px", outline: "none",
                boxSizing: "border-box", color: "#0f172a",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"} value={password}
                onChange={e => setPassword(e.target.value)} required
                style={{
                  width: "100%", padding: "10px 40px 10px 14px", borderRadius: "8px",
                  border: "1px solid #e2e8f0", fontSize: "14px", outline: "none",
                  boxSizing: "border-box", color: "#0f172a",
                }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", padding: 0, color: "#94a3b8",
              }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px",
              padding: "10px 14px", marginBottom: "16px", fontSize: "13px", color: "#dc2626",
            }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "11px", borderRadius: "8px",
            background: loading ? "#a5b4fc" : "#6366f1", border: "none",
            color: "white", fontSize: "14px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
          }}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div style={{
          marginTop: "24px", padding: "14px", background: "#f8fafc",
          borderRadius: "8px", border: "1px solid #e2e8f0",
        }}>
          <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 4px", fontWeight: 500 }}>Demo credentials</p>
          <p style={{ fontSize: "12px", color: "#475569", margin: 0 }}>admin@nexadmin.com / password123</p>
        </div>
      </div>
    </div>
  );
}
