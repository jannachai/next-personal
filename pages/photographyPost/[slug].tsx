import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import Layout from '@/components/Layout';
import TitlePhoto from '@/components/TitlePhoto';
import PostHeader from '@/components/PostHeader';
import { HeroTextContainer, TextContainer } from '@/components/TextContainers';
import PhotoLightbox from '@/components/PhotoLightbox';
import Image from 'next/image';
import { FaFrog } from 'react-icons/fa';
import { useState } from 'react';

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
    description: string;
    title: string;
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

  const [isSnapTo, setIsSnapTo] = useState(false);

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
      <FaFrog
        style={{ width: 45, height: 25 }}
        onClick={() => setIsSnapTo(!isSnapTo)}
      />
      <PhotoLightbox
        images={[
          ...(photos?.map((photo) => ({
            src: `https:${photo.fields.file.url}`,
            alt: title,
            description: photo.fields.description,
          })) || []),
          ...(portraits?.map((portrait) => ({
            src: `https:${portrait.fields.file.url}`,
            alt: title,
            description: portrait.fields.description,
          })) || []),
        ]}
      >
        <div className={isSnapTo ? 'wrapper' : ''}>
          {photos?.map((photo, photoIndex) => (
            <div key={photo.sys.id}>
              <div
                className="landscape-container"
                data-image-index={photoIndex}
              >
                <Image
                  src={`https:${photo.fields.file.url}`}
                  alt={title}
                  fill
                  quality={100}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              {photo.fields.description && (
                <p className="landscape-description">
                  {photo.fields.description}
                </p>
              )}
            </div>
          ))}
          <div className="portrait-wrapper">
            {portraits?.map((portrait, portraitIndex) => (
              <div key={portrait.sys.id} className="portrait-description-wrapper">
                <div
                  className={`portrait-container ${
                    portrait.fields?.title.includes('single') ? 'single' : ''
                  }`}
                  data-image-index={
                    (photos?.length || 0) + portraitIndex
                  }
                >
                  <Image
                    src={`https:${portrait.fields.file.url}`}
                    alt={title}
                    fill
                    quality={100}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                {portrait.fields.description && (
                  <p className="portrait-description">
                    {portrait.fields.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </PhotoLightbox>
      <style jsx>
        {`
          .wrapper {
            scroll-snap-type: y mandatory;
            overflow-y: scroll;
            scroll-behaviour: smooth;
            height: 100vh;
          }

          .wrapper::-webkit-scrollbar {
            display: none;
          }

          .landscape-container {
            position: relative;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            max-width: 840px;
            min-height: 560px;
            margin: 0 auto 175px;
            scroll-snap-align: center;
            cursor: pointer;
            transition: transform 0.3s ease-in-out;
          }

          .landscape-container:hover {
            transform: scale(1.05);
          }

          @media only screen and (max-width: 400px) {
            .landscape-container {
              min-height: 168px;
              margin: 5px 20px;
            }
          }

          .portrait-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            max-width: 860px;
            margin: 0 auto;
            gap: 20px;
          }

          .portrait-container {
            position: relative;
            max-width: 413px;
            min-height: 630px;
            scroll-snap-align: center;
            cursor: pointer;
            transition: transform 0.3s ease-in-out;
            width: 100%;
          }

          .portrait-container:hover {
            transform: scale(1.05);
          }

          .portrait-container.single {
            max-width: 1200px;
            min-height: 819px;
          }

          .landscape-description {
            max-width: 840px;
            margin: 5px auto 0;
            text-align: right;
            font-size: 14px;
            color: #666;
            padding-right: 20px;
          }

          .portrait-description-wrapper {
            width: calc(50% - 10px);
            margin-bottom: 175px;
          }

          .portrait-description-wrapper:has(.portrait-container.single) {
            width: 100%;
          }

          .portrait-description {
            text-align: center;
            font-size: 14px;
            color: #666;
            padding: 0 20px;
            font-family: Raleway, sans-serif;
          }

          @media only screen and (max-width: 400px) {
            .landscape-description {
              padding-right: 20px;
              margin: 5px 20px 0;
            }

            .portrait-description-wrapper {
              width: 100%;
            }

            .portrait-description {
              padding: 0 20px;
              margin-top: 5px;
            }

            .portrait-container {
              min-height: 336px;
              margin: 10px 20px;
              width: 100%;
            }
          }
        `}
      </style>
    </Layout>
  );
}
