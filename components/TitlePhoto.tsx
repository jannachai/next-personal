import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowNarrowDown } from 'react-icons/hi';

interface ITitlePhoto {
  title: string;
  url: string;
  subtitle: string;
  location: string;
}

function TitlePhoto({ title, url, subtitle, location }: ITitlePhoto) {
  return (
    <div className="hero-container">
      <Image
        src={`https:${url}`}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        "
        style={{ objectFit: 'contain' }}
        quality={100}
        priority
      />
      <div className="subtitle">{subtitle ? subtitle : location.split(', ').join(' | ')}</div>
      <AnimatePresence>
        <motion.div
          animate={{
            y: [40, 20, 40, 0, 40, 35, 40],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{ position: 'absolute', bottom: '15%', margin: '0 auto' }}
        >
          <HiArrowNarrowDown style={{ width: 25, height: 25 }} />
        </motion.div>
      </AnimatePresence>
      <style jsx>
        {`
          .hero-container {
            position: relative;
            min-height: 800px;
            max-width: 1500px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          @media only screen and (max-width: 400px) {
            .hero-container {
              min-height: 260px;
            }
          }

          .subtitle {
            position: absolute;
            bottom: 20%;
            margin: 0 auto;
            text-transform: uppercase;
            font-family: Nunito;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
}

export default TitlePhoto;
