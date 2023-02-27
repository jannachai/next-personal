import Link from 'next/link'
import Image from 'next/image'

export default function PostCard({ post }: any) {
    const { title, slug, hero } = post.fields
  return (
    <div className="card">
        <div className="featured">
            <Image 
              src={`https:${hero.fields.file.url}`}
              width={hero.fields.file.details.image.width}
              height={hero.fields.file.details.image.height}
              alt={title}
            />
        </div>
        <div className="content">
            <div className="info">
                <h4>{ title }</h4>
            </div>
            <div className="actions">
                <Link href={`/photographyPost/${slug}`}>View more</Link>
            </div>
        </div>
    </div>
  )
}
