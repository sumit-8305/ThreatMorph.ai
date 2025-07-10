import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Scan = () => {
  const [accessKeyId, setAccessKeyId] = useState("");
  const [secretAccessKey, setSecretAccessKey] = useState("");
  const [region, setRegion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFixes, setSelectedFixes] = useState([]);

  const handleScan = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "https://threatmorph-ai.onrender.com/api/scan/start",
        {
          accessKeyId,
          secretAccessKey,
          region,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data);
      toast.success("Scan started successfully!");
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "Scan failed due to an unknown error";
      toast.error(errorMsg);
      console.error("Scan Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white py-10 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1
          className="text-4xl font-extrabold text-center mb-2"
          style={{
            color: "#B095FF",
            fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
            textShadow:
              "0 2px 12px rgba(176,149,255,0.18), 0 1px 6px rgba(0,0,0,0.18)",
            letterSpacing: "0.06em",
          }}
        >
          Infra Scan
        </h1>

        {/* Credential Input Form */}
        <div
          className="border rounded-xl p-6 shadow-lg space-y-4"
          style={{
            borderColor: "#B095FF",
            borderWidth: "1.5px",
            background:
              "linear-gradient(135deg, rgba(30,30,30,0.85) 60%, rgba(60,60,60,0.7) 100%)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
          }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B095FF" }}>
            🔑 Enter AWS Credentials
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Access Key ID"
              value={accessKeyId}
              onChange={(e) => setAccessKeyId(e.target.value)}
              className="bg-gray-800 p-3 rounded border border-gray-700 w-full text-white"
            />
            <input
              type="text"
              placeholder="Secret Access Key"
              value={secretAccessKey}
              onChange={(e) => setSecretAccessKey(e.target.value)}
              className="bg-gray-800 p-3 rounded border border-gray-700 w-full text-white"
            />
            <input
              type="text"
              placeholder="Region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="bg-gray-800 p-3 rounded border border-gray-700 w-full text-white"
            />
          </div>
          <button
            onClick={handleScan}
            disabled={loading}
            className="mt-4 bg-[#B095FF] hover:bg-[#a57eff] text-black px-6 py-2 rounded-full font-semibold transition-all"
          >
            {loading ? "🔍 Scanning..." : "Start Scan"}
          </button>
        </div>

        {/* Scan Results */}
        {result && (
          <div className="space-y-10">
            {/* Threats */}
            <div
              className="border rounded-xl p-6 shadow-lg"
              style={{
                borderColor: "#B095FF",
                borderWidth: "1.5px",
                background:
                  "linear-gradient(135deg, rgba(30,30,30,0.85) 60%, rgba(60,60,60,0.7) 100%)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
              }}
            >
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B095FF" }}>
                ⚠️ Threats Found
              </h2>
              <div className="space-y-3">
                {result.threats && result.threats.length > 0 ? (
                  result.threats.map((threat, index) => (
                    <div
                      key={index}
                      className="bg-red-800/20 p-4 border border-red-700 rounded"
                    >
                      <strong>{threat.service.toUpperCase()}</strong> –{" "}
                      {threat.issue}
                      <span className="ml-2 text-sm text-red-400">
                        ({threat.severity})
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-green-400 italic">✅ No threats detected</p>
                )}
              </div>
            </div>

            {/* Fixes */}
            <div
              className="border rounded-xl p-6 shadow-lg"
              style={{
                borderColor: "#B095FF",
                borderWidth: "1.5px",
                background:
                  "linear-gradient(135deg, rgba(30,30,30,0.85) 60%, rgba(60,60,60,0.7) 100%)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
              }}
            >
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B095FF" }}>
                🛠 Suggested Fixes
              </h2>
              <div className="space-y-3">
                {result.fixes && result.fixes.length > 0 ? (
                  result.fixes.map((fix, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 border border-green-700 bg-green-800/20 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFixes.includes(index)}
                        onChange={() =>
                          setSelectedFixes((prev) =>
                            prev.includes(index)
                              ? prev.filter((i) => i !== index)
                              : [...prev, index]
                          )
                        }
                        className="mt-1"
                      />
                      <div>
                        <strong>
                          {fix.service.toUpperCase()} – {fix.resource}
                        </strong>
                        <p className="text-sm text-gray-300">
                          {fix.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-green-400 italic">✅ No fixes suggested</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scan;
