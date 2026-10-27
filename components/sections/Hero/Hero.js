
import Link from 'next/link'
import Image from 'next/image'
// import Button from "@/components/Button/Button";
import Button from '../../Button/Button'
import styles from './Hero.module.css'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const formatDate = (value) => {
  if (!value) return ''
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!match) return String(value)
  const [, year, month, day] = match
  return `${MONTHS[Number(month) - 1]} ${Number(day)} ${year.slice(2)}`
}

export default function Hero({
  variant = 'home',
  preHeadline,
  headline,
  subheadline,
  body,
  wordmark,
  buttonText,
  buttonHref,
  imageSrc,
  imageAlt = '',
  author,
  imgby,
  date,
  type,
  genre,
  releasedate,
}) {
  if (variant === 'article') {
    return (
      <section className={styles.articleHero}>
        <div className={styles.articleContent}>
          {preHeadline && (
            <p className={styles.articlePreHeadline}>
              {preHeadline}
            </p>
          )}

          <h1 className={styles.articleHeadline}>
            {headline}
          </h1>

          {subheadline && (
            <p className={styles.articleSubheadline}>
              {subheadline}
            </p>
          )}
          <div className={`${styles.articleCategories} flex flex-wrap items-center gap-x-8 gap-y-2`}>
            <div>
              <span className={`${styles.articleCategoryLabel}`}>TYPE:</span> {type && <span>{type}</span>}
            </div>
            <div>
              <span className={`${styles.articleCategoryLabel}`}>GENRE:</span> {genre && <span>{genre}</span>}
            </div>
            <div>
              <span className={`${styles.articleCategoryLabel}`}>RELEASE DATE:</span> {releasedate && <span>{releasedate}</span>}
            </div>
          </div>
          {(author || date) && (
            <div className={`${styles.articleAuthors} flex flex-col`}>
              <div>
                <span className={`${styles.articleAuthorsLabel}`}>Story:</span> {author && <span>{author}</span>}
              </div>
              <div>
                <span className={`${styles.articleAuthorsLabel}`}>Images:</span> {imgby && <span>{imgby}</span>}
              </div>
              <div>
                <span className={`${styles.articleAuthorsLabel}`}>Published:</span> {date && <span>{formatDate(date)}</span>}
              </div>
            </div>
          )}
        </div>

        {imageSrc && (
          <div className={styles.articleImage}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              // sizes="100vw"
            />
          </div>
        )}

      </section>
    )
  }

  return (
    <section className={styles.homeHero}>
      {/* Column 1: Text */}
      <div className={styles.homeContent}>
        <div className={styles.homeText}>
          {preHeadline && (
            <p className={styles.preHeadline}>
              {preHeadline}
            </p>
          )}

          <h1 className={styles.headline}>
            {headline}
          </h1>

          {subheadline && (
            <p className={styles.subheadline}>
              {subheadline}
            </p>
          )}

          {body && (
            <p className={styles.body}>
              {body}
            </p>
          )}

          {author && (
            <p className={styles.wordmark}>
              STORY BY: {author}
            </p>
          )}
          {imgby && (
            <p className={styles.wordmark}>
             IMAGES BY: {imgby}
            </p>
          )}
          <Button
            buttonText={buttonText}
            buttonHref={buttonHref}
          />
        </div>
      </div>

      {/* Column 2: Image */}
      {imageSrc && (
        <div className={styles.homeImage}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            // sizes="(max-width: 700px) 100vw, 70vw"
          />
        </div>
      )}
    </section>
  )
}
