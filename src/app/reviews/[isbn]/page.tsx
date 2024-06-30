import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import Review from "@/components/reviewpage";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata({ params }: { params: { isbn: number } }) {
  
  return {
    title: "Book Page",
    // provide a full URL to your /frames endpoint
    other: await fetchMetadata(
      new URL(
        `/frames/${params.isbn}`,
        process.env.VERCEL_URL
          ? "https://better-reads-mauve.vercel.app/"
          : "http://localhost:3000"
      )
    ),
  };
}

export default function ReviewPage({ params }: { params: { isbn: number } }) {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 py-8">
        <Sidebar />
        <div>
          <Review ISBN={params.isbn} />
        </div>
      </main>
      <Footer />
    </div>
  );
}