import Image from "next/image";
import styles from "./CollectionIntro.module.css";

const CATEGORIES = ["New Arrivals", "Jackets", "Tops", "Bottoms", "Accessories"];

export function CollectionIntro() {
  return (
    <section id="collection" className={`scene ${styles.scene}`}>
      <div className={styles.imageWrap}>
        <Image
          src="/images/editorial/collection-intro.jpg"
          alt="The collection, wide editorial photograph"
          fill
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>The Collection</h2>
        <ul className={styles.categories}>
          {CATEGORIES.map((category) => (
            <li key={category}>
              <a href={`#shop-${category.toLowerCase().replace(/\s+/g, "-")}`}>
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
