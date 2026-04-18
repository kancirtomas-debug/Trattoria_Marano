import Link from "next/link"

export default function MenuPreviewIndex() {
  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "2rem", fontFamily: "system-ui" }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#939084", marginBottom: 8 }}>Menu Layout Previews</p>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#201515", marginBottom: 24, letterSpacing: "-0.02em" }}>Choose a layout</h1>
      {[
        { n: 1, label: "Printed Menu", sub: "Editorial typography, no images, ruled lines" },
        { n: 2, label: "Photo Cards Grid", sub: "Large food photos, 3-column grid, hover overlays" },
        { n: 3, label: "Magazine Spread", sub: "Hero dish, asymmetric columns, editorial feel" },
      ].map(({ n, label, sub }) => (
        <Link
          key={n}
          href={`/menu-preview/${n}`}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            width: "100%", maxWidth: 520, padding: "1.25rem 1.5rem",
            background: "#fffefb", border: "1px solid #e0dcd2", borderRadius: 10,
            textDecoration: "none", transition: "border-color 160ms, box-shadow 160ms",
          }}
          onMouseEnter={undefined}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fffefb", background: "#6b1535", borderRadius: 4, padding: "2px 7px" }}>
                {n}
              </span>
              <span style={{ fontWeight: 600, color: "#201515", fontSize: "0.95rem" }}>{label}</span>
            </div>
            <p style={{ color: "#939084", fontSize: "0.8rem", marginTop: 4, paddingLeft: 36 }}>{sub}</p>
          </div>
          <span style={{ color: "#6b1535", fontSize: "1.2rem" }}>→</span>
        </Link>
      ))}
    </div>
  )
}
