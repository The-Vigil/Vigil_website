"use client";
import React from "react";
import {
  Shield,
  ArrowRight,
  Lock,
  Clock,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import FloatingChatWindow from "./floatingChatWindow";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  className?: string;
}

interface ContactButtonProps {
  text: string;
  href?: string; // Optional href for linking
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
  onClick,
}) => {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="py-3 px-6 border border-slate-800 text-slate-400 rounded hover:bg-slate-700 transition"
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

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <Link
              href="/book"
              className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition"
            >
              Contact Us
            </Link>
            <a
              href="/Pitch_deck_vigil.pdf"
              download="Pitch_deck_vigil.pdf"
              className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition"
            >
              Pitch Deck
            </a>
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
              <div className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 animate-pulse">
                Stop Squatters Before They Enter
              </div>
            </div>

            {/* Launch Badge */}
            <div className="inline-block mb-8">
              <div className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                Launching December 2024 in NYC
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Property ownership verification
              <span className="block text-blue-400">AI-Powered Processing</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-3xl mx-auto">
              Transform a 6-month legal battle into 60-second verification.
              Secure Your Property Ownership Digitally.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
              <Link href="/book">
                <Button className="w-full sm:w-auto py-4 px-8 text-lg rounded-xl flex items-center justify-center">
                  Protect Your Property Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a
                href="/Pitch_deck_vigil.pdf"
                download="Pitch_deck_vigil.pdf"
                className="w-full sm:w-auto py-4 px-8 bg-blue-500 text-white text-lg rounded-xl text-center hover:bg-blue-600 transition"
              >
                Download Pitch Deck
              </a>
            </div>


            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6            ">
              <StatsCard
                icon={<Lock className="w-12 h-12 text-blue-500" />}
                number="100%"
                label="Ownership Secured"
              />
              <StatsCard
                icon={<Clock className="w-12 h-12 text-blue-500" />}
                number="60s"
                label="Verification Time"
              />
              <StatsCard
                icon={<DollarSign className="w-12 h-12 text-blue-500" />}
                number="$0"
                label="Initial Cost"
              />
              <StatsCard
                icon={<ShieldCheck className="w-12 h-12 text-blue-500" />}
                number="24/7"
                label="Support Availability"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              The Problem We Solve
            </h2>
            <p className="text-slate-400 mt-4">
              Understanding the challenges faced by property owners in protecting their assets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProblemCard
              number="01"
              title="Lengthy Legal Processes"
              description="Property disputes can take months or even years to resolve through the courts."
            />
            <ProblemCard
              number="02"
              title="Unauthorized Occupants"
              description="Squatters or unauthorized tenants can take possession of properties without proper consent."
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our Solution
            </h2>
            <p className="text-slate-400 mt-4">
              Leveraging AI to verify property ownership and prevent disputes effortlessly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SolutionCard
              number="01"
              title="AI-Powered Verification"
              description="Quickly and accurately verify property ownership using advanced AI technologies."
            />
            <SolutionCard
              number="02"
              title="Digital Proof"
              description="Secure your ownership rights with tamper-proof digital documentation."
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Why Choose Us?
            </h2>
            <p className="text-slate-400 mt-4">
              Discover the advantages of using our AI-powered property verification service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitItem text="Enhanced security for your property." />
            <BenefitItem text="Seamless and fast verification process." />
            <BenefitItem text="Reduced legal costs and disputes." />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Secure Your Property?
          </h2>
          <p className="text-slate-400 mb-8">
            Get started today and experience the future of property ownership verification.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ContactButton text="Contact Us" href="/book" />
            <ContactButton
              text="Learn More"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </div>
        </div>
      </section>

      {/* Floating Chat */}
      <FloatingChatWindow />
    </div>
  );
};

export default LandingPage;

