import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import LayoutNavbar from '../components/LayoutNavbar.jsx';

const LandingPage = () => {
    const [showFeedbackRedirect, setShowFeedbackRedirect] = useState(false);
    const navigate = useNavigate();

    const handleFeedbackRedirect = () => {
        setShowFeedbackRedirect(true);
        setTimeout(() => {
            navigate("/dashboard/feedback");
        }, 1800);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
            {/* Navbar */}
            <LayoutNavbar />
            {/* <WireframeScene className="z-index-0" /> */}
            {/* Hero Section */}
            <section className="relative w-full min-h-screen overflow-hidden bg-black">
                {/* Background Video */}
                <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md z-1">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    >
                        <source src="/videos/swirl.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Glossy Matte Overlay */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background: 'linear-gradient(135deg, rgba(30,30,30,0.85) 60%, rgba(60,60,60,0.7) 100%)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                        backdropFilter: 'blur(8px) saturate(120%)',
                        WebkitBackdropFilter: 'blur(8px) saturate(120%)',
                        borderRadius: '0 0 40px 40px',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        borderBottom: '1px solid rgba(255,255,255,0.08)'
                    }}
                />

                {/* Hero Content */}
                <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-8 lg:px-32 py-20 gap-12">
                    <div className="lg:w-1/2 text-center">
                        <motion.h1
                            className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 drop-shadow-[0_2px_16px_rgba(176,149,255,0.18)]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                                letterSpacing: "0.06em",
                            }}
                        >
                            Secure Your Cloud Infrastructure <br className="hidden md:inline-block" /> In One Click
                        </motion.h1>
                        <motion.p
                            className="text-[#B095FF] text-lg mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            style={{
                                textShadow: "0 2px 12px rgba(176,149,255,0.18)",
                                fontWeight: 500,
                            }}
                        >
                            AI Powered Threat Detection For Your Cloud Infrastructure. <br className="hidden lg:inline-block" />
                        </motion.p>
                        <div className="flex justify-center gap-4">
                            <Link to="/dashboard/docs">
                                <button className='bg-transparent border border-[#B095FF] hover:bg-[#a57eff] text-[#B095FF] hover:text-white px-6 py-2 rounded-full text-lg transition-all font-semibold shadow-md hover:shadow-[#B095FF]/30'>
                                    Learn More
                                </button>
                            </Link>
                            <Link to="/dashboard">
                                <button className="bg-[#B095FF] border-[#B095FF] hover:bg-[#a57eff] text-black px-6 py-2 rounded-full text-lg transition-all inline-flex items-center font-semibold shadow-md hover:shadow-[#B095FF]/30">
                                    Get Started
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                    </div>


                </div>
            </section>

            {/* Mid-section: Testimonials
            <div className="relative z-30 w-full flex flex-col items-center py-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-10 text-[#B095FF] text-center"
                    style={{
                        fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                        textShadow: "0 2px 12px rgba(176,149,255,0.18)",
                        letterSpacing: "0.06em",
                    }}
                >
                    What Our Users Say
                </h2>
                <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full justify-center">
                    <div className="bg-black/60 border border-[#B095FF] rounded-xl p-6 shadow-lg text-center flex-1">
                        <p className="text-gray-200 italic">"ThreatMorph made our AWS audits effortless and fast. Highly recommended!"</p>
                        <div className="mt-4 text-[#B095FF] font-semibold">— DevOps Lead, Acme Corp</div>
                    </div>
                    <div className="bg-black/60 border border-[#B095FF] rounded-xl p-6 shadow-lg text-center flex-1">
                        <p className="text-gray-200 italic">"The AI-powered fixes saved us hours. Love the control and transparency."</p>
                        <div className="mt-4 text-[#B095FF] font-semibold">— Cloud Architect, FinTechX</div>
                    </div>
                </div>
            </div> */}

            {/* How It Works */}
            <div className="relative z-30 w-full flex flex-col items-center py-16">
                <h2
                    className="text-3xl md:text-4xl font-bold mb-10 text-[#B095FF] text-center"
                    style={{
                        fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                        textShadow: "0 2px 12px rgba(176,149,255,0.18)",
                        letterSpacing: "0.06em",
                    }}
                >
                    How ThreatMorph Works
                </h2>
                <div className="flex flex-col md:flex-row justify-center gap-10 w-full max-w-5xl">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center px-6">
                        <div className="bg-[#B095FF] bg-opacity-20 rounded-full p-4 mb-4">
                            <span className="text-3xl">🔑</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-[#B095FF]">Connect AWS</h3>
                        <p className="text-gray-300">Provide temporary read-only credentials for a secure, non-intrusive scan.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center px-6">
                        <div className="bg-[#B095FF] bg-opacity-20 rounded-full p-4 mb-4">
                            <span className="text-3xl">🤖</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-[#B095FF]">AI Analysis</h3>
                        <p className="text-gray-300">Our AI scans your cloud for misconfigurations, threats, and best-practice violations.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center px-6">
                        <div className="bg-[#B095FF] bg-opacity-20 rounded-full p-4 mb-4">
                            <span className="text-3xl">🛡️</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-[#B095FF]">Get Fixes</h3>
                        <p className="text-gray-300">Receive actionable fixes and recommendations. You stay in control—no auto-changes.</p>
                    </div>
                </div>
            </div>

            {/* Visual Element */}
            <div className="relative z-30 w-full flex justify-center items-center py-16">
                <motion.div
                    className="lg:w-3/4 relative "
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <img
                        src="/flow.png"
                        alt="Threat Detection Flow"
                        className="w-full max-w-md mx-auto rounded-xl border border-[#B095FF] shadow-lg"
                    />
                    {/* Decorative Glow */}
                    <div className="absolute -inset-4 rounded-xl pointer-events-none blur-2xl opacity-40" style={{
                        background: "radial-gradient(circle, #B095FF33 0%, transparent 70%)"
                    }} />
                </motion.div>
            </div>

            {/* Stats Section
            <div className="relative z-30 w-full flex flex-col items-center py-16">
                <div className="flex flex-col md:flex-row justify-center gap-10 w-full max-w-5xl">
                    <div className="text-center">
                        <div className="text-4xl font-extrabold text-[#B095FF] mb-2 drop-shadow-[0_2px_16px_rgba(176,149,255,0.18)]">1000+</div>
                        <div className="text-gray-300">Cloud Scans</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-extrabold text-[#B095FF] mb-2 drop-shadow-[0_2px_16px_rgba(176,149,255,0.18)]">99.99%</div>
                        <div className="text-gray-300">Uptime</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-extrabold text-[#B095FF] mb-2 drop-shadow-[0_2px_16px_rgba(176,149,255,0.18)]">4.9/5</div>
                        <div className="text-gray-300">User Rating</div>
                    </div>
                </div>
            </div> */}

            {/* Bento Grid Section */}
            <div className="relative z-30 w-full flex flex-col items-center py-16">
                <h2
                    className="text-3xl md:text-4xl font-bold mb-12 text-[#B095FF] text-center"
                    style={{
                        fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                        textShadow: "0 2px 12px rgba(176,149,255,0.18)",
                        letterSpacing: "0.06em",
                    }}
                >
                    What We Offer!
                </h2>
                <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 w-full max-w-6xl">
                    {/* Secure & Read-Only */}
                    <div className="col-span-1 xl:row-span-3">
                        <div className="bg-black/70 border border-[#B095FF] rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col h-full justify-between pt-8 sm:pt-16">
                            <img
                                src="/assets/grid-secure.png"
                                alt="Secure"
                                className="w-full h-32 sm:h-44 md:h-52 lg:h-56 xl:h-64 object-contain mb-4 rounded-xl transition-all duration-300"
                            />
                            <div>
                                <p className="text-xl font-bold text-[#B095FF] mb-2">Secure & Read-Only</p>
                                <p className="text-gray-300">
                                    All scans use <span className="text-[#B095FF]">temporary read-only AWS credentials</span>. No changes are made to your infrastructure—ever.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* AI-Powered Detection */}
                    <div className="col-span-1 xl:row-span-3">
                        <div className="bg-black/70 border border-[#B095FF] rounded-2xl p-6 sm:p-8 pt-8 sm:pt-16 shadow-lg flex flex-col h-full justify-between">
                            <img
                                src="/assets/grid-detection.png"
                                alt="AI Detection"
                                className="w-full h-32 sm:h-44 md:h-52 lg:h-56 xl:h-64 object-contain mb-4 rounded-xl transition-all duration-300"
                            />
                            <div>
                                <p className="text-xl font-bold text-[#B095FF] mb-2">AI-Powered Detection</p>
                                <p className="text-gray-300">
                                    Advanced language models analyze your AWS environment for misconfigurations, threats, and best-practice violations.<br />
                                    <span className="text-[#B095FF]">Mistral 7B</span> powers intelligent, actionable recommendations.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Privacy & Control (Tall Card) */}
                    <div className="col-span-1 xl:row-span-4">
                        <div className="bg-black/70 border border-[#B095FF] rounded-2xl p-6 sm:p-8 pt-16 sm:pt-32 shadow-lg flex flex-col h-full justify-between">
                            <div className="rounded-3xl w-full h-32 sm:h-48 md:h-56 lg:h-64 flex justify-center items-center mb-4 transition-all duration-300">
                                <img
                                    src="/assets/grid-privacy.png"
                                    alt="Privacy"
                                    className="w-2/3 h-full object-contain"
                                />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-[#B095FF] mb-2">Privacy & Control</p>
                                <p className="text-gray-300">
                                    Credentials are never stored. All processing is ephemeral and secure.<br />
                                    <span className="text-[#B095FF]">You stay in control</span> at every step.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Actionable Fixes (Wide Card) */}
                    <div className="xl:col-span-2 xl:row-span-3">
                        <div className="bg-black/70 border border-[#B095FF] rounded-2xl p-6 sm:p-8 pt-8 sm:pt-16 shadow-lg flex flex-col h-full justify-between">
                            <img
                                src="/assets/grid-fix.png"
                                alt="Fixes"
                                className="w-full h-28 sm:h-40 md:h-48 lg:h-52 xl:h-56 object-contain mb-4 rounded-xl transition-all duration-300"
                            />
                            <div>
                                <p className="text-xl font-bold text-[#B095FF] mb-2">Actionable Fixes</p>
                                <p className="text-gray-300">
                                    Get clear, human-readable fixes for every threat.<br />
                                    <span className="text-[#B095FF]">No auto-changes</span>—you review and approve every action.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* DevSecOps Best Practices */}
                    <div className="xl:col-span-1 xl:row-span-2">
                        <div className="bg-black/70 border border-[#B095FF] rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col h-full justify-between items-center pt-8 sm:pt-12">
                            <div className="flex justify-center items-center mb-6 w-full">
                                <Users size={56} className="mx-auto" />
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-[#B095FF] mb-2">DevSecOps Best Practices</p>
                                <p className="text-gray-300">
                                    Built for modern teams: JWT auth, audit history, RBAC-ready, and seamless feedback integration.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Redirect Area */}
            <div className="relative z-40 w-full flex flex-col items-center justify-center" style={{ minHeight: "100vh" }}>
                {!showFeedbackRedirect ? (
                    <div className="flex flex-col items-center justify-center h-full py-24">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#B095FF] text-center"
                            style={{
                                fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                                textShadow: "0 2px 12px rgba(176,149,255,0.18)",
                                letterSpacing: "0.06em",
                            }}
                        >
                            Help Us Improve ThreatMorph.ai
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 text-center max-w-xl">
                            We value your feedback! Click below to share your experience or suggestions with us.
                        </p>
                        <button
                            onClick={handleFeedbackRedirect}
                            className="bg-[#B095FF] hover:bg-[#a57eff] text-black px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-all"
                        >
                            Leave Feedback
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-24">
                        <svg className="animate-spin mb-6" width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="#B095FF"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="#B095FF"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                        <h3 className="text-2xl font-bold mb-2 text-[#B095FF] text-center">
                            Redirecting to Feedback...
                        </h3>
                        <p className="text-gray-300 text-center">
                            Thank you for helping us improve!<br />
                            If you are not redirected, <a href="/dashboard/feedback" className="text-[#B095FF] underline">click here</a>.
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="text-center py-6 border-t border-gray-700 text-gray-500">
                &copy; 2025 ThreatMorph.ai — All rights reserved.
            </footer>
        </div >
    );
};

export default LandingPage;
