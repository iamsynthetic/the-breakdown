import { createClient } from "contentful";

import Hero from "../../components/sections/Hero/Hero";
import FeaturedReview from "../../components/sections/Featured/Featured";
import NewReviews from "../../components/sections/NewReviews/NewReviews";
import Lists from "../../components/sections/Lists/Lists";

const toImage = (asset) => ({
  url: `https:${asset.fields.file.url}`,
  alt: asset.fields.description || asset.fields.title || "",
});

const toPlainText = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value.nodeType === "text") return value.value ?? "";
  const parts = (value.content ?? []).map(toPlainText);
  return value.nodeType === "document" ? parts.join("\n\n") : parts.join("");
};

// Removes a trailing "-2" (used to keep duplicate slugs unique in Contentful)
const cleanSlug = (slug) => (slug ? slug.replace(/-2$/, "") : "");

const getEntryByTag = (entries, tag) =>
  (entries ?? []).find((item) => item.fields?.tag === tag);

const getImageByTag = (entries, tag, field = "thumbnail") => {
  const asset = getEntryByTag(entries, tag)?.fields?.[field];
  return asset?.fields?.file ? toImage(asset) : null;
};

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "home", include: 2 });

  return { props: { homecontent: res.items } };
}

export default function ReviewsPage({ homecontent }) {
  const heroEntry = getEntryByTag(homecontent, "home-hero");
  const heroImage =
    getImageByTag(homecontent, "home-hero", "featuredImage") ??
    getImageByTag(homecontent, "home-hero");

  const featuredReviewEntry = getEntryByTag(homecontent, "home-featured-review");
  const featuredReview = getImageByTag(homecontent, "home-featured-review");

  return (
    <main>
      <Hero
        variant="home"
        preHeadline="REVIEWS"
        headline="All The Metal Reviews In One Place"
        wordmark={toPlainText(heroEntry?.fields?.storyby)}
        buttonText="read more"
        buttonHref={
          heroEntry?.fields?.slug ? `/article/${heroEntry.fields.slug}` : "/news"
        }
        imageSrc={heroImage?.url}
        imageAlt={heroImage?.alt}
      />

      <FeaturedReview
        imageSrc={featuredReview?.url}
        imageAlt={featuredReview?.alt}
        preHeadline={toPlainText(featuredReviewEntry?.fields?.preheadline)}
        headline={toPlainText(featuredReviewEntry?.fields?.title)}
        subheadline={toPlainText(featuredReviewEntry?.fields?.subheadline)}
        body={toPlainText(featuredReviewEntry?.fields?.excerpt)}
        wordmark={toPlainText(featuredReviewEntry?.fields?.storyby)}
        buttonText="Read More"
        buttonHref={
          featuredReviewEntry?.fields?.slug
            ? `/article/${cleanSlug(featuredReviewEntry.fields.slug)}`
            : "/news"
        }
      />

      <NewReviews bandlists={homecontent} />

      <div className="mt-40" />

      <Lists thelists={homecontent} limit={12} />
    </main>
  );
}
