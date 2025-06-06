import React from "react";
import Navbar from "./shared/Navbar";

const ContactUs = () => {
  return (
<>

    <Navbar/>
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-[#6A38C2] mb-8">Contact Us</h1>

      <p className="text-center text-gray-700 mb-10">
        Have questions, suggestions, or need help? We'd love to hear from you. Fill out the form below or reach us directly.
      </p>

      <div className="flex flex-row gap-4">
        {/* Contact Form */}
       

        {/* Contact Information */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-[#6A38C2] mb-2">Our Office</h2>
            <p className="text-gray-700">
              123 Career Avenue<br />
              Tech City, IN 456789<br />
              India
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#6A38C2] mb-2">Email</h2>
            <p className="text-gray-700">support@jobprepportal.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#6A38C2] mb-2">Phone</h2>
            <p className="text-gray-700">+91 98765 43210</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#6A38C2] mb-2">Business Hours</h2>
            <p className="text-gray-700">Mon - Fri: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
