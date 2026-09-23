"use client";

import type { CartaPageData, CartaSubSection } from "@/lib/menu-data";
import SectionHeader from "./SectionHeader";
import CartaItem from "./CartaItem";
import ReservaBox from "./ReservaBox";

interface CartaPageProps {
  page: CartaPageData;
  pageRef?: React.RefObject<HTMLDivElement | null>;
}

/* ─── Logo real Tinkubar desde archivo SVG público ──────── */
function TinkuLogo({ size = 64 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "1.5px solid #c8a96e",
        background: "rgba(255,255,255,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
        padding: "4px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-tinku.svg"
        alt="Logo Tinkubar"
        width={size}
        height={size}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: "brightness(0.15) sepia(1) hue-rotate(10deg) saturate(3)",
        }}
      />
    </div>
  );
}

/* ─── Ornamento de esquina SVG ───────────────────────────── */
function CornerFlower({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="28"
      height="28"
      style={{ transform: flip ? "scaleX(-1)" : undefined, opacity: 0.45 }}
      fill="#b8860b"
    >
      <circle cx="16" cy="16" r="3" />
      <ellipse cx="16" cy="8"  rx="2.5" ry="5" />
      <ellipse cx="16" cy="24" rx="2.5" ry="5" />
      <ellipse cx="8"  cy="16" rx="5" ry="2.5" />
      <ellipse cx="24" cy="16" rx="5" ry="2.5" />
      <ellipse cx="10" cy="10" rx="2" ry="4" transform="rotate(-45 10 10)" />
      <ellipse cx="22" cy="10" rx="2" ry="4" transform="rotate(45 22 10)" />
      <ellipse cx="10" cy="22" rx="2" ry="4" transform="rotate(45 10 22)" />
      <ellipse cx="22" cy="22" rx="2" ry="4" transform="rotate(-45 22 22)" />
    </svg>
  );
}

/* ─── Patrón andino de fondo ─────────────────────────────── */
const ANDEAN_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23c8a96e' fill-opacity='0.13'%3E%3Cpath d='M0 0h4v4H0zm8 0h4v4H8zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zM4 4h4v4H4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zM0 8h4v4H0zm16 0h4v4h-4zm16 0h4v4h-4zM4 12h4v4H4zm8 0h4v4h-4zm16 0h4v4h-4zM0 16h4v4H0zm8 8h4v4H8zm16-8h4v4h-4zM4 20h4v4H4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zM0 24h4v4H0zm8 0h4v4H8zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zM4 28h4v4H4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zM0 32h4v4H0zm8 0h4v4H8zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zM4 36h4v4H4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4z'/%3E%3C/g%3E%3C/svg%3E")`;

/* ─── Columna de secciones ───────────────────────────────── */
function SectionColumn({ sections }: { sections: CartaSubSection[] }) {
  return (
    <div className="flex flex-col gap-3 h-full">
      {sections.map((sec, i) => (
        <div key={i} className="flex flex-col">
          <SectionHeader title={sec.title} color={sec.color ?? "terracota"} />
          <div className="flex flex-col">
            {sec.items.map((item, j) => (
              <CartaItem key={j} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Página A4 individual de la carta ───────────────────── */
export default function CartaPage({ page, pageRef }: CartaPageProps) {
  /* Dividir secciones en 1 o 2 columnas según cantidad */
  const half = Math.ceil(page.sections.length / 2);
  const useColumns = page.sections.length > 2;
  const leftSections  = useColumns ? page.sections.slice(0, half) : page.sections;
  const rightSections = useColumns ? page.sections.slice(half)    : [];

  return (
    <div
      ref={pageRef}
      id={page.id}
      data-carta-page="true"
      className="carta-page andean-pattern animate-page"
      style={{
        width: "210mm",
        minHeight: "297mm",
        position: "relative",
        backgroundColor: "#f5edd8",
        backgroundImage: ANDEAN_PATTERN,
        padding: "16mm 14mm 12mm",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Borde doble decorativo */}
      <div
        style={{
          position: "absolute",
          inset: "6px",
          border: "1px solid #c8a96e",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "9px",
          border: "0.5px solid #dfc090",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Ornamentos de esquina */}
      <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 3 }}>
        <CornerFlower />
      </div>
      <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 3 }}>
        <CornerFlower flip />
      </div>

      {/* ── HEADER: Logo + Nombre ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "10px",
          paddingBottom: "8px",
          borderBottom: "0.5px solid #c8a96e",
        }}
      >
        <TinkuLogo size={76} />
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "30px",
              fontWeight: 700,
              color: "#2a2015",
              letterSpacing: "0.2em",
              lineHeight: 1,
            }}
          >
            TINKU
          </div>
          <div
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "14px",
              color: "#8a7a5a",
              letterSpacing: "0.25em",
              fontStyle: "italic",
              marginTop: "3px",
            }}
          >
            Restaurante & Café
          </div>
          <div
            style={{
              fontFamily: "var(--font-lato), sans-serif",
              fontSize: "9px",
              color: "#b8a080",
              letterSpacing: "0.2em",
              marginTop: "3px",
              textTransform: "uppercase",
            }}
          >
            tinkubar.cl
          </div>
        </div>
        <TinkuLogo size={76} />
      </div>

      {/* Línea ornamental bajo header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "10px",
        }}
      >
        <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, #c8a96e)" }} />
        <span style={{ color: "#c8a96e", fontSize: "8px" }}>✦</span>
        <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, #c8a96e)" }} />
      </div>

      {/* ── CONTENIDO: Columnas de secciones ── */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: useColumns ? "1fr 1fr" : "1fr",
          gap: "12px",
          alignItems: "start",
        }}
      >
        <SectionColumn sections={leftSections} />
        {useColumns && rightSections.length > 0 && (
          <SectionColumn sections={rightSections} />
        )}
      </div>

      {/* ── FOOTER: Reserva ── */}
      <div style={{ marginTop: "auto", paddingTop: "8px" }}>
        {/* Línea ornamental */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "6px",
          }}
        >
          <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to right, transparent, #c8a96e)" }} />
          <span style={{ color: "#c8a96e", fontSize: "8px" }}>✦</span>
          <div style={{ flex: 1, height: "0.5px", background: "linear-gradient(to left, transparent, #c8a96e)" }} />
        </div>
        <ReservaBox text={page.reservaText} />
      </div>

      {/* Número de página */}
      <div
        style={{
          position: "absolute",
          bottom: "14px",
          right: "18px",
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "8px",
          color: "#b8a080",
          fontStyle: "italic",
        }}
      >
        {page.pageNumber}
      </div>
    </div>
  );
}
