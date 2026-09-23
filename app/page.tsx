"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cartaPages } from "@/lib/menu-data";
import CartaPage from "@/components/CartaPage";
import DownloadPDF, { PrintButton } from "@/components/DownloadPDF";
import ReservaFloat from "@/components/ReservaFloat";

/* ─── Página principal — Carta Digital Tinkubar ─────────── */
export default function Home() {
  const cartaRef = useRef<HTMLDivElement>(null);

  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #1a1208 0%, #2a2015 50%, #1a1208 100%)" }}
    >
      {/* ── HERO HEADER ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="no-print sticky top-0 z-50 px-6 py-3 flex items-center justify-between"
        style={{
          background: "rgba(26,18,8,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(200,169,110,0.2)",
        }}
      >
        {/* Logo compacto */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ border: "1px solid #c8a96e", background: "rgba(255,255,255,0.05)" }}
          >
            <svg viewBox="0 0 40 40" width="22" height="22" fill="none">
              <circle cx="13" cy="9" r="4" fill="#3d7a72" />
              <path d="M8 16 Q13 12 18 16 L19 28 Q13 31 7 28 Z" fill="#3d7a72" opacity="0.85" />
              <circle cx="27" cy="9" r="4" fill="#c4622d" />
              <path d="M22 16 Q27 12 32 16 L33 28 Q27 31 21 28 Z" fill="#c4622d" opacity="0.85" />
              <circle cx="20" cy="14" r="2" fill="#d4a017" opacity="0.9" />
            </svg>
          </div>
          <div>
            <span
              className="font-[family-name:var(--font-playfair)] font-bold tracking-widest"
              style={{ color: "#d4a017", fontSize: "16px" }}
            >
              TINKUBAR
            </span>
            <span
              className="font-[family-name:var(--font-cormorant)] italic ml-2"
              style={{ color: "#8a7a5a", fontSize: "11px" }}
            >
              Carta Digital
            </span>
          </div>
        </div>

        {/* Botones acción */}
        <div className="flex items-center gap-3">
          <PrintButton />
          <DownloadPDF targetId="carta-completa" />
        </div>
      </motion.header>

      {/* ── TÍTULO PRINCIPAL ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="no-print text-center py-10 px-4"
      >
        <h1
          className="font-[family-name:var(--font-playfair)] font-bold tracking-[0.2em] uppercase mb-2"
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            background: "linear-gradient(135deg, #b8860b 0%, #f0d060 40%, #b8860b 60%, #8b6508 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmerGold 4s linear infinite",
          }}
        >
          TINKUBAR
        </h1>
        <p
          className="font-[family-name:var(--font-cormorant)] italic"
          style={{ color: "#c8a96e", fontSize: "18px", letterSpacing: "0.15em" }}
        >
          Restaurante & Café — Carta Completa
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div style={{ flex: 1, maxWidth: "120px", height: "0.5px", background: "linear-gradient(to right, transparent, #c8a96e)" }} />
          <span style={{ color: "#c8a96e", fontSize: "12px" }}>✦</span>
          <div style={{ flex: 1, maxWidth: "120px", height: "0.5px", background: "linear-gradient(to left, transparent, #c8a96e)" }} />
        </div>
        <p
          className="font-[family-name:var(--font-lato)] mt-3"
          style={{ color: "#6a5a3a", fontSize: "12px", letterSpacing: "0.1em" }}
        >
          {cartaPages.length} páginas · Precios en CLP · IVA incluido
        </p>
      </motion.div>

      {/* ── GRILLA DE PÁGINAS A4 ── */}
      <div
        id="carta-completa"
        ref={cartaRef}
        className="px-4 pb-16"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 210mm)",
          gap: "24px",
          justifyContent: "center",
          maxWidth: "100%",
        }}
      >
        {cartaPages.map((page, index) => (
          <motion.div
            key={page.id}
            data-carta-page
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <CartaPage page={page} />
          </motion.div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="no-print text-center py-8 px-4"
        style={{ borderTop: "1px solid rgba(200,169,110,0.15)" }}
      >
        <p
          className="font-[family-name:var(--font-cormorant)] italic"
          style={{ color: "#6a5a3a", fontSize: "13px" }}
        >
          © {new Date().getFullYear()} Tinkubar.cl — Todos los derechos reservados
        </p>
        <p
          className="font-[family-name:var(--font-lato)] mt-1"
          style={{ color: "#4a3a25", fontSize: "11px", letterSpacing: "0.1em" }}
        >
          Precios en pesos chilenos (CLP) · IVA incluido · Carta sujeta a cambios sin previo aviso
        </p>
      </motion.footer>

      {/* Botón flotante de reserva */}
      <ReservaFloat />
    </main>
  );
}
