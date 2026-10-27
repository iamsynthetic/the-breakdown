
import Link from "next/link";
import Contact from "../sections/Contact/Contact";
import styles from "./Footer.module.css";

type FooterLink = {
  label: string;
  href: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type FooterProps = {
  siteName?: string;
  description?: string;
  sections?: FooterLink[];
  resources?: FooterLink[];
  copyrightName?: string;
  showContact?: boolean;
};

const defaultSections: FooterLink[] = [
  { label: "HOME", href: "/" },
  { label: "NEWS", href: "/news" },
  { label: "REVIEWS", href: "/reviews" },
  { label: "RELEASES", href: "/releases" },
  { label: "ANTICIPATED", href: "/anticipated" },
  { label: "LISTS", href: "/thelists" },
  { label: "COLUMNISTS", href: "/columnists" },
  { label: "LISTENING TO", href: "/listening-to" },
  { label: "CONTACT", href: "/contact" },
];

const defaultResources: FooterLink[] = [
  { label: "SUBSCRIBE", href: "/" },
  { label: "NEWSLETTER", href: "/" },
  { label: "RSS", href: "/" },
  { label: "SITEMAP", href: "/" },
  { label: "PRIVACY POLICY", href: "/" },
  { label: "CAREERS", href: "/" },
  { label: "ACCESSIBILITY HELP", href: "/" },
  { label: "FAQ", href: "/" },
];

export default function Footer({
  siteName = "THE BREAKDOWN",
  description = "The Breakdown is an independent publication devoted to heavy music as art, culture, and community.",
  sections = defaultSections,
  resources = defaultResources,
  copyrightName,
  showContact = true,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {showContact && (
        <Contact
          preHeadline="JOIN THE COMMUNITY"
          headline="Never Miss Another Breakdown."
          subheadline="Get the latest reviews, new releases, and underground music stories delivered straight to your inbox."
          wordmark="New music. No noise."
        />
      )}
      <div className={styles.footerInner}>
        {/* First row: three columns */}
        <div className={styles.topRow}>
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.siteName}>
              {siteName}
            </Link>

            <p className={styles.description}>
              {description}
            </p>

            <div className={styles.socials}>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles.socialLink}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h1.7V1.4C17 1.2 15.8 1 14.5 1 11.5 1 9.5 2.8 9.5 6.2V9H6v4h3.5v8H14Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className={styles.socialLink}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M23 7a3 3 0 0 0-2.1-2.1C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7a31 31 0 0 0-.5 5 31 31 0 0 0 .5 5 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 17a31 31 0 0 0 .5-5 31 31 0 0 0-.5-5ZM9.7 15.5v-7l6 3.5-6 3.5Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          <nav className={styles.linkColumn} aria-label="Main navigation">
            <h2 className={styles.columnTitle}>Sections</h2>

            <ul className={styles.linkList}>
              {sections.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.linkColumn} aria-label="Additional links">
            <h2 className={styles.columnTitle}>More</h2>

            <ul className={styles.linkList}>
              {resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Second row: full-width copyright */}
        <div className={styles.bottomRow}>
          <hr className={styles.divider} />

          <p className={styles.copyright}>
            © {currentYear} {copyrightName || siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
