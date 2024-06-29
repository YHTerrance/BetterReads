import { NextRequest, NextResponse } from "next/server";
import { NeynarAPIClient, isApiErrorResponse } from "@neynar/nodejs-sdk";
import { createClient } from "@/db";
import { z } from "zod";

const postReviewSchema = z.object({
  signerUuid: z.string(),
  text: z.string(),
  isbn: z.string(),
  rating: z.string(),
});

type PostReviewRequest = z.infer<typeof postReviewSchema>;

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);
const channel_id = process.env.CHANNEL_ID;

export async function POST(request: NextRequest) {
  console.log("Received request to post review");
  const data = await request.json();
  
  try {
    postReviewSchema.parse(data);
  } catch (error) {
    console.error("Validation failed:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  console.log("Request data parsed successfully:", data);
  const { signerUuid, text, isbn, rating } = data as PostReviewRequest;
  
  const supabase = createClient();

  try {
    
    const frame_url = `https://better-reads-mauve.vercel.app/reviews/${isbn}`

    const { hash } = await client.publishCast(signerUuid, text, { channelId: channel_id, embeds: [ { url: frame_url } ] });
    console.log("Cast published successfully with hash:", hash);
    
    // save review to supabase
    const { data: review, error } = await supabase
      .from('reviews')
      .insert([
        {
          cast_hash: hash,
          isbn: isbn,
          rating: rating,
          content: text,
        }
      ])
      .single();

    if (error) throw error;

    return NextResponse.json(
      {
        message: `Cast with hash ${hash} published successfully, and review saved to database.`,
      },
      {
        status: 200
      }
    );
  } catch (err) {
    console.error("Error during database operation:", err);
    if (isApiErrorResponse(err)) {
      return NextResponse.json(
        { ...err.response.data },
        { status: err.response.status }
      );
    } else {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}
