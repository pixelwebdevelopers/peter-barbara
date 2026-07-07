export type Subcategory = {
  slug: string;
  name: string;
  sku: string;
  description: string;
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  intro: string;
  subcategories: Subcategory[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "activewear",
    name: "Activewear & Gym Wear",
    short: "Activewear",
    tagline: "Engineered for movement.",
    intro:
      "Performance basics built for high-intensity training. Breathable knits, four-way stretch and engineered fits — manufactured to your specification.",
    subcategories: [
      {
        slug: "tshirts",
        name: "Dri-Fit T-Shirts",
        sku: "PB-AW-TS",
        description: "Lightweight polyester / poly-blend tees with moisture-wicking finish.",
      },
      {
        slug: "shorts",
        name: "Performance Shorts",
        sku: "PB-AW-SH",
        description: "Training shorts with bonded waistbands and inner liners.",
      },
      {
        slug: "sweat-shirts",
        name: "Sweatshirts",
        sku: "PB-AW-SW",
        description: "Heavyweight crew-neck sweatshirts in brushed fleece and french terry.",
      },
      {
        slug: "tank-tops",
        name: "Tank Tops",
        sku: "PB-AW-TT",
        description: "Cut-and-sew tanks for gym, training and lifestyle programs.",
      },
      {
        slug: "compression",
        name: "Compression Wear",
        sku: "PB-AW-CP",
        description: "Graduated compression tops and bottoms for athletic recovery.",
      },
      {
        slug: "fleece-jackets",
        name: "Fleece Jackets",
        sku: "PB-AW-FJ",
        description:
          "Midweight fleece jackets with zip fronts, side pockets, and brushed interiors.",
      },
      {
        slug: "polo-tshirts",
        name: "Polo T-Shirts",
        sku: "PB-AW-PT",
        description:
          "Classic polo tees in breathable pique and technical fabrics for athletic and casual wear.",
      },
      {
        slug: "varsity-jacket",
        name: "Varsity Jackets",
        sku: "PB-AW-VJ",
        description:
          "Sporty varsity jackets with custom patches, contrast sleeves, and ribbed details.",
      },
    ],
  },
  {
    slug: "team-sportswear",
    name: "Team Sportswear & Uniforms",
    short: "Team Uniforms",
    tagline: "Outfit the whole roster.",
    intro:
      "Full-sublimation team kits manufactured to club, school and federation standards. Custom colors, sponsor placements and numbering included.",
    subcategories: [
      {
        slug: "football-kits",
        name: "Football Kits",
        sku: "PB-TM-FK",
        description: "Jersey, shorts and socks. Cut-and-sew or full sublimation.",
      },
      {
        slug: "cricket-uniforms",
        name: "Cricket Uniforms",
        sku: "PB-TM-CR",
        description: "T20, ODI and Test whites with custom branding.",
      },
      {
        slug: "basketball-jerseys",
        name: "Basketball Jerseys",
        sku: "PB-TM-BB",
        description: "Reversible mesh and tackle-twill jerseys.",
      },
      {
        slug: "volleyball-hockey",
        name: "Volleyball & Hockey Kits",
        sku: "PB-TM-VH",
        description: "Indoor and field kits for clubs and leagues.",
      },
      {
        slug: "sublimation",
        name: "Custom Sublimation Uniforms",
        sku: "PB-TM-SB",
        description: "Edge-to-edge dye sublimation, unlimited colors.",
      },
      {
        slug: "baseball-uniform",
        name: "Baseball Uniforms",
        sku: "PB-TM-BU",
        description:
          "Classic button-down baseball shirts and pants with custom piping and lettering.",
      },
      {
        slug: "tennis-wear",
        name: "Tennis Teamwear",
        sku: "PB-TM-TW",
        description:
          "Custom-branded team apparel for tennis clubs, including skirts, polos, and shorts.",
      },
    ],
  },
  {
    slug: "performance-wear",
    name: "Performance Wear",
    short: "Performance",
    tagline: "Built to outwork the conditions.",
    intro:
      "Technical apparel for runners, triathletes and endurance athletes. Engineered fabrics for thermoregulation and moisture management.",
    subcategories: [
      {
        slug: "moisture-wicking",
        name: "Moisture-Wicking Tees",
        sku: "PB-PF-MW",
        description: "Open-knit poly tees that move sweat to the surface.",
      },
      {
        slug: "quick-dry",
        name: "Quick-Dry Apparel",
        sku: "PB-PF-QD",
        description: "Fast-drying woven and knit pieces for hot climates.",
      },
      {
        slug: "running",
        name: "Lightweight Running Wear",
        sku: "PB-PF-RN",
        description: "Sub-150gsm running tops, shorts and singlets.",
      },
      {
        slug: "thermal",
        name: "Thermal Wear",
        sku: "PB-PF-TH",
        description: "Brushed-back baselayers for cold-weather training.",
      },
    ],
  },
  {
    slug: "outerwear",
    name: "Outerwear & Training Wear",
    short: "Outerwear",
    tagline: "Layer up, train through it.",
    intro:
      "Premium training layers from cotton-fleece hoodies to wind-resistant shells. Heavyweight constructions with attention to trims and finishing.",
    subcategories: [
      {
        slug: "tracksuits",
        name: "Tracksuits",
        sku: "PB-OW-TS",
        description: "Matching jacket and pant sets in tricot, fleece and woven.",
      },
      {
        slug: "hoodies",
        name: "Hoodies",
        sku: "PB-OW-HD",
        description: "320–450gsm fleece hoodies with custom embroidery / print.",
      },
      {
        slug: "bomber-jackets",
        name: "Bomber Jackets",
        sku: "PB-OW-BJ",
        description: "Classic bomber silhouettes with ribbed trims and zip fronts.",
      },
      {
        slug: "windbreaker",
        name: "Windbreakers",
        sku: "PB-OW-WB",
        description: "Lightweight wind- and water-resistant shells, packable options available.",
      },
      {
        slug: "puffer-jackets",
        name: "Puffer Jackets",
        sku: "PB-OW-PJ",
        description:
          "Insulated outerwear with quilted shells and warm synthetic down filling for cold climates.",
      },
    ],
  },
  {
    slug: "yoga-lifestyle",
    name: "Yoga & Lifestyle (Athleisure)",
    short: "Yoga & Lifestyle",
    tagline: "Studio to street.",
    intro:
      "Soft-hand athleisure built for studio sessions, daily wear and lifestyle retail floors.",
    subcategories: [
      {
        slug: "yoga-sets",
        name: "Yoga Sets",
        sku: "PB-YL-YS",
        description: "Matching bra and legging sets in buttery nylon-spandex.",
      },
      {
        slug: "stretch-leggings",
        name: "Stretch Leggings",
        sku: "PB-YL-SL",
        description: "Four-way stretch leggings with sculpting seams.",
      },
      {
        slug: "lifestyle",
        name: "Lifestyle Sportswear",
        sku: "PB-YL-LS",
        description: "Crewnecks, joggers and tees for everyday wear.",
      },
      {
        slug: "lifestyle-sportswear",
        name: "Lifestyle Sportswear",
        sku: "PB-YL-LSS",
        description:
          "Versatile tracksuits, hoodies, joggers, and layering essentials designed for daily wear.",
      },
      {
        slug: "casual",
        name: "Casual Sporty Clothing",
        sku: "PB-YL-CS",
        description: "Easy fits in heavy cotton and modal blends.",
      },
    ],
  },
  {
    slug: "sport-specific",
    name: "Sport-Specific Wear",
    short: "Sport-Specific",
    tagline: "Built for the sport, not the season.",
    intro:
      "Specialist apparel manufactured for individual disciplines, with sport-correct fits, fabrics and finishes.",
    subcategories: [
      {
        slug: "cycling",
        name: "Cycling Wear",
        sku: "PB-SS-CY",
        description: "Jerseys, bib shorts and gilets with race-cut construction.",
      },
      {
        slug: "fishing-wear",
        name: "Fishing Wear",
        sku: "PB-SS-FW",
        description:
          "UV-protection shirts, lightweight jackets, and performance apparel designed for anglers.",
      },
      {
        slug: "swimwear",
        name: "Swimwear",
        sku: "PB-SS-SW",
        description: "Chlorine-resistant racing and training swimwear.",
      },
      {
        slug: "golf",
        name: "Golf Wear",
        sku: "PB-SS-GF",
        description: "Premium polos, quarter-zips and trousers.",
      },
      {
        slug: "winter",
        name: "Winter Sportswear",
        sku: "PB-SS-WT",
        description: "Insulated layers for ski, snowboard and alpine training.",
      },
    ],
  },
  {
    slug: "accessories",
    name: "Accessories",
    short: "Accessories",
    tagline: "Finish the kit.",
    intro:
      "Complementary accessories to round out any program — caps, socks, bags and gloves manufactured to the same standard as our apparel.",
    subcategories: [
      {
        slug: "caps",
        name: "Caps",
        sku: "PB-AC-CP",
        description: "5- and 6-panel caps with structured and unstructured crowns.",
      },
      {
        slug: "socks",
        name: "Socks",
        sku: "PB-AC-SK",
        description: "Crew, ankle and compression socks in technical blends.",
      },
      {
        slug: "bags",
        name: "Bags",
        sku: "PB-AC-GB",
        description: "Duffles and backpacks in ballistic nylon and cordura.",
      },
      {
        slug: "cycling-gloves",
        name: "Cycling Gloves",
        sku: "PB-AC-CG",
        description: "Professional cycling gloves with padded palms and breathable backs.",
      },
      {
        slug: "goalkeeper-gloves",
        name: "Goalkeeper Gloves",
        sku: "PB-AC-GG",
        description: "High-grip latex palms and support systems for goalkeepers.",
      },
      {
        slug: "golf-gloves",
        name: "Golf Gloves",
        sku: "PB-AC-GF",
        description: "Premium cabretta leather gloves for ultimate grip and feel.",
      },
      {
        slug: "gym-gloves",
        name: "Gym Gloves",
        sku: "PB-AC-GY",
        description: "Heavy-duty lifting gloves with wrist wraps and textured palms.",
      },
    ],
  },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

export const WHATSAPP_NUMBER = "923279541234"; // Hotline & WhatsApp
export const CONTACT_EMAIL = " sportswear@peterbarbara.com";
export const CONTACT_PHONE = "+92 327 954 1234";
export const COMPANY_ADDRESS = "Christian Town Muslim Colony, Sialkot Cantt Punjab, Pakistan";

export function inquireWhatsappLink(productName: string, sku: string) {
  const text = encodeURIComponent(
    `Hello Peter & Barbara, I'd like to inquire about: ${productName} (SKU: ${sku}). Please share MOQ, pricing and lead time.`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
