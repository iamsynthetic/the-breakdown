import { createClient } from "contentful";

import Hero from "../../components/sections/Hero/Hero";
import FeaturedNewRelease from '../../components/sections/Featured/Featured';
import OtherNewReleases from '../../components/sections/OtherNewReleases/OtherNewReleases'
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

  const featuredNewReleaseEntry = getEntryByTag(homecontent, "home-featured-new-release");
  const featuredNewRelease = getImageByTag(homecontent, "home-featured-new-release");

  return (
    <main>
      <Hero
        variant="home"
        preHeadline="RELEASES"
        headline="All The Metal Releases In One Place"
        wordmark={toPlainText(heroEntry?.fields?.storyby)}
        buttonText="read more"
        buttonHref={
          heroEntry?.fields?.slug ? `/article/${heroEntry.fields.slug}` : "/news"
        }
        imageSrc={heroImage?.url}
        imageAlt={heroImage?.alt}
      />

      <FeaturedNewRelease
        imageSrc={featuredNewRelease?.url}
        imageAlt={featuredNewRelease?.alt}
        // headline="Upcoming Release"
        preHeadline={toPlainText(featuredNewReleaseEntry?.fields?.preheadline)}
        headline={toPlainText(featuredNewReleaseEntry?.fields?.title)}
        subheadline={toPlainText(featuredNewReleaseEntry?.fields?.subheadline)}
        body={toPlainText(featuredNewReleaseEntry?.fields?.excerpt)}
        wordmark={toPlainText(featuredNewReleaseEntry?.fields?.storyby)}
        buttonText="Read More"
        buttonHref={
          featuredNewReleaseEntry?.fields?.slug
            ? `/article/${featuredNewReleaseEntry.fields.slug}`
            : "/news"
        }
        overlayColor="#7A5020"
        backgroundOpacity={.5}
        overlayOpacity={.8}
        gradientTopOpacity={.5}
        gradientBottomOpacity={0}
      />

      <OtherNewReleases bandlists={homecontent} />

      <div className="mt-40" />

      <Lists thelists={homecontent} limit={12} />
    </main>
  );
}
