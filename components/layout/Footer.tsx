import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <span className={styles.wordmark}>NØIR</span>
        <p className={styles.tagline}>Issue 001 — The New Era</p>
      </div>

      <div className={styles.columns}>
        <div>
          <p className={styles.heading}>Shop</p>
          <ul>
            <li><a href="#shop">New arrivals</a></li>
            <li><a href="#shop">Jackets</a></li>
            <li><a href="#shop">Accessories</a></li>
          </ul>
        </div>
        <div>
          <p className={styles.heading}>About</p>
          <ul>
            <li><a href="/about">The brand</a></li>
            <li><a href="/shipping">Shipping</a></li>
            <li><a href="/returns">Returns</a></li>
          </ul>
        </div>
        <div>
          <p className={styles.heading}>Follow</p>
          <ul>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>

      <p className={styles.legal}>© {new Date().getFullYear()} NØIR.</p>
    </footer>
  );
}
