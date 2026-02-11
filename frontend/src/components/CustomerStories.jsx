import React from "react";
import { FaStar } from "react-icons/fa";

const CustomerStories = () => {
  const stories = [
    {
      id: 1,
      title: "Priya's Experience",
      tags: ["Express Service", "Fabric Care Expert", "Monthly Package"],
      description:
        "Being a working professional in Pune, Andes has been a lifesaver! Their express service ensures my office wear is always crisp and ready. Best laundry service I've found in the city.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200&v=1",
      rating: 5,
      location: "Mumbai, Maharashtra",
    },
    {
      id: 2,
      title: "Rahul's Journey",
      tags: ["Premium Dry Clean", "Door-Step Pickup", "Quality Service"],
      description:
        "From suits to traditional wear, Andes handles everything with utmost care. Their door-step service saves me so much time. Truly worth every rupee!",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200&h=200&v=1",
      rating: 5,
      location: "Bangalore, Karnataka",
    },
    {
      id: 3,
      title: "Anjali's Story",
      tags: ["Student Discount", "Quick Service", "Affordable"],
      description:
        "As a college student in Pune, I needed reliable and affordable laundry service. Andes not only offers great student discounts but also ensures quick delivery. Perfect for my busy schedule!",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200&v=1",
      rating: 5,
      location: "Delhi, NCR",
    },
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
    <section className="bg-gradient-to-b from-yellow-50 to-yellow-100 py-20">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-16 text-slate-800">
          Customer Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-yellow-100"
            >
              <div className="flex items-start mb-6">
                <div className="relative">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-16 h-16 rounded-full object-cover border-4 border-yellow-50 shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                    {/* Verified badge placeholder if needed, purely decorative for now */}
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

              <p className="text-slate-600 leading-relaxed text-sm md:text-base italic">
                &quot;{story.description}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;
