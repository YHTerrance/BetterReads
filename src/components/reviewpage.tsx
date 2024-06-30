"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Rating from "./ui/star";
import axios from "axios";
import { AxiosError } from "axios";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "./icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNeynarContext } from "@neynar/react";
import { parseComment } from "@/utils/parseComment";

const Review = ({ ISBN }: { ISBN: number }) => {
  const [book, setBook] = useState<any | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<any[]>([]);
  const [filter, setFilter] = useState<string | number>("all");
  const [averageRating, setAverageRating] = useState(0);
  const { user } = useNeynarContext();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get<{ book: any }>(`/api/book?isbn=${ISBN}`);
        setBook(response.data.book);
      } catch (err) {
        const { message } = (err as AxiosError).response?.data as ErrorRes;
        alert(message);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/review/${ISBN}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchBookData();
    fetchReviews();
  }, [ISBN]);

  useEffect(() => {
    const calculateAverageRating = () => {
      if (reviews.length === 0) return 0;
      const totalRating = reviews.reduce((acc, review) => acc + Number(review.rating), 0);
      return totalRating / reviews.length;
    };

    setAverageRating(calculateAverageRating());
  }, [reviews]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(reviews.filter((review) => Number(review.rating) === filter));
    }
  }, [filter, reviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Parse the comment text with star emojis
    const parsedComment = await parseComment(comment, rating, ISBN);

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
        alert("Review Published!");
        setComment('');
        setRating(0);
        // Re-fetch reviews after submitting a new review
        const reviewResponse = await axios.get(`/api/review/${ISBN}`);
        setReviews(reviewResponse.data);
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
                <span className="text-muted-foreground">{averageRating.toFixed(1)}/5 ({reviews.length})</span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: Math.round(averageRating) }).map((_, index) => (
                    <StarIcon key={index} className="w-4 h-4 text-yellow-500" />
                  ))}
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
        <div className="space-y-4 text-2xl font-bold">{reviews.length} Comments</div>
        <div className="flex gap-2">
          {["all", 5, 4, 3, 2, 1].map((star) => (
            <Button key={star} onClick={() => setFilter(star)}>
              {star === "all" ? "All" : `${star} Stars`} ({reviews.filter((review) => star === "all" || Number(review.rating) === star).length})
            </Button>
          ))}
        </div>
        <div className="space-y-4">
          {filteredReviews.map((review: any) => (
            <Link
              key={review.cast.hash}
              href={`https://warpcast.com/${review.cast.author.username}/${review.cast.hash.slice(0, 10)}`}
              target="_blank"
              passHref
            >
              <div className="flex items-start gap-4 border-b pb-4 mb-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src={review.cast.author.pfp_url || "/placeholder-user.jpg"} />
                  <AvatarFallback>{review.cast.author.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">@{review.cast.author.username}</div>
                    <div className="text-xs text-muted-foreground">{new Date(review.cast.timestamp).toLocaleString()}</div>
                  </div>
                  <div>{review.cast.text.split('Comment: ')[1]}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{review.cast.reactions.likes_count} Likes</span>
                    <span className="text-sm text-muted-foreground">{review.cast.reactions.recasts_count} Recasts</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Number(review.rating) }).map((_, index) => (
                      <StarIcon key={index} className="w-4 h-4 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
