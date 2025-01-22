"use client";
import React, {useState} from 'react';
import Card from '@/components/ui/card';
import Link from "next/link";
import { Building2, Shield, Clock, DollarSign, Users, CheckCircle, BarChart3, Lock, MenuIcon, X } from 'lucide-react';

const VCPitchDeck = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        // <div className="w-full max-w-5xl space-y-12 p-8">
        <div className='entire-body'>
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
            <div className="w-full pt-8 pb-20 relative overflow-hidden">
                {/* Title Slide */}
                <Card className="p-8 sm:p-16 bg-slate-900 text-white">
                    <div className="space-y-6 sm:space-y-8 text-center">
                        {/* Title Section */}
                        <h1 className="text-4xl sm:text-6xl font-bold">VIGIL</h1>
                        <div className="h-px w-20 sm:w-32 mx-auto bg-blue-400"></div>

                        {/* Subtitle Section */}
                        <div className="space-y-2 sm:space-y-4">
                            <p className="text-2xl sm:text-3xl font-semibold text-blue-400">Transforming Property Protection</p>
                            <p className="text-lg sm:text-xl text-gray-300">Instant Ownership Verification for Law Enforcement</p>
                        </div>

                        {/* Metrics Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-gray-700">
                            <div>
                                <p className="text-3xl sm:text-4xl font-bold text-red-400">6-8</p>
                                <p className="text-gray-300">Months of Legal Battle</p>
                            </div>
                            <div>
                                <p className="text-3xl sm:text-4xl font-bold text-red-400">$50K+</p>
                                <p className="text-gray-300">Legal Fees Per Case</p>
                            </div>
                            <div>
                                <p className="text-3xl sm:text-4xl font-bold text-green-400">60</p>
                                <p className="text-gray-300">Second Solution</p>
                            </div>
                        </div>
                    </div>
                </Card>



                {/* Problem Statement */}
                <Card className="p-6 sm:p-12 bg-white">
                    <div className="space-y-6 sm:space-y-8">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-red-600" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
                                The Critical Verification Gap
                            </h2>
                        </div>

                        {/* Description */}
                        <p className="text-lg sm:text-xl text-gray-600 text-center sm:text-left">
                            When law enforcement responds to property disputes, they lack real-time ownership verification capabilities, leading to:
                        </p>

                        {/* Issues and Financial Impact */}
                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
                            {/* Issues List */}
                            <div className="space-y-4">
                                {[
                                    "Escalating unauthorized occupancy incidents",
                                    "Unable to verify legitimate ownership claims",
                                    "Cases defaulting to civil proceedings",
                                    "Property owners facing lengthy legal battles",
                                    "Significant financial losses and property damage"
                                ].map((text, index) => (
                                    <div
                                        key={`${index}-${text}`}
                                        className="flex items-center gap-4 bg-red-50 p-4 rounded-lg"
                                    >
                                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                            <span className="font-bold text-red-800">{index + 1}</span>
                                        </div>
                                        <p className="text-gray-800">{text}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Financial Impact */}
                            <div className="space-y-6 bg-slate-900 p-6 sm:p-8 rounded-lg text-white">
                                <h3 className="text-lg sm:text-xl font-bold border-b border-gray-700 pb-4">
                                    Financial Impact Per Case
                                </h3>
                                {[
                                    { title: "Legal Fees", amount: "$30,000-$50,000", icon: <DollarSign className="w-5 h-5 text-red-400" /> },
                                    { title: "Property Damage", amount: "$20,000-$40,000", icon: <Building2 className="w-5 h-5 text-red-400" /> },
                                    { title: "Lost Income", amount: "$15,000-$25,000", icon: <DollarSign className="w-5 h-5 text-red-400" /> }
                                ].map(({ title, amount, icon }, index) => (
                                    <div
                                        key={`${index}-${title}`}
                                        className="bg-slate-800 p-4 rounded-lg flex items-center gap-4"
                                    >
                                        <div className="p-2 bg-slate-700 rounded-lg">{icon}</div>
                                        <div>
                                            <p className="text-sm text-gray-400">{title}</p>
                                            <p className="text-lg sm:text-xl font-bold text-red-400">{amount}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Total Cost Summary */}
                        <div className="mt-6 sm:mt-8 bg-blue-50 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center">
                            <div className="space-y-2 text-center sm:text-left">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Total Cost Per Incident
                                </h3>
                                <p className="text-gray-600">
                                    Property owners face devastating losses while waiting for legal resolution
                                </p>
                            </div>
                            <div className="text-center sm:text-right mt-4 sm:mt-0">
                                <p className="text-2xl sm:text-3xl font-bold text-blue-600">Up to $115,000</p>
                                <p className="text-gray-600">Combined Financial Impact</p>
                            </div>
                        </div>
                    </div>
                </Card>


                {/* Solution Section */}
                <Card className="p-6 sm:p-12 bg-white">
                    <div className="space-y-6 sm:space-y-8">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    The Vigil Solution
                                </h2>
                                <p className="text-lg sm:text-xl text-gray-600 mt-2">
                                    Digital Property Passport - Instant Verification Like Running a License Check
                                </p>
                            </div>
                        </div>

                        {/* Solution Steps */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {[
                                {
                                    icon: <Building2 className="w-6 h-6 text-white" />,
                                    title: "Owner Registration",
                                    desc: "Upload property deed",
                                    features: ["ML-powered deed extraction", "Automated verification", "Legal system integration"],
                                    color: "bg-blue-500"
                                },
                                {
                                    icon: <Lock className="w-6 h-6 text-white" />,
                                    title: "Digital Passport",
                                    desc: "Secure QR code generation",
                                    features: ["Blockchain verification", "Tamper-proof design", "Real-time updates"],
                                    color: "bg-green-500"
                                },
                                {
                                    icon: <Shield className="w-6 h-6 text-white" />,
                                    title: "Police Verification",
                                    desc: "60-second verification",
                                    features: ["Instant results", "Legal authority", "Automated reporting"],
                                    color: "bg-purple-500"
                                }
                            ].map((step, index) => (
                                <div
                                    key={index}
                                    className="p-6 sm:p-8 bg-gray-50 rounded-lg border-t-4 border-blue-500 relative"
                                >
                                    {/* Icon Section */}
                                    <div
                                        className={`absolute -top-4 -left-4 w-12 h-12 ${step.color} rounded-lg flex items-center justify-center`}
                                    >
                                        {step.icon}
                                    </div>

                                    {/* Content Section */}
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 mt-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 mb-4">{step.desc}</p>
                                    <div className="space-y-2">
                                        {step.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <p className="text-xs sm:text-sm text-gray-600">{feature}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Why Now */}
                <Card className="p-6 sm:p-12 bg-white">
                    <div className="space-y-6 sm:space-y-8">
                        {/* Header Section */}
                        <div className="flex items-start sm:items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Now?</h2>
                        </div>

                        {/* Why Now Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Dynamic Content */}
                            {[
                                {
                                    icon: <Shield className="w-6 h-6 text-white" />,
                                    title: "Urgent Market Need",
                                    desc: "Rising property disputes and legal costs creating demand for instant verification",
                                    color: "bg-red-500",
                                    bg: "bg-red-50"
                                },
                                {
                                    icon: <Lock className="w-6 h-6 text-white" />,
                                    title: "Technology Readiness",
                                    desc: "AI/ML capabilities and blockchain technology enabling secure, instant verification",
                                    color: "bg-blue-500",
                                    bg: "bg-blue-50"
                                },
                                {
                                    icon: <Users className="w-6 h-6 text-white" />,
                                    title: "Stakeholder Alignment",
                                    desc: "Law enforcement and property owners seeking digital solutions",
                                    color: "bg-green-500",
                                    bg: "bg-green-50"
                                },
                                {
                                    icon: <CheckCircle className="w-6 h-6 text-white" />,
                                    title: "Validated Solution",
                                    desc: "Proven concept with 30+ property owners and law enforcement feedback",
                                    color: "bg-purple-500",
                                    bg: "bg-purple-50"
                                }
                            ].map((item, index) => (
                                <div key={`${index}-${item}`} className={`${item.bg} p-6 rounded-lg space-y-4`}>
                                    <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Benefits for Stakeholders */}
                <Card className="p-6 sm:p-12 bg-slate-900 text-white">
                    <div className="space-y-6 sm:space-y-8">
                        {/* Header Section */}
                        <div className="flex items-start sm:items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-400 bg-opacity-20 flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-400" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold">Stakeholder Benefits</h2>
                        </div>

                        {/* Stakeholder Benefits Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                            {/* Property Owners Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <Building2 className="w-6 h-6 text-blue-400" />
                                    <h3 className="text-xl sm:text-2xl font-bold">Property Owners</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Prevent lengthy legal battles",
                                        "Save $30,000-$50,000 in legal fees",
                                        "Protect against property damage",
                                        "Maintain rental income stream",
                                        "Peace of mind with instant verification"
                                    ].map((benefit, index) => (
                                        <div key={`${index}-${benefit}`} className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <p className="text-gray-200">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Law Enforcement Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-6 h-6 text-blue-400" />
                                    <h3 className="text-xl sm:text-2xl font-bold">Law Enforcement</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Instant ownership verification",
                                        "Integrated with existing systems",
                                        "Reduce repeated calls",
                                        "Clear authority to act",
                                        "Streamlined reporting process"
                                    ].map((benefit, index) => (
                                        <div key={`${index}-${benefit}`} className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <p className="text-gray-200">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>


                {/* Market Opportunity */}
                <Card className="p-6 sm:p-12 bg-white">
                    <div className="space-y-6 sm:space-y-8">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Market Opportunity</h2>
                                <p className="text-lg sm:text-xl text-gray-600 mt-2">
                                    Dual Revenue Streams with Clear Path to Scale
                                </p>
                            </div>
                        </div>

                        {/* Revenue Streams */}
                        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                            {[
                                {
                                    title: "Property Subscriptions",
                                    metrics: [
                                        ["Target Properties", "1,522,700"],
                                        ["Monthly Fee", "$30"],
                                        ["Monthly Potential", "$45.68M"]
                                    ]
                                },
                                {
                                    title: "Law Enforcement Licensing",
                                    metrics: [
                                        ["Target Zip Codes", "4,170"],
                                        ["Annual License", "$10,000"],
                                        ["Annual Potential", "$41.7M"]
                                    ]
                                }
                            ].map((stream, index) => (
                                <div key={index} className="p-6 sm:p-8 bg-gray-50 rounded-lg border border-gray-200">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{stream.title}</h3>
                                    <div className="space-y-4">
                                        {stream.metrics.map(([label, value], i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-100"
                                            >
                                                <span className="font-medium sm:font-semibold text-gray-600">{label}</span>
                                                <span className={`text-lg sm:text-xl font-bold ${i === 2 ? 'text-green-600' : 'text-gray-900'}`}>
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total Market Potential */}
                        <div className="p-6 sm:p-8 bg-slate-900 rounded-lg text-white">
                            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                                {/* Total Annual Market Potential */}
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-4">Total Annual Market Potential</h3>
                                    <p className="text-3xl sm:text-4xl font-bold text-green-400">$1.05B</p>
                                </div>
                                {/* Initial Target Market */}
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-4">Initial Target Market</h3>
                                    <div className="space-y-2">
                                        {[
                                            "Starting in New York City",
                                            "First Police Precinct Pilot",
                                            "100 Initial Properties"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                <p className="text-sm sm:text-base">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Team Slide */}
                {/* Experienced Team */}
                <Card className="p-6 sm:p-12 bg-white">
                    <div className="space-y-6 sm:space-y-8">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Experienced Team</h2>
                        </div>

                        {/* Team Member Cards */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {[
                                {
                                    title: "CEO & Founder",
                                    points: [
                                        "Running $9M ARR Trucking Startup",
                                        "5+ Years Property Management",
                                        "First-hand Problem Experience"
                                    ]
                                },
                                {
                                    title: "CTO",
                                    points: [
                                        "ML Engineer",
                                        "Entrepreneurial Background",
                                        "Built Deed Extraction System"
                                    ]
                                },
                                {
                                    title: "Development",
                                    points: [
                                        "Full Stack Developer",
                                        "System Architecture",
                                        "Rapid MVP Development"
                                    ]
                                }
                            ].map((member, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-gray-50 rounded-lg border-t-4 border-purple-500"
                                >
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{member.title}</h3>
                                    <div className="space-y-3">
                                        {member.points.map((point, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                <p className="text-sm sm:text-base text-gray-700">{point}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Progress and Next Steps */}
                        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                            {/* Current Progress */}
                            <div className="p-6 sm:p-8 bg-green-50 rounded-lg">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                                    Current Progress
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        "Deed Extraction System Built",
                                        "Development Time: 2 Months",
                                        "Initial Police Discussions",
                                        "Core Team Assembled"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <p className="text-sm sm:text-base font-medium text-gray-700">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Next Steps */}
                            <div className="p-6 sm:p-8 bg-blue-50 rounded-lg">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                                    Next Steps
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        "MVP Launch: December 2024",
                                        "Initial Market: New York City",
                                        "First Police Precinct Integration",
                                        "First 100 Properties Onboarding"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <p className="text-sm sm:text-base font-medium text-gray-700">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Join Us Slide */}
                <Card className="p-6 sm:p-12 bg-slate-900 text-white">
                    <div className="space-y-6 sm:space-y-8">
                        {/* Header Section */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Us in Transforming Property Protection</h2>
                            <p className="text-lg sm:text-xl text-blue-400">From 6-Month Legal Battles to 60-Second Verification</p>
                        </div>

                        {/* Grid Layout for Use of Funds and 12-Month Objectives */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Use of Funds Section */}
                            <div className="p-6 sm:p-8 bg-slate-800 rounded-lg">
                                <h3 className="text-xl font-bold mb-6">Use of Funds</h3>
                                <div className="space-y-6">
                                    {[
                                        ["Product Development", 40],
                                        ["Market Launch", 30],
                                        ["Team Expansion", 20],
                                        ["Operations", 10]
                                    ].map(([label, percentage]) => (
                                        <div key={label} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span>{label}</span>
                                                <span className="text-blue-400">{percentage}%</span>
                                            </div>
                                            <div className="w-full bg-slate-700 rounded-full h-2">
                                                <div
                                                    className="bg-blue-400 h-2 rounded-full"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 12-Month Objectives Section */}
                            <div className="p-6 sm:p-8 bg-slate-800 rounded-lg">
                                <h3 className="text-xl font-bold mb-6">12-Month Objectives</h3>
                                <div className="space-y-4">
                                    {[
                                        "Complete MVP Development",
                                        "Launch in First NYC Precinct",
                                        "Onboard Initial 100 Properties",
                                        "Scale Engineering Team",
                                        "Expand to Additional Precincts"
                                    ].map((objective, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <p>{objective}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="mt-12 text-center">
                            <h3 className="text-xl font-bold mb-4">Ready to Transform Property Protection?</h3>
                            <div className="space-y-2">
                                <p className="text-blue-400">Contact: demo@vigil.com | (555) 123-4567</p>
                                <p className="text-gray-400">Let&apos;s Protect Property Rights Together</p>
                            </div>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default VCPitchDeck;
