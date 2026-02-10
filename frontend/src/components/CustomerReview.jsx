
import { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { reviewsData } from '../data/reviewsData';

const CustomerReviews = () => {
  // Logic to rotate reviews every 2 hours so users see fresh content
  const getReviewBatch = () => {
    const batchSize = 3;
    const interval = 2 * 60 * 60 * 1000;
    const totalBatches = Math.ceil(reviewsData.length / batchSize);

    const currentBatchIndex = Math.floor(Date.now() / interval) % totalBatches;
    const start = currentBatchIndex * batchSize;

    let batch = reviewsData.slice(start, start + batchSize);

    // If we reach the end and have fewer than batchSize, wrap around
    if (batch.length < batchSize) {
      const remaining = batchSize - batch.length;
      batch = [...batch, ...reviewsData.slice(0, remaining)];
    }

    return batch;
  };

  const [visibleReviews, setVisibleReviews] = useState([]);

  // Handle hydration mismatch by setting state in useEffect
  useEffect(() => {
    setVisibleReviews(getReviewBatch());

    const intervalId = setInterval(() => {
      setVisibleReviews(getReviewBatch());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">


        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Loved by Locals
          </h2>
          <div className="flex items-center justify-center gap-2 text-yellow-500 text-xl mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
          <p className="text-slate-500 text-lg">
            Don't just take our word for it. Here is what our customers in Pune have to say.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative group"
            >
              {/* Profile Image */}
              <div className="w-20 h-20 mb-6 rounded-full p-1 border-2 border-blue-100">
                <img
                  src={review.imageUrl}
                  alt={review.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 text-yellow-400 text-sm mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < review.rating ? "opacity-100" : "opacity-30"} />
                ))}
              </div>

              {/* Quote & Text */}
              <div className="relative mb-6">
                <FaQuoteLeft className="absolute -top-4 -left-4 text-blue-100 text-3xl opacity-50" />
                <p className="text-slate-600 italic leading-relaxed relative z-10 px-2">
                  "{review.text}"
                </p>
                <FaQuoteRight className="absolute -bottom-4 -right-4 text-blue-100 text-3xl opacity-50" />
              </div>

              {/* Name */}
              <h4 className="text-lg font-bold text-slate-900 mt-auto">
                {review.name}
              </h4>
              <span className="text-sm text-slate-400 font-medium">Verified Customer</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;