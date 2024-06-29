import { NextRequest, NextResponse } from 'next/server';
import { getBook } from '@/app/utils/get-book';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {

  const { searchParams } = new URL(request.url)
  const isbn = searchParams.get('isbn')
  const book = getBook(Number(isbn));

  if (!book) {
    return NextResponse.json({ message: `Book with isbn ${isbn} not found` }, {status: 401});
  }

  return NextResponse.json(
    {
      book: book
    },
    {
      status: 200
    }
  );
}
