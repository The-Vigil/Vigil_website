import React from "react";
import Image from 'next/image';

interface AboutUsProps {
  companyName: string;
  mission: string;
  vision: string;
  values: string[];
  team: {
    name: string;
    role: string;
    photoUrl: string;
  }[];
}

const TeamMemberCard: React.FC<{ name: string; role: string; photoUrl: string }> = ({
  name,
  role,
  photoUrl,
}) => (
  <div style={{ margin: "10px", textAlign: "center" }}>
    <Image
      src={photoUrl}
      alt={`${name}'s photo`}
      style={{ width: "100px", height: "100px", borderRadius: "50%" }}
    />
    <h4>{name}</h4>
    <p>{role}</p>
  </div>
);

const AboutUs: React.FC<AboutUsProps> = ({
  companyName,
  mission,
  vision,
  values,
  team,
}) => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>About {companyName}</h1>
      <p>{mission}</p>
      <h2>Our Vision</h2>
      <p>{vision}</p>
      <h2>Our Values</h2>
      <ul>
        {values.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <h2>Meet Our Team</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {team.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            role={member.role}
            photoUrl={member.photoUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;

// Usage Example
const teamData = [
  { name: "Alice Johnson", role: "CEO", photoUrl: "/images/alice.jpg" },
  { name: "Bob Smith", role: "CTO", photoUrl: "/images/bob.jpg" },
  { name: "Charlie Davis", role: "Designer", photoUrl: "/images/charlie.jpg" },
];

<AboutUs
  companyName="InnovateTech"
  mission="Innovating the future through technology."
  vision="To be the world's leading tech solutions provider."
  values={["Integrity", "Innovation", "Customer Centricity"]}
  team={teamData}
/>;
