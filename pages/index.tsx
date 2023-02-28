import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { createClient } from 'contentful'
import Link from 'next/link'
import Nav from '@/components/Nav'
import TimeBar from '@/components/TimeBar'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID ?? '',
    accessToken: process.env.CONTENTFUL_ACCESS_KEY ?? '',
  })

  const res = await client.getEntries({ content_type: 'photographyPost' })

  return {
    props: {
      photographyPosts: res.items
    }
  }
}


export default function Home({ photographyPosts }: any) {
  return (
    <>
      <Head>
        <title>Wannachai</title>
        <meta name="description" content="Wannachai personal page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Nav />
        <TimeBar />
        <div className="title-list">
          {photographyPosts.map((post: any) => (
            <Link href={`/photographyPost/${post.fields.slug}`} key={post.fields.title}>
              {post.fields.title}<br/>
            </Link>
          ))}
        </div>
      </main>
      <style jsx>
        {
          `
            .title-list {
              font-family: 'Antonio';
              font-size: 6vw;
              text-decoration: underline;
              text-align: center;

              a, a:visited {
                  color: inherit; 
                  text-decoration: none;
              }
            }
          `
        }
      </style>
    </>
  )
}
