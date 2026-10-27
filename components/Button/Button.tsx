import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
  buttonText?: string;
  buttonHref?: string;
  variant?: 'filled' | 'transparent';
};

export default function Button({
  buttonText,
  buttonHref,
  variant="filled",
}: ButtonProps) {
  if (!buttonText || !buttonHref) return null;

  return (
    <Link href={buttonHref} className={`${styles.button} ${styles[variant]}`}>
      <span className={styles.buttonText}>
        {buttonText}
      </span>
    </Link>
  );
}
