"use client";

interface ReservaBoxProps {
  text?: string;
  compact?: boolean;
}

/* ─── Caja de reserva al pie de cada página ─────────────── */
export default function ReservaBox({ text, compact = false }: ReservaBoxProps) {
  return (
    <div
      className="mt-auto"
      style={{
        border: "1px solid #c8a96e",
        background: "rgba(255,255,255,0.35)",
        padding: compact ? "6px 10px" : "8px 12px",
        marginTop: "8px",
      }}
    >
      {/* Título RESERVA */}
      <div
        className="text-center uppercase tracking-[0.2em] mb-1"
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: compact ? "8px" : "9px",
          fontWeight: 700,
          color: "#c4622d",
          letterSpacing: "0.2em",
        }}
      >
        Reserva
      </div>

      {/* Línea decorativa */}
      <div
        className="w-full mb-1"
        style={{ height: "0.5px", background: "linear-gradient(to right, transparent, #c8a96e, transparent)" }}
      />

      {/* Texto de contacto */}
      <div
        className="text-center"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: compact ? "8px" : "9px",
          color: "#4a3a25",
          fontStyle: "italic",
          lineHeight: 1.4,
        }}
      >
        {text ?? "Al +56 9 XXXX XXXX · tinkubar.cl"}
      </div>

      {/* Segunda línea */}
      <div
        className="text-center mt-0.5"
        style={{
          fontFamily: "var(--font-lato), sans-serif",
          fontSize: "7.5px",
          color: "#8a7a5a",
          letterSpacing: "0.05em",
        }}
      >
        NESTA CTTCDINNDECA MENU, CURAR NERAIL
      </div>
    </div>
  );
}
