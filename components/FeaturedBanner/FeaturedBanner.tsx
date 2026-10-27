
import Image from "next/image";
import Button from "../Button/Button";
import styles from "./FeaturedBanner.module.css";

type FeaturedBannerProps = {
  preHeadline?: string;
  headline?: string;
  subheadline?: string;
  body?: string;
  wordmark?: string;

  buttonText?: string;
  buttonHref?: string;
  buttonVariant?: "filled" | "transparent";

  imageSrc: string;
  imageAlt?: string;

  height?: number;
  imagePadding?: number;

  backgroundOpacity?: number;

  overlayColor?: string;
  overlayOpacity?: number;

  gradientColor?: string;
  gradientFromOpacity?: number;
  gradientToOpacity?: number;
  gradientDirection?: string;
};

export default function FeaturedBanner({
  preHeadline,
  headline,
  subheadline,
  body,
  wordmark,

  buttonText,
  buttonHref,
  buttonVariant = "filled",

  imageSrc,
  imageAlt = "",

  height = 650,
  imagePadding = 40,

  backgroundOpacity = 0.3,

  overlayColor = "#000000",
  overlayOpacity = 0.2,

  gradientColor = "#000000",
  gradientFromOpacity = 1,
  gradientToOpacity = 0,
  gradientDirection = "to bottom",
}: FeaturedBannerProps) {
  const bannerStyle = {
    "--banner-height": `${height}px`,
    "--image-padding": `${imagePadding}px`,
    "--background-opacity": backgroundOpacity,
    "--overlay-color": overlayColor,
    "--overlay-opacity": overlayOpacity,
    "--gradient-color": gradientColor,
    "--gradient-from-opacity": gradientFromOpacity,
    "--gradient-to-opacity": gradientToOpacity,
    "--gradient-direction": gradientDirection,
  } as React.CSSProperties;

  return (
    <section
      className={styles.featuredBanner}
      style={bannerStyle}
    >
      {/* Background image */}
      <div className={styles.backgroundImage}>
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* Custom color overlay */}
      <div className={styles.colorOverlay} />

      {/* Gradient overlay */}
      <div className={styles.gradientOverlay} />

      {/* Foreground content */}
      <div className={styles.bannerContent}>
        <div className={styles.imageColumn}>
          <div className={styles.featuredImage}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 700px) 90vw, 40vw"
            />
          </div>
        </div>

        <div className={styles.textColumn}>
          {preHeadline && (
            <p className={styles.preHeadline}>
              {preHeadline}
            </p>
          )}

          {headline && (
            <h2 className={styles.headline}>
              {headline}
            </h2>
          )}

          {subheadline && (
            <p className={styles.subheadline}>
              {subheadline}
            </p>
          )}

          {body && (
            <p className={styles.body}>
              {body}
            </p>
          )}

          {wordmark && (
            <p className={styles.wordmark}>
              {wordmark}
            </p>
          )}
          <Button
            buttonText={buttonText}
            buttonHref={buttonHref}
          />
        </div>
      </div>
    </section>
  );
}
