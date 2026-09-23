"use client";

import type { CartaItem as CartaItemType } from "@/lib/menu-data";
import { formatCLP } from "@/lib/menu-data";

interface CartaItemProps {
  item: CartaItemType;
  compact?: boolean;
}

/* ─── Ítem individual de carta con puntos y precio ───────── */
export default function CartaItem({ item, compact = false }: CartaItemProps) {
  if (item.price === 0 && !item.desc) {
    return (
      <div className={`py-0.5 ${compact ? "text-[9px]" : "text-[10px]"}`}>
        <span
          className="font-[family-name:var(--font-playfair)] text-[#2a2015] italic"
          style={{ fontSize: compact ? "9px" : "10px" }}
        >
          {item.name}
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex items-baseline gap-0 py-[2px]"
      style={{ lineHeight: "1.35" }}
    >
      {/* Nombre */}
      <span
        className={`font-[family-name:var(--font-playfair)] text-[#1a1208] flex-shrink-0 ${
          item.bold ? "font-semibold" : "font-medium"
        }`}
        style={{ fontSize: compact ? "9px" : "10.5px" }}
      >
        {item.name}
      </span>

      {/* Descripción en itálica si hay espacio */}
      {item.desc && !compact && (
        <span
          className="font-[family-name:var(--font-cormorant)] text-[#5a4a2a] italic mx-1 flex-shrink-0"
          style={{ fontSize: "9px" }}
        >
          · {item.desc}
        </span>
      )}

      {/* Puntos de relleno */}
      <span
        className="flex-1 border-b border-dotted border-[#c8a96e] mx-1"
        style={{ marginBottom: "3px", minWidth: "8px" }}
      />

      {/* Precio */}
      {item.price > 0 ? (
        <span
          className={`font-[family-name:var(--font-playfair)] text-[#1a1208] flex-shrink-0 ${
            item.bold ? "font-semibold" : "font-medium"
          }`}
          style={{ fontSize: compact ? "9px" : "10.5px" }}
        >
          {formatCLP(item.price)}
        </span>
      ) : (
        <span
          className="font-[family-name:var(--font-cormorant)] text-[#8a7a5a] italic flex-shrink-0"
          style={{ fontSize: "9px" }}
        >
          consulte
        </span>
      )}
    </div>
  );
}
