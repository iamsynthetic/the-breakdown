import { createClient } from "contentful";

import Hero from "../../components/sections/Hero/Hero";
import News from "../../components/sections/News/News";
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

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const formatLongDate = (value) => {
  const m = String(value ?? "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
};

const toTime = (value) => {
  const t = new Date(value ?? "").getTime();
  return Number.isNaN(t) ? -Infinity : t;
};

const toNewsItem = (entry) => {
  const f = entry.fields;
  const image = f.thumbnail?.fields?.file ? toImage(f.thumbnail) : null;

  return {
    id: entry.sys.id,
    category: toPlainText(f.preheadline) || "News",
    title: toPlainText(f.title),
    excerpt: toPlainText(f.excerpt),
    date: formatLongDate(f.publishDate),
    href: f.slug ? `/article/${f.slug}` : "/news",
    imageSrc: image?.url ?? null,
    imageAlt: image?.alt ?? "",
  };
};

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

export default function NewsPage({ homecontent }) {
  const heroEntry = getEntryByTag(homecontent, "home-hero");
  const heroImage =
    getImageByTag(homecontent, "home-hero", "featuredImage") ??
    getImageByTag(homecontent, "home-hero");

  const newsItems = homecontent
    .filter((item) => item.fields?.tag === "home-news")
    .sort(
      (a, b) =>
        toTime(b.fields?.publishDate) - toTime(a.fields?.publishDate) ||
        new Date(b.sys.createdAt) - new Date(a.sys.createdAt)
    )
    .map(toNewsItem);

  return (
    <main>
      <Hero
        variant="home"
        preHeadline="NEWS"
        headline="All The Metal News In One Place"
        wordmark={toPlainText(heroEntry?.fields?.storyby)}
        buttonText="read more"
        buttonHref={
          heroEntry?.fields?.slug ? `/article/${heroEntry.fields.slug}` : "/news"
        }
        imageSrc={heroImage?.url}
        imageAlt={heroImage?.alt}
      />

      <News articles={newsItems} />

      <div className="mt-40" />

      <Lists thelists={homecontent} limit={12} />
    </main>
  );
}
