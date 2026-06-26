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

export type ProductItem = {
  id: string;
  categorySlug: string;
  subSlug: string;
  image: string;
  alternateImage?: string;
};

// Temp structure to group files before building ProductItem[]
// categorySlug -> subSlug -> productKey -> list of { fileName, url }
const rawGrouped: Record<
  string,
  Record<
    string,
    Record<
      string,
      {
        isFolder: boolean;
        files: { fileName: string; url: string }[];
      }
    >
  >
> = {};

const all: ProductImage[] = [];

for (const [path, url] of Object.entries(files)) {
  const parts = path.split("/");
  const prodIdx = parts.indexOf("products");
  if (prodIdx === -1 || parts.length <= prodIdx + 2) continue;

  const categorySlug = parts[prodIdx + 1];
  const subSlug = parts[prodIdx + 2];
  const remaining = parts.slice(prodIdx + 3);

  if (remaining.length === 0) continue;

  let productKey = "";
  let fileName = "";
  let isFolder = false;

  if (remaining.length === 2) {
    productKey = remaining[0]; // e.g. "1" (folder name)
    fileName = remaining[1];   // e.g. "1.webp" (file name)
    isFolder = true;
  } else {
    productKey = remaining[0]; // e.g. "4.webp"
    fileName = remaining[0];
    isFolder = false;
  }

  // Populate temp rawGrouped structure
  rawGrouped[categorySlug] ??= {};
  rawGrouped[categorySlug][subSlug] ??= {};
  rawGrouped[categorySlug][subSlug][productKey] ??= {
    isFolder,
    files: [],
  };
  rawGrouped[categorySlug][subSlug][productKey].files.push({ fileName, url });

  // Maintain ALL_PRODUCT_IMAGES compatibility
  const index = parseInt(fileName, 10) || 0;
  all.push({ categorySlug, subSlug, index, url });
}

// Build the final byCategory mapping of ProductItem[]
const byCategory: Record<string, Record<string, ProductItem[]>> = {};

const getSortVal = (id: string) => {
  const base = id.split(".")[0];
  const m = base.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : Infinity;
};

const getFileNumber = (name: string) => {
  const base = name.split(".")[0];
  const num = parseInt(base, 10);
  return isNaN(num) ? null : num;
};

for (const [categorySlug, subCats] of Object.entries(rawGrouped)) {
  byCategory[categorySlug] ??= {};
  for (const [subSlug, productsMap] of Object.entries(subCats)) {
    const products: ProductItem[] = [];

    for (const [productKey, data] of Object.entries(productsMap)) {
      let image = "";
      let alternateImage: string | undefined;

      if (data.isFolder) {
        // Find file matching "1" and "2"
        const file1 = data.files.find((f) => getFileNumber(f.fileName) === 1);
        const file2 = data.files.find((f) => getFileNumber(f.fileName) === 2);

        if (file1) {
          image = file1.url;
        } else if (data.files.length > 0) {
          // Fallback to first file if not explicitly named 1
          data.files.sort((a, b) => a.fileName.localeCompare(b.fileName));
          image = data.files[0].url;
        }

        if (file2) {
          alternateImage = file2.url;
        } else if (data.files.length > 1 && !file1) {
          alternateImage = data.files[1].url;
        }
      } else {
        // Single file product
        if (data.files.length > 0) {
          image = data.files[0].url;
        }
      }

      if (image) {
        products.push({
          id: productKey,
          categorySlug,
          subSlug,
          image,
          alternateImage,
        });
      }
    }

    // Sort products by their ID's numeric prefix, then alphabetically
    products.sort((a, b) => {
      const valA = getSortVal(a.id);
      const valB = getSortVal(b.id);
      if (valA !== valB) {
        return valA - valB;
      }
      return a.id.localeCompare(b.id);
    });

    byCategory[categorySlug][subSlug] = products;
  }
}

// Keep all array sorted
all.sort((a, b) => a.index - b.index);

/** Ordered product items for a given category + subcategory (empty if none found). */
export function getImages(categorySlug: string, subSlug: string): ProductItem[] {
  return byCategory[categorySlug]?.[subSlug] ?? [];
}

/** First image url for a subcategory, or undefined if the folder is empty. */
export function getCoverImage(categorySlug: string, subSlug: string): string | undefined {
  return byCategory[categorySlug]?.[subSlug]?.[0]?.image;
}

/** Every product image across the catalog. */
export const ALL_PRODUCT_IMAGES = all;

