import React from 'react';
import Aryan from '../assets/AryanGupta.png';
import Girl1 from '../assets/girl1.jpg';
import Boy1 from '../assets/Boy1.jpg';
import Boy2 from '../assets/Boy2.jpg';
import Girl2 from '../assets/girl2.jpg';
import Gaurav from '../assets/Gaurav_Bind.jpeg';

const teamMembers = [
  { src: Aryan, name: "Aryan Gupta", title: "Founder and CEO" },
  { src: Gaurav, name: "Gaurav Bind", title: "Tech Team Lead" },
  { src: Boy1, name: "Pranay Agarwal", title: "Tech Team Lead" },
  { src: Boy2, name: "Pradyumna Deshpande", title: "Designer" },
  { src: Girl1, name: "Nihi Srivastava", title: "Social Media Manager" },
  { src: Girl2, name: "Sneha Sharma", title: "On Ground Lead" },
];

const TeamSection = () => {
  return (
    <div className="bg-gradient-to-br from-brand to-blue-900 text-white py-20 md:py-28 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-yellow-300 font-extrabold uppercase tracking-widest text-sm mb-4 block bg-white/10 w-max mx-auto px-5 py-2 rounded-full border border-white/20 shadow-lg">
            Team Andes
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">Meet Our Team</h2>
          <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            We're a global team of laundry, tech, and logistics experts on a mission to free people
            from laundry so that they can spend more time doing what they <span className="text-yellow-400 text-2xl align-middle">💛</span>
          </p>
        </div>

        {/* Founder Section - Highlighted */}
        <div className="flex flex-col items-center justify-center mb-20">
          <div className="relative group w-56 h-56 md:w-64 md:h-64 mb-6">
            <div className="absolute inset-0 bg-yellow-400 rounded-3xl rotate-6 opacity-30 blur-xl group-hover:rotate-12 transition-transform duration-500"></div>
            <div className="w-full h-full overflow-hidden rounded-3xl shadow-2xl border-4 border-white/20 relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
              <img
                src={teamMembers[0].src}
                alt={teamMembers[0].name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black text-white mb-1">{teamMembers[0].name}</h3>
            <p className="text-yellow-300 font-bold uppercase tracking-widest text-sm">{teamMembers[0].title}</p>
          </div>
        </div>

        {/* Other Team Members - Always Visible Text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-12">
          {teamMembers.slice(1).map((member, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="relative w-full aspect-square mb-5">
                <div className="absolute inset-0 bg-brand-light rounded-2xl rotate-3 opacity-0 group-hover:opacity-20 blur-md transition-all duration-300"></div>
                <div className="w-full h-full overflow-hidden rounded-2xl shadow-xl border-2 border-white/10 transform transition-transform duration-500 group-hover:-translate-y-2 relative z-10">
                  <img
                    src={member.src}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-blue-200 font-semibold text-xs uppercase tracking-wider">{member.title}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TeamSection;