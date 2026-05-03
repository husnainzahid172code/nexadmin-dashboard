import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";

export default function ProtectedRoute({ children, title }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div style={{ display: "flex", background: "#f8fafc", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}
