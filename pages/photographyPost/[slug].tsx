import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import Layout from '@/components/Layout';
import TitlePhoto from '@/components/TitlePhoto';
import PostHeader from '@/components/PostHeader';
import { HeroTextContainer, TextContainer } from '@/components/TextContainers';

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
    heroText: Document;
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
  const { title, subtitle, hero, persons, location, date, content, heroText } =
    post.fields;

  return (
    <Layout>
      <TitlePhoto
        title={title}
        url={hero.fields.file.url}
        subtitle={subtitle}
        location={location}
      />
      <PostHeader persons={persons} location={location} date={date} />
      <HeroTextContainer content={heroText} />
      <TextContainer content={content} />
    </Layout>
  );
}
