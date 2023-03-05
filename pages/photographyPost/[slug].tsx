import { createClient } from 'contentful'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import Layout from '@/components/Layout'

interface PhotographyPost {
    fields: {
        title: string;
        subtitle: string;
        hero: {
            fields: {
                file: {
                    url: string;
                    details: {
                        image: {
                            width: number;
                            height: number;
                        }
                    }
                }
            }
        }
        slug: string;
        persons: string[];
        location: string;
        date: string;
        content: Document;
    }
}

interface ContentFulPhotographyPost {
    items: PhotographyPost[]
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
  accessToken: process.env.CONTENTFUL_ACCESS_KEY ?? '',
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'photographyPost'
  })

  const paths = res.items.map((item: any) => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: any}) {
  const { items } = await client.getEntries({
    content_type: 'photographyPost',
    'fields.slug': params.slug
  })

  return {
    props: { post: items[0] }
  }
}

export default function RecipeDetails({ post }: { post: PhotographyPost}) {
  const { title, subtitle, hero, persons, location, date, content } = post.fields
  console.log(content)
  return (
    <Layout>
      <div className="hero-container">
        <Image 
          src={`https:${hero.fields.file.url}`}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  "
          style={{objectFit: 'contain'}}
        />
      </div>
      <h2>{ title }</h2>
      <h5>{ subtitle }</h5>
      <div style={{ display: 'flex'}}>
        <div>{ persons?.join(', ') ?? '' }</div>
        <div>{ location }</div>
        <div>{ date }</div>
      </div>
      <div>
        {documentToReactComponents(content)}
      </div>
      <style jsx>
        {`
          .hero-container {
            position: relative;
            min-height: 800px;
            max-width: 1200px
          }

          @media only screen and (max-width: 400px) {
            .hero-container {
              min-height: 260px;
            }
          }
        `}
      </style>
    </Layout>
  )
}