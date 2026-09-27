import { products, type ProductCategory } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Footer } from "@/components/layout/Footer";
import styles from "./page.module.css";

const CATEGORIES: { label: string; value: ProductCategory | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Jackets", value: "jackets" },
    { label: "Tops", value: "tops" },
    { label: "Bottoms", value: "bottoms" },
    { label: "Accessories", value: "accessories" },
];

const SORTS = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
];

function buildHref(params: Record<string, string | undefined>) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "featured") search.set(key, value);
    });
    const qs = search.toString();
    return qs ? `/shop?${qs}` : "/shop";
}

export default function ShopPage({
    searchParams,
}: {
    searchParams: { category?: string; sort?: string; new?: string };
}) {
    const activeCategory: ProductCategory | "all" =
        searchParams.category && searchParams.category !== "all"
            ? (searchParams.category as ProductCategory)
            : "all";
    const activeSort = searchParams.sort || "featured";
    const newOnly = searchParams.new === "true";

    let filtered = products.filter((p) => {
        if (activeCategory !== "all" && p.category !== activeCategory) return false;
        if (newOnly && !p.newArrival) return false;
        return true;
    });

    if (activeSort === "price-asc") {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (activeSort === "price-desc") {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return (
        <main className={styles.main}>
            <div className={styles.top}>
                <a href="/" className={styles.back}>
                    ← Back
                </a>
            </div>

            <header className={styles.header}>
                <h1 className={styles.title}>{newOnly ? "New Arrivals" : "Shop"}</h1>
                <p className={styles.count}>{filtered.length} pieces</p>
            </header>

            <div className={styles.controls}>
                <nav className={styles.categories} aria-label="Filter by category">
                    {CATEGORIES.map((c) => (
                        <a
                            key={c.value}
                            href={buildHref({ category: c.value, sort: activeSort })}
                            className={`${styles.filterLink} ${activeCategory === c.value && !newOnly ? styles.filterActive : ""
                                }`}
                        >
                            {c.label}
                        </a>
                    ))}
                    <a
                        href={buildHref({ category: activeCategory, sort: activeSort, new: "true" })}
                        className={`${styles.filterLink} ${newOnly ? styles.filterActive : ""}`}
                    >
                        New Arrivals
                    </a>
                </nav>

                <nav className={styles.sorts} aria-label="Sort products">
                    {SORTS.map((s) => (
                        <a
                            key={s.value}
                            href={buildHref({
                                category: activeCategory,
                                sort: s.value,
                                new: newOnly ? "true" : undefined,
                            })}
                            className={`${styles.sortLink} ${activeSort === s.value ? styles.sortActive : ""}`}
                        >
                            {s.label}
                        </a>
                    ))}
                </nav>
            </div>

            {filtered.length === 0 ? (
                <p className={styles.empty}>No pieces here yet — check back soon.</p>
            ) : (
                <div className={styles.grid}>
                    {filtered.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            <Footer />
        </main>
    );
}