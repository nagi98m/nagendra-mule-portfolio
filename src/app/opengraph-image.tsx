import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Nagendra Mule — Python Backend & Generative AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", background: "#080c12", color: "#eef5ff", fontFamily: "sans-serif" }}><div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, color: "#64e6d5" }}><div style={{ display: "flex", width: 54, height: 54, border: "1px solid #2cd4c0", alignItems: "center", justifyContent: "center", borderRadius: 14 }}>NM</div>Nagendra Mule</div><div style={{ display: "flex", flexDirection: "column", gap: 22 }}><div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 700, maxWidth: 980 }}>Python Backend &amp; Generative AI Engineer</div><div style={{ fontSize: 27, color: "#9cacbd" }}>Python · FastAPI · LangGraph · RAG · AWS</div></div></div>, size);
}
