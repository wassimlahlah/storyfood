import React from "react";
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

const ContactSocial = () => {
  return (
    <div className="min-h-screen bg-white flex justify-center py-10 px-4">
      <div className="max-w-lg w-full bg-red-50 shadow-xl rounded-2xl p-8 border-t-4 border-red-600">

        <h1 className="text-3xl font-bold text-red-600 text-center mb-6">
          Contact Us - StoryFood
        </h1>

        <div className="space-y-6">

          {/* Social Media */}
          <div className="bg-white p-5 rounded-xl border border-red-300 shadow-sm">
            <h2 className="text-xl font-bold text-red-700 mb-3">Our Social Media</h2>

            <div className="flex flex-col space-y-3 text-lg">

              <a 
                href="https://www.facebook.com/profile.php?id=61581481108622"
                className="flex items-center gap-3 text-red-600 hover:text-red-800 transition"
              >
                <FaFacebook size={28} /> Facebook
              </a>

              <a 
                href="https://www.instagram.com/storyfood23?igsh=bTRncWw3czFrOHgx"
                className="flex items-center gap-3 text-red-600 hover:text-red-800 transition"
              >
                <FaInstagram size={28} /> Instagram
              </a>

              <a 
                href="https://www.tiktok.com/@story.food66?_r=1&_t=ZS-91mr3enXZ95"
                className="flex items-center gap-3 text-red-600 hover:text-red-800 transition"
              >
                <FaTiktok size={28} /> TikTok
              </a>

            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-5 rounded-xl border border-red-300 shadow-sm">
            <h2 className="text-xl font-bold text-red-700 mb-2">Store Address</h2>
            <p className="flex items-center gap-3 text-gray-700">
              <FaMapMarkerAlt className="text-red-600" />
              Oran, Algeria – Sid El-Houari District
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white p-5 rounded-xl border border-red-300 shadow-sm">
            <h2 className="text-xl font-bold text-red-700 mb-2">Phone Number</h2>
            <p className="flex items-center gap-3 text-gray-700 text-lg font-bold">
              <FaPhone className="text-red-600" />
              +213 793 440 195
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactSocial;
