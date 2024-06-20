import React from 'react';

const Rating = ({ rating, count }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center text-[24px]">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-500">&#9733;</span> // Full star
      ))}
      {halfStar && <span className="text-yellow-500">&#9734;</span>}  {/* Half star*/}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">&#9734;</span> // Empty star
      ))}
      <span className="ml-2 text-gray-500">({count})</span> {/* Number of reviews*/}
    </div>
  );
};

export default Rating;
