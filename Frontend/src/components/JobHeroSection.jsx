import React from "react";

const JobHeroSection = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Banner */}
      <div
        className="relative w-full h-[540px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/1364929981/photo/welcome-the-new-business-partner.jpg?s=612x612&w=0&k=20&c=xqaiLniG8GL5rHYtQjCk9PrePkndKoC4i1eLqhmV7q4=')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
              Find, attract, and <span className="text-[#FFCD1D]">hire</span>
              <br />
              top talent with <span className="text-[#6A38C2]">HireHustle</span>
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Your all-in-one hiring and career solution.
            </p>
            <button className="mt-6 px-6 py-3 bg-[#6A38C2] text-white rounded-xl font-semibold hover:bg-[#5931a6] transition-shadow shadow-md hover:shadow-lg">
              Explore Plans
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-6 py-14 bg-gradient-to-b from-white via-gray-50 to-white">
        {/* Card 1 */}
        <div className="bg-white shadow-xl hover:shadow-2xl transition rounded-2xl px-6 py-6 text-center max-w-sm border border-gray-100">
          <div className="text-5xl mb-4">👤✅</div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Hire Skilled Candidates
          </h3>
          <p className="text-gray-600 text-sm">
            Discover and hire pre-screened talent perfect for your business.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-xl hover:shadow-2xl transition rounded-2xl px-6 py-6 text-center max-w-sm border border-gray-100">
          <div className="text-5xl mb-4">🏭</div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Industry-Relevant Talent
          </h3>
          <p className="text-gray-600 text-sm">
            Find candidates with hands-on experience in your sector.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-xl hover:shadow-2xl transition rounded-2xl px-6 py-6 text-center max-w-sm border border-gray-100">
          <div className="text-5xl mb-4">💵</div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Affordable Plans
          </h3>
          <p className="text-gray-600 text-sm">
            Flexible pricing starting from just ₹400 — hiring made affordable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobHeroSection;
