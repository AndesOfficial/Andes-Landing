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
      image: "https://xsgames.co/randomusers/assets/avatars/female/60.jpg",
      rating: 5,
      location: "Mumbai, Maharashtra",
    },
    {
      id: 2,
      title: "Rahul's Journey",
      tags: ["Premium Dry Clean", "Door-Step Pickup", "Quality Service"],
      description:
        "From suits to traditional wear, Andes handles everything with utmost care. Their door-step service saves me so much time. Truly worth every rupee!",
      image: "https://xsgames.co/randomusers/assets/avatars/male/75.jpg",
      rating: 5,
      location: "Bangalore, Karnataka",
    },
    {
      id: 3,
      title: "Anjali's Story",
      tags: ["Student Discount", "Quick Service", "Affordable"],
      description:
        "As a college student in Pune, I needed reliable and affordable laundry service. Andes not only offers great student discounts but also ensures quick delivery. Perfect for my busy schedule!",
      image: "https://xsgames.co/randomusers/assets/avatars/female/71.jpg",
      rating: 5,
      location: "Delhi, NCR",
    },
  ];

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <section className="bg-gradient-to-b from-yellow-100 to-yellow-200 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-12 text-slate-900">
          Customer Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{story.title}</h3>
                  <p className="text-gray-500 text-sm">{story.location}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-yellow-500">
                  {[...Array(story.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags && story.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-brand/10 text-brand-dark px-3 py-1 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-center leading-relaxed">
                {story.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;
