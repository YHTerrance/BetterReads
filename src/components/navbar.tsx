"use client";

import * as React from "react";
import { NeynarAuthButton } from "@neynar/react";
import { Button } from "@/components/ui/button";
import { BookIcon, MenuIcon } from "@/components/icons";
import Link from "next/link";
const Navbar = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <BookIcon className="w-6 h-6" />
          <span className="text-xl font-bold">BetterReads</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:underline" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            About
          </Link>
          <NeynarAuthButton />
        </nav>
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <MenuIcon className="w-6 h-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
