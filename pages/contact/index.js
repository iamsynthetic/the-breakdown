import { createClient } from "contentful";

import Hero from "../../components/sections/Hero/Hero";


const toImage = (asset) => ({
  url: `https:${asset.fields.file.url}`,
  alt: asset.fields.description || asset.fields.title || "",
});

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

  const heroImage =
    getImageByTag(res.items, "home-hero", "featuredImage") ??
    getImageByTag(res.items, "home-hero");

  // Next.js can't serialize undefined, so fall back to null
  return { props: { heroImage: heroImage ?? null } };
}

export default function ContactPage({ heroImage }) {
  return (
    <main>
      <Hero
        variant="home"
        preHeadline="CONTACT"
        headline="Get In Touch"
        wordmark="The Breakdown"
        imageSrc={heroImage?.url}
        imageAlt={heroImage?.alt}
      />

      <div className="mt-60" />

      <div className="">
        Send us all your metal and hardcore thoughts...or just find us in the woods.
      </div>

      <div className="mb-30" />
    </main>
  );
}
