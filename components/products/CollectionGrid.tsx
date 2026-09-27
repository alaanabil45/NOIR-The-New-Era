import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import styles from "./CollectionGrid.module.css";

export function CollectionGrid() {
  return (
    <section id="shop" className={`scene ${styles.scene}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Shop</h2>
        <a href="/shop" className={styles.viewAll}>
          View all — {products.length} pieces
        </a>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}