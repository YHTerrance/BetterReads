import fs from 'fs';
import path from 'path';

export function getBook(isbn: number) {
  const filePath = path.join(process.cwd(), 'public/data/books.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  const books = JSON.parse(fileData);
  const book = books.find((book: any) => book.isbn === Number(isbn));
  return book;
}
