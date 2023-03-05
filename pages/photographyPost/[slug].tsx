import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import Layout from '@/components/Layout';
import TitlePhoto from '@/components/TitlePhoto';

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
            };
          };
        };
      };
    };
    slug: string;
    persons: string[];
    location: string;
    date: string;
    content: Document;
  };
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? '',
  accessToken: process.env.CONTENTFUL_ACCESS_KEY ?? '',
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'photographyPost',
  });

  const paths = res.items.map((item: any) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }: { params: any }) {
  const { items } = await client.getEntries({
    content_type: 'photographyPost',
    'fields.slug': params.slug,
  });

  return {
    props: { post: items[0] },
  };
}

export default function RecipeDetails({ post }: { post: PhotographyPost }) {
  const { title, subtitle, hero, persons, location, date, content } =
    post.fields;

  return (
    <Layout>
      <TitlePhoto title={title} url={hero.fields.file.url} />
      <div style={{ display: 'flex' }}>
        <div>{persons?.join(', ') ?? ''}</div>
        <div>{location}</div>
        <div>{date}</div>
      </div>
      <div>{documentToReactComponents(content)}</div>
    </Layout>
  );
}
