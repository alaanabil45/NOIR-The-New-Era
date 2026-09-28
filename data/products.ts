export type ProductCategory =
  | "jackets"
  | "tops"
  | "bottoms"
  | "accessories";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  material: string;
  fit: string;
  care: string;
  sizes: string[];
  colors: string[];
  images: {
    src: string;
    alt: string;
  }[];
  featured?: boolean;
  collection: string;
  newArrival?: boolean;
}

export interface Look {
  id: string;
  slug: string;
  name: string;
  image: { src: string; alt: string };
  productIds: string[];
}

// Placeholder paths — replace files under /public/images/products with real
// editorial photography using these exact filenames, or update the paths.
export const products: Product[] = [
  {
    id: "p001",
    slug: "structured-wool-jacket",
    name: "The Jacket",
    price: 120,
    category: "jackets",
    description: "Structured wool jacket",
    material: "70% wool / 30% cotton twill",
    fit: "Boxy, dropped shoulder",
    care: "Dry clean only",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    images: [
      { src: "/images/products/jacket-01.jpg", alt: "The Jacket, front view" },
      { src: "/images/products/jacket-02.jpg", alt: "The Jacket, detail of stitching" },
      { src: "/images/products/jacket-03.jpg", alt: "The Jacket, back view" },
    ],
    featured: true,
    collection: "issue-001",
    newArrival: true,
  },
  {
    id: "p002",
    slug: "tapered-wool-trousers",
    name: "The Trousers",
    price: 80,
    category: "bottoms",
    description: "Tapered wool trousers",
    material: "100% wool",
    fit: "High-rise, tapered leg",
    care: "Dry clean only",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Charcoal"],
    images: [
      { src: "/images/products/trousers-01.jpg", alt: "The Trousers, front view" },
      { src: "/images/products/trousers-02.jpg", alt: "The Trousers, detail" },
    ],
    collection: "issue-001",
    newArrival: false,
  },
  {
    id: "p003",
    slug: "leather-derby",
    name: "The Shoes",
    price: 110,
    category: "accessories",
    description: "Leather derby shoe",
    material: "Full-grain leather, leather sole",
    fit: "True to size",
    care: "Wipe clean, condition monthly",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Black"],
    images: [
      { src: "/images/products/shoes-01.jpg", alt: "The Shoes, side view" },
      { src: "/images/products/shoes-02.jpg", alt: "The Shoes, detail of sole" },
    ],
    collection: "issue-001",
  },
  {
    id: "p004",
    slug: "oversized-linen-blazer",
    name: "The Blazer",
    price: 140,
    category: "jackets",
    description: "Oversized textured blazer",
    material: "Linen-wool blend, textured weave",
    fit: "Oversized, long line, relaxed shoulder",
    care: "Dry clean only",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Charcoal"],
    images: [
      { src: "/images/products/blazer-01.jpg", alt: "The Blazer, front view" },
      { src: "/images/products/blazer-02.jpg", alt: "The Blazer, fabric detail" },
    ],
    collection: "issue-001",
    newArrival: true,
  },
  {
    id: "p005",
    slug: "fluid-black-shirt",
    name: "The Shirt",
    price: 70,
    category: "tops",
    description: "Fluid black shirt",
    material: "100% viscose",
    fit: "Relaxed, soft drape",
    care: "Hand wash cold, hang dry",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    images: [
      { src: "/images/products/shirt-01.jpg", alt: "The Shirt, front view" },
      { src: "/images/products/shirt-02.jpg", alt: "The Shirt, detail" },
    ],
    collection: "issue-001",
    newArrival: true,
  },
  {
    id: "p006",
    slug: "wide-leg-linen-trousers",
    name: "The Wide Trousers",
    price: 95,
    category: "bottoms",
    description: "Wide-leg pleated linen trousers",
    material: "100% linen",
    fit: "High-rise, deep pleats, wide leg",
    care: "Machine wash cold, iron damp",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Taupe"],
    images: [
      { src: "/images/products/wide-trousers-01.jpg", alt: "The Wide Trousers, front view" },
      { src: "/images/products/wide-trousers-02.jpg", alt: "The Wide Trousers, fabric detail" },
    ],
    collection: "issue-001",
    newArrival: true,
  },

];

export const looks: Look[] = [
  {
    id: "l001",
    slug: "look-01",
    name: "Look 01",
    image: { src: "/images/looks/look-01.jpg", alt: "Full outfit, Look 01" },
    productIds: ["p001", "p002", "p003"],
  },
  {
    id: "l002",
    slug: "look-02",
    name: "Look 02",
    image: {
      src: "/images/looks/look-02.jpg",
      alt: "Model in an oversized charcoal blazer, black shirt and wide-leg linen trousers",
    },
    productIds: ["p004", "p005", "p006"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}
