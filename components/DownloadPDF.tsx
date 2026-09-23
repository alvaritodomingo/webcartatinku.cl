"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, FileText } from "lucide-react";

interface DownloadPDFProps {
  targetId?: string;
}

/* ─── Botón de descarga PDF con html2canvas + jsPDF ─────── */
export default function DownloadPDF({ targetId = "carta-completa" }: DownloadPDFProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      /* Importación dinámica para evitar SSR */
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF        = (await import("jspdf")).default;

      const container = document.getElementById(targetId);
      if (!container) {
        console.error("No se encontró el contenedor:", targetId);
        setLoading(false);
        return;
      }

      /* Obtener todas las páginas */
      const pages = container.querySelectorAll<HTMLElement>("[data-carta-page]");
      if (pages.length === 0) {
        console.error("No se encontraron páginas de carta");
        setLoading(false);
        return;
      }

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        const canvas = await html2canvas(page, {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            backgroundColor: "#f5edd8",
            logging: false,
            imageTimeout: 0,
            removeContainer: true,
            ignoreElements: (el) => {
              // Ignorar elementos SVG con dimensiones 0
              if (el instanceof SVGElement) return false;
              const w = (el as HTMLElement).offsetWidth;
              const h = (el as HTMLElement).offsetHeight;
              return w === 0 && h === 0;
            },
          });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        const pdfWidth  = 210;
        const pdfHeight = 297;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save("tinkubar-carta.pdf");
    } catch (err) {
      console.error("Error generando PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleDownload}
      disabled={loading}
      whileHover={!loading ? { scale: 1.04, boxShadow: "0 12px 40px rgba(196,98,45,0.5)" } : {}}
      whileTap={!loading ? { scale: 0.97 } : {}}
      className="no-print flex items-center gap-2.5 px-6 py-3 rounded-sm text-white font-[family-name:var(--font-playfair)] text-sm tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
      style={{
        background: loading
          ? "linear-gradient(135deg, #8a7a5a, #6a5a3a)"
          : "linear-gradient(135deg, #c4622d, #a8501e)",
        boxShadow: "0 6px 24px rgba(196,98,45,0.35)",
      }}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Generando PDF…
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Descargar Carta PDF
        </>
      )}
    </motion.button>
  );
}

/* ─── Botón secundario de impresión ─────────────────────── */
export function PrintButton() {
  return (
    <motion.button
      onClick={() => window.print()}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="no-print flex items-center gap-2.5 px-5 py-3 rounded-sm font-[family-name:var(--font-playfair)] text-sm tracking-widest uppercase transition-all duration-200"
      style={{
        border: "1px solid #c8a96e",
        color: "#c8a96e",
        background: "transparent",
      }}
    >
      <FileText className="w-4 h-4" />
      Imprimir
    </motion.button>
  );
}
