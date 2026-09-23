"use client";

interface SectionHeaderProps {
  title: string;
  color?: "terracota" | "teal" | "magenta" | "gold";
  size?: "sm" | "md";
}

const COLOR_MAP = {
  terracota: "linear-gradient(135deg, #c4622d, #a8501e)",
  teal:      "linear-gradient(135deg, #3d7a72, #2d5e58)",
  magenta:   "linear-gradient(135deg, #9b2d7a, #7a1f5e)",
  gold:      "linear-gradient(135deg, #b8860b, #8b6508)",
};

/* ─── Encabezado de sección con rectángulo de color ─────── */
export default function SectionHeader({
  title,
  color = "terracota",
  size = "md",
}: SectionHeaderProps) {
  return (
    <div
      className="w-full text-center text-white tracking-[0.12em] uppercase"
      style={{
        background: COLOR_MAP[color],
        fontFamily: "var(--font-playfair), serif",
        fontWeight: 700,
        fontSize: size === "sm" ? "13px" : "15px",
        padding: size === "sm" ? "6px 14px" : "8px 18px",
        letterSpacing: "0.14em",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        marginBottom: "8px",
      }}
    >
      {title}
    </div>
  );
}
