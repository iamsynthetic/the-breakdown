import Image from "next/image";
import Link from "next/link";
import Button from "../../Button/Button";
import FormatDate from "../../../utils/FormatDate";
import styles from "./Columnists.module.css";

type Columnist = {
  sys: { id: string };
  fields: {
    tag?: string;
    band?: string;
    album?: string;
    reviewScore?: string;
    preheadline?: string;
    title?: string;
    subheadline?: string;
    excerpt?: string;
    storyby?: string;
    imagesby?: string;
    publishDate?: string;
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

type ColumnistsProps = {
  writers?: Columnist[];
  limit?: number;
  tag?: string;
};

// Missing or invalid dates sort to the bottom
const toTime = (value?: string) => {
  const t = new Date(value ?? "").getTime();
  return Number.isNaN(t) ? -Infinity : t;
};

export default function Columnists({
  writers = [],
  limit = 3,
  tag = "home-columnists",
}: ColumnistsProps) {
  const columnists = writers
    .filter(
      (item) =>
        item.fields?.tag === tag && item.fields?.thumbnail?.fields?.file?.url
    )
    // .sort((a, b) => toTime(b.fields.publishDate) - toTime(a.fields.publishDate))
    // .slice(0, limit);

  return (
    <section className={styles.columnists}>
      <div className={styles.grid}>
        {columnists.map((columnist) => {
          const { tag, band, album, reviewScore, preheadline, title, subheadline, excerpt, storyby, imagesby, thumbnail, slug } =
            columnist.fields;

          const imageUrl = thumbnail?.fields?.file?.url;
          const href = slug ? `/article/${slug}` : "/news";

          return (
            <article key={columnist.sys.id} className={styles.card}>

                <div className={styles.imageWrapper}>
                  <Image
                    src={`https:${imageUrl}?w=900&fm=webp&q=80`}
                    alt={
                      thumbnail?.fields?.description ||
                      thumbnail?.fields?.title ||
                      band ||
                      ""
                    }
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    className={styles.image}
                  />
                </div>

              <div className={styles.content}>
                {preheadline && (
                  <p className={styles.preHeadline}>
                    {preheadline}
                  </p>
                )}

                {title && <h2 className={styles.headline}>{title}</h2>}

                {subheadline && <p className={styles.body}>{subheadline}</p>}

                {/*{slug && (
                  <div className={styles.buttonWrapper}>
                    <Button
                      buttonText="Read More"
                      buttonHref={href}
                      variant="transparent"
                    />
                  </div>
                )}*/}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
