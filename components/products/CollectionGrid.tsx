import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import styles from "./CollectionGrid.module.css";

export function CollectionGrid() {
  return (
    <section id="shop" className={`scene ${styles.scene}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Shop</h2>
        <p className={styles.count}>{products.length} pieces</p>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
