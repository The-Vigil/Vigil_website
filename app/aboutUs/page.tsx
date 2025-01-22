import React from "react";
import Image from "next/image";

const AboutUs: React.FC = () => {
  const team = [
    { name: "A", role: "CEO", photoUrl: "/images/image1.jpeg" },
    { name: "B", role: "CTO", photoUrl: "/images/bob.jpg" },
    { name: "C", role: "Designer", photoUrl: "/images/charlie.jpg" },
  ];

  return (
    <div
      className="p-8 font-arial min-h-screen"
      style={{
        backgroundColor: "#121212", // Dark background color
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white", // Default text color
      }}
    >
      <div className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-8">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-blue-400">
          About Vigil
        </h1>
        <p className="text-xl italic text-white mb-8 text-center">
          Protecting owners while ensuring tenant safety.
        </p>

        <h2 className="text-3xl font-bold mb-4 text-blue-400 decoration-sky-600">
          Who We Are
        </h2>
        <p className="text-lg leading-relaxed mb-8">
          Vigil is a cutting-edge technology company dedicated to protecting property owners from illegal occupancy by tenants. We provide faster and seamless online verification of properties to ensure peace of mind.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-blue-400 text-center">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed">
              Our mission is to empower property owners by safeguarding their rights and providing unparalleled protection for their assets.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-blue-400 text-center">
              Our Vision
            </h2>
            <p className="text-lg leading-relaxed">
              To be the world's leading tech solutions provider, renowned for innovation, quality, and integrity, transforming the property security landscape.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-blue-400 decoration-sky-600">
          Our History
        </h2>
        <p className="text-lg leading-relaxed mb-10">
          Founded in 2025, Vigil began as a small startup with a big vision: to revolutionize the tech industry with property security solutions. Today, we are a global leader, offering innovative services across industries with unwavering dedication.
        </p>

        <h2 className="text-3xl font-bold mb-4 text-blue-400 decoration-sky-600">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="m-4 text-center bg-gray-800 shadow-lg rounded-lg p-6 w-60 hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src={member.photoUrl}
                alt={`${member.name}'s photo`}
                className="w-28 h-28 mx-auto rounded-full mb-4"
                width={112}
                height={112}
              />
              <h4 className="text-xl text-blue-400 font-bold">{member.name}</h4>
              <p className="text-lg text-white">{member.role}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-4 text-blue-400 decoration-sky-600">
          Contact Us
        </h2>
        <p className="text-lg mb-6">
          We would love to hear from you! Feel free to reach out to us by clicking the button below:
        </p>
        <a
          href="https://mail.google.com/mail/u/0/?fs=1&to=demo@vigil.com&tf=cm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-3 bg-sky-500 text-white rounded-lg text-lg font-semibold hover:bg-sky-600 transition-colors duration-300"
        >
          Email Us
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
