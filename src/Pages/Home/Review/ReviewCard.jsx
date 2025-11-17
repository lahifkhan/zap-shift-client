import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div>
      <div className="bg-white p-6 rounded-2xl shadow-md  w-full max-w-md mx-auto">
        {/* Quote Icon */}
        <FaQuoteLeft className="text-4xl text-primary/50 mb-3" />

        {/* Review Text */}
        <p className="text-[#606060] leading-relaxed mb-4">{review.review}</p>

        {/* Divider */}
        <div className="border-dashed border-t border-gray-300 my-4"></div>

        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12  ">
            <img className="rounded-full" src={review.user_photoURL} alt="" />
          </div>

          <div>
            <h3 className="font-bold text-secondary text-lg">
              {review.userName}
            </h3>
            <p className="text-sm text-[#606060]">{review.user_email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
