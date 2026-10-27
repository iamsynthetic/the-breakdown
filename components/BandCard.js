import Image from "next/image"
import Link from "next/link"

export default function BandCard({ bandlist }) {
  const {title, thumbnail, slug, publishDate} = bandlist.fields
  return (
    <div className="card">
      <div className="featured">
        <Image src={'https:' + thumbnail.fields.file.url} alt={thumbnail.fields.description} width={thumbnail.fields.file.details.image.width} height={thumbnail.fields.file.details.image.height} />
      </div>
      <div className="info">
        <h4>{title}</h4>
        <p>{publishDate}</p>
      </div>
      <div className="actions">
        <Link href={'/lists/' + slug}>Read</Link>
      </div>
    </div>
  )
}
