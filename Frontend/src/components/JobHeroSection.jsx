import React from "react";

const JobHeroSection = () => {
  return (
    <div className="w-full bg-white">
      <div className="relative w-full h-[440px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/hero.jpg')` }}>
        <div className="absolute inset-0 bg-gray-400 bg-opacity-30 flex items-center justify-center px-4">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 leading-snug">
              Find, attract, and <span className="text-blue-600">hire</span><br />
              talent with Naukri
            </h1>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Explore plans
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4 py-8 bg-white">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-xl px-6 py-4 text-center max-w-xs">
          <div className="text-4xl mb-3">👤✅</div>
          <h3 className="text-lg font-semibold text-gray-800">
            Hire <span className="font-bold">skilled candidates</span>
          </h3>
          <p className="text-gray-600 text-sm">for your business</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-xl px-6 py-4 text-center max-w-xs">
          <div className="text-4xl mb-3">🏭</div>
          <h3 className="text-lg font-semibold text-gray-800">
            Get candidates with relevant <br />
            <span className="font-bold">industry experience</span>
          </h3>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-xl px-6 py-4 text-center max-w-xs">
          <div className="text-4xl mb-3">💵</div>
          <h3 className="text-lg font-semibold text-gray-800">
            Explore <span className="font-bold">budget-friendly</span><br />
            plans starting from ₹400
          </h3>
        </div>
      </div>
    </div>
  );
};

export default JobHeroSection;
