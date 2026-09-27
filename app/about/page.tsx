import { Footer } from "@/components/layout/Footer";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>About</p>
        <h1 className={styles.title}>Built to move.<br />Not made to blend in.</h1>
      </section>

      <section className={styles.body}>
        <p>
          NØIR started as a question: what does a wardrobe look like when
          every piece is built to be worn, not just photographed. Issue 001
          is our answer — a small collection of structured, considered
          garments in wool and cotton, made to hold their shape through
          actual use.
        </p>
        <p>
          Each issue is a complete story, not a seasonal drop. We publish
          when there is something worth publishing.
        </p>
      </section>

      <Footer />
    </main>
  );
}
