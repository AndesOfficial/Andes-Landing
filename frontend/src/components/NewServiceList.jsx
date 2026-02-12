import React, { useState, useEffect } from 'react';
import ServiceCard from './NewServiceCard';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ServiceList = ({ services }) => {
  if (services.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center ">
        <div className="text-gray-500 text-lg mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
        <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  // Group services by their 'group' property
  const groupedServices = services.reduce((acc, service) => {
    const groupName = service.group || 'Other';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(service);
    return acc;
  }, {});

  const groupNames = Object.keys(groupedServices);
  const isFlatList = !services[0].group;

  // State for expanded groups
  // Default to all expanded for better discovery
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    // Initialize all groups as expanded when groups change
    const initialState = {};
    groupNames.forEach(name => {
      initialState[name] = true;
    });
    setExpandedGroups(initialState);
  }, [services]); // Re-run when services (and thus groups) change

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  if (isFlatList) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    );
  }

  // Render grouped list with accordions
  return (
    <div className="space-y-6">
      {groupNames.map(groupName => {
        const isExpanded = expandedGroups[groupName];
        const count = groupedServices[groupName].length;

        return (
          <div key={groupName} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
            {/* Accordion Header */}
            <button
              onClick={() => toggleGroup(groupName)}
              className="w-full flex items-center justify-between p-5 bg-gray-50/50 hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <div className="flex items-center">
                <div className="h-8 w-1 bg-brand rounded-full mr-4"></div>
                <h2 className="text-xl font-bold text-gray-800">{groupName}</h2>
                <span className="ml-3 px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-bold rounded-full">
                  {count}
                </span>
              </div>
              <div className={`p-2 rounded-full bg-white shadow-sm text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <FaChevronDown />
              </div>
            </button>

            {/* Accordion Content */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="p-5 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {groupedServices[groupName].map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceList;