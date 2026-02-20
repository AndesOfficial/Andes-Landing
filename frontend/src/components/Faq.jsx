import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Do you wash my clothes together with other people's clothes?",
      answer: "No, we wash each customer's clothes separately to ensure hygiene and prevent any mix-ups."
    },
    {
      question: "Where do you clean my clothes?",
      answer: "We clean your clothes at our state-of-the-art facility equipped with the latest technology and eco-friendly detergents."
    },
    {
      question: "What is the turnaround time?",
      answer: "Our standard turnaround time is 24 hours. However, it may vary depending on the service and your location."
    },
    {
      question: "What if I'm not at home during collection or delivery?",
      answer: "If you're not at home during collection or delivery, you can reschedule or provide instructions for a safe place to leave your laundry."
    }
  ];

  return (
    <div id="faq" className="w-full">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <div
            className="flex justify-between items-center bg-gray-100 p-4 rounded cursor-pointer text-left hover:bg-gray-200 transition duration-300"
            onClick={() => toggleFaq(index)}
          >
            <h2 className="text-lg font-semibold">{faq.question}</h2>
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {openIndex === index && (
            <div className="bg-white p-4 border border-t-0 rounded-b text-left shadow-md">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;