import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SettingsPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const modelsAvailable = ["mistralai/mistral-7b-instruct"];
    const currentModel = "mistralai/mistral-7b-instruct";

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    toast.error("Token not found. Please log in again.");
                    return;
                }

                const res = await axios.get("https://threatmorph-ai.onrender.com/api/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserInfo(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user info:", error);
                toast.error("Failed to load user settings");
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const handleChangePassword = () => {
        toast.info("Password change not currently supported.");
    };

    if (loading) return <div className="text-center text-white py-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white py-10 px-6 sm:px-10">
            <div
                className="max-w-4xl mx-auto shadow-2xl rounded-2xl p-8 space-y-10 border"
                style={{
                    borderColor: "#B095FF",
                    borderWidth: "1.5px",
                    background: "linear-gradient(135deg, rgba(30,30,30,0.85) 60%, rgba(60,60,60,0.7) 100%)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                }}
            >
                {/* Account Section */}
                <section>
                    <h2
                        className="text-3xl font-semibold border-b pb-2 mb-6"
                        style={{
                            borderColor: "#B095FF",
                            color: "#B095FF",
                            fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                            textShadow: "0 2px 12px rgba(176,149,255,0.18), 0 1px 6px rgba(0,0,0,0.18)",
                        }}
                    >
                        Account Settings
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-y-6 gap-x-10">
                        <div>
                            <p className="text-sm text-gray-400">Name</p>
                            <p className="text-lg">{userInfo.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Email</p>
                            <p className="text-lg">{userInfo.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Role</p>
                            <p className="text-lg">{userInfo.role || "Admin"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Account Created</p>
                            <p className="text-lg">
                                {new Date(userInfo.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <button
                        className="mt-8 px-5 py-2.5 bg-transparent border border-[#B095FF] hover:bg-[#a57eff] text-[#B095FF] hover:text-white text-sm rounded-md transition-all"
                        onClick={handleChangePassword}
                    >
                        🔒 Change Password
                    </button>
                </section>

                <hr className="border-[#B095FF]" />

                {/* System Info */}
                <section>
                    <h2
                        className="text-3xl font-semibold border-b pb-2 mb-6"
                        style={{
                            borderColor: "#B095FF",
                            color: "#B095FF",
                            fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                            textShadow: "0 2px 12px rgba(176,149,255,0.18), 0 1px 6px rgba(0,0,0,0.18)",
                        }}
                    >
                        System Info
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-gray-400">Model In Use</p>
                            <p className="text-lg text-green-300">{currentModel}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400 mb-2">Available Models</p>
                            <ul className="list-disc list-inside text-base pl-4">
                                {modelsAvailable.map((model) => (
                                    <li key={model} className="text-green-400">{model}</li>
                                ))}
                            </ul>
                            <p className="text-sm text-gray-500 mt-2 italic">
                                More models will be added soon...
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SettingsPage;
