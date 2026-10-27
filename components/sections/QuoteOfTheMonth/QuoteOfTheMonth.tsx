
import styles from "./QuoteOfTheMonth.module.css";

type QuoteOfTheMonthProps = {
  preHeadline?: string;
  headline: string;
  subheadline?: string;
  wordmark?: string;
  quoter?: string;
};

export default function QuoteOfTheMonth({
  preHeadline = "QUOTE OF THE MONTH",
  headline,
  subheadline,
  wordmark,
  quoter,
}: QuoteOfTheMonthProps) {
  return (
    <section className={styles.quoteSection}>
      <div className={styles.content}>
        {preHeadline && (
          <p className={styles.preHeadline}>
            {preHeadline}
          </p>
        )}

        <h2 className={styles.headline}>
          {headline}
        </h2>

        {subheadline && (
          <p className={styles.subheadline}>
            {subheadline}
          </p>
        )}

        {wordmark && (
          <p className={styles.wordmark}>
            {wordmark}
          </p>
        )}
        {quoter && (
          <p className={styles.quoter}>
            {quoter}
          </p>
        )}
      </div>
    </section>
  );
}
