import { Footer } from "@/components/layout/Footer";
import styles from "../about/page.module.css";

export default function ShippingPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Shipping</p>
        <h1 className={styles.title}>Where your order goes,<br />and how fast.</h1>
      </section>

      <section className={styles.body}>
        <p>
          Orders ship within 2–4 business days. Domestic delivery takes
          3–6 business days after dispatch; international delivery takes
          7–14 business days depending on destination.
        </p>
        <p>
          You will receive a tracking link by email as soon as your order
          leaves our studio.
        </p>
      </section>

      <Footer />
    </main>
  );
}
