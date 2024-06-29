"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Rating from "./ui/star";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "./icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNeynarContext } from "@neynar/react";
import { parseComment, getStarsEmoji } from "@/utils/parseComment";

interface Book {
  isbn: number;
  cover_image_url: string;
  title: string;
  authors: string;
  subtitle: string;
}

const Review = ({ ISBN }: { ISBN: number }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user } = useNeynarContext();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Parse the comment text with star emojis
    const parsedComment = parseComment(comment, rating);
    console.log("Parsed comment:", parsedComment);

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signerUuid: user?.signer_uuid,
          isbn: ISBN.toString(),
          rating: rating.toString(),
          text: parsedComment,
        }),
      });

      if (response.ok) {
        console.log('Review submitted successfully');
        setComment('');
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

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
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">4.2/5 (299)</span>
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm leading-relaxed text-muted-foreground">
            <p>{book.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        <Rating setRating={setRating} rating={rating} />
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <Textarea
            placeholder="Write your comment..."
            className="flex-1 min-h-[100px] resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
        <div className="space-y-4 text-2xl font-bold">369 Comments</div>
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
              你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。
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
              這是能蟲，能蟲屬於昆蟲綱鞘翅目，雜食非常凶殘，體内經常有很多病毒。在唐朝就已經出現，被劍客李白一劍殺死。有文獻記載：要是能蟲來，我要選李白。
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
            <div>哥删了呗，我是无所谓的，但是我一个朋友可能有点汗流浃背了，他不太舒服想睡了，当然不是我哈，我一直都是行的，以一个旁观者的心态看吧，也不至于破防吧，就是想照顾下我朋友的感受，他有点破防了，还是建议删了吧，当然删不删随你，我是没感觉的，就是为朋友感到不平罢了，也不是那么简单破防的。</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
