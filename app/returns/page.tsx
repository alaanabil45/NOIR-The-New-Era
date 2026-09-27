import { Footer } from "@/components/layout/Footer";
import styles from "../about/page.module.css";

export default function ReturnsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Returns</p>
        <h1 className={styles.title}>30 days.<br />No questions.</h1>
      </section>

      <section className={styles.body}>
        <p>
          Unworn pieces with tags attached can be returned within 30 days
          of delivery for a full refund. Return shipping is free for
          domestic orders.
        </p>
        <p>
          Start a return from your order confirmation email, or contact us
          directly and we will send a prepaid label.
        </p>
      </section>

      <Footer />
    </main>
  );
}
