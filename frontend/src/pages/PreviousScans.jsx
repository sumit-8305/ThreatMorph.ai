import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PreviousScans = () => {
  const [scanHistory, setScanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fixResult, setFixResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  const fetchScanHistory = async () => {
    try {
      if (!token) {
        toast.error("No token found. Please login.");
        setLoading(false);
        return;
      }

      const res = await axios.get("https://threatmorph-ai.onrender.com/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setScanHistory(res.data);
    } catch (error) {
      toast.error("Failed to fetch previous scans");
      console.error("Error fetching scan history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFixNow = async (scanId) => {
    try {
      const res = await axios.post(
        `https://threatmorph-ai.onrender.com/api/fix/${scanId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFixResult(res.data);
      setShowModal(true);
      toast.success("Fix applied successfully!");
    } catch (err) {
      const errMsg = err?.response?.data?.message || "Failed to apply fix.";
      toast.error(errMsg);
      console.error("Fix Error:", err);
    }
  };

  useEffect(() => {
    fetchScanHistory();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
        <p className="text-lg">🔄 Loading previous scans...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white py-10 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <h1
          className="text-3xl font-extrabold mb-8"
          style={{
            color: "#B095FF",
            fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
            textShadow:
              "0 2px 12px rgba(176,149,255,0.18), 0 1px 6px rgba(0,0,0,0.18)",
            letterSpacing: "0.06em",
          }}
        >
          Previous Scans
        </h1>

        {scanHistory.length === 0 ? (
          <p className="text-gray-400">No previous scans found.</p>
        ) : (
          <div className="space-y-8">
            {scanHistory.map((scan, index) => (
              <div
                key={scan._id}
                className="border rounded-xl shadow-lg p-6"
                style={{
                  borderColor: "#B095FF",
                  borderWidth: "1.5px",
                  background:
                    "linear-gradient(135deg, rgba(30,30,30,0.85) 60%, rgba(60,60,60,0.7) 100%)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2
                    className="text-2xl font-semibold"
                    style={{ color: "#B095FF" }}
                  >
                    Scan #{index + 1}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {new Date(scan.createdAt).toLocaleString()}
                  </p>
                </div>

                <p className="mb-2">
                  <span className="font-medium text-gray-400">Region:</span>{" "}
                  {scan.region}
                </p>

                {/* Threats */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-400">
                    ⚠️ Threats
                  </h3>
                  {scan.threats && scan.threats.length > 0 ? (
                    <ul className="space-y-1 text-sm">
                      {scan.threats.map((threat, idx) => (
                        <li key={idx} className="bg-red-800/20 p-2 rounded">
                          <strong className="text-red-400">{threat.service}</strong>{" "}
                          - {threat.resource}: {threat.issue}{" "}
                          <span className="text-red-500 font-semibold">
                            ({threat.severity})
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-green-400 italic">✅ No threats found</p>
                  )}
                </div>

                {/* Fixes */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-green-400">
                    🛠 Suggested Fixes
                  </h3>
                  {scan.fixes && scan.fixes.length > 0 ? (
                    <ul className="space-y-1 text-sm">
                      {scan.fixes.map((fix, idx) => (
                        <li key={idx} className="bg-green-800/20 p-2 rounded">
                          <strong className="text-[#B095FF]">{fix.service}</strong>{" "}
                          - {fix.resource || "N/A"}: {fix.action} —{" "}
                          <span className="text-gray-300">{fix.description}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 italic">No fixes suggested</p>
                  )}
                </div>

                <button
                  onClick={() => handleFixNow(scan._id)}
                  className="mt-6 bg-[#B095FF] hover:bg-[#a57eff] px-5 py-2 rounded text-black font-semibold transition-all"
                >
                  ⚙️ Fix Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && fixResult && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-gray-100 text-black rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[75vh] overflow-y-auto relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-gray-700 hover:text-red-500 text-2xl font-bold"
              >
                &times;
              </button>

              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                🧪 Fix Results
              </h2>

              {fixResult.results?.map((fix, idx) => (
                <div key={idx} className="mb-4 border border-gray-300 p-4 rounded">
                  <p className="text-sm mb-1">
                    <strong>Resource:</strong> {fix.resource}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Action:</strong> {fix.action}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Status:</strong>{" "}
                    <span className="font-medium text-green-600">{fix.status}</span>
                  </p>

                  {fix.script && (
                    <>
                      <p className="text-sm font-medium mb-1">Script:</p>
                      <pre className="bg-gray-200 text-xs p-2 rounded whitespace-pre-wrap overflow-x-auto">
                        <code>{fix.script}</code>
                      </pre>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousScans;
