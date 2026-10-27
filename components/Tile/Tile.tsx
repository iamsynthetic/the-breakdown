
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/Button/Button";
import styles from "./Tile.module.css";

type TileProps = {
  imageSrc: string;
  imageAlt?: string;
  preHeadline?: string;
  headline?: string;
  body?: string;
  buttonText?: string;
  buttonHref?: string;
  sizes?: string;
  clickableImageAndHeadline?: boolean;
  reviewScore?: number;
  showReviewScore?: boolean;
  layout?: "vertical" | "horizontal";
  imageSize?: "default" | "small";
};

export default function Tile({
  imageSrc,
  imageAlt = "",
  preHeadline,
  headline,
  body,
  buttonText = "Read More",
  buttonHref,
  sizes = "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw",
  clickableImageAndHeadline = false,
  reviewScore,
  showReviewScore = false,
  layout = "vertical",
  imageSize = "default",
}: TileProps) {
  const isClickable = clickableImageAndHeadline && !!buttonHref;

  const tileClassName = [
    styles.tile,
    layout === "horizontal" ? styles.horizontal : "",
    imageSize === "small" ? styles.smallImage : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={tileClassName}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        {isClickable ? (
          <Link
            href={buttonHref!}
            className={styles.imageLink}
            aria-label={headline || buttonText}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes={sizes}
            />
          </Link>
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes={sizes}
          />
        )}
      </div>

      {/* Text and optional review score */}
      <div className={styles.tileContent}>
        <div className={styles.tileInfo}>
          <div className={styles.tileDetails}>
            {preHeadline && (
              <p className={styles.preHeadline}>
                {preHeadline}
              </p>
            )}

            {headline && (
              <h3 className={styles.headline}>
                {isClickable ? (
                  <Link
                    href={buttonHref!}
                    className={styles.headlineLink}
                  >
                    {headline}
                  </Link>
                ) : (
                  headline
                )}
              </h3>
            )}
          </div>

          {showReviewScore && reviewScore != null && (
            <span className={styles.reviewScore}>
              {reviewScore.toFixed(1)}
            </span>
          )}
        </div>

        {body && <p className={styles.body}>{body}</p>}

        {buttonHref && (
          <div className={styles.buttonWrapper}>
            <Button
              buttonText={buttonText}
              buttonHref={buttonHref}
              variant="transparent"
            />
          </div>
        )}
      </div>
    </article>
  );
}
