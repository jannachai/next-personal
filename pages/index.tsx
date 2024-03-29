import Head from 'next/head';
import { createClient } from 'contentful';
import Link from 'next/link';
import Layout from '@/components/Layout';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID ?? '',
    accessToken: process.env.CONTENTFUL_ACCESS_KEY ?? '',
  });

  const res = await client.getEntries({ content_type: 'photographyPost' });

  return {
    props: {
      photographyPosts: res.items,
    },
  };
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
      <Layout>
        <div className="title-list">
          {photographyPosts.map((post: any) => (
            <Link
              href={`/photographyPost/${post.fields.slug}`}
              key={post.fields.title}
            >
              <span>{post.fields.title}</span>
              <br />
            </Link>
          ))}
        </div>
      </Layout>
      <style jsx>
        {`
          .title-list {
            font-family: 'Antonio';
            font-size: 6vw;
            text-align: center;
            text-decoration: underline;
          }

          .title-list span:hover {
            color: #09e6c4;
            text-decoration: underline;
          }
        `}
      </style>
    </>
  );
}
