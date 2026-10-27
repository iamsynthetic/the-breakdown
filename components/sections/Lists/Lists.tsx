
import Image from "next/image";
import Link from "next/link";
import Button from "../../Button/Button";
import FormatDate from "../../../utils/FormatDate";
import styles from "./Lists.module.css";

type ContentfulList = {
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

type ListsProps = {
  thelists: ContentfulList[];
  tag?: string;
  limit?: number;
};

export default function Lists({
  thelists = [],
  tag="home-lists",
  limit = 3,
}: ListsProps) {
  const items = thelists
    .filter((item) => !tag || item.fields.tag === tag)
    .filter((item) => item.fields.thumbnail?.fields?.file?.url)
    .slice(0, limit);

  return (
    <section className={styles.lists}>
      <div className={styles.listRows}>
        {items.map((item) => {
          const {
            tag,
            band,
            album,
            reviewScore,
            preheadline,
            title,
            subheadline,
            excerpt,
            storyby,
            imagesby,
            thumbnail,
            slug,
          } = item.fields;

          const imageUrl = thumbnail?.fields?.file?.url;

          if (!imageUrl) return null;

          const href = slug ? `/lists/${slug}` : "/lists";

          return (
            <article
              key={item.sys.id}
              className={styles.listRow}
            >
              <Link
                href={href}
                className={styles.imageLink}
                aria-label={title || album || band || "Read list"}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={`https:${imageUrl}?w=900&fm=webp&q=80`}
                    alt={
                      thumbnail?.fields?.description ||
                      thumbnail?.fields?.title ||
                      ""
                    }
                    fill
                    sizes="(max-width: 700px) 100vw, 40vw"
                    className={styles.image}
                  />
                </div>
              </Link>

              <div className={styles.content}>
                <div className={styles.text}>
                  {preheadline && (
                    <p className={styles.preHeadline}>
                      {preheadline}
                    </p>
                  )}

                  <h2 className={styles.headline}>
                    {title || album || band}
                  </h2>

                  {storyby && (
                    <p className={styles.storyby}>
                      Article: {storyby}
                    </p>
                  )}
                  {imagesby && (
                    <p className={styles.imagesby}>
                      Photography: {imagesby}
                    </p>
                  )}
                </div>

                <div className={styles.buttonWrapper}>
                  <Button
                    buttonText="Read List"
                    buttonHref={href}
                    variant="transparent"
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
