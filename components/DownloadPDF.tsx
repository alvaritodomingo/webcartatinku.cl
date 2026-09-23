"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, FileText } from "lucide-react";
import { cartaPages, formatCLP } from "@/lib/menu-data";

/* ─────────────────────────────────────────────────────────────
   Genera el HTML completo de la carta y lo abre en una ventana
   nueva lista para imprimir/guardar como PDF.
   Sin dependencias externas — usa el motor nativo del navegador.
   ───────────────────────────────────────────────────────────── */

const COLOR: Record<string, string> = {
  terracota: "#c4622d",
  teal:      "#3d7a72",
  magenta:   "#9b2d7a",
  gold:      "#b8860b",
};

function buildPrintHTML(): string {
  /* ── Andean SVG pattern (inline, sin fetch externo) ─────── */
  const andeanSVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><rect width='40' height='40' fill='none'/><path d='M0 20h10v-10h10v10h10v-10h10' stroke='%23c8a96e' stroke-width='0.4' fill='none' opacity='0.18'/><path d='M0 30h5v-5h5v5h5v-5h5v5h5v-5h5v5h5v-5h5' stroke='%23c8a96e' stroke-width='0.3' fill='none' opacity='0.12'/></svg>`)}`;

  /* ── Generar páginas HTML ────────────────────────────────── */
  const pagesHTML = cartaPages.map((page) => {
    const sectionsHTML = page.sections.map((sec) => {
      const color = COLOR[sec.color ?? "terracota"] ?? COLOR.terracota;
      const itemsHTML = sec.items.map((item) => `
        <div class="item-wrap">
          <div class="item-row">
            <span class="item-name${item.bold ? " bold" : ""}">${item.name}</span>
            <span class="item-dots"></span>
            <span class="item-price">${item.price > 0 ? formatCLP(item.price) : "—"}</span>
          </div>
          ${item.desc ? `<div class="item-desc">${item.desc}</div>` : ""}
        </div>`).join("");

      return `
        <div class="section">
          <div class="section-header" style="background:${color}">
            <span>${sec.title.toUpperCase()}</span>
          </div>
          <div class="section-items">${itemsHTML}</div>
        </div>`;
    }).join("");

    /* Dividir secciones en 1 o 2 columnas */
    const cols = page.sections.length > 2 ? 2 : 1;
    const half = Math.ceil(page.sections.length / 2);
    const leftSecs  = page.sections.slice(0, cols === 2 ? half : page.sections.length);
    const rightSecs = cols === 2 ? page.sections.slice(half) : [];

    const leftHTML  = leftSecs.map((sec) => {
      const color = COLOR[sec.color ?? "terracota"] ?? COLOR.terracota;
      const itemsHTML = sec.items.map((item) => `
        <div class="item-wrap">
          <div class="item-row">
            <span class="item-name${item.bold ? " bold" : ""}">${item.name}</span>
            <span class="item-dots"></span>
            <span class="item-price">${item.price > 0 ? formatCLP(item.price) : "—"}</span>
          </div>
          ${item.desc ? `<div class="item-desc">${item.desc}</div>` : ""}
        </div>`).join("");
      return `<div class="section"><div class="section-header" style="background:${color}"><span>${sec.title.toUpperCase()}</span></div><div class="section-items">${itemsHTML}</div></div>`;
    }).join("");

    const rightHTML = rightSecs.map((sec) => {
      const color = COLOR[sec.color ?? "terracota"] ?? COLOR.terracota;
      const itemsHTML = sec.items.map((item) => `
        <div class="item-wrap">
          <div class="item-row">
            <span class="item-name${item.bold ? " bold" : ""}">${item.name}</span>
            <span class="item-dots"></span>
            <span class="item-price">${item.price > 0 ? formatCLP(item.price) : "—"}</span>
          </div>
          ${item.desc ? `<div class="item-desc">${item.desc}</div>` : ""}
        </div>`).join("");
      return `<div class="section"><div class="section-header" style="background:${color}"><span>${sec.title.toUpperCase()}</span></div><div class="section-items">${itemsHTML}</div></div>`;
    }).join("");

    return `
      <div class="carta-page">
        <!-- Bordes decorativos -->
        <div class="border-outer"></div>
        <div class="border-inner"></div>

        <!-- Header -->
        <div class="page-header">
          <div class="logo-oval">
            <img src="/logo-tinku.svg" alt="Tinku" />
          </div>
          <div class="header-center">
            <div class="title-main">TINKU</div>
            <div class="title-sub">BAR &amp; RESTAURANT · TINKUBAR.CL</div>
          </div>
          <div class="logo-oval">
            <img src="/logo-tinku.svg" alt="Tinku" />
          </div>
        </div>

        <div class="divider"></div>

        <!-- Contenido -->
        <div class="content-cols" style="columns:${cols}">
          ${cols === 1 ? leftHTML : `
            <div class="col">${leftHTML}</div>
            <div class="col">${rightHTML}</div>
          `}
        </div>

        <!-- Reserva -->
        <div class="reserva-box">
          <div class="reserva-title">RESERVA</div>
          <div class="reserva-text">${page.reservaText ?? "Reserva al +56 9 XXXX XXXX · tinkubar.cl"}</div>
        </div>

        <!-- Número de página -->
        <div class="page-num">${page.pageNumber} / ${cartaPages.length}</div>
      </div>`;
  }).join("\n");

  /* ── HTML completo ──────────────────────────────────────── */
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tinkubar — Carta Completa</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #1a1208;
      font-family: 'Playfair Display', Georgia, serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ── Página A4 ── */
    .carta-page {
      position: relative;
      width: 210mm;
      min-height: 297mm;
      background-color: #f5edd8;
      background-image: url("${andeanSVG}");
      background-repeat: repeat;
      padding: 18mm 16mm 14mm;
      margin: 20px auto;
      page-break-after: always;
      overflow: hidden;
    }

    /* Bordes decorativos */
    .border-outer {
      position: absolute; inset: 8px;
      border: 1px solid #c8a96e;
      pointer-events: none;
    }
    .border-inner {
      position: absolute; inset: 12px;
      border: 0.5px solid #c8a96e;
      pointer-events: none;
    }

    /* Header */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      margin-bottom: 10px;
    }
    .logo-oval {
      width: 52px; height: 52px;
      border-radius: 50%;
      border: 1.5px solid #c8a96e;
      overflow: hidden;
      background: #f5edd8;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .logo-oval img { width: 44px; height: 44px; object-fit: contain; }
    .header-center { text-align: center; }
    .title-main {
      font-family: 'Playfair Display', serif;
      font-size: 26px; font-weight: 700;
      letter-spacing: 8px; color: #2c1810;
    }
    .title-sub {
      font-family: 'Playfair Display', serif;
      font-size: 9px; letter-spacing: 3px;
      color: #c8a96e; margin-top: 3px;
    }

    /* Divisor */
    .divider {
      height: 0.5px; background: #c8a96e;
      margin: 6px 0 10px;
    }

    /* Columnas */
    .content-cols {
      display: flex;
      gap: 14px;
      flex: 1;
    }
    .col { flex: 1; min-width: 0; }

    /* Sección */
    .section { margin-bottom: 8px; }
    .section-header {
      padding: 5px 12px;
      margin-bottom: 5px;
    }
    .section-header span {
      font-family: 'Playfair Display', serif;
      font-size: 11px; font-weight: 700;
      letter-spacing: 2px; color: #ffffff;
      text-transform: uppercase;
    }

    /* Items */
    .item-wrap { margin-bottom: 3px; }
    .item-row {
      display: flex;
      align-items: flex-end;
      gap: 0;
    }
    .item-name {
      font-family: 'Playfair Display', serif;
      font-size: 11px; color: #2c1810;
      white-space: nowrap;
    }
    .item-name.bold { font-weight: 700; }
    .item-dots {
      flex: 1;
      border-bottom: 0.5px dotted #c8a96e;
      margin: 0 3px 2px;
      min-width: 8px;
    }
    .item-price {
      font-family: 'Playfair Display', serif;
      font-size: 11px; color: #2c1810;
      white-space: nowrap;
    }
    .item-desc {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 9px; font-style: italic;
      color: #7a6a50; margin-bottom: 1px;
      padding-left: 2px;
    }

    /* Reserva */
    .reserva-box {
      border: 0.5px solid #c8a96e;
      padding: 8px 12px;
      margin-top: 12px;
      text-align: center;
    }
    .reserva-title {
      font-family: 'Playfair Display', serif;
      font-size: 11px; font-weight: 700;
      letter-spacing: 3px; color: #c4622d;
    }
    .reserva-text {
      font-family: 'Playfair Display', serif;
      font-size: 9px; color: #2c1810; margin-top: 3px;
    }

    /* Número de página */
    .page-num {
      position: absolute; bottom: 18px; right: 22px;
      font-family: 'Playfair Display', serif;
      font-size: 8px; color: #c8a96e;
    }

    /* ── Print ── */
    @media print {
      body { background: white; }
      .carta-page {
        margin: 0;
        width: 210mm;
        min-height: 297mm;
        page-break-after: always;
        break-after: page;
      }
    }

    /* ── Botón imprimir (solo en pantalla) ── */
    .print-bar {
      position: fixed; top: 0; left: 0; right: 0;
      background: rgba(26,18,8,0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(200,169,110,0.3);
      padding: 10px 20px;
      display: flex; align-items: center; justify-content: space-between;
      z-index: 9999;
    }
    .print-bar-title {
      font-family: 'Playfair Display', serif;
      font-size: 14px; font-weight: 700;
      letter-spacing: 4px; color: #d4a017;
    }
    .print-bar-sub {
      font-family: 'Playfair Display', serif;
      font-size: 10px; color: #8a7a5a; margin-top: 2px;
    }
    .btn-print {
      background: linear-gradient(135deg, #c4622d, #a8501e);
      color: white; border: none; cursor: pointer;
      padding: 10px 24px; border-radius: 2px;
      font-family: 'Playfair Display', serif;
      font-size: 12px; letter-spacing: 2px;
      text-transform: uppercase;
      box-shadow: 0 4px 16px rgba(196,98,45,0.4);
    }
    .btn-print:hover { background: linear-gradient(135deg, #d4722d, #b8601e); }
    .spacer { height: 60px; }

    @media print {
      .print-bar, .spacer { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <div>
      <div class="print-bar-title">TINKUBAR</div>
      <div class="print-bar-sub">Carta Completa · ${cartaPages.length} páginas · Guardar como PDF → Destino: "Guardar como PDF"</div>
    </div>
    <button class="btn-print" onclick="window.print()">⬇ Guardar PDF</button>
  </div>
  <div class="spacer"></div>

  ${pagesHTML}

  <script>
    // Auto-trigger print dialog después de que las fuentes carguen
    document.fonts.ready.then(() => {
      setTimeout(() => window.print(), 800);
    });
  </script>
</body>
</html>`;
}

/* ─────────────────────────────────────────────────────────────
   Componente botón — abre ventana de impresión
   ───────────────────────────────────────────────────────────── */
export default function DownloadPDF() {
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    setLoading(true);
    try {
      const html = buildPrintHTML();
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url  = URL.createObjectURL(blob);
      const win  = window.open(url, "_blank", "width=900,height=800,scrollbars=yes");
      if (!win) {
        /* Fallback si el popup fue bloqueado: descarga el HTML */
        const a    = document.createElement("a");
        a.href     = url;
        a.download = "tinkubar-carta.html";
        a.click();
      }
      /* Liberar URL después de 60s */
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (err) {
      console.error("Error al exportar:", err);
      alert("Error al exportar. Intenta con el botón Imprimir.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleExport}
      disabled={loading}
      whileHover={!loading ? { scale: 1.04, boxShadow: "0 12px 40px rgba(196,98,45,0.5)" } : {}}
      whileTap={!loading ? { scale: 0.97 } : {}}
      className="no-print flex items-center gap-2.5 px-6 py-3 rounded-sm text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
      style={{
        background:    loading
          ? "linear-gradient(135deg, #8a7a5a, #6a5a3a)"
          : "linear-gradient(135deg, #c4622d, #a8501e)",
        boxShadow:     "0 6px 24px rgba(196,98,45,0.35)",
        fontFamily:    "var(--font-playfair), serif",
        fontSize:      "12px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
          <span>Preparando…</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4 flex-shrink-0" />
          <span>Exportar PDF</span>
        </>
      )}
    </motion.button>
  );
}

/* ─── Botón de impresión directa ─────────────────────────── */
export function PrintButton() {
  return (
    <motion.button
      onClick={() => window.print()}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="no-print flex items-center gap-2 px-5 py-3 rounded-sm transition-all duration-200"
      style={{
        border:        "1px solid #c8a96e",
        color:         "#c8a96e",
        background:    "transparent",
        fontFamily:    "var(--font-playfair), serif",
        fontSize:      "12px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      <FileText className="w-4 h-4" />
      <span>Imprimir</span>
    </motion.button>
  );
}
