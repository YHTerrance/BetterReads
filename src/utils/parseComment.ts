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
export const parseComment = (comment: string, stars: number): string => {
  const starsEmoji = getStarsEmoji(stars);
  // Format the comment with stars and new lines
  const parsedComment = `stars: ${starsEmoji}\ncomment: ${comment}`;
  return parsedComment;
};
