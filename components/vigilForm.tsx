"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, MenuIcon, X } from 'lucide-react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddressSuggestion {
  properties: {
    formatted: string;
  };
}

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

  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Field-specific validation
    if (name === "fullName") {
      const nameRegex = /^[a-zA-Z\s]{2,}$/;
      setErrors((prev) => ({
        ...prev,
        fullName: nameRegex.test(value) ? "" : "Please enter a valid full name.",
      }));
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? "" : "Please enter a valid email address.",
      }));
    }

    if (name === "phone") {
      const phoneRegex = /^(\+1|1)?[-.\s]?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
      setErrors((prev) => ({
        ...prev,
        phone: phoneRegex.test(value.replace(/\D/g, ""))
          ? ""
          : "Enter a valid phone number for NYC or Chicago.",
      }));
    }

    if (name === "address") {
      setErrors((prev) => ({
        ...prev,
        address: value.trim() ? "" : "Please enter a valid address.",
      }));
      fetchAddressSuggestions(value);
    }

    if (name === "propertyType") {
      setErrors((prev) => ({
        ...prev,
        propertyType: value ? "" : "Please select a property type.",
      }));
    }

    if (name === "interestLevel") {
      setErrors((prev) => ({
        ...prev,
        interestLevel: value ? "" : "Please select an interest level.",
      }));
    }
  };

  const fetchAddressSuggestions = async (text: string) => {
    if (!text.trim()) {
      setAddressSuggestions([]);
      return;
    }
    setIsLoading(true);
    const apiKey = "d88476f5ea58479b9841c31a02d92352";
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&apiKey=${apiKey}`
      );
      const data = await response.json();
      setAddressSuggestions(data.features || []);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSelect = (address: string) => {
    setFormData((prev) => ({ ...prev, address }));
    setAddressSuggestions([]);
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
    if (Object.values(errors).some((error) => error) || Object.values(formData).some((field) => !field.trim())) {
      toast.error("Please fix the validation errors before proceeding.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const emailLink = generateGmailLink();
    window.open(emailLink, "_blank");
    router.push("/confirmation");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="entire-body">
      <nav className="fixed w-full z-50 border-b border-white/10 bg-black/95">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Section */}
          <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">VIGIL</span>
          </div>
          <div className="md:hidden flex items-center">
              <button
                  className="text-white focus:outline-none"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
              {isMenuOpen ? (
              <X className="text-xl" /> // Close Icon\
              ) : (
              <MenuIcon className="text-xl"/> // Hamburger Icon
              )}
              </button>
          </div>

        {/* Buttons Section */}
          <div className={`md:flex gap-4 ${isMenuOpen ? "block bg-black/95 px-6 py-6" : "hidden"} absolute md:static top-20 left-0 w-full md:w-auto bg-black/95 md:bg-transparent text-center`}>
          <Link
              href="/pitch-deck"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition block md:inline-block mx-auto md:mx-0 mb-5 md:mb-0"
          >
              Pitch Deck
          </Link>
          <Link
              href="/"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition block md:inline-block mx-auto md:mx-0 mb-5 md:mb-0"
          >
              Go Home
          </Link>
          {/* <a
              href="/Pitch_deck_vigil.pdf"
              download="Pitch_deck_vigil.pdf" // Explicitly set the file name for download
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition block md:inline-block mx-auto md:mx-0"
          >
              Pitch Deck
          </a> */}
          </div>
        </div>
      </nav>

    <div className="min-h-screen bg-black text-gray-100 pt-32 pb-20 relative overflow-hidden">
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-white">VIGIL</h1>
          </div>
          <div className="bg-blue-900/20 text-blue-400 py-2 px-4 rounded-full inline-block mb-6">
            250 Early Access Spots Available
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-white">Protect Your Property</h2>
          <p className="text-gray-400">Transform a 6-month legal battle into 60 second verification</p>
        </div>
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
{isLoading ? (
    <div className="mt-2 text-gray-400 text-sm">Fetching suggestions...</div>
  ) : (
    addressSuggestions.length > 0 && (
      <ul className="bg-black border border-gray-700 rounded-lg mt-2">
        {addressSuggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleAddressSelect(suggestion.properties.formatted)}
            className="px-4 py-2 cursor-pointer hover:bg-gray-700"
          >
            {suggestion.properties.formatted}
          </li>
        ))}
      </ul>
    )
  )}
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
    </div>
  );
};

export default VigilForm;
