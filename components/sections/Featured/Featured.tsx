
import FeaturedBanner from "../../FeaturedBanner/FeaturedBanner";
import styles from './Featured.module.css'

type FeaturedProps = {
  imageSrc: string;
  imageAlt?: string;
  preHeadline?: string;
  headline?: string;
  subheadline?: string;
  body?: string;
  wordmark?: string;
  buttonText?: string;
  buttonHref?: string;
  overlayColor?: string;
  backgroundOpacity?: number;
  overlayOpacity?: number;
  gradientTopOpacity?: number;
  gradientBottomOpacity?: number;
};

export default function Featured({
  imageSrc,
  imageAlt = "",
  preHeadline = "Client Review",
  headline,
  subheadline,
  body,
  wordmark,
  buttonText = "Read Review",
  buttonHref,
  overlayColor = "#000000",
  backgroundOpacity=.3,
  overlayOpacity = .6,
  gradientTopOpacity = .6,
  gradientBottomOpacity = .3,
}: FeaturedProps) {
  return (
    <section className={styles.section}>
      <FeaturedBanner
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        preHeadline={preHeadline}
        headline={headline}
        subheadline={subheadline}
        body={body}
        wordmark={wordmark}
        buttonText={buttonText}
        buttonHref={buttonHref}
        buttonVariant="transparent"
        height={650}
        backgroundOpacity={backgroundOpacity}
        // overlayColor="#000000"
        overlayColor={overlayColor}
        overlayOpacity={overlayOpacity}
        gradientColor="#000000"
        gradientFromOpacity={gradientTopOpacity}
        gradientToOpacity={gradientBottomOpacity}
        gradientDirection="to bottom"
      />
    </section>
  );
}
