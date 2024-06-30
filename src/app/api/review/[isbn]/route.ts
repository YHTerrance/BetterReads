import { NextRequest, NextResponse } from "next/server";
import { NeynarAPIClient, CastParamType } from "@neynar/nodejs-sdk";
import { createClient } from "@/db";

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);

export async function GET(request: NextRequest, { params }: { params: { isbn: string } }) {
  const { isbn } = params;

  if (!isbn) {
    return NextResponse.json({ error: 'ISBN is required' }, { status: 400 });
  }

  const supabase = createClient();

  try {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('isbn', isbn);

    if (error) {
      throw error;
    }

    // Fetch cast data for each review
    const reviewsWithCast = await Promise.all(
      reviews.map(async (review) => {
        const { cast } = await client.lookUpCastByHashOrWarpcastUrl(review.cast_hash, CastParamType.Hash);
        return { ...review, cast };
      })
    );

    return NextResponse.json(reviewsWithCast, { status: 200 });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
