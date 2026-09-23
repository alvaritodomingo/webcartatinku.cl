"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, Calendar, Clock, Users, MessageCircle, MapPin } from "lucide-react";

/* ─── Botón flotante de reserva ──────────────────────────── */
export default function ReservaFloat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón flotante */}
      <motion.button
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5, type: "spring", stiffness: 200 }}
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="no-print fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full text-white"
        style={{
          background: "linear-gradient(135deg, #c4622d, #a8501e)",
          boxShadow: "0 8px 32px rgba(196,98,45,0.45)",
          fontFamily: "var(--font-playfair), serif",
          fontSize: "12px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
        aria-label="Reservar mesa"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
        >
          <Phone className="w-4 h-4" />
        </motion.div>
        <span className="hidden sm:inline">Reservar Mesa</span>
      </motion.button>

      {/* Modal de reserva */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-full sm:max-w-md rounded-t-2xl sm:rounded-xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #f5edd8, #ede0c4)",
                boxShadow: "0 -8px 40px rgba(26,18,8,0.4), 0 0 0 1px rgba(200,169,110,0.3)",
              }}
            >
              {/* Header */}
              <div
                className="relative px-6 py-5"
                style={{ background: "linear-gradient(135deg, #c4622d, #a8501e)" }}
              >
                <h3
                  className="font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", letterSpacing: "0.08em" }}
                >
                  Reservar Mesa
                </h3>
                <p
                  className="text-white/80 italic mt-0.5"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "13px" }}
                >
                  Tinkubar — Restaurante & Café
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Contenido */}
              <div className="px-6 py-6 space-y-4">
                <p
                  className="text-center italic"
                  style={{ fontFamily: "var(--font-cormorant), serif", color: "#6a5a3a", fontSize: "14px" }}
                >
                  Contáctanos para hacer tu reserva
                </p>

                <div className="space-y-3">
                  <a
                    href="https://wa.me/56900000000?text=Hola%20Tinkubar%2C%20quisiera%20hacer%20una%20reserva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-sm border hover:border-[#c8a96e] transition-all duration-200 group"
                    style={{ border: "1px solid rgba(200,169,110,0.3)", background: "rgba(255,255,255,0.5)" }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p
                        className="font-semibold group-hover:text-[#c4622d] transition-colors"
                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "13px", color: "#2a2015" }}
                      >
                        WhatsApp
                      </p>
                      <p style={{ fontFamily: "var(--font-lato), sans-serif", fontSize: "11px", color: "#8a7a5a" }}>
                        +56 9 XXXX XXXX
                      </p>
                    </div>
                    <span
                      className="ml-auto"
                      style={{ fontFamily: "var(--font-lato), sans-serif", fontSize: "11px", color: "#c8a96e" }}
                    >
                      Respuesta rápida →
                    </span>
                  </a>

                  <a
                    href="tel:+56900000000"
                    className="flex items-center gap-4 p-4 rounded-sm border hover:border-[#c8a96e] transition-all duration-200 group"
                    style={{ border: "1px solid rgba(200,169,110,0.3)", background: "rgba(255,255,255,0.5)" }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #c4622d, #a8501e)" }}>
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p
                        className="font-semibold group-hover:text-[#c4622d] transition-colors"
                        style={{ fontFamily: "var(--font-playfair), serif", fontSize: "13px", color: "#2a2015" }}
                      >
                        Llamar
                      </p>
                      <p style={{ fontFamily: "var(--font-lato), sans-serif", fontSize: "11px", color: "#8a7a5a" }}>
                        +56 9 XXXX XXXX · Lun–Dom
                      </p>
                    </div>
                  </a>
                </div>

                {/* Info */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[
                    { icon: Clock,    label: "Horario",   value: "8:00–22:00" },
                    { icon: Users,    label: "Capacidad", value: "Hasta 40 pax" },
                    { icon: Calendar, label: "Reservas",  value: "Con 24h anticipación" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1 p-2 rounded-sm"
                      style={{ background: "rgba(200,169,110,0.1)", border: "1px solid rgba(200,169,110,0.2)" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#c8a96e" }} />
                      <span style={{ fontFamily: "var(--font-lato), sans-serif", fontSize: "9px", color: "#8a7a5a", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center" }}>
                        {label}
                      </span>
                      <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "10px", color: "#4a3a25", textAlign: "center", lineHeight: 1.2 }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="flex items-start gap-3 p-3 rounded-sm"
                  style={{ background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.2)" }}
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#c8a96e" }} />
                  <div>
                    <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "11px", fontWeight: 600, color: "#2a2015" }}>
                      Ubicación
                    </p>
                    <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "11px", color: "#6a5a3a", fontStyle: "italic" }}>
                      Santiago, Chile — tinkubar.cl
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
