import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white px-6 py-10 sm:px-10">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl font-extrabold mb-4"
          style={{
            color: "#B095FF",
            fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
            textShadow: "0 2px 12px rgba(176,149,255,0.18), 0 1px 6px rgba(0,0,0,0.18)",
            letterSpacing: "0.06em",
          }}
        >
          Dashboard Overview
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Welcome to ThreatMorph.ai — your trusted DevSecOps assistant for scanning and securing AWS cloud infrastructure.
        </p>

        <div
          className="bg-black/70 border rounded-xl p-6 shadow-lg space-y-6"
          style={{
            borderColor: "#B095FF",
            borderWidth: "1.5px",
            background: "linear-gradient(135deg, rgba(30,30,30,0.85) 60%, rgba(60,60,60,0.7) 100%)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
          }}
        >
          <h3 className="text-2xl font-semibold" style={{ color: "#B095FF" }}>
            🔐 How ThreatMorph.ai Works
          </h3>
          <ul className="list-disc list-inside space-y-3 text-gray-300">
            <li>
              <strong>Read-Only Access:</strong> We only require <span className="text-[#B095FF]">temporary read-only credentials</span> to assess your cloud environment. No destructive operations are performed.
            </li>
            <li>
              <strong>Non-Intrusive Scans:</strong> Your infrastructure is never modified during scans. We simply analyze configurations, permissions, and best-practice violations.
            </li>
            <li>
              <strong>AI-Powered Threat Detection:</strong> Mistral 7B-based AI evaluates cloud settings for potential threats and risks, generating both human-readable and automated fix suggestions.
            </li>
            <li>
              <strong>User Control:</strong> All fixes are optional. You review and approve each action — no automatic changes are made without your consent.
            </li>
            <li>
              <strong>Secure by Design:</strong> Your credentials are never stored after the scan. All processing happens in a secure, ephemeral environment.
            </li>
          </ul>

          <p className="text-gray-400 text-sm italic">
            For advanced features like auto-fix and model upload, ensure proper IAM permissions. Refer to the docs for the recommended policies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
