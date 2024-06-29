"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "./icons";
import Link from "next/link";

const BookGrid = () => {
  const [books, setBooks] = useState([] as Book[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ books: Book[] }>("/api/books");
        setBooks(response.data.books);
      } catch (err) {
        const { message } = (err as AxiosError).response?.data as ErrorRes;
        alert(message);
      }
    };
    fetchData();
  }, []);

  if (books.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book: Book) => (
        <Card key={book.isbn}>
          <CardContent>
            <Image
              src={book.cover_image_url}
              alt="Book Cover"
              width={200}
              height={300}
              className="rounded-md mb-4"
            />
            <Link href={`/reviews/${book.isbn}`}>
              <h3 className="text-lg font-bold mb-2">{book.title}</h3>
            </Link>
            <p className="text-muted-foreground text-sm mb-2">{book.authors}</p>
            <div className="flex items-center gap-1 text-yellow-500 mb-4">
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
            </div>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {book.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookGrid;
