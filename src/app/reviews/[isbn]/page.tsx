"use client";

import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import Footer from "../../../components/footer";
import Review from "../../../components/reviewpage";

export default function ReviewPage({ params }: { params: { isbn: number } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 py-8">
        <Sidebar />
        <div>
          {/* ISBN: {params.isbn} */}
          <Review ISBN={params.isbn} />
        </div>
      </main>
      <Footer />
    </div>
  );
}