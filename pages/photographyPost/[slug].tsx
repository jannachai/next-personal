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
      <div>
        {photos?.map((photo) => (
          <div key={photo.sys.id} className="landscape-container">
            <Image
              src={`https:${photo.fields.file.url}`}
              alt={title}
              fill
              quality={100}
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          maxWidth: 1200,
        }}
      >
        {portraits?.map((portrait) => (
          <div key={portrait.sys.id} className="portrait-container">
            <Image
              src={`https:${portrait.fields.file.url}`}
              alt={title}
              fill
              quality={100}
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .landscape-container {
            position: relative;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            max-width: 1200px;
            min-height: 800px;
            margin-bottom: 250px;
          }

          @media only screen and (max-width: 400px) {
            .landscape-container {
              min-height: 240px;
              margin: 5px 20px;
            }
          }

          .portrait-container {
            position: relative;
            max-width: 590px;
            min-height: 900px;
            margin-bottom: 250px;
            width: 100%;
          }

          @media only screen and (max-width: 400px) {
            .portrait-container {
              min-height: 480px;
              margin: 10px 20px;
            }
          }
        `}
      </style>
    </Layout>
  );
}
