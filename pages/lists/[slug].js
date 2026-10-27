import { createClient } from "contentful";

import Hero from "../../components/sections/Hero/Hero";
import Lists from "../../components/sections/Lists/Lists";
import MainArticle from "../../components/MainArticle/MainArticle";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "lists" });

  return {
    paths: res.items
      .filter((item) => item.fields?.slug) // skip entries with no slug
      .map((item) => ({ params: { slug: item.fields.slug } })),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const [listsRes, homeRes] = await Promise.all([
    client.getEntries({ content_type: "lists", include: 2 }),
    client.getEntries({ content_type: "home", include: 2 }),
  ]);

  const article = listsRes.items.find((item) => item.fields?.slug === params.slug);

  if (!article) {
    return { notFound: true };
  }

  return {
    props: {
      article,
      homecontent: homeRes.items, // what <Lists> reads on the home page
    },
  };
}

export default function ListsPage({ article, homecontent }) {
  const fields = article.fields;

  return (
    <main>
      <Hero
        variant="list"
        preHeadline={fields.preheadline}
        headline={fields.title}
        subheadline={fields.subheadline}
        type={fields.type}
        genre={fields.genre}
        releasedate={fields.releaseDate}
        author={fields.storyby}
        imgby={fields.imagesby}
        date={fields.publishDate}
        imageSrc={
          fields.featuredImage?.fields?.file?.url
            ? `https:${fields.featuredImage.fields.file.url}`
            : undefined
        }
        imageAlt="Live heavy music performance"
      />

      <MainArticle variant="list" bodyCopy={fields.bodyCopy} quote={fields.quote} />

      <div className="mt-40" />

      <Lists thelists={homecontent} limit={12} />
    </main>
  );
}
