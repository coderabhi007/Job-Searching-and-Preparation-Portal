import React from "react";

const HowItWorks = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-[#6A38C2] mb-10">How It Works</h1>

      <div className="space-y-10">
        {/* Step 1 */}
        <div>
          <h2 className="text-2xl font-semibold text-[#6A38C2] mb-2">1. Sign Up or Log In</h2>
          <p className="text-gray-700">
            Begin your journey by creating an account as a job seeker or company. We offer secure and intuitive registration for individuals and employers. Already a member? Simply log in to access your dashboard.
          </p>
        </div>

        {/* Step 2 */}
        <div>
          <h2 className="text-2xl font-semibold text-[#6A38C2] mb-2">2. Build Your Profile</h2>
          <p className="text-gray-700">
            Customize your profile with key information like your resume, skills, career interests, and work experience. This helps us personalize job recommendations and interview prep resources tailored just for you.
          </p>
        </div>

        {/* Step 3 */}
        <div>
          <h2 className="text-2xl font-semibold text-[#6A38C2] mb-2">3. Explore and Apply for Jobs</h2>
          <p className="text-gray-700">
            Use our job dashboard to search, filter, and apply for listings that match your profile. Employers can post new job opportunities and manage candidate applications easily through their dedicated portal.
          </p>
        </div>

        {/* Step 4 */}
        <div>
          <h2 className="text-2xl font-semibold text-[#6A38C2] mb-2">4. Get Personalized Recommendations</h2>
          <p className="text-gray-700">
            Our AI-driven engine recommends jobs based on your profile, skills, and past performance in mock tests and interviews — helping you discover roles that truly fit your strengths.
          </p>
        </div>

        {/* Step 5 */}
        <div>
          <h2 className="text-2xl font-semibold text-[#6A38C2] mb-2">5. Prepare for Interviews</h2>
          <p className="text-gray-700">
            Access a range of preparation tools including mock tests, scheduled video interviews, and expert feedback. Build confidence and get ready to ace your interviews with resources crafted for success.
          </p>
        </div>

        {/* Step 6 */}
        <div>
          <h2 className="text-2xl font-semibold text-[#6A38C2] mb-2">6. Secure Payments for Premium Features</h2>
          <p className="text-gray-700">
            Purchase premium interview prep, featured job posts, or access additional tools through our secure and seamless payment gateway — ensuring a smooth experience from end to end.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg text-gray-800 font-medium">Ready to get started?</p>
        <a
          href="/signup"
          className="mt-4 inline-block px-6 py-3 bg-[#6A38C2] text-white rounded-xl text-lg hover:bg-[#5931a6] transition"
        >
          Join Now
        </a>
      </div>
    </div>
  );
};

export default HowItWorks;
