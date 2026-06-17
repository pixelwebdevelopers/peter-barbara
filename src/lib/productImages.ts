// Auto-detects product images from the filesystem at build time.
//
// Drop images into:  src/assets/products/<category-slug>/<subcategory-slug>/1.jpg
// (1.jpg, 2.jpg, 3.png, ...). They are picked up automatically — no code change,
// no manual count. The dev server hot-reloads; production just needs a rebuild.
//
// Vite resolves this glob at build time, emits each image with a content-hashed,
// cache-friendly URL, and inlines the resulting { path -> url } map below.
const files = import.meta.glob(
  "../assets/products/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

export type ProductImage = {
  categorySlug: string;
  subSlug: string;
  index: number;
  url: string;
};

// category slug -> subcategory slug -> ordered image urls
const byCategory: Record<string, Record<string, string[]>> = {};
const all: ProductImage[] = [];

for (const [path, url] of Object.entries(files)) {
  const parts = path.split("/");
  const fileName = parts[parts.length - 1]; // e.g. "1.jpg"
  const subSlug = parts[parts.length - 2];
  const categorySlug = parts[parts.length - 3];
  const index = parseInt(fileName, 10) || 0;

  (byCategory[categorySlug] ??= {});
  (byCategory[categorySlug][subSlug] ??= []).push(url);
  all.push({ categorySlug, subSlug, index, url });
}

// Sort each subcategory by numeric filename (1, 2, 3 ...).
const numericFromUrl = (url: string) => {
  const m = url.match(/(\d+)(?:-[A-Za-z0-9]+)?\.[a-z]+(?:\?.*)?$/i);
  return m ? parseInt(m[1], 10) : 0;
};
for (const cat of Object.values(byCategory)) {
  for (const sub of Object.keys(cat)) {
    cat[sub].sort((a, b) => numericFromUrl(a) - numericFromUrl(b));
  }
}
all.sort((a, b) => a.index - b.index);

/** Ordered image URLs for a given category + subcategory (empty if none found). */
export function getImages(categorySlug: string, subSlug: string): string[] {
  return byCategory[categorySlug]?.[subSlug] ?? [];
}

/** First image for a subcategory, or undefined if the folder is empty. */
export function getCoverImage(categorySlug: string, subSlug: string): string | undefined {
  return getImages(categorySlug, subSlug)[0];
}

/** Every product image across the catalog. */
export const ALL_PRODUCT_IMAGES = all;
