import Image from "next/image";
import { looks, products } from "@/data/products";
import { Footer } from "@/components/layout/Footer";
import { LooksReveal } from "@/components/animation/LooksReveal";
import styles from "./page.module.css";

export default function LooksPage() {
    return (
        <main className={styles.main}>
            <LooksReveal />

            <div className={styles.top}>
                <a href="/" className={styles.back}>
                    ← Back
                </a>
            </div>

            <header className={styles.header} data-looks-header>
                <p className={styles.eyebrow}>Issue 001</p>
                <h1 className={styles.title}>The Looks</h1>
            </header>

            <div className={styles.list}>
                {looks.map((look, index) => {
                    const items = look.productIds
                        .map((id) => products.find((p) => p.id === id))
                        .filter(Boolean) as typeof products;
                    const total = items.reduce((sum, p) => sum + p.price, 0);

                    return (
                        <article
                            key={look.id}
                            data-look
                            className={`${styles.look} ${index % 2 === 1 ? styles.lookReverse : ""}`}
                        >
                            <a href={`/look/${look.slug}`} className={styles.imageLink}>
                                <div className={styles.imageWrap} data-look-frame>
                                    <Image
                                        src={look.image.src}
                                        alt={look.image.alt}
                                        fill
                                        sizes="(min-width: 900px) 46vw, 100vw"
                                        className={styles.image}
                                    />
                                </div>
                            </a>

                            <div className={styles.info} data-look-info>
                                <h2 className={styles.lookName}>{look.name}</h2>
                                <ul className={styles.items}>
                                    {items.map((item) => (
                                        <li key={item.id}>
                                            <a href={`/product/${item.slug}`}>{item.name}</a>
                                            <span>${item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className={styles.total}>Complete look — ${total}</p>
                                <a href={`/look/${look.slug}`} className={styles.cta}>
                                    Shop the look
                                </a>
                            </div>
                        </article>
                    );
                })}
            </div>

            <Footer />
        </main>
    );
}