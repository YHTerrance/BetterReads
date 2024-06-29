"use client"
interface ErrorRes {
  message: string;
}

import axios from 'axios';
import { AxiosError } from 'axios';

import { useState } from "react"
import Link from "next/link"

import { useNeynarContext } from "@neynar/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

const Sidebar = () => {

  const { user } = useNeynarContext();
  const [text, setText] = useState("");

  const handlePublishCast = async () => {
    try {
      await axios.post<{ message: string }>("/api/cast", {
        signerUuid: user?.signer_uuid,
        text,
      });
      alert("Cast Published!");
      setText("");
    } catch (err) {
      const { message } = (err as AxiosError).response?.data as ErrorRes;
      alert(message);
    }
  };

  return (
    <div className="bg-background rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        <li>
          <Link href="#" className="hover:underline" prefetch={false}>
            Fiction
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline" prefetch={false}>
            Non-Fiction
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline" prefetch={false}>
            Mystery
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline" prefetch={false}>
            Romance
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline" prefetch={false}>
            Science Fiction
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline" prefetch={false}>
            Fantasy
          </Link>
        </li>
      </ul>
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Search</h2>
        <Input type="text" placeholder="Search for a book..." className="w-full" />
      </div>

      {user && (
          <>
            <div className="mt-6">
              <div className="flex items-center gap-2">
                {user.pfp_url && (
                  <Avatar>
                    <AvatarImage src={user.pfp_url} className='object-cover' />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                )}
                <p className="text-lg font-bold">{user?.display_name}</p>
              </div>
              <div className="mt-6 grid w-full gap-2">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Say something in the XueDAO channel!"
                />
                <Button
                  onClick={handlePublishCast}
                >
                  Cast
                </Button>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Sidebar