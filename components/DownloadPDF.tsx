"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, FileText } from "lucide-react";
import { cartaPages } from "@/lib/menu-data";

/* ─── Botón de descarga PDF con html2canvas + jsPDF ─────── */
export default function DownloadPDF() {
  const [loading, setLoading]   = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    setLoading(true);
    setProgress(0);

    try {
      /* Importación dinámica — evita SSR */
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      /* Buscar páginas por data-carta-page en el DOM */
      const pageEls = Array.from(
        document.querySelectorAll<HTMLElement>("[data-carta-page='true']")
      );

      /* Fallback: buscar por IDs de las páginas */
      const elements: HTMLElement[] = pageEls.length > 0
        ? pageEls
        : cartaPages
            .map((p) => document.getElementById(p.id))
            .filter((el): el is HTMLElement => el !== null);

      if (elements.length === 0) {
        alert("No se encontraron páginas para generar el PDF. Intenta de nuevo.");
        setLoading(false);
        return;
      }

      const pdf = new jsPDF({
        orientation: "portrait",
        unit:        "mm",
        format:      "a4",
        compress:    true,
      });

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        setProgress(Math.round(((i + 1) / elements.length) * 100));

        /* Forzar dimensiones explícitas para evitar canvas 0x0 */
        const w = el.scrollWidth  || el.offsetWidth  || 794;
        const h = el.scrollHeight || el.offsetHeight || 1123;

        const canvas = await html2canvas(el, {
          scale:           2,
          useCORS:         true,
          allowTaint:      false,
          backgroundColor: "#f5edd8",
          logging:         false,
          imageTimeout:    0,
          width:           w,
          height:          h,
          windowWidth:     w,
          windowHeight:    h,
          x:               0,
          y:               0,
          scrollX:         0,
          scrollY:         0,
          ignoreElements:  (node) => {
            if (node.tagName === "SCRIPT" || node.tagName === "STYLE") return true;
            const el = node as HTMLElement;
            return !!(el.offsetWidth === 0 && el.offsetHeight === 0 && !el.querySelector("svg"));
          },
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      }

      pdf.save("tinkubar-carta-completa.pdf");
    } catch (err) {
      console.error("Error generando PDF:", err);
      alert("Hubo un error al generar el PDF. Intenta usar el botón Imprimir.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <motion.button
      onClick={handleDownload}
      disabled={loading}
      whileHover={!loading ? { scale: 1.04, boxShadow: "0 12px 40px rgba(196,98,45,0.5)" } : {}}
      whileTap={!loading ? { scale: 0.97 } : {}}
      className="no-print flex items-center gap-2.5 px-6 py-3 rounded-sm text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
      style={{
        background: loading
          ? "linear-gradient(135deg, #8a7a5a, #6a5a3a)"
          : "linear-gradient(135deg, #c4622d, #a8501e)",
        boxShadow:  "0 6px 24px rgba(196,98,45,0.35)",
        fontFamily: "var(--font-playfair), serif",
        fontSize:   "12px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
          <span>{progress > 0 ? `Generando ${progress}%…` : "Preparando…"}</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4 flex-shrink-0" />
          <span>Descargar PDF</span>
        </>
      )}
    </motion.button>
  );
}

/* ─── Botón de impresión ─────────────────────────────────── */
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
