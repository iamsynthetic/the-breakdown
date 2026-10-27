
import NewsCard from '../../NewsCard/NewsCard'
import styles from './News.module.css'

export default function NewsSection({
  articles = [],
  title = 'Latest News',
  viewAllHref = '/news',
}) {
  const featured = articles[0]
  const supporting = articles.slice(1, 5)

  if (!featured) return null

  return (
    <section className={styles.section}>
      <div className={styles.newsGrid}>
        <div className={styles.lead}>
          <NewsCard
            article={featured}
            featured
            buttonText="read more"
            buttonHref={featured.href}
          />
        </div>

        <div className={styles.supporting}>
          {supporting.map((article) => (
            <NewsCard
              key={article.id || article.href}
              article={article}
              buttonText="read more"
              buttonHref={article.href}
              variant="transparent"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
