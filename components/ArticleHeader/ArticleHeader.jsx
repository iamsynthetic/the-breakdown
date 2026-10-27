import Image from "next/image";
import { documentToReactComponents } from
  "@contentful/rich-text-react-renderer";

export default function ArticleHeader({
  preheadline,
  headline,
  body,
  wordmark,
}) {
  const wordmarkAsset = wordmark?.fields?.file;

  return (
    <section className="article-header">
      {preheadline && (
        <p className="article-header__preheadline">
          {preheadline}
        </p>
      )}

      {headline && (
        <h1 className="article-header__headline">
          {headline}
        </h1>
      )}

      {body && (
        <div className="article-header__body">
          {documentToReactComponents(body)}
        </div>
      )}

      {wordmarkAsset && (
        <div className="article-header__wordmark">
          <Image
            src={`https:${wordmarkAsset.url}`}
            alt={wordmark.fields.description || ""}
            width={wordmarkAsset.details.image.width}
            height={wordmarkAsset.details.image.height}
          />
        </div>
      )}
    </section>
  );
}
