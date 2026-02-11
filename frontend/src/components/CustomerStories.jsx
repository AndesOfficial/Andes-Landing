import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import c1 from '../assets/c1.jpg';
import c2 from '../assets/c2.jpg';
import c3 from '../assets/c3.jpg';
import c4 from '../assets/c4.jpg';
import customer1 from '../assets/customer1.jpg';
import customer2 from '../assets/customer2.jpg';
import customer3 from '../assets/customer3.jpg';

const CustomerStories = () => {
  const allStories = [
    {
      id: 1,
      name: "Priya Nair", // Female c4
      title: "Priya's Experience",
      tags: ["Express Service", "Fabric Care Expert", "Monthly Package"],
      description:
        "Being a working professional in Pune, Andes has been a lifesaver! Their express service ensures my office wear is always crisp and ready. Best laundry service I've found in the city.",
      image: c4,
      rating: 5,
      location: "Mumbai, Maharashtra",
    },
    {
      id: 2,
      name: "Rohan Mehta", // Male c2
      title: "Rohan's Journey",
      tags: ["Premium Dry Clean", "Door-Step Pickup", "Quality Service"],
      description:
        "From suits to traditional wear, Andes handles everything with utmost care. Their door-step service saves me so much time. Truly worth every rupee!",
      image: c2,
      rating: 5,
      location: "Bangalore, Karnataka",
    },
    {
      id: 3,
      name: "Sanya Gupta", // Female c1
      title: "Sanya's Story",
      tags: ["Student Discount", "Quick Service", "Affordable"],
      description:
        "As a college student in Pune, I needed reliable and affordable laundry service. Andes not only offers great student discounts but also ensures quick delivery. Perfect for my busy schedule!",
      image: c1,
      rating: 5,
      location: "Delhi, NCR",
    },
    {
      id: 4,
      name: "Aditya Sharma", // Male customer1
      title: "Aditya's Review",
      tags: ["Bulk Order", "Timely Delivery", "Great Support"],
      description:
        "I sent a huge load of laundry after my vacation, and they returned it perfectly folded and smelling fresh within 24 hours. Their customer support is also top-notch.",
      image: customer1,
      rating: 5,
      location: "Pune, Maharashtra",
    },
    {
      id: 5,
      name: "Meera Patel", // Female customer2
      title: "Meera's Feedback",
      tags: ["Eco-Friendly", "Hygienic", "Safe"],
      description:
        "I love their eco-friendly approach. The clothes feel soft and don't smell of harsh chemicals. It's great to see a laundry service that cares about the environment.",
      image: customer2,
      rating: 5,
      location: "Hyderabad, Telangana",
    },
    {
      id: 6,
      name: "Vikram Singh", // Male c3
      title: "Vikram's Experience",
      tags: ["Shoe Cleaning", "Expert Care", "Value for Money"],
      description:
        "My sneakers were a mess, but Andes made them look brand new! I was amazed by the detailed cleaning. Definitely using them for all my footwear now.",
      image: c3,
      rating: 5,
      location: "Chennai, Tamil Nadu",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allStories.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [allStories.length]);

  // Get the 3 visible stories (handling wrap-around)
  const visibleStories = [
    allStories[currentIndex],
    allStories[(currentIndex + 1) % allStories.length],
    allStories[(currentIndex + 2) % allStories.length],
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-500 text-lg">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"} />
        ))}
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-yellow-50 to-yellow-100 py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-16 text-slate-800">
          Customer Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 transition-all duration-500 ease-in-out">
          {visibleStories.map((story) => (
            <div
              key={`${story.id}-${currentIndex}`} // Force re-render for animation
              className="bg-white p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-up border border-yellow-100 flex flex-col h-full"
            >
              <div className="flex items-start mb-6">
                <div className="relative flex-shrink-0">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-16 h-16 rounded-full object-cover border-4 border-yellow-50 shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>

                <div className="ml-4">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{story.title}</h3>
                  <p className="text-slate-500 text-sm mt-1 flex items-center">
                    {story.location}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                {renderStars(story.rating)}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {story.tags && story.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-sky-50 text-sky-600 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed text-sm md:text-base italic mt-auto">
                &quot;{story.description}&quot;
              </p>
            </div>
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-12 gap-2">
          {allStories.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-brand' : 'w-2 bg-brand/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;
