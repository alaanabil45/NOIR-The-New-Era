import styles from "./SocialLinks.module.css";

// Replace these URLs with the brand's real accounts.
const SOCIALS = [
    {
        label: "Instagram",
        href: "https://www.instagram.com/",
        icon: (
            <>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
            </>
        ),
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/",
        icon: (
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        ),
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/",
        icon: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />,
    },
];

export function SocialLinks() {
    return (
        <ul className={styles.list}>
            {SOCIALS.map((social) => (
                <li key={social.label}>
                    <a
                        href={social.href}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            {social.icon}
                        </svg>
                    </a>
                </li>
            ))}
        </ul>
    );
}