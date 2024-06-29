import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {

  const filePath = path.join(process.cwd(), 'public/data/books.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  
  let books = []
  books = JSON.parse(fileData);

  if (books.length == 0) {
    return NextResponse.json({ message: `No books found` }, {status: 401});
  }

  return NextResponse.json(
    {
      books: books
    },
    {
      status: 200
    }
  );
}
