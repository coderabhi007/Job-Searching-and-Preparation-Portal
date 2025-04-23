import React from "react";

const HiringMadeEasy = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Hiring Made Easy</h2>
        <p className="text-lg text-gray-600 mt-2">for Small & Medium Businesses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white relative">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold rounded-md mb-3 inline-block">
            JOB POSTING
          </span>
          <h3 className="text-xl font-semibold mb-4">Post a job and get relevant applies</h3>
          <ul className="text-gray-700 space-y-2 mb-6 text-sm">
            <li>• Attract <strong>qualified</strong> candidates actively seeking new <strong>opportunities</strong></li>
            <li>• <strong>Customise</strong> job posting to find candidates as per your <strong>requirements</strong></li>
          </ul>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
            View plans
          </button>
        </div>

        {/* Card 2 */}
        <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold rounded-md mb-3 inline-block">
            RESDEX
          </span>
          <h3 className="text-xl font-semibold mb-4">Search HireHustle's resume database</h3>
          <ul className="text-gray-700 space-y-2 mb-6 text-sm">
            <li>• Discover local talent in every city with India’s <strong>largest resume database</strong></li>
            <li>• Find the right fit as per your <strong>specific preferences</strong> like location, skills, & more</li>
          </ul>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
            View plans
          </button>
        </div>

        {/* Card 3 */}
        <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white relative">
          {/* Ribbon */}
          <div className="absolute top-0 right-0">
            <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-bl-lg font-semibold">
              Newly launched
            </div>
          </div>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold rounded-md mb-3 inline-block">
            ASSISTED HIRING
          </span>
          <h3 className="text-xl font-semibold mb-4">Get a dedicated hiring expert</h3>
          <ul className="text-gray-700 space-y-2 mb-6 text-sm">
            <li>• <strong>Our experts assess</strong> your hiring needs to find the right candidates</li>
            <li>• Once we receive applies we will <strong>screen, shortlist</strong>, and share <strong>resumes</strong> with you</li>
          </ul>
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
            View plans
          </button>
        </div>
      </div>
    </section>
  );
};

export default HiringMadeEasy;
