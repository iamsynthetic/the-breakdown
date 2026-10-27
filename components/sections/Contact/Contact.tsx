
import { useState, type FormEvent } from "react";
import styles from "./Contact.module.css";

type ContactProps = {
  preHeadline?: string;
  headline: string;
  subheadline?: string;
  wordmark?: string;
};

export default function Contact({
  preHeadline = "STAY IN THE LOOP",
  headline,
  subheadline,
  wordmark,
}: ContactProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const validateEmail = (value: string) => {
    const trimmed = value.trim();

    // Basic email format checks
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

    if (!trimmed) {
      return "Please enter your email address.";
    }

    if (trimmed.length > 254 || !emailPattern.test(trimmed)) {
      return "Please enter a valid email address.";
    }

    const [localPart, domain] = trimmed.split("@");

    if (
      localPart.length > 64 ||
      localPart.startsWith(".") ||
      localPart.endsWith(".") ||
      localPart.includes("..") ||
      domain.split(".").some((part) => part.length > 63)
    ) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateEmail(email);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSubscribed(true);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (error) {
      setError("");
    }
  };

  return (
    <section className={styles.contact}>
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

        {!subscribed ? (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
          >
            <label
              htmlFor="contact-email"
              className={styles.label}
            >
              Email address
            </label>

            <div className={styles.formRow}>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) =>
                  handleEmailChange(event.target.value)
                }
                aria-invalid={!!error}
                aria-describedby={
                  error ? "contact-email-error" : undefined
                }
                className={styles.input}
                required
              />

              <button
                type="submit"
                className={styles.subscribeButton}
              >
                SUBSCRIBE
              </button>
            </div>

            {error && (
              <p
                id="contact-email-error"
                className={styles.error}
                role="alert"
              >
                {error}
              </p>
            )}
          </form>
        ) : (
          <p
            className={styles.thankYou}
            role="status"
            aria-live="polite"
          >
            Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
}
