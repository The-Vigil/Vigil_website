"use client";
import React, { useState } from "react";
import {
  Shield,
  ArrowRight,
  Lock,
  Clock,
  DollarSign,
  ShieldCheck,
  MenuIcon,
  X
} from "lucide-react";
import Link from "next/link";
import FloatingChatWindow from "./floatingChatWindow";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

interface ContactButtonProps {
  text: string;
  className?: string;
  href?: string; 
  onClick?: () => void; // Optional onClick for additional behavior
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variantClasses =
    variant === "outline"
      ? "border border-input hover:bg-accent hover:text-accent-foreground"
      : "bg-blue-500 hover:bg-blue-600 text-white";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div
    className={`rounded-lg border border-slate-800 bg-card text-card-foreground shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardContent: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

interface StatsCardProps {
  icon: React.ReactElement;
  number: string;
  label: string;
}

interface ProblemSolutionCardProps {
  title: string;
  description: string;
  number?: string;
}

interface BenefitItemProps {
  text: string;
}

interface ContactButtonProps {
  text: string;
  classname: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, number, label }) => (
  <Card className="bg-slate-900/50 border-slate-800">
    <CardContent className="p-6 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <div className="text-3xl font-bold text-white mb-1">{number}</div>
      <div className="text-slate-400">{label}</div>
    </CardContent>
  </Card>
);

const ProblemCard: React.FC<ProblemSolutionCardProps> = ({
  number,
  title,
  description,
}) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
    <div className="text-slate-400 font-mono mb-2">{number}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

const SolutionCard: React.FC<ProblemSolutionCardProps> = ({
  number,
  title,
  description,
}) => (
  <div className="bg-blue-950/50 border border-blue-900 rounded-xl p-6">
    <div className="text-blue-400 font-mono mb-2">{number}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

const BenefitItem: React.FC<BenefitItemProps> = ({ text }) => (
  <div className="flex items-center space-x-2">
    <Shield className="w-5 h-5 text-blue-400" />
    <span className="text-slate-300">{text}</span>
  </div>
);

const ContactButton: React.FC<ContactButtonProps> = ({
  text,
  href,
  className,
  onClick,
}) => {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`py-3 px-6 border border-slate-800 text-slate-400 rounded hover:bg-slate-700 transition ${className}`}
      >
        {text}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="py-3 px-6 border border-slate-800 text-slate-400 rounded hover:bg-slate-700 transition"
    >
      {text}
    </button>
  );
};

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
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
            href="/book"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition block md:inline-block mx-auto md:mx-0 mb-5 md:mb-0"
          >
            Contact Us
          </Link>
          <Link
            href="/pitch-deck"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition block md:inline-block mx-auto md:mx-0 mb-5 md:mb-0"
          >
            Pitch Deck
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />

        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            {/* Pre-headline Alert */}
            <div className="inline-block mb-6">
              <div className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 animate-pulse me-0 md:me-4">
                Stop Squatters from occupying your property
              </div>
            </div>

            {/* Launch Badge */}
            <div className="inline-block mb-8">
              <div className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                Launching February 2025 in NYC
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Property ownership verification
              <span className="block text-blue-400">AI-Powered Processing</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-3xl mx-auto">
              Transform a 6-months legal battle into 60 seconds verification.
              Secure Your Property Ownership Digitally.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">

              <Link href="/book" >
                <Button className="py-4 px-8 text-lg rounded-xl flex items-center">
                  Protect Your Property Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatsCard
                icon={<DollarSign className="w-6 h-6 text-green-400" />}
                number="$50,000+"
                label="Legal Costs Prevention"
              />
              <StatsCard
                icon={<Clock className="w-6 h-6 text-blue-400" />}
                number="60"
                label="Second Prevention"
              />
              <StatsCard
                icon={<Lock className="w-6 h-6 text-purple-400" />}
                number="99%"
                label="Protection Rate"
              />
              <StatsCard
                icon={<ShieldCheck className="w-6 h-6 text-blue-400" />}
                number="24/7"
                label=" Law enforcement integration"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Solution Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Problem Side */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">The Threat</h2>
              <div className="space-y-6">
                <ProblemCard
                  number="01"
                  title="Squatters Strike Fast"
                  description="Once they're in, removal becomes a legal nightmare"
                />
                <ProblemCard
                  number="02"
                  title="Fake Documents"
                  description="Professional squatters use sophisticated counterfeit leases"
                />
                <ProblemCard
                  number="03"
                  title="Costly Battle"
                  description="6-8 month legal process while they occupy your property"
                />
              </div>
            </div>

            {/* Solution Side */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">
                VIGIL Protection
              </h2>
              <div className="space-y-6">
                <SolutionCard
                  number="01"
                  title="Instant Prevention"
                  description="Police verify ownership before squatters can claim rights"
                />
                <SolutionCard
                  number="02"
                  title="Digital Shield"
                  description="Your property's unique verification passport"
                />
                <SolutionCard
                  number="03"
                  title="Immediate Action"
                  description="Enable police to act instantly, not months later"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Launch Info Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Card className="bg-gradient-to-b from-blue-950 to-slate-900 border-blue-500/20">
            <CardContent className="p-12">
              <div className="inline-block mb-6">
                <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  250 Early Access Spots Available
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Join The Founding Members List
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Be among the first in NYC to secure your property with next-gen
                digital protection
              </p>
              <div className="flex md:flex-row justify-between items-center flex-col gap-8 mb-8 text-left">
                <div className="flex-shrink-0">
                  <BenefitItem text="Lifetime Founding Member Status" />
                </div>
                <div className="flex-shrink-0">
                  <BenefitItem text="Priority Support Access" />
                </div>
                <div className="flex-shrink-0">
                  <BenefitItem text="Early Access to Features" />
                </div>
              </div>

              <div className="flex justify-center">
                <Link href="/book">
                  <Button className="py-4 px-8 text-lg rounded-xl flex items-center">
                    Secure Your Spot Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link href="/book">
            <h2 className="text-2xl font-bold text-white mb-8 cursor-pointer">
              Protect Your Property Today
            </h2>
          </Link>
          <div className="flex flex-col md:flex-row justify-center items-center ">
            <ContactButton
              className="mb-4 md:mb-0 mr-0 md:mr-4"
              text="Contact: Contact@thevigil.ai"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=demo@vigil.com" classname={""}            />
            <ContactButton
              text="+1 (917) 238-4177"
              onClick={() => alert("Redirecting to protect property rights!")} classname={""}            />
          </div>
        </div>
      </section>
      <FloatingChatWindow/>
      {/* <CosmicRingChat/> */}
    </div>
  );
};

export default LandingPage;