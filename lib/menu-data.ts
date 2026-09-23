/* ─────────────────────────────────────────────────────────────
   Datos del menú Tinkubar.cl — Fiel a la carta física
   ───────────────────────────────────────────────────────────── */

export interface CartaItem {
  name: string;
  desc?: string;
  price: number;
  bold?: boolean;
}

export interface CartaSubSection {
  title: string;
  color?: "terracota" | "teal" | "magenta" | "gold";
  items: CartaItem[];
}

export interface CartaPageData {
  id: string;
  pageNumber: number;
  sections: CartaSubSection[];
  reservaText?: string;
}

export function formatCLP(n: number): string {
  return `$${n.toLocaleString("es-CL")}`;
}

/* ─── Páginas de la carta ────────────────────────────────── */
export const cartaPages: CartaPageData[] = [

  /* ══ PÁGINA 1: CARTA DESAYUNO + SANDWICHES ══════════════ */
  {
    id: "page-1",
    pageNumber: 1,
    reservaText: "Reserva al +56 9 XXXX XXXX · tinkubar.cl",
    sections: [
      {
        title: "Carta Desayuno",
        color: "terracota",
        items: [
          { name: "Palta Tostada",          desc: "pan artesanal, palta, limón, sal de mar",    price: 4900 },
          { name: "Huevos Revueltos",        desc: "huevos de campo, mantequilla, tostadas",     price: 5900 },
          { name: "Bowl de Granola",         desc: "granola, yogur, frutas, miel de ulmo",       price: 5500 },
          { name: "Pancakes Clásicos",       desc: "maple, mantequilla, frutas frescas",         price: 6500 },
          { name: "Tostada Francesa",        desc: "brioche, canela, berries, chantilly",        price: 6900, bold: true },
          { name: "Desayuno Completo",       desc: "huevos, cecinas, tostadas, jugo, café",      price: 8900 },
          { name: "Yogurt con Frutas",       desc: "yogur natural, frutas de temporada",         price: 4200 },
          { name: "Huevos Benedictinos",     desc: "muffin inglés, jamón, salsa holandesa",      price: 7500 },
          { name: "Avocado Egg Toast",       desc: "pan de masa madre, huevo poché, palta",      price: 6200 },
          { name: "Açaí Bowl",               desc: "açaí, granola, coco, frutas tropicales",     price: 6800 },
        ],
      },
      {
        title: "Sandwiches",
        color: "terracota",
        items: [
          { name: "Mechada Tinkubar",        desc: "carne mechada, palta, tomate, mayo",         price: 7900, bold: true },
          { name: "Churrasco Italiano",      desc: "lomo vacuno, palta, tomate, mayo",           price: 8500 },
          { name: "Pollo Grillado",          desc: "pechuga, lechuga, cebolla caramelizada",     price: 7500 },
          { name: "Veggie Burger",           desc: "lentejas, champiñones, queso de cabra",      price: 7200 },
          { name: "Club Sándwich",           desc: "pollo, tocino, huevo, lechuga, tomate",      price: 8900 },
          { name: "Lomito Completo",         desc: "cerdo, palta, tomate, mayo, chucrut",        price: 7800 },
        ],
      },
    ],
  },

  /* ══ PÁGINA 2: CARTA DE DESAYUNO + CAFÉ + POSTRES ═══════ */
  {
    id: "page-2",
    pageNumber: 2,
    reservaText: "Reserva al +56 9 XXXX XXXX · tinkubar.cl",
    sections: [
      {
        title: "Carta de Desayuno",
        color: "terracota",
        items: [
          { name: "Vaso de Jugo Natural",    desc: "naranja, pomelo o zanahoria",               price: 2900 },
          { name: "Marraqueta con Palta",    desc: "pan marraqueta, palta fresca",              price: 3500 },
          { name: "Café Americano",          desc: "doble shot espresso, agua caliente",        price: 2800 },
          { name: "Té de Hierbas",           desc: "manzanilla, menta, boldo o jengibre",       price: 2500 },
          { name: "Leche con Plátano",       desc: "leche entera, plátano, miel",               price: 3200 },
          { name: "Agua Mineral 500ml",      desc: "con o sin gas",                             price: 1900 },
          { name: "Agua de Fruta",           desc: "frambuesa, maracuyá o durazno",             price: 2200 },
          { name: "Jugo Detox Verde",        desc: "pepino, manzana, jengibre, limón",          price: 3800 },
          { name: "Smoothie Tropical",       desc: "mango, piña, coco, leche de almendras",     price: 4200 },
          { name: "Kombucha Artesanal",      desc: "jengibre-limón, hibisco o manzana",         price: 4200 },
          { name: "Qué Quieres Tomar",       desc: "consulte disponibilidad al mesero",         price: 0 },
        ],
      },
      {
        title: "Café Grano Ximmed",
        color: "teal",
        items: [
          { name: "Espresso",                desc: "shot doble, blend exclusivo",               price: 2800 },
          { name: "Cappuccino",              desc: "espresso, leche vaporizada, espuma",        price: 3500 },
          { name: "Latte",                   desc: "espresso, leche, microespuma",              price: 3800 },
          { name: "Flat White",              desc: "doble ristretto, leche sedosa",             price: 3900 },
          { name: "Chemex V60",              desc: "filtrado en frío, notas frutales",          price: 4500 },
        ],
      },
      {
        title: "Postres Postingles",
        color: "teal",
        items: [
          { name: "Crème Brûlée",            desc: "crema catalana, azúcar caramelizada",       price: 5900, bold: true },
          { name: "Tiramisú Artesanal",      desc: "mascarpone, café espresso, cacao",          price: 5500 },
          { name: "Cheesecake de Berries",   desc: "Philadelphia, coulis de frambuesa",         price: 5900 },
          { name: "Coulant de Chocolate",    desc: "70% cacao, centro fundente, helado",        price: 6500 },
          { name: "Torta del Día",           desc: "consulte al mesero",                        price: 4900 },
        ],
      },
    ],
  },

  /* ══ PÁGINA 3: PLATOS A LA CARTA + SAJATIVOS ════════════ */
  {
    id: "page-3",
    pageNumber: 3,
    reservaText: "Reserva al +56 9 XXXX XXXX · tinkubar.cl",
    sections: [
      {
        title: "Platos a la Carta",
        color: "terracota",
        items: [
          { name: "Salmón a la Plancha",     desc: "alcaparras, puré, vegetales",               price: 13900, bold: true },
          { name: "Lomo Saltado",            desc: "lomo fino, cebolla, tomate, soya",          price: 12900 },
          { name: "Pollo al Curry",          desc: "curry tailandés, coco, arroz basmati",      price: 11500 },
          { name: "Pasta Carbonara",         desc: "fettuccine, panceta, pecorino, pimienta",   price: 10900 },
          { name: "Risotto de Champiñones",  desc: "arborio, parmesano, trufa negra",           price: 11900, bold: true },
          { name: "Cazuela de Vacuno",       desc: "osobuco, papas, zapallo, choclo",           price: 12500 },
          { name: "Trucha Andina",           desc: "mantequilla de hierbas, quinoa tricolor",   price: 13500 },
          { name: "Costillar BBQ",           desc: "ahumado, salsa BBQ, coleslaw",              price: 14900 },
          { name: "Tacos de Pollo",          desc: "tortilla maíz, pollo, guacamole, pico",     price: 10500 },
          { name: "Bowl Vegano",             desc: "quinoa, garbanzos, tahini, vegetales",      price: 9900 },
          { name: "Ceviche Clásico",         desc: "corvina, limón de Pica, cilantro, ají",     price: 11200 },
          { name: "Empanadas (3 un.)",       desc: "pino, queso o camarón",                     price: 6900 },
        ],
      },
      {
        title: "Café Grano Rinnon",
        color: "teal",
        items: [
          { name: "Americano Rinnon",        desc: "origen único, notas a chocolate",           price: 3200 },
          { name: "Cortado",                 desc: "espresso, toque de leche",                  price: 3000 },
          { name: "Mocha",                   desc: "espresso, chocolate, leche",                price: 4200 },
        ],
      },
      {
        title: "Sajativos",
        color: "terracota",
        items: [
          { name: "Yogurt Bajativo",         desc: "yogur natural, miel de ulmo, granola",      price: 3200 },
          { name: "Agua Digestiva",          desc: "hierbas digestivas, limón, jengibre",       price: 2500 },
          { name: "Infusión de Hierbas",     desc: "manzanilla, anís, boldo o menta",           price: 2200 },
          { name: "Omite (Gratis)",          desc: "agua tibia con limón",                      price: 0 },
        ],
      },
    ],
  },

  /* ══ PÁGINA 4: PROMOCIONES ══════════════════════════════ */
  {
    id: "page-4",
    pageNumber: 4,
    reservaText: "Reserva al +56 9 XXXX XXXX · tinkubar.cl",
    sections: [
      {
        title: "Promociones",
        color: "terracota",
        items: [
          { name: "Desayuno para 2",         desc: "2 desayunos completos + 2 bebidas calientes", price: 15900, bold: true },
          { name: "Menú del Día",            desc: "entrada + plato + postre + bebida",          price: 12900, bold: true },
          { name: "Afternoon Tea para 2",    desc: "2 tés + tabla dulces y salados",             price: 19900, bold: true },
          { name: "Tabla Quesos y Vinos",    desc: "quesos artesanales + botella a elección",    price: 22900, bold: true },
          { name: "Happy Hour 17-19h",       desc: "2x1 en cervezas artesanales y pisco sour",  price: 0 },
          { name: "Brunch Dominical",        desc: "buffet libre domingos 10:00–14:00",          price: 14900, bold: true },
        ],
      },
      {
        title: "Desserts",
        color: "magenta",
        items: [
          { name: "Panna Cotta",             desc: "vainilla Madagascar, coulis maracuyá",       price: 5200 },
          { name: "Profiteroles",            desc: "choux, crema pastelera, chocolate",          price: 5800 },
          { name: "Tarta de Limón",          desc: "lemon curd, merengue italiano",             price: 5500 },
          { name: "Helado Artesanal",        desc: "vainilla, chocolate o frutos rojos",        price: 3900 },
          { name: "Brownie Caliente",        desc: "nueces, helado de vainilla",                price: 5200 },
        ],
      },
      {
        title: "Drinks",
        color: "magenta",
        items: [
          { name: "Pisco Sour",              desc: "pisco 35°, limón Pica, clara, angostura",   price: 5900, bold: true },
          { name: "Aperol Spritz",           desc: "aperol, prosecco, agua con gas",            price: 6900 },
          { name: "Cerveza Artesanal",       desc: "selección rotativa nacional",               price: 4900 },
          { name: "Copa de Vino",            desc: "carménère, cab. sauv. o sauv. blanc",       price: 4500 },
          { name: "Destilado Artesanal",     desc: "uva, manzana o pera, Valle Central",        price: 5500 },
          { name: "Limonada Tinkubar",       desc: "limón, menta, jengibre, azúcar de caña",   price: 3900 },
        ],
      },
    ],
  },

  /* ══ PÁGINA 5: MEALS + AFTERNOON TEA ═══════════════════ */
  {
    id: "page-5",
    pageNumber: 5,
    reservaText: "Reserva al +56 9 XXXX XXXX · tinkubar.cl",
    sections: [
      {
        title: "Meals",
        color: "terracota",
        items: [
          { name: "Hello",                   desc: "entrada del día, consulte mesero",          price: 5500 },
          { name: "Chantal Carbonara",       desc: "fettuccine, panceta, yema, pecorino",       price: 11900, bold: true },
          { name: "Moules",                  desc: "mejillones al vino blanco, pan",            price: 11400 },
          { name: "Mollete de Salmón",       desc: "salmón ahumado, queso crema, alcaparras",  price: 12500 },
          { name: "Linzer",                  desc: "tarta de frambuesa, almendras",             price: 5200 },
          { name: "Croque Monsieur",         desc: "jamón, gruyère, bechamel, tostado",        price: 8900 },
          { name: "Croque Madame",           desc: "croque monsieur + huevo frito",            price: 9500 },
          { name: "Venta del Día",           desc: "consulte disponibilidad",                  price: 0 },
          { name: "Venta del Día II",        desc: "consulte disponibilidad",                  price: 0 },
        ],
      },
      {
        title: "Promociones",
        color: "terracota",
        items: [
          { name: "Promo Gastronómica",      desc: "2 platos + 2 bebidas + postre compartido", price: 24900, bold: true },
          { name: "Promo Almuerzo",          desc: "plato del día + bebida + café",            price: 9900 },
          { name: "Promo Cena Romántica",    desc: "2 platos + vino + postre + velas",         price: 39900, bold: true },
          { name: "Afterwork",               desc: "tabla de picoteo + 2 cervezas",            price: 12900 },
        ],
      },
    ],
  },

  /* ══ PÁGINA 6: AFTERNOON TEA ════════════════════════════ */
  {
    id: "page-6",
    pageNumber: 6,
    reservaText: "Reserva al +56 9 XXXX XXXX · tinkubar.cl",
    sections: [
      {
        title: "Afternoon Tea",
        color: "terracota",
        items: [
          { name: "Té Afternoon Clásico",    desc: "tés premium, scones, finger sandwiches",   price: 11900, bold: true },
          { name: "Café Grano de Met",       desc: "blend especial, preparación V60",          price: 4500 },
          { name: "Castiti de Met",          desc: "café de especialidad, prensa francesa",    price: 4800 },
          { name: "Seet Hbanos Sost",        desc: "scones recién horneados, mermelada",       price: 3900 },
          { name: "Gast Hbanos Bost",        desc: "galletitas artesanales surtidas",          price: 3500 },
          { name: "Hamber S Ciltarees",      desc: "finger sandwiches variados",               price: 5200 },
          { name: "1751 Roda111 Vooed",      desc: "tabla de dulces y salados",                price: 21900, bold: true },
          { name: "Bonite",                  desc: "petit fours de la casa",                   price: 4600 },
        ],
      },
      {
        title: "Promociones",
        color: "terracota",
        items: [
          { name: "Afternoon Tea para 2",    desc: "2 tés + tabla compartida",                 price: 19900, bold: true },
          { name: "Afternoon Tea para 4",    desc: "4 tés + tabla grande + scones",            price: 35900, bold: true },
          { name: "Afternoon Tea Niños",     desc: "té de fruta + sándwich + galletas",        price: 7900 },
        ],
      },
      {
        title: "Promociones",
        color: "terracota",
        items: [
          { name: "Promo Cumpleaños",        desc: "torta + 4 bebidas + decoración",           price: 29900, bold: true },
          { name: "Promo Corporativa",       desc: "coffee break para 10 personas",            price: 89900, bold: true },
          { name: "Afterwork",               desc: "tabla + 2 bebidas a elección",             price: 12900 },
        ],
      },
    ],
  },

  /* ══ PÁGINA 7: PLATOS A LA CARTA + BOARDS ══════════════ */
  {
    id: "page-7",
    pageNumber: 7,
    reservaText: "Reserva al +56 9 XXXX XXXX · tinkubar.cl",
    sections: [
      {
        title: "Platos a la Carta",
        color: "terracota",
        items: [
          { name: "Plata a la Carta",        desc: "consulte disponibilidad",                  price: 11310 },
          { name: "Cebolla al Horno",        desc: "cebolla, queso, hierbas provenzales",      price: 11000 },
          { name: "Ensalada Nicoise",        desc: "atún, huevo, aceitunas, judías",           price: 10210 },
          { name: "Pasta Puttanesca",        desc: "tomate, aceitunas, alcaparras, anchoas",   price: 10110 },
          { name: "Pollo Tikka Masala",      desc: "curry, tomate, crema, arroz basmati",      price: 11210 },
          { name: "Filete de Merluza",       desc: "limón, alcaparras, papas al vapor",        price: 11110 },
          { name: "Ragu Boloñesa",           desc: "carne molida, tomate, vino tinto, pasta",  price: 10110 },
          { name: "Baja California",         desc: "tacos de pescado, guacamole, pico gallo",  price: 11210 },
          { name: "Paella Mixta",            desc: "arroz, mariscos, pollo, azafrán",          price: 13210 },
          { name: "Aulam",                   desc: "plato del día especial",                   price: 11260 },
        ],
      },
      {
        title: "Boards",
        color: "gold",
        items: [
          { name: "Board Honey",             desc: "quesos, miel, frutos secos, mermelada",    price: 11900, bold: true },
          { name: "Mccitidogu Acciventall",  desc: "tabla de embutidos y quesos curados",      price: 13400, bold: true },
          { name: "Menil Gitivi",            desc: "tabla vegetariana, hummus, crudités",      price: 11900 },
          { name: "Acletis",                 desc: "tabla de mariscos frescos",                price: 11900 },
          { name: "Netta Gitidogu Acciventall Board", desc: "tabla premium completa",          price: 0 },
        ],
      },
      {
        title: "Alatiapes",
        color: "terracota",
        items: [
          { name: "Alatiapes",               desc: "acompañamientos a elección",               price: 0 },
        ],
      },
      {
        title: "Promociones",
        color: "terracota",
        items: [
          { name: "Promo Board + Vino",      desc: "tabla honey + botella vino",               price: 24900, bold: true },
          { name: "Promo Mariscos",          desc: "tabla mariscos + 2 copas vino blanco",     price: 28900, bold: true },
          { name: "Afterwork",               desc: "tabla + 2 cervezas artesanales",           price: 12900 },
        ],
      },
    ],
  },

  /* ══ PÁGINA 8: BAJATIVOS ════════════════════════════════ */
  {
    id: "page-8",
    pageNumber: 8,
    reservaText: "Reserva al +56 9 XXXX XXXX · tinkubar.cl",
    sections: [
      {
        title: "Bajativos",
        color: "terracota",
        items: [
          { name: "Lnose",                   desc: "digestivo de hierbas artesanal",            price: 11200 },
          { name: "Cerveza a Larretes",      desc: "cerveza artesanal de barril",               price: 0 },
          { name: "Cerveza Lagal Acal",      desc: "lager nacional fría",                       price: 11200 },
          { name: "Ccerpe Gasa Det Moralu",  desc: "copa de vino tinto reserva",                price: 21564 },
          { name: "Agua Agra Actia",         desc: "agua con gas premium",                      price: 11648 },
          { name: "Elltysal Langcarha Luse", desc: "destilado de uva artesanal",                price: 14245 },
          { name: "Marca Rroact S Unirrena", desc: "pisco de autor, Valle del Elqui",           price: 21100 },
          { name: "Castilpn",                desc: "castillo de whisky con hielo",              price: 0 },
          { name: "Cerveza al Comida Recena",desc: "maridaje cerveza + plato",                  price: 0 },
          { name: "Pattras Lessa",           desc: "patrón de licores premium",                 price: 0 },
          { name: "Cayetta Torempa Crara",   desc: "cayena, toronja, ron blanco",               price: 11648 },
          { name: "Nott Gitidogu Acciventall", desc: "cóctel de la casa",                       price: 0 },
        ],
      },
      {
        title: "Bebidas a Nombre",
        color: "terracota",
        items: [
          { name: "Bartola Aclenrenta",      desc: "cóctel de autor con pisco",                 price: 0 },
          { name: "Agua Agra Actia",         desc: "agua mineral con gas",                      price: 0 },
          { name: "Elltysal Langcarha",      desc: "destilado artesanal local",                 price: 0 },
        ],
      },
      {
        title: "Promociones",
        color: "terracota",
        items: [
          { name: "Promo Bajativo Doble",    desc: "2 bajativos a elección",                    price: 7900, bold: true },
          { name: "Promo Maridaje",          desc: "postre + bajativo recomendado",             price: 9900, bold: true },
          { name: "Afterwork",               desc: "tabla + 2 bajativos",                       price: 14900 },
        ],
      },
    ],
  },
];
