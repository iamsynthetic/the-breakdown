import { createClient } from "contentful";

import Hero from "../../components/sections/Hero/Hero";
import FeaturedListeningTo from '../../components/sections/Featured/Featured';
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
  const featuredListeningToEntry = getEntryByTag(homecontent, "home-featured-listeningto");
  const featuredListeningTo = getImageByTag(homecontent, "home-featured-listeningto");

  return (
    <main>
      <Hero
        variant="home"
        preHeadline="LISTENING TO"
        headline="What We're Listening To Right Now"
        wordmark={toPlainText(heroEntry?.fields?.storyby)}
        buttonText="read more"
        buttonHref={
          heroEntry?.fields?.slug ? `/article/${heroEntry.fields.slug}` : "/news"
        }
        imageSrc={heroImage?.url}
        imageAlt={heroImage?.alt}
      />

      <FeaturedListeningTo
        imageSrc={featuredListeningTo?.url}
        imageAlt={featuredListeningTo?.alt}
        preHeadline={toPlainText(featuredListeningToEntry?.fields?.preheadline)}
        headline={toPlainText(featuredListeningToEntry?.fields?.title)}
        subheadline={toPlainText(featuredListeningToEntry?.fields?.subheadline)}
        body={toPlainText(featuredListeningToEntry?.fields?.excerpt)}
        wordmark={toPlainText(featuredListeningToEntry?.fields?.storyby)}
        buttonText="Read More"
        buttonHref={
          featuredListeningToEntry?.fields?.slug
            ? `/article/${featuredListeningToEntry.fields.slug}`
            : "/news"
        }
        overlayColor="#695334"
        backgroundOpacity={.4}
        overlayOpacity={.8}
        gradientTopOpacity={.2}
        gradientBottomOpacity={0.1}
      />

      <div className="mt-40" />

      <Lists thelists={homecontent} limit={12} />
    </main>
  );
}
