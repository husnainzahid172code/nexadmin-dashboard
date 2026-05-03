import { useState } from "react";
import Navbar from "../components/Navbar";
import { products } from "../data/dummyData";
import { Search, Plus, Filter } from "lucide-react";

const statusStyle = (status) => {
  const map = {
    "In Stock": { background: "#ecfdf5", color: "#065f46" },
    "Low Stock": { background: "#fffbeb", color: "#92400e" },
    "Out of Stock": { background: "#fef2f2", color: "#991b1b" },
  };
  return { ...map[status], padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 500 };
};

const categories = ["All", "Electronics", "Clothing", "Furniture", "Books", "Sports"];

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <>
      <Navbar title="Products" />
      <main style={{ padding: "24px 28px", flex: 1 }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "white", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "8px 14px",
            }}>
              <Search size={15} color="#94a3b8" />
              <input
                placeholder="Search products..."
                value={search} onChange={e => setSearch(e.target.value)}
                style={{ border: "none", outline: "none", fontSize: "13px", color: "#475569", width: "200px", background: "transparent" }}
              />
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)} style={{
                  padding: "7px 14px", borderRadius: "8px", fontSize: "13px", cursor: "pointer",
                  border: "1px solid", fontWeight: 500,
                  borderColor: category === cat ? "#6366f1" : "#e2e8f0",
                  background: category === cat ? "#eef2ff" : "white",
                  color: category === cat ? "#4f46e5" : "#64748b",
                }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "#6366f1", color: "white", border: "none",
            padding: "9px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer",
          }}>
            <Plus size={15} /> Add product
          </button>
        </div>

        <div style={{ background: "white", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>All products</span>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>{filtered.length} items</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                {["Product", "Category", "Price", "Stock", "Status", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} style={{ borderBottom: "1px solid #f8fafc" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "36px", height: "36px", borderRadius: "8px",
                        background: "#f1f5f9", display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: "16px",
                      }}>
                        {product.category === "Electronics" ? "⚡" :
                         product.category === "Clothing" ? "👕" :
                         product.category === "Furniture" ? "🪑" :
                         product.category === "Books" ? "📚" : "🏃"}
                      </div>
                      <span style={{ fontWeight: 500, color: "#0f172a" }}>{product.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px", color: "#64748b" }}>{product.category}</td>
                  <td style={{ padding: "14px 20px", fontWeight: 600, color: "#0f172a" }}>${product.price}</td>
                  <td style={{ padding: "14px 20px", color: "#475569" }}>{product.stock} units</td>
                  <td style={{ padding: "14px 20px" }}><span style={statusStyle(product.status)}>{product.status}</span></td>
                  <td style={{ padding: "14px 20px" }}>
                    <button style={{
                      background: "transparent", border: "1px solid #e2e8f0",
                      borderRadius: "6px", padding: "5px 12px", fontSize: "12px",
                      cursor: "pointer", color: "#475569",
                    }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
