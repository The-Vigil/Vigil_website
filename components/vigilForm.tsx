"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const VigilForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    propertyType: "",
    interestLevel: "",
    comments: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
      setErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? "" : "Please enter a valid email address.",
      }));
    }

    if (name === "phone") {
      const phoneRegex = /^(212|646|917|718|347|929|917|312|773|872)\d{7}$/; // Starts with NYC or Chicago area codes
      setErrors((prev) => ({
        ...prev,
        phone: phoneRegex.test(value.replace(/\D/g, ""))
          ? ""
          : "Enter a valid phone number for NYC or Chicago.",
      }));
    }
  };

  const generateGmailLink = () => {
    const subject = `Early Access Request: ${formData.fullName || "New Submission"}`;
    const body = `
Full Name: ${formData.fullName || "N/A"}
Email Address: ${formData.email || "N/A"}
Property Address: ${formData.address || "N/A"}
Phone Number: ${formData.phone || "N/A"}
Property Type: ${formData.propertyType || "N/A"}
Interest Level: ${formData.interestLevel || "N/A"}
Additional Comments: ${formData.comments || "None"}
    `;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=contact@vigil.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleButtonClick = () => {
    if (!formData.email || !formData.phone || errors.email || errors.phone) {
      alert("Please fix the errors before proceeding.");
      return;
    }

    const emailLink = generateGmailLink();
    window.open(emailLink, "_blank");
    router.push("/confirmation");
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="max-w-2xl mx-auto p-6">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Property Address in NYC</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="Enter property address"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="Enter your phone number"
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Property Type</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            >
              <option value="">Select property type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="mixed">Mixed-use</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Interest Level</label>
            <select
              name="interestLevel"
              value={formData.interestLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            >
              <option value="">Select your interest level</option>
              <option value="ready">Ready to protect my property now</option>
              <option value="interested">Interested in early access benefits</option>
              <option value="exploring">Just exploring options</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Additional Comments (Optional)</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              rows={3}
              placeholder="Any questions or comments?"
            />
          </div>
          <button
            type="button"
            onClick={handleButtonClick}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg text-center transition duration-150"
          >
            Secure Your Spot Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default VigilForm;
