import Tile from "../../Tile/Tile";
import TileGrid from "../../TileGrid/TileGrid";
import FormatDate from "../../../utils/FormatDate";
import styles from "./NewReviews.module.css";

type Bandlist = {
  sys: { id: string };
  fields: {
    tag?: string;
    band?: string;
    album?: string;
    publishDate?: string;
    reviewScore?: number;
    thumbnail?: {
      fields?: {
        title?: string;
        description?: string;
        file?: {
          url?: string;
        };
      };
    };
    slug?: string;
  };
};

type NewReviewsProps = {
  bandlists: Bandlist[];
  limit?: number;
  tag?: string;
};

// Missing or invalid dates sort to the bottom
const toTime = (value?: string) => {
  const t = new Date(value ?? "").getTime();
  return Number.isNaN(t) ? -Infinity : t;
};

// Removes a trailing "-2" (used to keep duplicate slugs unique in Contentful)
const cleanSlug = (slug?: string) => (slug ? slug.replace(/-2$/, "") : "");

export default function NewReviews({
  bandlists,
  limit = 4,
  tag = "home-new-reviews",
}: NewReviewsProps) {
  const reviews = bandlists
    .filter(
      (item) =>
        item.fields?.tag === tag && item.fields?.thumbnail?.fields?.file?.url
    )
    .sort((a, b) => toTime(b.fields.publishDate) - toTime(a.fields.publishDate))
    .slice(0, limit);

  return (
    <div className={styles.reviews}>
      <TileGrid columns={4}>
        {reviews.map((bandlist) => {
          const { band, album, publishDate, reviewScore, thumbnail, slug } =
            bandlist.fields;
          const url = thumbnail?.fields?.file?.url;

          return (
            <Tile
              key={bandlist.sys.id}
              imageSrc={`https:${url}?w=800&fm=webp&q=80`}
              imageAlt={
                thumbnail?.fields?.description ||
                thumbnail?.fields?.title ||
                ""
              }
              preHeadline={FormatDate(publishDate)}
              headline={band}
              body={album}
              buttonText="Read Review"
              buttonHref={slug ? `/article/${cleanSlug(slug)}` : "/news"}
              sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
              clickableImageAndHeadline
              reviewScore={reviewScore}
              showReviewScore
            />
          );
        })}
      </TileGrid>
    </div>
  );
}
