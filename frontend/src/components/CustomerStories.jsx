import React from "react";

const CustomerStories = () => {
  const stories = [
    {
      title: "Priya's Experience",
      tags: ["Express Service", "Fabric Care Expert", "Monthly Package"],
      description:
        "Being a working professional in Pune, Andes has been a lifesaver! Their express service ensures my office wear is always crisp and ready. Best laundry service I've found in the city.",
      image: "https://xsgames.co/randomusers/assets/avatars/female/60.jpg",
      rating: 5,
      location: "Mumbai, Maharashtra",
    },
    {
      title: "Rahul's Journey",
      tags: ["Premium Dry Clean", "Door-Step Pickup", "Quality Service"],
      description:
        "From suits to traditional wear, Andes handles everything with utmost care. Their door-step service saves me so much time. Truly worth every rupee!",
      image: "https://xsgames.co/randomusers/assets/avatars/male/75.jpg",
      rating: 5,
      location: "Bangalore, Karnataka",
    },
    {
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
        <h2 className="text-center text-4xl font-bold mb-12 text-blue-900">
          हमारे खुश ग्राहक | Our Happy Customers
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl p-8 w-96 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 bg-cover bg-center rounded-full border-4 border-yellow-300 overflow-hidden">
                  <img
                    src={story.image}
                    alt={`${story.title} image`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center text-blue-900">
                {story.title}
              </h3>
              <div className="text-center text-yellow-500 mb-3">
                {renderStars(story.rating)}
              </div>
              <p className="text-gray-500 text-sm text-center mb-3">
                {story.location}
              </p>
              <div className="flex flex-wrap justify-center mb-4 gap-2">
                {story.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-center leading-relaxed">
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
