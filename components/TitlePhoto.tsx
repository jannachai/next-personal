import Image from 'next/image' 

function TitlePhoto({ title, url }: {title: string; url: string}) {
  return (
    <div className="hero-container">
        <Image
          src={`https:${url}`}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw,
                          (max-width: 1200px) 50vw,
                          "
          style={{ objectFit: "contain" }}
          quality={100}
          className="hero"
        />
              <style jsx>
        {`
        .hero {
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            height: 100%;
        }
          .hero-container {
            position: relative;
            min-height: 800px;
            max-width: 1500px;


          }

          @media only screen and (max-width: 400px) {
            .hero-container {
              min-height: 260px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default TitlePhoto;
