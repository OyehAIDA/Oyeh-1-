"use client";

import { useState } from "react";

export default function Home() {
  const [a, setA] = useState("10");
  const [b, setB] = useState("5");
  const [op, setOp] = useState("+");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isUnary = op === "sqrt" || op === "pow2";

  async function onCalculate(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a, b, op }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setResult(data.result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#0b1220" }}>
      <div style={{ width: "100%", maxWidth: 560, background: "white", borderRadius: 16, padding: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}>
        <h1 style={{ margin: 0, fontSize: 22 }}>Simple Calculator</h1>
        <p style={{ marginTop: 8, marginBottom: 16, color: "#555", lineHeight: 1.4 }}>
          Single app: Next.js UI + API route (<code>/api/calc</code>)
        </p>

        <form onSubmit={onCalculate} style={{ display: "grid", gridTemplateColumns: "1fr 160px 1fr", gap: 10, alignItems: "end" }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 12, color: "#444" }}>A</span>
            <input value={a} onChange={(e) => setA(e.target.value)} inputMode="decimal"
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 12, color: "#444" }}>Operation</span>
            <select value={op} onChange={(e) => setOp(e.target.value)}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd", background: "white" }}>
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">*</option>
              <option value="/">/</option>
              <option value="sqrt">√ (square root)</option>
              <option value="pow2">x² (square)</option>
            </select>
          </label>

          <label style={{ display: "grid", gap: 6, opacity: isUnary ? 0.5 : 1 }}>
            <span style={{ fontSize: 12, color: "#444" }}>B</span>
            <input
              value={b}
              onChange={(e) => setB(e.target.value)}
              inputMode="decimal"
              disabled={isUnary}
              placeholder={isUnary ? "Not used" : ""}
              style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
            />
          </label>

          <button type="submit" disabled={loading}
            style={{ gridColumn: "1 / -1", marginTop: 10, padding: 12, borderRadius: 12, border: 0, background: "#2563eb", color: "white", fontWeight: 600, cursor: "pointer" }}>
            {loading ? "Calculating..." : "Calculate"}
          </button>
        </form>

        <div style={{ marginTop: 14 }}>
          {error && <div style={{ padding: 12, borderRadius: 12, background: "#fee2e2", color: "#991b1b" }}>{error}</div>}
          {result !== null && <div style={{ padding: 12, borderRadius: 12, background: "#dcfce7", color: "#166534" }}>
            Result: <strong>{String(result)}</strong>
          </div>}
        </div>

        <div style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
          Tip: For √ and x², only <strong>A</strong> is used.
        </div>
      </div>
    </main>
  );
}
