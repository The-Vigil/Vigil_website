import React from 'react';
import { Shield, ArrowRight, Lock, Clock, DollarSign } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variantClasses = variant === "outline" 
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

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`rounded-lg border border-slate-800 bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
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

const ProblemCard: React.FC<ProblemSolutionCardProps> = ({ title, description }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

const SolutionCard: React.FC<ProblemSolutionCardProps> = ({ number, title, description }) => (
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

const ContactButton: React.FC<ContactButtonProps> = ({ text }) => (
  <Button 
    variant="outline" 
    className="py-3 px-6 border-slate-800 text-slate-400"
  >
    {text}
  </Button>
);

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="fixed w-full z-50 border-b border-white/10 bg-black/95">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">VIGIL</span>
          </div>
          <Button className="px-6 py-2">
            Contact Us
          </Button>
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
              Prevent Illegal Occupancy
              <span className="block text-blue-400">Before It Happens</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-3xl mx-auto">
              Dont wait for squatters to claim your property. 
              Our digital passport system stops illegal occupancy instantly.
            </p>

            {/* Emergency Stats */}
            <div className="mb-12 text-red-400 text-lg">
              <span className="font-semibold">NYC Alert:</span> Property owners lose $50,000+ and 6+ months fighting squatters
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
              <Button className="py-4 px-8 text-lg rounded-xl">
                Protect Your Property Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                className="py-4 px-8 text-lg border-blue-500/50 text-blue-400 rounded-xl"
              >
                Contact Us
              </Button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard 
                icon={<DollarSign className="w-6 h-6 text-green-400" />}
                number="$50,000+" 
                label="Legal Costs Prevented"
              />
              <StatsCard 
                icon={<Clock className="w-6 h-6 text-blue-400" />}
                number="60" 
                label="Second Prevention"
              />
              <StatsCard 
                icon={<Lock className="w-6 h-6 text-purple-400" />}
                number="100%" 
                label="Protection Rate"
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
                  title="Squatters Strike Fast"
                  description="Once they're in, removal becomes a legal nightmare"
                />
                <ProblemCard 
                  title="Fake Documents"
                  description="Professional squatters use sophisticated counterfeit leases"
                />
                <ProblemCard 
                  title="Costly Battle"
                  description="6-8 month legal process while they occupy your property"
                />
              </div>
            </div>

            {/* Solution Side */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">VIGIL Protection</h2>
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
              <h2 className="text-3xl font-bold text-white mb-6">
                Secure Your Property Now
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Join NYCs first digital protection system against illegal occupancy
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <BenefitItem text="Priority Access to Protection" />
                <BenefitItem text="Founder's Pricing: $30/month" />
                <BenefitItem text="Direct Support Line" />
                <BenefitItem text="NYPD Integration" />
              </div>
              <Button className="py-4 px-8 text-lg rounded-xl">
                Get Protected Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">
            Protect Your Property Today
          </h2>
          <div className="flex justify-center space-x-6">
            <ContactButton text="info@vigil.security" />
            <ContactButton text="(555) 123-4567" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
