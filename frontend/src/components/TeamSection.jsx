import React from 'react';
import { FaUsers } from "react-icons/fa";
import Aryan from '../assets/AryanGupta.png';
import Gaurav from '../assets/Gaurav_Bind.jpeg';
import Pranay from '../assets/Pranaysingh.jpeg';
import prathamesh from '../assets/prathmesh.jpeg';

const teamsData = {
  leadership: {
    title: "LEADERSHIP TEAM",
    icon: <FaUsers className="text-blue-600" size={20} />,
    members: [
      { src: Aryan, name: "Aryan Gupta", title: "Chief Executive Officer" },
      { src: Gaurav, name: "Gaurav Bind", title: "Chief Technology Officer" },
      { src: prathamesh, name: "Prathamesh Birajdar", title: "Chief Operating Officer" },
      { src: Pranay, name: "Pranay Singh", title: "Chief Financial Officer" },
     
    ]
  }
};

const TeamSection = () => {
  return (
    <div className="bg-[#f8fbff] text-slate-800 pt-12 pb-16 md:pt-14 md:pb-20 relative overflow-hidden font-sans">

      {/* Subtle Background Elements to prevent 'blank' feeling */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-multiply">
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-blue-100/50 rounded-full blur-[100px] opacity-70"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-100/40 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-blue-500/5 rounded-full blur-[80px]"></div>
        {/* Very subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1A8FE3 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-[#1e3a8a]">Our Team</h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Meet the talented professionals driving our success forward.
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-6 rounded-full opacity-80"></div>
        </div>

        {/* Content Structure */}
        <div className="flex flex-col gap-12 md:gap-16">

          <TeamCategoryGroup data={teamsData.leadership} />

        </div>

      </div>
    </div>
  );
};

// Reusable Sub-components
const TeamCategoryGroup = ({ data }) => (
  <div className="w-full">
    <div className="flex items-center mb-6 md:mb-8">
      <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 mr-4">
        {data.icon}
      </div>
      <h3 className="text-sm md:text-[15px] font-bold uppercase tracking-[0.1em] text-slate-700 whitespace-nowrap">{data.title}</h3>
      <div className="ml-4 flex-grow h-[1px] bg-gradient-to-r from-blue-200 to-transparent"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-5 md:gap-6">
      {data.members.map((member, idx) => (
        <TeamCard key={idx} member={member} />
      ))}
    </div>
  </div>
);

const TeamCard = ({ member }) => (
  <div className="group relative bg-white/80 backdrop-blur-md rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(26,143,227,0.12)] hover:-translate-y-1.5 transition-all duration-300 p-6 flex flex-col items-center w-full lg:w-[220px] overflow-hidden">

    {/* Subtle gradient border top */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-5">
      <div className="absolute inset-0 bg-[#ebf1f8] rounded-full scale-[1.05] shadow-inner border border-blue-50"></div>
      <img
        src={member.src}
        alt={member.name}
        className="relative w-full h-full rounded-full object-cover object-top border-4 border-white shadow-sm z-10"
      />
    </div>

    <h4 className="text-lg md:text-xl font-bold text-slate-800 mb-1 leading-tight text-center">{member.name}</h4>
    <p className="text-xs md:text-sm font-semibold text-blue-600/80 text-center">{member.title}</p>
  </div>
);

export default TeamSection;