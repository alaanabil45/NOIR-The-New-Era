"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";
import styles from "./page.module.css";

export default function CheckoutPage() {
    const { lines, subtotal } = useCart();
    const [placed, setPlaced] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const shipping = lines.length > 0 ? 0 : 0; // free shipping, prototype
    const total = subtotal + shipping;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (lines.length === 0) return;
        setSubmitting(true);
        // Front-end prototype only — no real payment processing.
        setTimeout(() => {
            setSubmitting(false);
            setPlaced(true);
        }, 700);
    }

    if (placed) {
        return (
            <main className={styles.main}>
                <section className={styles.confirmation}>
                    <p className={styles.eyebrow}>Order confirmed</p>
                    <h1 className={styles.confirmTitle}>Thank you.</h1>
                    <p className={styles.confirmBody}>
                        Your order has been placed. A confirmation and tracking link
                        will follow by email once it ships.
                    </p>
                    <a href="/" className={styles.backHome}>
                        Back to NØIR
                    </a>
                </section>
            </main>
        );
    }

    if (lines.length === 0) {
        return (
            <main className={styles.main}>
                <section className={styles.empty}>
                    <p className={styles.eyebrow}>Checkout</p>
                    <h1 className={styles.confirmTitle}>Your bag is empty.</h1>
                    <a href="/shop" className={styles.backHome}>
                        Continue shopping
                    </a>
                </section>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.top}>
                <a href="/" className={styles.back}>
                    ← Continue shopping
                </a>
            </div>

            <div className={styles.layout}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <section className={styles.formSection}>
                        <p className={styles.sectionTitle}>Contact</p>
                        <input type="email" placeholder="Email" required className={styles.input} />
                    </section>

                    <section className={styles.formSection}>
                        <p className={styles.sectionTitle}>Shipping address</p>
                        <div className={styles.row}>
                            <input type="text" placeholder="First name" required className={styles.input} />
                            <input type="text" placeholder="Last name" required className={styles.input} />
                        </div>
                        <input type="text" placeholder="Address" required className={styles.input} />
                        <div className={styles.row}>
                            <input type="text" placeholder="City" required className={styles.input} />
                            <input type="text" placeholder="Postal code" required className={styles.input} />
                        </div>
                        <input type="text" placeholder="Country" required className={styles.input} />
                    </section>

                    <section className={styles.formSection}>
                        <p className={styles.sectionTitle}>Payment</p>
                        <input type="text" placeholder="Card number" required className={styles.input} />
                        <div className={styles.row}>
                            <input type="text" placeholder="MM / YY" required className={styles.input} />
                            <input type="text" placeholder="CVC" required className={styles.input} />
                        </div>
                        <p className={styles.paymentNote}>
                            This is a front-end prototype. No payment is processed.
                        </p>
                    </section>

                    <button type="submit" className={styles.submit} disabled={submitting}>
                        {submitting ? "Placing order…" : `Place order — $${total}`}
                    </button>
                </form>

                <aside className={styles.summary}>
                    <p className={styles.sectionTitle}>Order summary</p>
                    <ul className={styles.lines}>
                        {lines.map((line) => (
                            <li key={`${line.product.id}-${line.size}`} className={styles.line}>
                                <div className={styles.thumb}>
                                    <Image
                                        src={line.product.images[0].src}
                                        alt={line.product.images[0].alt}
                                        fill
                                        sizes="72px"
                                        className={styles.thumbImage}
                                    />
                                    <span className={styles.qtyBadge}>{line.quantity}</span>
                                </div>
                                <div className={styles.lineInfo}>
                                    <span>{line.product.name}</span>
                                    <span className={styles.lineMeta}>Size {line.size}</span>
                                </div>
                                <span>${line.product.price * line.quantity}</span>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.totals}>
                        <div className={styles.totalRow}>
                            <span>Subtotal</span>
                            <span>${subtotal}</span>
                        </div>
                        <div className={styles.totalRow}>
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}