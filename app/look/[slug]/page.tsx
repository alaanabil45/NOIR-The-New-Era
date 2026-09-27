import { notFound } from "next/navigation";
import Image from "next/image";
import { looks, products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Footer } from "@/components/layout/Footer";
import styles from "./page.module.css";

export function generateStaticParams() {
  return looks.map((l) => ({ slug: l.slug }));
}

export default function LookPage({ params }: { params: { slug: string } }) {
  const look = looks.find((l) => l.slug === params.slug);
  if (!look) notFound();

  const lookProducts = look.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  const total = lookProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <a href="/#collection" className={styles.back}>
          ← Back to collection
        </a>
      </div>

      <div className={styles.layout}>
        <div className={styles.imageWrap}>
          <Image
            src={look.image.src}
            alt={look.image.alt}
            fill
            sizes="(min-width: 900px) 55vw, 100vw"
            className={styles.image}
          />
        </div>

        <div className={styles.side}>
          <p className={styles.eyebrow}>The Look</p>
          <h1 className={styles.title}>{look.name}</h1>
          <p className={styles.total}>Complete look — ${total}</p>

          <div className={styles.grid}>
            {lookProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
