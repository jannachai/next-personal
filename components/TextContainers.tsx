import React from 'react';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export function TextContainer({ content }: { content: Document }) {
  return (
    <div className="wrapper">
      {content && (
        <div className="text">{documentToReactComponents(content)}</div>
      )}
      <style jsx>{`
        .wrapper {
          display: flex;
          justify-content: center;
        }

        .text {
          max-width: 500px;
          font-family: 'Raleway', sans-serif;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

export function HeroTextContainer({ content }: { content: Document }) {
  return (
    <div className="wrapper">
      {content && (
        <div className="text">{documentToReactComponents(content)}</div>
      )}
      <style jsx>{`
        .wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 4rem;
        }

        .text {
          max-width: 500px;
          font-family: 'Bree Serif', sans-serif;
          font-size: 24px;
        }
      `}</style>
    </div>
  );
}
