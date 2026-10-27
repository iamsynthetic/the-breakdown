import { createClient } from "contentful";

import Hero from "../../components/sections/Hero/Hero";
import FeaturedAnticipated from '../../components/sections/Featured/Featured';
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

  const featuredAnticipatedEntry = getEntryByTag(homecontent, "home-featured-anticipated");
  const featuredAnticipated = getImageByTag(homecontent, "home-featured-anticipated");

  return (
    <main>
      <Hero
        variant="home"
        preHeadline="ANTICIPATED"
        headline="The Most Anticipated Heavy Music"
        wordmark={toPlainText(heroEntry?.fields?.storyby)}
        buttonText="read more"
        buttonHref={
          heroEntry?.fields?.slug ? `/article/${heroEntry.fields.slug}` : "/news"
        }
        imageSrc={heroImage?.url}
        imageAlt={heroImage?.alt}
      />

      <FeaturedAnticipated
        imageSrc={featuredAnticipated?.url}
        imageAlt={featuredAnticipated?.alt}
        preHeadline={toPlainText(featuredAnticipatedEntry?.fields?.preheadline)}
        headline={toPlainText(featuredAnticipatedEntry?.fields?.title)}
        subheadline={toPlainText(featuredAnticipatedEntry?.fields?.subheadline)}
        body={toPlainText(featuredAnticipatedEntry?.fields?.excerpt)}
        wordmark={toPlainText(featuredAnticipatedEntry?.fields?.storyby)}
        buttonText="Read More"
        buttonHref={
          featuredAnticipatedEntry?.fields?.slug
            ? `/article/${featuredAnticipatedEntry.fields.slug}`
            : "/news"
        }
        overlayColor="#8B0C0A"
        backgroundOpacity={.7}
        overlayOpacity={.8}
        gradientTopOpacity={.6}
        gradientBottomOpacity={0.1}
      />

      <div className="mt-40" />

      <Lists thelists={homecontent} limit={12} />
    </main>
  );
}
