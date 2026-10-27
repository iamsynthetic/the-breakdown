import { createClient } from "contentful";

import Hero from "../../components/sections/Hero/Hero";
import Lists from "../../components/sections/Lists/Lists";
import MainArticle from "../../components/MainArticle/MainArticle";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "article" });

  return {
    paths: res.items.map((item) => ({ params: { slug: item.fields.slug } })),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const [articleRes, homeRes] = await Promise.all([
    client.getEntries({
      content_type: "article",
      "fields.slug": params.slug,
    }),
    client.getEntries({
      content_type: "home",
      include: 2,
    }),
  ]);

  if (!articleRes.items.length) {
    return { notFound: true };
  }

  return {
    props: {
      article: articleRes.items[0],
      homecontent: homeRes.items,
    },
  };
}

export default function ArticlePage({ article, homecontent }) {
  const fields = article.fields;

  return (
    <>
      <main>
        <Hero
          variant="article"
          preHeadline={fields.preheadline}
          headline={fields.headline}
          subheadline={fields.subheadline}
          type={fields.type}
          genre={fields.genre}
          releasedate={fields.releaseDate}
          author={fields.storyby}
          imgby={fields.imagesby}
          date={fields.publishDate}
          imageSrc={
            fields.heroImage?.fields?.file?.url
              ? `https:${fields.heroImage.fields.file.url}`
              : undefined
          }
          imageAlt="Live heavy music performance"
        />

        <MainArticle
          bodyCopy={fields.articleCopy}
          quote={fields.quote}
        />
        <div className="mt-40">
        </div>
        <Lists thelists={homecontent} limit={12} />
      </main>
    </>
  );
}
