import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import styles from "./MainArticle.module.css";

export default function MainArticle({
  bodyCopy,
  quote,
  articleImage,
  variant = "article",
}) {
  const imageFile = articleImage?.fields?.file;

  //Add more variants here later
  const variantClasses = {
    article: {
      root: styles.mainArticle,
      body: styles.mainArticleBody,
    },
    list: {
      root: styles.mainList,
      body: styles.mainListBody,
    }
  };

  const classes = variantClasses[variant] ?? variantClasses.article;

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = node.data.target;
        const file = asset?.fields?.file;

        if (!file?.url) return null;

        return (
          <figure
            className={styles.articleImage}
            key={asset.sys.id}
          >
            <Image
              src={`https:${file.url}`}
              alt={asset.fields.description || asset.fields.title || ""}
              width={file.details?.image?.width || 1200}
              height={file.details?.image?.height || 800}
              sizes="(max-width: 768px) 100vw, 1000px"
            />
          </figure>
        );
      },
    },
  };

  return (
    <article className={classes.root}>
      {bodyCopy && (
        <div className={classes.body}>
          {documentToReactComponents(bodyCopy, options)}
        </div>
      )}

      {/* {quote && (
        <blockquote className={styles.quote}>
          <p>{quote}</p>
        </blockquote>
      )}*/}

      {imageFile && (
        <figure className={styles.articleImage}>
          <Image
            src={`https:${imageFile.url}`}
            alt={articleImage.fields.description || ""}
            width={imageFile.details.image.width}
            height={imageFile.details.image.height}
            sizes="(max-width: 768px) 100vw, 1000px"
          />
        </figure>
      )}
    </article>
  );
}
