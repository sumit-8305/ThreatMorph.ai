import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const Feedback = () => {
    const [state, handleSubmit] = useForm("meokrrle"); // your Formspree form ID

    if (state.succeeded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
                <div
                    className="p-8 rounded-xl shadow-xl border max-w-lg text-center"
                    style={{
                        borderColor: "#B095FF",
                        borderWidth: "1.5px",
                        background: "linear-gradient(135deg, rgba(30,30,30,0.85) 60%, rgba(60,60,60,0.7) 100%)",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                    }}
                >
                    <h2 className="text-3xl font-bold mb-4" style={{ color: "#B095FF" }}>✅ Feedback Sent</h2>
                    <p className="text-gray-400">Thanks for helping improve ThreatMorph.ai!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white px-4">
            <div
                className="p-8 rounded-xl border shadow-xl max-w-2xl w-full"
                style={{
                    borderColor: "#B095FF",
                    borderWidth: "1.5px",
                    background: "linear-gradient(135deg, rgba(30,30,30,0.85) 60%, rgba(60,60,60,0.7) 100%)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                }}
            >
                <h2
                    className="text-3xl font-bold mb-6 text-center"
                    style={{
                        color: "#B095FF",
                        fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                        textShadow: "0 2px 12px rgba(176,149,255,0.18), 0 1px 6px rgba(0,0,0,0.18)",
                        letterSpacing: "0.06em",
                    }}
                >
                    Submit Feedback
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm text-gray-400">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
                            placeholder="you@example.com"
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>

                    {/* Feedback Type */}
                    <div>
                        <label htmlFor="type" className="block mb-1 text-sm text-gray-400">
                            Feedback Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
                        >
                            <option value="Bug">Bug</option>
                            <option value="Suggestion">Suggestion</option>
                            <option value="UI Issue">UI Issue</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block mb-1 text-sm text-gray-400">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows="5"
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded resize-none"
                            placeholder="Write your feedback here..."
                        />
                        <ValidationError prefix="Message" field="message" errors={state.errors} />
                    </div>

                    {/* Optional Rating */}
                    <div>
                        <label htmlFor="rating" className="block mb-1 text-sm text-gray-400">
                            Rating (1-5)
                        </label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            min="1"
                            max="5"
                            className="w-24 p-2 bg-gray-800 border border-gray-700 rounded"
                            placeholder="5"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={state.submitting}
                        className="bg-[#B095FF] hover:bg-[#a57eff] px-6 py-2 rounded-full text-black font-semibold w-full transition-all"
                    >
                        {state.submitting ? "Sending..." : "Submit Feedback"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
