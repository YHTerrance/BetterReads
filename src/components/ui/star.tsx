import React from 'react';
import { StarIcon } from '../../components/icons';

interface RatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

<<<<<<< HEAD
const Rating: React.FC<RatingProps> = ({ rating, setRating }) => {
=======
>>>>>>> main
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`text-gray-500 hover:text-yellow-500 focus:outline-none`}
          onClick={() => handleRatingChange(star)}
        >
          <StarIcon
            className={`w-6 h-6 ${
              star <= rating ? 'text-yellow-500' : 'text-gray-500'
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-gray-500">{rating} stars</span>
    </div>
  );
};

export default Rating;
