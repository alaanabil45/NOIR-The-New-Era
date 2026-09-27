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
    newArrival: true,
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
];

export const looks: Look[] = [
  {
    id: "l001",
    slug: "look-01",
    name: "Look 01",
    image: { src: "/images/looks/look-01.jpg", alt: "Full outfit, Look 01" },
    productIds: ["p001", "p002", "p003"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}
