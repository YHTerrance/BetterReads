"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea"
import { StarIcon } from "./icons";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Props {
  slug: string;
}

interface Book {
  isbn: number;
  cover_image_url: string;
  title: string;
  authors: string;
  subtitle: string;
}

const Review = ({ISBN}: {ISBN: number}) => {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/data/books.json`);
        const data: Book[] = await response.json();
        const selectedBook = data.find((item) => Number(item.isbn) === Number(ISBN));

        setBook(selectedBook || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ISBN]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid gap-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Image
            src={book.cover_image_url}
            width={400}
            height={600}
            alt="Book Cover"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div className="grid gap-4">
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-muted-foreground">by {book.authors}</p>
          </div>
          <div className="text-sm leading-relaxed text-muted-foreground">
            <p>{book.subtitle}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="flex items-center gap-4">
        <span className="text-muted-foreground">4.2 out of 5</span>
          <div className="flex items-center gap-0.5">
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        <form className="flex gap-2">
          <Textarea placeholder="Write your comment..." className="flex-1 min-h-[100px] resize-none" />
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="font-semibold">@iamwillpursell</div>
              <div className="text-xs text-muted-foreground">5 minutes ago</div>
            </div>
            <div>
              I really love the ecosystem Vercel is creating. The way each component can be added and modified with ease
              really makes these tools attractive.
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="font-semibold">@HackSoft</div>
              <div className="text-xs text-muted-foreground">2 hours ago</div>
            </div>
            <div>
              We are more than excited to leverage all the new stuff, building better products for our clients ✨
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="font-semibold">@greed7513</div>
              <div className="text-xs text-muted-foreground">1 day ago</div>
            </div>
            <div>does anyone know which monospace are they using when showing code?</div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Review;