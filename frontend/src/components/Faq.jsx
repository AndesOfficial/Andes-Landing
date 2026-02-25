import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

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
    <div id="faq" className="w-full space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-sm"
        >
          <button
            className="flex justify-between items-center w-full p-5 text-left bg-slate-50 hover:bg-slate-100 transition-all duration-300 cursor-pointer"
            onClick={() => toggleFaq(index)}
          >
            <h2 className="text-lg font-semibold text-slate-800 pr-4">{faq.question}</h2>
            <FaChevronDown
              className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="p-5 pt-0 text-left">
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;