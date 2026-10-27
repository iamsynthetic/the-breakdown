
import Link from 'next/link'
import Image from 'next/image'
import Button from '../Button/Button'
import styles from './NewsCard.module.css'

export default function NewsCard({ article, featured = false,
  buttonText,
  buttonHref,
  variant,}) {
  if (!article) return null

  return (
    <article
      className={`${styles.card} ${
        featured ? styles.featured : styles.compact
      }`}
    >
      <Link
        href={article.href}
        className={styles.imageLink}
        aria-label={article.title}
      >
        <div className={styles.image}>
          {article.imageSrc && (
            <Image
              src={article.imageSrc}
              alt={article.imageAlt || ''}
              fill
              sizes={
                featured
                  ? '(max-width: 700px) 100vw, (max-width: 1024px) 60vw, 40vw'
                  : '(max-width: 700px) 100vw, 20vw'
              }
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
      </Link>

      <div className={styles.content}>
        {article.category && (
          <p className={styles.category}>
            {article.category}
          </p>
        )}

        {article.date && (
          <p className={styles.date}>{article.date}</p>
        )}

        <h2 className={styles.title}>
          <Link href={article.href}>
            {article.title}
          </Link>
        </h2>

        {featured && article.excerpt && (
          <p className={styles.excerpt}>
            {article.excerpt}
          </p>
        )}

        <Button
          buttonText={buttonText}
          buttonHref={buttonHref}
          variant={variant}
        />
      </div>
    </article>
  )
}
