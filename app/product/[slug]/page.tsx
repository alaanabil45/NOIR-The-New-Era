import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { PurchasePanel } from "@/components/products/PurchasePanel";
import { Accordion } from "@/components/ui/Accordion";
import { Footer } from "@/components/layout/Footer";
import styles from "./page.module.css";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <a href="/#shop" className={styles.back}>
          ← Back to collection
        </a>
      </div>

      <div className={styles.layout}>
        <ProductGallery product={product} />

        <div className={styles.details}>
          <p className={styles.eyebrow}>The Piece</p>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>${product.price}</p>

          <PurchasePanel product={product} />

          <Accordion
            items={[
              { title: "Material", content: product.material },
              { title: "Fit", content: product.fit },
              { title: "Care", content: product.care },
              {
                title: "Shipping & returns",
                content:
                  "Ships in 2–4 business days. Free returns within 30 days of delivery.",
              },
            ]}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
