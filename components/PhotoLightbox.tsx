import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { ReactNode, useState } from 'react';
import Image from 'next/image';

interface PhotoLightboxProps {
  children: ReactNode;
  images: Array<{
    src: string;
    alt: string;
    description?: string;
  }>;
}

export default function PhotoLightbox({ children, images }: PhotoLightboxProps) {
  const [index, setIndex] = useState(-1);

  const slides = images.map((img) => ({
    src: img.src,
    alt: img.alt,
  }));

  return (
    <>
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const container = target.closest('[data-image-index]');
          if (container) {
            const imageIndex = parseInt(
              container.getAttribute('data-image-index') || '-1',
              10
            );
            if (imageIndex !== -1) {
              setIndex(imageIndex);
            }
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </div>

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        render={{
          slide: () => {
            if (index < 0 || index >= images.length) return null;
            const currentImage = images[index];
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    maxWidth: '90%',
                    maxHeight: '80%',
                    width: '100%',
                    aspectRatio: '16 / 9',
                  }}
                >
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    style={{ objectFit: 'contain' }}
                    quality={100}
                  />
                </div>
                {currentImage.description && (
                  <p
                    style={{
                      textAlign: 'center',
                      color: '#fff',
                      marginTop: '20px',
                      fontSize: '14px',
                      maxWidth: '90%',
                      padding: '0 20px',
                    }}
                  >
                    {currentImage.description}
                  </p>
                )}
              </div>
            );
          },
        }}
      />
    </>
  );
}

