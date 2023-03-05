import Nav from "./Nav"
import TimeBar from "./TimeBar"

function Layout({ children }: any) {
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
        }
      `}
      </style>
    </main>
  )
}

export default Layout