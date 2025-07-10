# ThreatMorph.ai 🔐☁️  
**AI-Powered Cloud Infrastructure Threat Detection System**

ThreatMorph.ai is a DevSecOps-ready platform that analyzes AWS cloud configurations, detects security misconfigurations in real time using a rule-based engine powered by Docker MCP, and visualizes threat reports through a secure dashboard. The platform is designed to help you secure your cloud without agents, with a focus on actionable suggestions and privacy.

---

## 🚀 Why ThreatMorph.ai?

Cloud misconfigurations — like public S3 buckets or permissive IAM policies — are among the top causes of data breaches. ThreatMorph.ai provides a cost-free, agentless solution to:

- Analyze your AWS environment using just your credentials  
- Detect threats using strict rule-based checks  
- Generate detailed, severity-ranked reports  
- Get actionable suggestions for remediation  
- Showcase your DevSecOps skills in real-world production-grade tooling  

---

## 🔍 Key Features

- **Secure & Read-Only Scanning:** Uses temporary, read-only AWS credentials for all scans. No changes are ever made to your infrastructure. Credentials are never stored; all processing is ephemeral and secure.
- **AI-Powered Detection:** Advanced language models (including Mistral 7B) analyze your AWS environment for misconfigurations, vulnerabilities, and best-practice violations. Provides intelligent, actionable recommendations.
- **Privacy & Control:** You remain in control at every step. No credentials or sensitive data are retained after the scan. All analysis is performed securely and privately.
- **Actionable Suggestions:** Clear, human-readable suggestions for every detected threat. No auto-changes are made; you review and implement every action.
- **DevSecOps Best Practices:** Built for modern teams and workflows. Features include JWT authentication, audit history, and RBAC-ready architecture. Seamless feedback integration for continuous improvement.
- **User Experience:** Intuitive dashboard for managing scans and viewing results. Responsive design for desktop and mobile. Fast, one-click onboarding and scan initiation.
- **Exportable Reports:** Download your threat reports as PDF or JSON for compliance and sharing.

---

## 📦 Scanned AWS Services

- **S3:** Public access, encryption, versioning, logging  
- **IAM:** Over-permissive policies, lack of MFA, access key rotation  
- **EC2:** Open ports, untagged instances, SSH exposure  
- **CloudTrail:** Disabled/missing logging, unmonitored events  

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js, AWS SDK, MongoDB  
- **Detection Engine:** Rule-based JSON evaluator inside Docker MCP  
- **DevOps:** Docker, Kubernetes, Jenkins, Ansible, Terraform  
- **Cloud:** AWS (Free Tier - IAM, S3, EC2, CloudTrail)

---

## 🗂️ Project Structure

```
threatmorph.ai/
├── backend/         # Express.js API + AWS SDK integrations  
├── frontend/        # React dashboard UI  
├── mcp-engine/      # Rule engine inside Docker MCP container  
├── infra/           # Terraform, Ansible, Jenkins, K8s configurations   
├── README.md  
├── features.md  
└── roadmap.md
```

---

## 🧪 Local Development Setup

### Prerequisites

- Node.js (v18+)  
- Docker  
- MongoDB (local or Atlas)  
- AWS Account (Free Tier)  
- (Optional) Terraform CLI, Jenkins, kubectl, Ansible

### Getting Started

```bash
git clone https://github.com/sumit-8305/threatmorph.ai.git
cd threatmorph.ai
```

#### Start Backend API

```bash
cd backend
npm install
npm run dev
```

#### Start Frontend

```bash
cd ../frontend
npm install
npm start
```

#### Run the MCP Detection Engine

```bash
cd ../mcp-engine
docker build -t threatmorph-engine .
docker run -v $PWD/data:/data threatmorph-engine
```

---

## 🔁 Workflow: How It Works

1. User logs into dashboard  
2. Enters AWS credentials securely  
3. Backend fetches AWS config using AWS SDK  
4. Docker MCP engine evaluates JSON rules  
5. Threat report is returned (JSON)  
6. Frontend displays report + allows export  
7. User receives actionable suggestions for remediation

---

## 🛤 Project Roadmap

- [x] Rule-based detection across IAM, S3, EC2, CloudTrail  
- [x] AWS SDK integration (no shell agents)  
- [ ] Terraform, Ansible, Jenkins & K8s setup  
- [ ] Model upload support (MCP inference containers)  
- [ ] AI-based detection engine (MVP prototype)  

---

## 🧠 Project Inspiration

Inspired by real-world AWS breaches (e.g., Capital One 2019), ThreatMorph.ai is a proactive, AI-compatible system that mimics what large-scale SecOps tools do — in a free-tier and open-source form.

---

## 📄 License

MIT License

---

## 👤 Author

**Sumit**  
📧 dhimansumit2005@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/your-profile)
