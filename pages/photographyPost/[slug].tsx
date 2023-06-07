import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import Layout from '@/components/Layout';
import TitlePhoto from '@/components/TitlePhoto';
import PostHeader from '@/components/PostHeader';
import { HeroTextContainer, TextContainer } from '@/components/TextContainers';
import Image from 'next/image';

interface ContentfulImage {
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
  sys: {
    id: string;
  };
}

interface PhotographyPost {
  fields: {
    title: string;
    subtitle: string;
    hero: ContentfulImage;
    slug: string;
    persons: string[];
    location: string;
    date: string;
    content: Document;
    heroText: Document;
    photos: ContentfulImage[];
    portraits: ContentfulImage[];
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
  const {
    title,
    subtitle,
    hero,
    persons,
    location,
    date,
    content,
    heroText,
    portraits,
    photos,
  } = post.fields;

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
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap'
        }}
      >
        {photos.map((photo) => (
          <Image
            key={photo.sys.id}
            src={`https:${photo.fields.file.url}`}
            alt={title}
            width={1200}
            height={800}
            quality={100}
            style={{ marginBottom: 250 }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {portraits.map((portrait) => (
          <Image
            key={portrait.sys.id}
            src={`https:${portrait.fields.file.url}`}
            alt={title}
            width={590}
            height={885}
            quality={100}
            style={{ marginBottom: 250}}
          />
        ))}
      </div>
    </Layout>
  );
}
