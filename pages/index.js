
import { createClient } from 'contentful';
import Hero from '../components/sections/Hero/Hero';
import News from '../components/sections/News/News';
import FeaturedReview from '../components/sections/Featured/Featured';
import NewReviews from '../components/sections/NewReviews/NewReviews';
import FeaturedNewRelease from '../components/sections/Featured/Featured';
import OtherNewReleases from '../components/sections/OtherNewReleases/OtherNewReleases'
import FeaturedAnticipated from '../components/sections/Featured/Featured';
import FeaturedListeningTo from '../components/sections/Featured/Featured';
import QuoteOfTheMonth from '../components/sections/QuoteOfTheMonth/QuoteOfTheMonth';
import Columnists from "../components/sections/Columnists/Columnists";
import Lists from "../components/sections/Lists/Lists";

const toImage = (asset) => ({
  url: `https:${asset.fields.file.url}`,
  alt: asset.fields.description || asset.fields.title || '',
  width: asset.fields.file.details?.image?.width ?? null,
  height: asset.fields.file.details?.image?.height ?? null,
})

const getEntryByTag = (homecontent, tag) =>
  (homecontent ?? []).find((item) => item.fields?.tag === tag);

const getEntriesByTag = (homecontent, tag) =>
  (homecontent ?? []).filter((item) => item.fields?.tag === tag);

const getImageByTag = (homecontent, tag, field = "thumbnail") => {
  const asset = getEntryByTag(homecontent, tag)?.fields?.[field];
  return asset?.fields?.file ? toImage(asset) : null;
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const formatLongDate = (value) => {
  const m = String(value ?? '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return '';
  return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
};

// Missing or invalid dates become -Infinity so they sort to the bottom
const toTime = (value) => {
  const t = new Date(value ?? '').getTime();
  return Number.isNaN(t) ? -Infinity : t;
};

const toNewsItem = (entry) => {
  const f = entry.fields;
  const image = f.thumbnail?.fields?.file ? toImage(f.featuredImage) : null;

  return {
    id: entry.sys.id,
    category: f.preheadline ?? 'News',
    title: f.title ?? '',
    excerpt: f.excerpt ?? '',
    date: formatLongDate(f.publishDate),
    href: f.slug ? `/article/${f.slug}` : '/news',
    imageSrc: image?.url ?? null,
    imageAlt: image?.alt ?? '',
  };
};

const toPlainText = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (value.nodeType === 'text') return value.value ?? '';
  const parts = (value.content ?? []).map(toPlainText);
  return value.nodeType === 'document' ? parts.join('\n\n') : parts.join('');
};

// Removes a trailing "-2" (used to keep duplicate slugs unique in Contentful)
const cleanSlug = (slug) => (slug ? slug.replace(/-2$/, '') : '');

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const homeRes = await client.getEntries({
    content_type: 'home',
    include: 2,
  });

  return {
    props: {
      homecontent: homeRes.items,
    },
  };
}

export default function Home({ homecontent }) {
  const heroEntry = getEntryByTag(homecontent, "home-hero");
  const homeHero = getImageByTag(homecontent, "home-hero", "featuredImage");

  const newsItems = getEntriesByTag(homecontent, 'home-news')
    .sort((a, b) =>
      toTime(b.fields?.publishDate) - toTime(a.fields?.publishDate) ||
      new Date(b.sys.createdAt) - new Date(a.sys.createdAt) // tie-breaker
    )
    .map(toNewsItem);

  const featuredReviewEntry = getEntryByTag(homecontent, "home-featured-review");
  const featuredReview = getImageByTag(homecontent, "home-featured-review");

  const featuredNewReleaseEntry = getEntryByTag(homecontent, "home-featured-new-release");
  const featuredNewRelease = getImageByTag(homecontent, "home-featured-new-release");

  const featuredAnticipatedEntry = getEntryByTag(homecontent, "home-featured-anticipated");
  const featuredAnticipated = getImageByTag(homecontent, "home-featured-anticipated");

  const featuredListeningToEntry = getEntryByTag(homecontent, "home-featured-listeningto");
  const featuredListeningTo = getImageByTag(homecontent, "home-featured-listeningto");

  const quoteEntry = getEntryByTag(homecontent, "home-quote");

  return (
    <main>
      <Hero
        variant="home"
        preHeadline={heroEntry?.fields?.preheadline}
        headline={heroEntry?.fields?.title}
        wordmark={heroEntry?.fields?.storyby}
        buttonText="read more"
        buttonHref={`/article/${heroEntry?.fields?.slug}`}
        imageSrc={homeHero?.url}
        imageAlt={homeHero?.alt}
      />

      <News articles={newsItems} />

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

      <QuoteOfTheMonth
        preHeadline={toPlainText(quoteEntry?.fields?.preheadline)}
        headline={toPlainText(quoteEntry?.fields?.title)}
        subheadline={toPlainText(quoteEntry?.fields?.subheadline)}
        wordmark={toPlainText(quoteEntry?.fields?.storyby)}
        quoter={toPlainText(quoteEntry?.fields?.band)}
      />

      <Columnists writers={homecontent} limit={3} />

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
            : "/listening-to"
        }
        overlayColor="#695334"
        backgroundOpacity={.4}
        overlayOpacity={.8}
        gradientTopOpacity={.2}
        gradientBottomOpacity={0.1}
      />

      <Lists thelists={homecontent} limit={12} />

    </main>
  )
}
