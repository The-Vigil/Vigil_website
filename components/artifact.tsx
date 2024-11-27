import React from 'react';
import Card from './ui/card';
import { Building2, Shield, Clock, DollarSign, Users, CheckCircle, BarChart3, Lock } from 'lucide-react';

const VCPitchDeck = () => {
    return (
        <div className="w-full max-w-5xl space-y-12 p-8">


            {/* Join Us Slide */}
            <Card className="p-12 bg-slate-900 text-white">
                <div className="space-y-8">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold mb-4">Join Us in Transforming Property Protection</h2>
                        <p className="text-xl text-blue-400">From 6-Month Legal Battles to 60-Second Verification</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="p-8 bg-slate-800 rounded-lg">
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

                        <div className="p-8 bg-slate-800 rounded-lg">
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

                    <div className="mt-12 text-center">
                        <h3 className="text-xl font-bold mb-4">Ready to Transform Property Protection?</h3>
                        <div className="space-y-2">
                            <p className="text-blue-400">Contact: contact@thevigil.ai | +1 (917) 238-4177</p>
                            <p className="text-gray-400">Lets Protect Property Rights Together</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default VCPitchDeck;

