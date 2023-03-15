import React from 'react';

interface IPostHeader {
  persons: string[];
  location: string;
  date: string;
}

export default function PostHeader({ persons, location, date }: IPostHeader) {
  return (
    <div className="wrapper">
      {persons && (
        <div className="detail-container">
          <div className="header">FEATURING</div>
          <div className="detail">{persons?.join(', ') ?? ''}</div>
        </div>
      )}
      <div className="detail-container">
        <div className="header">LOCATION</div>
        <div className="detail">{location}</div>
      </div>
      <div className="detail-container">
        <div className="header">DATE</div>
        <div className="detail">{date}</div>
      </div>
      <style jsx>
        {`
          .wrapper {
            display: flex;
            justify-content: space-evenly;
            margin-bottom: 200px;
          }

          .detail-container {
            display: flex;
            align-items: center;
            flex-direction: column;
          }

          .header {
            font-family: 'Bree Serif', sans-serif;
            margin-bottom: 15px;
          }

          .detail {
            font-family: 'Raleway', sans-serif;
            font-size: 12px;
            text-transform: uppercase;
          }
        `}
      </style>
    </div>
  );
}
