import React from "react";

const Documentation = () => {
    return (
        <div className="flex min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
            {/* Main Content */}
            <main className="flex-1 px-6 sm:px-12 py-10 space-y-16 max-w-5xl mx-auto">
                <section id="introduction">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: "#B095FF" }}>📚 Introduction</h1>
                    <ul className="text-gray-300 list-disc list-inside space-y-2">
                        <li><strong>ThreatMorph.ai</strong> is a cloud-native DevSecOps solution that empowers developers and security teams to identify potential vulnerabilities in AWS infrastructure using AI.</li>
                        <li>The platform ensures a read-only approach, meaning no changes are ever made to your infrastructure automatically. You remain in full control.</li>
                        <li>All threat detection and remediation suggestions are generated via advanced language models and presented clearly for user review.</li>
                        <li>ThreatMorph is optimized for ease of use, making it beginner-friendly while still offering deep insight for advanced users.</li>
                    </ul>
                </section>

                <section id="authentication">
                    <h2 className="text-3xl font-semibold mb-2" style={{ color: "#B095FF" }}>🔐 Authentication</h2>
                    <ul className="text-gray-300 list-disc list-inside space-y-2">
                        <li>Authentication is based on secure JSON Web Tokens (JWT). Upon successful login, a token is generated and stored locally in the browser.</li>
                        <li>Every authenticated request uses this token in the <code>Authorization</code> header as <code>Bearer &lt;token&gt;</code>.</li>
                        <li>Backend routes are protected using a custom <code>protect</code> middleware which decodes and validates the token, ensuring only authorized access.</li>
                        <li>If a token is invalid or missing, the user will receive a 401 Unauthorized error.</li>
                    </ul>
                </section>

                <section id="scanning">
                    <h2 className="text-3xl font-semibold mb-2" style={{ color: "#B095FF" }}>🧪 Scanning Infrastructure</h2>
                    <ul className="text-gray-300 list-disc list-inside space-y-2">
                        <li>Users provide temporary AWS credentials (Access Key ID, Secret Access Key, and Region) with read-only permissions.</li>
                        <li>These credentials are used in memory and are never stored or logged by the backend.</li>
                        <li>The backend fetches AWS service configurations like IAM, S3, EC2, Security Groups, etc., to analyze potential issues.</li>
                        <li>Collected data is processed by the AI model to generate intelligent summaries and recommendations.</li>
                    </ul>
                </section>

                <section id="threats">
                    <h2 className="text-3xl font-semibold mb-2" style={{ color: "#B095FF" }}>💡 Threats & Suggested Fixes</h2>
                    <ul className="text-gray-300 list-disc list-inside space-y-2">
                        <li>Threats are detected based on common misconfigurations, overly permissive IAM policies, exposed buckets, and other AWS risks.</li>
                        <li>Each threat is tagged by severity level and includes the AWS service, affected resource, and a human-readable explanation.</li>
                        <li>The system provides suggested fixes, which include shell/CLI commands, Ansible snippets, or manual steps to resolve the issues.</li>
                        <li>No fix is ever auto-applied — users retain complete control and are encouraged to validate and apply only what they approve.</li>
                    </ul>
                </section>

                <section id="ai-model">
                    <h2 className="text-3xl font-semibold mb-2" style={{ color: "#B095FF" }}>🧠 AI Model</h2>
                    <ul className="text-gray-300 list-disc list-inside space-y-2">
                        <li>Currently powered by <code>mistralai/mistral-7b-instruct</code>, a state-of-the-art language model optimized for secure inference.</li>
                        <li>The model is containerized using Docker MCP and executed in a secure sandbox environment to maintain isolation and performance.</li>
                        <li>Model output is fine-tuned to provide relevant, practical DevOps and cloud security suggestions.</li>
                        <li>More model options and custom uploads will be supported in future updates.</li>
                    </ul>
                </section>

                <section id="previous-scans">
                    <h2 className="text-3xl font-semibold mb-2" style={{ color: "#B095FF" }}>📂 Previous Scans</h2>
                    <ul className="text-gray-300 list-disc list-inside space-y-2">
                        <li>Every scan performed by the user is saved in the backend database and linked to their authenticated account.</li>
                        <li>The user can view past scans along with threats and suggested fixes at any time through the Previous Scans page.</li>
                        <li>This allows easy re-analysis, audit history, and fix re-application for repeat issues.</li>
                    </ul>
                </section>

                <section id="settings">
                    <h2 className="text-3xl font-semibold mb-2" style={{ color: "#B095FF" }}>📜 Settings Page</h2>
                    <ul className="text-gray-300 list-disc list-inside space-y-2">
                        <li>The settings page allows users to view account details including name, email, and selected AI model.</li>
                        <li>Model preferences are shown and can be updated in future versions to support more model types.</li>
                        <li>A button to change the password is displayed but marked as "not currently supported" until password management is enabled.</li>
                    </ul>
                </section>

                <section id="feedback">
                    <h2 className="text-3xl font-semibold mb-2" style={{ color: "#B095FF" }}>💬 Feedback</h2>
                    <ul className="text-gray-300 list-disc list-inside space-y-2">
                        <li>We actively welcome user feedback to improve the platform.</li>
                        <li>A dedicated Formspree-powered form is available where users can submit suggestions, feature requests, or bug reports.</li>
                        <li>All feedback goes directly to our internal team and helps prioritize roadmap features.</li>
                    </ul>
                </section>

                <section id="tech-stack">
                    <h2 className="text-3xl font-semibold mb-2" style={{ color: "#B095FF" }}>⚙️ Tech Stack</h2>
                    <ul className="text-gray-300 list-disc list-inside space-y-2">
                        <li><strong>Frontend:</strong> React.js with Tailwind CSS for rapid, responsive UI design. Tailwind enables highly customizable and utility-first styling while keeping components clean.</li>
                        <li><strong>Backend:</strong> Node.js with Express.js to manage routes, handle JWT authentication, scan orchestration, and API security.</li>
                        <li><strong>Database:</strong> MongoDB is used to persist user data, scan records, and AI-generated suggestions securely and efficiently.</li>
                        <li><strong>Authentication:</strong> Secured using JWT (JSON Web Tokens). The <code>protect</code> middleware validates tokens and restricts access to protected routes.</li>
                        <li><strong>AWS SDK:</strong> Used to interact securely with AWS services like IAM, EC2, S3, and more. Credentials are always ephemeral and read-only.</li>
                        <li><strong>Docker MCP:</strong> The AI inference engine runs inside a Docker Managed Control Plane for safe, isolated execution of large language models like Mistral.</li>
                        <li><strong>DevSecOps & Cybersecurity:</strong> The core of the project. The platform reflects modern DevSecOps practices such as read-only scanning, permission scoping, and fix suggestion separation from execution.</li>
                        <li><strong>AI Model:</strong> <code>mistralai/mistral-7b-instruct</code> is the currently deployed LLM, used to generate meaningful, secure, and actionable insights from AWS data.</li>
                        <li><strong>Forms & Feedback:</strong> Formspree integration allows seamless external feedback collection without managing custom backend endpoints for feedback.</li>
                    </ul>
                </section>

                <section id="roadmap">
                    <h2 className="text-3xl font-semibold mb-2" style={{ color: "#B095FF" }}>📈 Future Roadmap</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li>Model uploads and multi-model selection support</li>
                        <li>Scan scoring system with visualization</li>
                        <li>RBAC and multi-user team support</li>
                        <li>Kubernetes and multi-cloud scanning</li>
                        <li>Terraform-based advisory IaC output</li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Documentation;