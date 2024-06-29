import axios from 'axios';

/**
 * Converts the number of stars to a string of star emojis
 * @param stars Number of stars
 * @returns A string of star emojis
 */
export const getStarsEmoji = (stars: number): string => {
  const starEmoji = '⭐';
  return starEmoji.repeat(stars);
};

/**
 * Parses the comment text and formats it with star emojis and new lines
 * @param comment Comment text
 * @param stars Number of stars
 * @returns Parsed comment text with star emojis and formatted text
 */
export const parseComment = async (comment: string, stars: number, isbn: number): Promise<string> => {
  const starsEmoji = getStarsEmoji(stars);
  const response = await axios.get<{ book: Book }>(`/api/book?isbn=${isbn}`);
  const book = response.data.book;
  if (!book) {
    throw new Error(`Book with isbn ${isbn} not found`);
  }
  // Format the comment with stars and new lines
  const parsedComment = `Title: ${book.title}\nStars: ${starsEmoji}\nComment: ${comment}`;
  return parsedComment;
};
