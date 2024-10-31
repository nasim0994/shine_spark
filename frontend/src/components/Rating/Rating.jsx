import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function Rating({ rating }) {
    const ratingStar = Array.from({ length: 5 }, (element, index) => {
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <FaStar className="text-yellow-400" />
        ) : rating >= index + 0.5 ? (
          <FaStarHalfAlt className="text-yellow-400" />
        ) : (
          <FaStar className="text-gray-300" />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center gap-1 text-xs">
      {ratingStar}
    </div>
  );
}
