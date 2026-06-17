export type Subcategory = {
  slug: string;
  name: string;
  sku: string;
  description: string;
  images: number; // count of images available (1.jpg ... N.jpg)
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
      { slug: "tshirts", name: "Dri-Fit T-Shirts", sku: "PB-AW-TS", description: "Lightweight polyester / poly-blend tees with moisture-wicking finish.", images: 1 },
      { slug: "shorts", name: "Performance Shorts", sku: "PB-AW-SH", description: "Training shorts with bonded waistbands and inner liners.", images: 1 },
      { slug: "leggings", name: "Leggings & Tights", sku: "PB-AW-LG", description: "Compressive leggings with high-rise waistbands.", images: 1 },
      { slug: "tank-tops", name: "Tank Tops", sku: "PB-AW-TT", description: "Cut-and-sew tanks for gym, training and lifestyle programs.", images: 1 },
      { slug: "compression", name: "Compression Wear", sku: "PB-AW-CP", description: "Graduated compression tops and bottoms for athletic recovery.", images: 1 },
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
      { slug: "football-kits", name: "Football Kits", sku: "PB-TM-FK", description: "Jersey, shorts and socks. Cut-and-sew or full sublimation.", images: 1 },
      { slug: "cricket-uniforms", name: "Cricket Uniforms", sku: "PB-TM-CR", description: "T20, ODI and Test whites with custom branding.", images: 1 },
      { slug: "basketball-jerseys", name: "Basketball Jerseys", sku: "PB-TM-BB", description: "Reversible mesh and tackle-twill jerseys.", images: 1 },
      { slug: "volleyball-hockey", name: "Volleyball & Hockey Kits", sku: "PB-TM-VH", description: "Indoor and field kits for clubs and leagues.", images: 1 },
      { slug: "sublimation", name: "Custom Sublimation Uniforms", sku: "PB-TM-SB", description: "Edge-to-edge dye sublimation, unlimited colors.", images: 1 },
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
      { slug: "moisture-wicking", name: "Moisture-Wicking Tees", sku: "PB-PF-MW", description: "Open-knit poly tees that move sweat to the surface.", images: 1 },
      { slug: "quick-dry", name: "Quick-Dry Apparel", sku: "PB-PF-QD", description: "Fast-drying woven and knit pieces for hot climates.", images: 1 },
      { slug: "running", name: "Lightweight Running Wear", sku: "PB-PF-RN", description: "Sub-150gsm running tops, shorts and singlets.", images: 1 },
      { slug: "thermal", name: "Thermal Wear", sku: "PB-PF-TH", description: "Brushed-back baselayers for cold-weather training.", images: 1 },
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
      { slug: "tracksuits", name: "Tracksuits", sku: "PB-OW-TS", description: "Matching jacket and pant sets in tricot, fleece and woven.", images: 1 },
      { slug: "hoodies", name: "Hoodies", sku: "PB-OW-HD", description: "320–450gsm fleece hoodies with custom embroidery / print.", images: 1 },
      { slug: "jackets", name: "Jackets & Windbreakers", sku: "PB-OW-JK", description: "Coach jackets, windbreakers and bonded shells.", images: 1 },
      { slug: "jogging-suits", name: "Jogging Suits", sku: "PB-OW-JG", description: "Lightweight jog sets in poly-spandex and french terry.", images: 1 },
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
      { slug: "yoga-sets", name: "Yoga Sets", sku: "PB-YL-YS", description: "Matching bra and legging sets in buttery nylon-spandex.", images: 1 },
      { slug: "stretch-leggings", name: "Stretch Leggings", sku: "PB-YL-SL", description: "Four-way stretch leggings with sculpting seams.", images: 1 },
      { slug: "lifestyle", name: "Lifestyle Sportswear", sku: "PB-YL-LS", description: "Crewnecks, joggers and tees for everyday wear.", images: 1 },
      { slug: "casual", name: "Casual Sporty Clothing", sku: "PB-YL-CS", description: "Easy fits in heavy cotton and modal blends.", images: 1 },
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
      { slug: "cycling", name: "Cycling Wear", sku: "PB-SS-CY", description: "Jerseys, bib shorts and gilets with race-cut construction.", images: 1 },
      { slug: "swimwear", name: "Swimwear", sku: "PB-SS-SW", description: "Chlorine-resistant racing and training swimwear.", images: 1 },
      { slug: "tennis", name: "Tennis Wear", sku: "PB-SS-TN", description: "Polos, skirts and shorts in performance pique.", images: 1 },
      { slug: "golf", name: "Golf Wear", sku: "PB-SS-GF", description: "Premium polos, quarter-zips and trousers.", images: 1 },
      { slug: "winter", name: "Winter Sportswear", sku: "PB-SS-WT", description: "Insulated layers for ski, snowboard and alpine training.", images: 1 },
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
      { slug: "caps", name: "Caps", sku: "PB-AC-CP", description: "5- and 6-panel caps with structured and unstructured crowns.", images: 1 },
      { slug: "socks", name: "Socks", sku: "PB-AC-SK", description: "Crew, ankle and compression socks in technical blends.", images: 1 },
      { slug: "gym-bags", name: "Gym Bags", sku: "PB-AC-GB", description: "Duffles and backpacks in ballistic nylon and cordura.", images: 1 },
      { slug: "gloves", name: "Gloves", sku: "PB-AC-GL", description: "Training, lifting and cycling gloves with padded palms.", images: 1 },
    ],
  },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

export const WHATSAPP_NUMBER = "923000000000"; // placeholder — replace with real number
export const CONTACT_EMAIL = "info@peterandbarbara.com";
export const CONTACT_PHONE = "+92 300 000 0000";
export const COMPANY_ADDRESS = "Sialkot, Punjab, Pakistan";

export function inquireWhatsappLink(productName: string, sku: string) {
  const text = encodeURIComponent(
    `Hello Peter & Barbara, I'd like to inquire about: ${productName} (SKU: ${sku}). Please share MOQ, pricing and lead time.`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
