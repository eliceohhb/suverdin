const products = [
    {
        id: 1,
        name: "Mesa Nórdica Artesanal",
        slug: "mesa-nordica",
        price: 890000,
        material: "Roble Europeo + Acero Negro",
        dimensions: "180 × 90 × 75 cm",
        availability: "Disponible — Fabricación 15 días",
        shortDescription: "Mesa de comedor con líneas puras inspirada en el diseño escandinavo. Tablero de roble macizo con base geométrica de acero.",
        story: "Cada mesa es tallada individualmente en nuestro taller de Osorno. El roble se selecciona por su veta y se termina con aceites naturales que realzan la textura y protegen la madera por generaciones.",
        process: "Selección manual de madera, corte, ensamblaje con técnicas de espiga, lijado progresivo hasta grano 320, acabado con aceite de tung natural.",
        images: [
            "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
        ],
        video: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-carpenter-working-with-wood-41656-large.mp4"
    },
    {
        id: 2,
        name: "Sillón Contemplativo",
        slug: "sillon-contemplativo",
        price: 720000,
        material: "Nogal Americano + Lino Natural",
        dimensions: "85 × 82 × 78 cm",
        availability: "Disponible — Fabricación 20 días",
        shortDescription: "Sillón de lectura con estructura de nogal curvado y tapiz de lino orgánico. Diseñado para momentos de pausa.",
        story: "El Contemplativo nace de la idea de crear un espacio personal dentro del hogar. La curva del respaldo abraza al usuario como un refugio, mientras el nogal aporta calidez y permanencia.",
        process: "Curvado al vapor del nogal, ensamblaje artesanal, tapizado a mano con lino belga de fibra larga, relleno de espuma de alta densidad envuelta en guata.",
        images: [
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
        ],
        video: "https://assets.mixkit.co/videos/preview/mixkit-man-working-with-a-piece-of-wood-41662-large.mp4"
    },
    {
        id: 3,
        name: "Estantería Modular Zen",
        slug: "estanteria-zen",
        price: 650000,
        material: "Pino Oregón + Cuero Vegetal",
        dimensions: "120 × 35 × 180 cm",
        availability: "Disponible — Fabricación 12 días",
        shortDescription: "Sistema modular de estantes con correas de cuero vegetal. Cada módulo se puede reconfigurar según el espacio.",
        story: "Inspirada en la filosofía wabi-sabi, esta estantería celebra la imperfección natural de la madera. Cada pieza conserva los nudos y variaciones del pino, creando un objeto único e irrepetible.",
        process: "Corte de precisión, cepillado a mano, uniones con tarugos de madera, tratamiento con aceite de linaza, correas de cuero curtido vegetal cosidas a mano.",
        images: [
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1532372576444-dda954194ad0?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80"
        ],
        video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-wood-41659-large.mp4"
    },
    {
        id: 4,
        name: "Banco Escultórico",
        slug: "banco-escultorico",
        price: 480000,
        material: "Lenga Patagónica Maciza",
        dimensions: "140 × 40 × 45 cm",
        availability: "Disponible — Pieza única",
        shortDescription: "Banco tallado en una sola pieza de lenga. Su forma orgánica sigue la curvatura natural del tronco original.",
        story: "Cada banco escultórico es una pieza irrepetible. Trabajamos con troncos recuperados del sur de Chile, respetando la forma que la naturaleza les dio y revelando su belleza interior.",
        process: "Selección de tronco, desbaste con hacha y formón, tallado a mano, pulido progresivo, acabado con cera de abeja natural.",
        images: [
            "https://images.unsplash.com/photo-1611967164521-abae8fba4668?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
        ],
        video: "https://assets.mixkit.co/videos/preview/mixkit-carpenter-shaving-a-piece-of-wood-41666-large.mp4"
    },
    {
        id: 5,
        name: "Lámpara Suspendida Ámbar",
        slug: "lampara-ambar",
        price: 320000,
        material: "Fresno + Vidrio Soplado Ámbar",
        dimensions: "Ø 35 × 120 cm (cadena)",
        availability: "Disponible — Fabricación 10 días",
        shortDescription: "Lámpara colgante con estructura de fresno torneado y difusor de vidrio soplado artesanalmente en tono ámbar.",
        story: "La luz es el alma de un espacio. Esta lámpara proyecta una luz cálida y envolvente gracias al vidrio ámbar, mientras la madera de fresno la conecta con la tierra.",
        process: "Torneado del fresno en torno manual, soplado de vidrio a 1200°C, montaje eléctrico profesional, acabado con barniz satinado natural.",
        images: [
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1200&q=80"
        ],
        video: "https://assets.mixkit.co/videos/preview/mixkit-carpenter-measuring-and-cutting-wood-41665-large.mp4"
    },
    {
        id: 6,
        name: "Escritorio Arquitecto",
        slug: "escritorio-arquitecto",
        price: 780000,
        material: "Roble Ahumado + Latón Cepillado",
        dimensions: "150 × 70 × 76 cm",
        availability: "Disponible — Fabricación 18 días",
        shortDescription: "Escritorio de trabajo con tablero de roble ahumado y detalles en latón. Diseño depurado para la concentración creativa.",
        story: "El Arquitecto es un tributo al espacio de trabajo como lugar sagrado. El roble ahumado ofrece una superficie única, oscurecida mediante técnicas ancestrales japonesas de shou sugi ban adaptadas.",
        process: "Ahumado del roble en cámara controlada, cepillado manual, fabricación de herrajes en latón, ensamblaje con cola epóxica marina, acabado con aceite-cera.",
        images: [
            "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"
        ],
        video: "https://assets.mixkit.co/videos/preview/mixkit-man-placing-wood-panels-on-a-table-41617-large.mp4"
    },
    {
        id: 7,
        name: "Mesa Lateral Origami",
        slug: "mesa-origami",
        price: 280000,
        material: "Acero Cortén + Mármol Travertino",
        dimensions: "45 × 45 × 55 cm",
        availability: "Disponible — Fabricación 8 días",
        shortDescription: "Mesa auxiliar con base de acero plegado inspirada en el origami japonés. Tapa de mármol travertino con veta natural.",
        story: "La geometría del acero plegado crea un juego de luces y sombras que cambia según la hora del día. El travertino aporta la calidez de la piedra natural, con cada veta contando miles de años de historia.",
        process: "Corte láser del acero, plegado en prensa hidráulica, oxidación controlada, corte y pulido del mármol, unión con adhesivo estructural, sellado protector.",
        images: [
            "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1532372576444-dda954194ad0?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80"
        ],
        video: "https://assets.mixkit.co/videos/preview/mixkit-carpenter-measuring-and-marking-a-piece-of-wood-41663-large.mp4"
    },
    {
        id: 8,
        name: "Perchero Bosque",
        slug: "perchero-bosque",
        price: 195000,
        material: "Coigüe Nativo + Hierro Forjado",
        dimensions: "50 × 30 × 175 cm",
        availability: "Disponible — Stock inmediato",
        shortDescription: "Perchero de pie con ramas de coigüe nativo y base de hierro forjado a mano. Cada pieza es única según la rama seleccionada.",
        story: "El Bosque trae un fragmento de la naturaleza del sur de Chile a tu hogar. Cada rama de coigüe es recolectada de árboles caídos, limpiada, tratada y convertida en un objeto funcional y escultórico.",
        process: "Recolección ética de ramas, secado natural durante 6 meses, limpieza y descortezado, forja artesanal de la base, ensamblaje con pernos ocultos, acabado con aceite de teca.",
        images: [
            "https://images.unsplash.com/photo-1611967164521-abae8fba4668?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80"
        ],
        video: "https://assets.mixkit.co/videos/preview/mixkit-carpenter-measuring-and-signing-a-design-41664-large.mp4"
    }
];

export default products;
