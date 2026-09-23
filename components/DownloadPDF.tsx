"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, FileText } from "lucide-react";
import { cartaPages, formatCLP, type CartaPageData } from "@/lib/menu-data";

/* ─────────────────────────────────────────────────────────────
   Genera el PDF usando @react-pdf/renderer (sin DOM capture)
   ───────────────────────────────────────────────────────────── */

async function buildAndDownloadPDF() {
  /* Importación dinámica para evitar SSR */
  const {
    Document,
    Page,
    View,
    Text,
    Image,
    StyleSheet,
    pdf,
    Font,
  } = await import("@react-pdf/renderer");
  const { createElement: h } = await import("react");

  /* ── Registrar fuentes ─────────────────────────────────── */
  Font.register({
    family: "PlayfairDisplay",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.woff2",
        fontWeight: 400,
      },
      {
        src: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd3vUDQ.woff2",
        fontWeight: 700,
      },
    ],
  });
  Font.register({
    family: "CormorantGaramond",
    src: "https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2",
    fontStyle: "italic",
  });

  /* ── Colores ───────────────────────────────────────────── */
  const C = {
    parchment: "#f5edd8",
    border:    "#c8a96e",
    ink:       "#2c1810",
    terracota: "#c4622d",
    teal:      "#3d7a72",
    magenta:   "#9b2d7a",
    gold:      "#b8860b",
    white:     "#ffffff",
  } as const;

  const sectionColor = (c?: string) => {
    if (c === "teal")    return C.teal;
    if (c === "magenta") return C.magenta;
    if (c === "gold")    return C.gold;
    return C.terracota;
  };

  /* ── Estilos ───────────────────────────────────────────── */
  const S = StyleSheet.create({
    page: {
      backgroundColor: C.parchment,
      paddingTop:    28,
      paddingBottom: 22,
      paddingLeft:   24,
      paddingRight:  24,
      fontFamily:    "PlayfairDisplay",
    },
    outerBorder: {
      position:    "absolute",
      top:         10,
      left:        10,
      right:       10,
      bottom:      10,
      borderWidth: 1,
      borderColor: C.border,
      borderStyle: "solid",
    },
    innerBorder: {
      position:    "absolute",
      top:         14,
      left:        14,
      right:       14,
      bottom:      14,
      borderWidth: 0.5,
      borderColor: C.border,
      borderStyle: "solid",
    },
    header: {
      flexDirection: "row",
      alignItems:    "center",
      justifyContent: "center",
      marginBottom:  10,
      gap:           12,
    },
    logoOval: {
      width:        44,
      height:       44,
      borderRadius: 22,
      borderWidth:  1.5,
      borderColor:  C.border,
      overflow:     "hidden",
      backgroundColor: C.parchment,
      alignItems:   "center",
      justifyContent: "center",
    },
    logoImg: {
      width:  38,
      height: 38,
    },
    headerCenter: {
      alignItems: "center",
    },
    titleText: {
      fontSize:      22,
      fontWeight:    700,
      color:         C.ink,
      letterSpacing: 6,
      fontFamily:    "PlayfairDisplay",
    },
    subtitleText: {
      fontSize:      9,
      color:         C.border,
      letterSpacing: 3,
      marginTop:     2,
      fontFamily:    "PlayfairDisplay",
    },
    divider: {
      height:          0.5,
      backgroundColor: C.border,
      marginVertical:  6,
    },
    columnsRow: {
      flexDirection: "row",
      gap:           12,
      flex:          1,
    },
    column: {
      flex: 1,
    },
    sectionHeader: {
      paddingVertical:   5,
      paddingHorizontal: 10,
      marginBottom:      6,
      marginTop:         4,
    },
    sectionHeaderText: {
      fontSize:      11,
      fontWeight:    700,
      color:         C.white,
      letterSpacing: 2,
      textTransform: "uppercase",
      fontFamily:    "PlayfairDisplay",
    },
    itemRow: {
      flexDirection: "row",
      alignItems:    "flex-end",
      marginBottom:  3,
    },
    itemName: {
      fontSize:   10,
      color:      C.ink,
      fontFamily: "PlayfairDisplay",
      fontWeight: 400,
    },
    itemNameBold: {
      fontSize:   10,
      color:      C.ink,
      fontFamily: "PlayfairDisplay",
      fontWeight: 700,
    },
    itemDots: {
      flex:            1,
      borderBottomWidth: 0.5,
      borderBottomColor: C.border,
      borderBottomStyle: "dotted",
      marginHorizontal: 3,
      marginBottom:    2,
    },
    itemPrice: {
      fontSize:   10,
      color:      C.ink,
      fontFamily: "PlayfairDisplay",
    },
    itemDesc: {
      fontSize:   8,
      color:      "#7a6a50",
      fontStyle:  "italic",
      marginBottom: 2,
      fontFamily: "PlayfairDisplay",
    },
    reservaBox: {
      borderWidth:  0.5,
      borderColor:  C.border,
      borderStyle:  "solid",
      padding:      8,
      marginTop:    10,
      alignItems:   "center",
    },
    reservaTitle: {
      fontSize:      10,
      fontWeight:    700,
      color:         C.terracota,
      letterSpacing: 3,
      fontFamily:    "PlayfairDisplay",
    },
    reservaText: {
      fontSize:   8,
      color:      C.ink,
      marginTop:  3,
      fontFamily: "PlayfairDisplay",
    },
    pageNum: {
      position:  "absolute",
      bottom:    18,
      right:     28,
      fontSize:  8,
      color:     C.border,
      fontFamily: "PlayfairDisplay",
    },
  });

  /* ── Componentes internos ──────────────────────────────── */
  const SectionBlock = ({ section }: { section: CartaPageData["sections"][0] }) =>
    h(View, { style: { marginBottom: 6 } },
      h(View, { style: { ...S.sectionHeader, backgroundColor: sectionColor(section.color) } },
        h(Text, { style: S.sectionHeaderText }, section.title)
      ),
      ...section.items.map((item, idx) =>
        h(View, { key: idx },
          h(View, { style: S.itemRow },
            h(Text, { style: item.bold ? S.itemNameBold : S.itemName }, item.name),
            h(View, { style: S.itemDots }),
            h(Text, { style: S.itemPrice },
              item.price > 0 ? formatCLP(item.price) : "—"
            )
          ),
          item.desc
            ? h(Text, { style: S.itemDesc }, item.desc)
            : null
        )
      )
    );

  const CartaPagePDF = ({ data }: { data: CartaPageData }) => {
    const cols = data.sections.length > 2 ? 2 : 1;
    const half = Math.ceil(data.sections.length / 2);
    const leftSections  = cols === 2 ? data.sections.slice(0, half) : data.sections;
    const rightSections = cols === 2 ? data.sections.slice(half)    : [];

    return h(Page, { size: "A4", style: S.page },
      /* Bordes decorativos */
      h(View, { style: S.outerBorder }),
      h(View, { style: S.innerBorder }),

      /* Header */
      h(View, { style: S.header },
        h(View, { style: S.logoOval },
          h(Image, { style: S.logoImg, src: "/logo-tinku.svg" })
        ),
        h(View, { style: S.headerCenter },
          h(Text, { style: S.titleText }, "TINKU"),
          h(Text, { style: S.subtitleText }, "BAR & RESTAURANT · TINKUBAR.CL")
        ),
        h(View, { style: S.logoOval },
          h(Image, { style: S.logoImg, src: "/logo-tinku.svg" })
        )
      ),

      h(View, { style: S.divider }),

      /* Columnas */
      h(View, { style: S.columnsRow },
        h(View, { style: S.column },
          ...leftSections.map((sec, i) => h(SectionBlock, { key: i, section: sec }))
        ),
        cols === 2
          ? h(View, { style: S.column },
              ...rightSections.map((sec, i) => h(SectionBlock, { key: i, section: sec }))
            )
          : null
      ),

      /* Reserva */
      h(View, { style: S.reservaBox },
        h(Text, { style: S.reservaTitle }, "RESERVA"),
        h(Text, { style: S.reservaText }, data.reservaText ?? "Reserva al +56 9 XXXX XXXX · tinkubar.cl")
      ),

      /* Número de página */
      h(Text, { style: S.pageNum }, `${data.pageNumber} / ${cartaPages.length}`)
    );
  };

  /* ── Documento completo ────────────────────────────────── */
  const MyDoc = h(Document, { title: "Tinkubar — Carta Completa" },
    ...cartaPages.map((page) => h(CartaPagePDF, { key: page.id, data: page }))
  );

  /* ── Generar y descargar ───────────────────────────────── */
  const blob = await pdf(MyDoc).toBlob();
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "tinkubar-carta-completa.pdf";
  a.click();
  URL.revokeObjectURL(url);
}

/* ─────────────────────────────────────────────────────────────
   Componente botón
   ───────────────────────────────────────────────────────────── */
export default function DownloadPDF() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await buildAndDownloadPDF();
    } catch (err) {
      console.error("Error generando PDF:", err);
      alert("Error al generar el PDF. Intenta con el botón Imprimir.");
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
          <span>Generando PDF…</span>
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
