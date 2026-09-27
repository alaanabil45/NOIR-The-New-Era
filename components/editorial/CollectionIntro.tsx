import Image from "next/image";
import styles from "./CollectionIntro.module.css";

const CATEGORIES: { label: string; href: string }[] = [
  { label: "New Arrivals", href: "/shop?new=true" },
  { label: "Jackets", href: "/shop?category=jackets" },
  { label: "Tops", href: "/shop?category=tops" },
  { label: "Bottoms", href: "/shop?category=bottoms" },
  { label: "Accessories", href: "/shop?category=accessories" },
];

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
            <li key={category.href}>
              <a href={category.href}>{category.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}