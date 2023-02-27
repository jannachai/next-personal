import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { createClient } from 'contentful'
import PostCard from '@/components/PostCard'

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
        <div className="recipe-list">
          {photographyPosts.map((post: any) => (
            <PostCard key={post.sys.id} post={post}/>
          ))}
        </div>
      </main>
    </>
  )
}
