import Nav from "./Nav"
import TimeBar from "./TimeBar"

function Layout({ children }: {children: React.ReactNode}) {
  return (
    <main>
      <Nav />
      <TimeBar />
      <div className="page-content">
        { children }
      </div>
      <style jsx>
      {`
        .page-content {
          width: 80%;
          height: 100%;
          margin: 0 auto;
          max-width: 1200px;
          margin-top: 30px;
        }

        @media only screen and (max-width: 400px) {
          .page-content {
            width: 100%;
            margin-top: 0;
          }
        }
      `}
      </style>
    </main>
  )
}

export default Layout