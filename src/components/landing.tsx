import Navbar from "./navbar"
import Sidebar from "./sidebar"
import BookGrid from "./book-grid"
import Footer from "./footer"

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="flex-1 container mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 py-8">
        <Sidebar></Sidebar>
        <div>
          <BookGrid></BookGrid>
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}
