"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, FileText } from "lucide-react";
import { cartaPages, formatCLP } from "@/lib/menu-data";

const COLOR: Record<string, string> = {
  terracota: "#c4622d",
  teal:      "#3d7a72",
  magenta:   "#9b2d7a",
  gold:      "#b8860b",
};

/* ─────────────────────────────────────────────────────────────
   Genera el HTML completo con fondos forzados en impresión
   ───────────────────────────────────────────────────────────── */
async function buildPrintHTML(): Promise<string> {
  /* ── Logo como data-URI ─────────────────────────────────── */
  let logoDataURI = "";
  try {
    const res  = await fetch("/logo-tinku.svg");
    const text = await res.text();
    logoDataURI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(text)}`;
  } catch {
    logoDataURI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#c8a96e" stroke-width="2"/>
        <text x="50" y="58" text-anchor="middle" font-size="22" fill="#c8a96e" font-family="serif">T</text>
      </svg>`
    )}`;
  }

  /* ── Patrón andino como data-URI ────────────────────────── */
  const andeanPattern = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>
      <rect width='40' height='40' fill='#f5edd8'/>
      <path d='M0 20h10v-10h10v10h10v-10h10' stroke='%23c8a96e' stroke-width='0.5' fill='none' opacity='0.25'/>
      <path d='M0 30h5v-5h5v5h5v-5h5v5h5v-5h5v5h5v-5h5' stroke='%23c8a96e' stroke-width='0.4' fill='none' opacity='0.18'/>
      <path d='M0 10h5v5h5v-5h5v5h5v-5h5v5h5v-5h5' stroke='%23c8a96e' stroke-width='0.3' fill='none' opacity='0.15'/>
    </svg>`
  )}`;

  /* ── Helper: sección ────────────────────────────────────── */
  const sectionHTML = (sec: (typeof cartaPages)[0]["sections"][0]) => {
    const color = COLOR[sec.color ?? "terracota"] ?? COLOR.terracota;
    const items = sec.items.map((item) => `
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
        <div class="section-header" style="background-color:${color} !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; color-adjust:exact;">
          <span>${sec.title.toUpperCase()}</span>
        </div>
        ${items}
      </div>`;
  };

  /* ── Páginas ────────────────────────────────────────────── */
  const pagesHTML = cartaPages.map((page) => {
    const useTwoCols = page.sections.length > 2;
    const half       = Math.ceil(page.sections.length / 2);
    const leftSecs   = useTwoCols ? page.sections.slice(0, half) : page.sections;
    const rightSecs  = useTwoCols ? page.sections.slice(half)    : [];

    const leftHTML  = leftSecs.map(sectionHTML).join("");
    const rightHTML = rightSecs.map(sectionHTML).join("");

    const contentHTML = useTwoCols
      ? `<div class="cols"><div class="col">${leftHTML}</div><div class="col">${rightHTML}</div></div>`
      : `<div class="cols single"><div class="col">${leftHTML}</div></div>`;

    return `
      <div class="carta-page">
        <div class="border-outer"></div>
        <div class="border-inner"></div>

        <div class="page-header">
          <div class="logo-oval"><img src="${logoDataURI}" alt="Tinku" /></div>
          <div class="header-center">
            <div class="title-main">T I N K U</div>
            <div class="title-sub">BAR &amp; RESTAURANT · TINKUBAR.CL</div>
          </div>
          <div class="logo-oval"><img src="${logoDataURI}" alt="Tinku" /></div>
        </div>

        <div class="divider"></div>
        ${contentHTML}

        <div class="reserva-box">
          <div class="reserva-title">RESERVA</div>
          <div class="reserva-text">${page.reservaText ?? "Reserva al +56 9 XXXX XXXX · tinkubar.cl"}</div>
        </div>

        <div class="page-num">${page.pageNumber} / ${cartaPages.length}</div>
      </div>`;
  }).join("\n");

  /* ── CSS con fondos forzados ────────────────────────────── */
  const css = `
    *, *::before, *::after {
      box-sizing: border-box; margin: 0; padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    html, body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
      background: #2a1f0e;
      font-family: 'Playfair Display', Georgia, serif;
    }

    /* ── Barra superior ── */
    .print-bar {
      position: fixed; top: 0; left: 0; right: 0;
      background: rgba(26,18,8,0.97) !important;
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(200,169,110,0.35);
      padding: 12px 24px;
      display: flex; align-items: center; justify-content: space-between;
      z-index: 9999;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .print-bar-title { font-size: 15px; font-weight: 700; letter-spacing: 5px; color: #d4a017; }
    .print-bar-hint  { font-size: 10px; color: #8a7a5a; margin-top: 3px; letter-spacing: 1px; }
    .btn-print {
      background: linear-gradient(135deg, #c4622d, #a8501e) !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color: #fff; border: none; cursor: pointer;
      padding: 11px 28px; border-radius: 2px;
      font-family: 'Playfair Display', serif;
      font-size: 13px; letter-spacing: 2px; text-transform: uppercase;
      box-shadow: 0 4px 20px rgba(196,98,45,0.45);
    }
    .btn-print:hover { opacity: 0.9; }
    .spacer { height: 68px; }

    /* ── Página A4 ── */
    .carta-page {
      position: relative;
      width: 210mm;
      min-height: 297mm;
      background-color: #f5edd8 !important;
      background-image: url("${andeanPattern}") !important;
      background-repeat: repeat !important;
      background-size: 40px 40px !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
      padding: 20mm 18mm 16mm;
      margin: 24px auto;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Bordes decorativos */
    .border-outer {
      position: absolute; inset: 9px;
      border: 1px solid #c8a96e;
      pointer-events: none;
    }
    .border-inner {
      position: absolute; inset: 13px;
      border: 0.5px solid #c8a96e;
      pointer-events: none;
    }

    /* Header */
    .page-header {
      display: flex; align-items: center; justify-content: center;
      gap: 16px; margin-bottom: 10px; flex-shrink: 0;
    }
    .logo-oval {
      width: 60px; height: 60px; border-radius: 50%;
      border: 1.5px solid #c8a96e; overflow: hidden;
      background-color: #f5edd8 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .logo-oval img { width: 52px; height: 52px; object-fit: contain; }
    .header-center { text-align: center; }
    .title-main {
      font-size: 28px; font-weight: 700;
      letter-spacing: 6px; color: #2c1810;
    }
    .title-sub {
      font-size: 9.5px; letter-spacing: 3px;
      color: #c8a96e; margin-top: 4px; text-transform: uppercase;
    }

    /* Divisor */
    .divider {
      height: 0.5px;
      background-color: #c8a96e !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      margin: 8px 0 12px; flex-shrink: 0;
    }

    /* Columnas */
    .cols { display: flex; gap: 16px; flex: 1; }
    .cols.single .col { max-width: 100%; }
    .col { flex: 1; min-width: 0; }

    /* Sección */
    .section { margin-bottom: 10px; }
    .section-header {
      padding: 6px 14px; margin-bottom: 6px;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    .section-header span {
      font-size: 12px; font-weight: 700;
      letter-spacing: 2.5px; color: #fff !important; text-transform: uppercase;
    }

    /* Items */
    .item-wrap { margin-bottom: 4px; }
    .item-row { display: flex; align-items: flex-end; }
    .item-name {
      font-size: 12.5px; color: #2c1810; white-space: nowrap;
      font-family: 'Playfair Display', serif;
    }
    .item-name.bold { font-weight: 700; }
    .item-dots {
      flex: 1;
      border-bottom: 0.5px dotted #c8a96e;
      margin: 0 4px 2px; min-width: 10px;
    }
    .item-price {
      font-size: 12.5px; color: #2c1810; white-space: nowrap;
      font-family: 'Playfair Display', serif;
    }
    .item-desc {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 10px; font-style: italic;
      color: #7a6a50; padding-left: 2px; margin-bottom: 1px;
    }

    /* Reserva */
    .reserva-box {
      border: 0.5px solid #c8a96e;
      padding: 9px 14px; margin-top: 14px;
      text-align: center; flex-shrink: 0;
    }
    .reserva-title {
      font-size: 12px; font-weight: 700;
      letter-spacing: 4px; color: #c4622d !important;
    }
    .reserva-text { font-size: 10px; color: #2c1810; margin-top: 4px; }

    /* Número de página */
    .page-num {
      position: absolute; bottom: 18px; right: 22px;
      font-size: 9px; color: #c8a96e;
    }

    /* ── PRINT ── */
    @media print {
      html, body {
        background: white !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      .print-bar, .spacer { display: none !important; }
      .carta-page {
        margin: 0 !important;
        width: 210mm !important;
        min-height: 297mm !important;
        page-break-after: always !important;
        break-after: page !important;
        background-color: #f5edd8 !important;
        background-image: url("${andeanPattern}") !important;
        background-repeat: repeat !important;
        background-size: 40px 40px !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      .section-header {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      .logo-oval {
        background-color: #f5edd8 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .divider {
        background-color: #c8a96e !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Tinkubar — Carta Completa</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
  <style>${css}</style>
</head>
<body>
  <div class="print-bar">
    <div>
      <div class="print-bar-title">TINKUBAR — CARTA COMPLETA</div>
      <div class="print-bar-hint">
        Diálogo de impresión → Destino: "Guardar como PDF" · Márgenes: Ninguno · 
        ✅ Activar "Gráficos de fondo" / "Background graphics"
      </div>
    </div>
    <button class="btn-print" onclick="window.print()">⬇ Guardar como PDF</button>
  </div>
  <div class="spacer"></div>

  ${pagesHTML}

  <script>
    document.fonts.ready.then(function() {
      setTimeout(function() { window.print(); }, 1200);
    });
  </script>
</body>
</html>`;
}

/* ─────────────────────────────────────────────────────────────
   Botón exportar
   ───────────────────────────────────────────────────────────── */
export default function DownloadPDF() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const html = await buildPrintHTML();
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url  = URL.createObjectURL(blob);
      const win  = window.open(url, "_blank", "width=960,height=860,scrollbars=yes");
      if (!win) {
        const a    = document.createElement("a");
        a.href     = url;
        a.download = "tinkubar-carta.html";
        a.click();
      }
      setTimeout(() => URL.revokeObjectURL(url), 90_000);
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
          <span>Cargando…</span>
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
