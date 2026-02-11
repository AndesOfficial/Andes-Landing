import { useRef } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { reviewsData } from '../data/reviewsData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './CustomerReview.css';

const CustomerReviews = () => {
  const swiperRef = useRef(null);
  // Force re-render for reviews data update

  return (
    <section className="bg-slate-50 py-10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-6 relative z-10">
          <FaQuoteLeft className="text-4xl text-brand/30 mx-auto mb-2 opacity-50" />
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Loved by Locals
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            See what our happy customers in Pune have to say about their fresh laundry experience.
          </p>
        </div>

        {/* Swiper Container */}
        <div className="relative">

          {/* Custom Navigation Buttons */}
          <button
            className="absolute left-4 md:left-20 top-1/2 -translate-y-1/2 z-30 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-slate-400 hover:text-brand hover:scale-110 transition-all hidden md:flex items-center justify-center w-12 h-12 border border-slate-100"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous Review"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 z-30 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-slate-400 hover:text-brand hover:scale-110 transition-all hidden md:flex items-center justify-center w-12 h-12 border border-slate-100"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next Review"
          >
            <FaChevronRight size={20} />
          </button>

          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="mySwiper py-4"
          >
            {reviewsData.map((review, index) => (
              <SwiperSlide key={index} className="w-[85%] md:w-[600px] h-auto">
                {({ isActive }) => (
                  <div className={`
                                transition-all duration-300
                                flex flex-col items-center text-center
                                bg-white rounded-3xl p-4 md:p-6
                                border border-slate-100
                                ${isActive ? 'shadow-2xl scale-100 opacity-100' : 'shadow-sm scale-95 opacity-50 blur-[1px]'}
                            `}>
                    {/* Stars */}
                    <div className="flex gap-1 text-yellow-400 text-lg mb-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < review.rating ? "opacity-100" : "opacity-30"} />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className={`text-slate-700 leading-snug mb-2 font-medium italic ${isActive ? "text-base md:text-lg" : "text-sm"}`}>
                      "{review.text}"
                    </p>

                    {/* User Profile (No Divider) */}
                    <div className="mt-auto flex flex-col items-center">
                      <div className={`rounded-full p-1 border-2 border-brand/20 mb-1 transition-all duration-300 ${isActive ? "w-12 h-12 border-brand shadow-lg" : "w-10 h-10"}`}>
                        <img
                          src={review.imageUrl}
                          alt={review.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>

                      <h4 className={`font-bold text-slate-900 transition-all ${isActive ? "text-base" : "text-sm"}`}>
                        {review.name}
                      </h4>
                      <span className="text-xs text-slate-400 font-medium">Verified Customer</span>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;