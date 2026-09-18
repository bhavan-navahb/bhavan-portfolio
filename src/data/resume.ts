export const profile = {
  firstName: "Bhavan",
  fullName: "Bhavan Seshu Pokala",
  title: "Senior Project Engineer",
  subtitle: "Enterprise Systems & Data Center Operations",
  location: "Palakol, Andhra Pradesh, India",
  email: "pbhavanseshu@gmail.com",
  phone: "8331896857",
  linkedin: "https://www.linkedin.com/in/bhavan-seshu-pokala-207343205",
  eyebrow: "01 / ENTERPRISE SYSTEMS ENGINEER",
  bio: "Senior Project Engineer with 5+ years managing enterprise applications and data center operations across mission-critical environments. Deep expertise in BMC Control-M, HPE Tandem NonStop, IBM AS/400 (IBM-i), and Mainframe systems, spanning monitoring, batch scheduling, migrations, incident management, and cross-platform administration.",
  status: "Open to Opportunities",
};

export const metrics = [
  { label: "Years of Experience", value: "5+" },
  { label: "Batch Success Rate", value: "99.9%" },
  { label: "M.Tech CGPA", value: "7.46" },
  { label: "Certifications", value: "3" },
];

export type TimelineEntry = {
  id: string;
  kind: "work" | "education";
  title: string;
  org: string;
  meta?: string;
  period: string;
  points: string[];
  status: "active" | "past";
};

export const timeline: TimelineEntry[] = [
  {
    id: "exp-1",
    kind: "work",
    title: "Senior Project Engineer",
    org: "Wipro",
    meta: "Project: USFoods · Enterprise IT — Supply Chain (Food Industry)",
    period: "Dec 2025 — Present",
    points: [
      "Lead operational support engineer for HPE Tandem NonStop, IBM AS/400, and mainframe-integrated applications across production and test environments.",
      "Drive incident, problem, and change management activities across critical systems.",
      "Manage, monitor, maintain, migrate, schedule, and troubleshoot system applications and servers in data center environments.",
      "Design and manage complex batch workflows using Control-M, Tandem, and IBM job schedulers.",
      "Perform root cause analysis (RCA) for recurring issues and deliver preventive fixes in collaboration with cross-functional teams.",
      "Ensure data security, access control, and compliance across enterprise systems.",
    ],
    status: "active",
  },
  {
    id: "exp-2",
    kind: "work",
    title: "Administrator",
    org: "Wipro",
    meta: "Project: USFoods",
    period: "Jan 2024 — Nov 2025",
    points: [
      "Administered enterprise scheduling and batch operations using BMC Control-M, Tandem NonStop instances, AS/400, and IBM Mainframe applications/servers in a data center environment.",
      "Performed system maintenance including operations sheets, staging, TechWindow, IBM Mainframe IPLs, program moves, report generation, workload automation, calendar creation/updates, migrations, and backups.",
      "Diagnosed and resolved software issues and assisted with hardware troubleshooting.",
      "Ensured secure access, system reliability, and data confidentiality across all environments.",
      "Monitored infrastructure and application health using SiteScan, Robot Network 11, MOMI PC Client, and EMC Unisphere; coordinated with Parkplace Technologies for hardware maintenance.",
      "Created SOPs and mentored junior engineers.",
    ],
    status: "past",
  },
  {
    id: "edu-1",
    kind: "education",
    title: "M.Tech, Computing Systems & Infrastructure",
    org: "Birla Institute of Technology & Science, Pilani (WILP)",
    period: "2022 — 2025",
    points: ["CGPA: 7.46 / 10", "Dissertation: Excellent"],
    status: "past",
  },
  {
    id: "exp-3",
    kind: "work",
    title: "System Engineer",
    org: "Wipro",
    meta: "Project: USFoods",
    period: "Oct 2021 — Jan 2024",
    points: [
      "Provided 24x7 monitoring and operational support for enterprise applications, ensuring optimal performance and uptime.",
      "Managed batch scheduling, backups, and updates to maintain system integrity.",
      "Provided technical guidance for software and hardware issues.",
      "Ensured system security, access control, and stable operations across teams.",
    ],
    status: "past",
  },
  {
    id: "exp-4",
    kind: "work",
    title: "Scholar Trainee",
    org: "Wipro",
    meta: "PRP-PJP (Project Readiness & Pre-Joining Program)",
    period: "Sep 2021 — Oct 2021",
    points: [
      "Gained hands-on, real-time experience in Windows Server administration, network configuration, and software/hardware troubleshooting.",
    ],
    status: "past",
  },
  {
    id: "edu-2",
    kind: "education",
    title: "B.Sc, Mathematics, Physics, Computer Science",
    org: "Sri Aditya Degree College, Adikavi Nannaya University",
    period: "2018 — 2021",
    points: ["CGPA: 8.12 / 10"],
    status: "past",
  },
  {
    id: "edu-3",
    kind: "education",
    title: "Intermediate (12th)",
    org: "B.R.R & G.K.R Chambers Degree College",
    period: "2018",
    points: ["82.6%"],
    status: "past",
  },
  {
    id: "edu-4",
    kind: "education",
    title: "SSC (10th)",
    org: "Bhashyam High School",
    period: "2016",
    points: ["CGPA: 8.5 / 10"],
    status: "past",
  },
];

export const achievements = [
  "Improved batch success rate from 96% to 99.9% by analyzing failures, correcting dependencies, and optimizing calendars.",
  "Earned repeated client recognition for exceptional production support, consistent performance, and issue ownership.",
  "Trusted to handle high-priority tasks independently during critical business windows.",
  "Demonstrated 100% attendance, ensuring uninterrupted production operations.",
];

export type SkillGroup = { category: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    category: "Scheduling & Mainframe",
    items: [
      "BMC Control-M",
      "IBM MF Emulator (ISPF/PDF, SDSF)",
      "JCL",
      "COBOL",
      "Datacom",
      "CICS",
      "SQL Batch Programs",
      "HPE Tandem NonStop (TACL)",
      "IBM AS/400 (IBM-i)",
    ],
  },
  {
    category: "Monitoring & Infrastructure",
    items: [
      "MOMI PC Client",
      "Robot Network 11",
      "SiteScan",
      "EMC Unisphere",
      "Parkplace Technologies",
    ],
  },
  {
    category: "Access & Connectivity",
    items: ["PuTTY (SSH)", "Snowflake", "PAM-Controlled Migrations"],
  },
  {
    category: "Backup, ITSM & Telephony",
    items: [
      "HP Data Protector",
      "EasyVista",
      "HP Service Manager",
      "Avaya Communication Manager",
    ],
  },
  {
    category: "Database & Languages",
    items: ["MySQL", "C", "C++", "Java", "Python", "VBScript"],
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  type: "Academic Project";
};

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Automated Privacy Protection in Digital Images",
    description:
      "A serverless pipeline for face detection and blurring, plus regex + AI-based sensitive data redaction (Aadhaar, PAN, CVV, QR codes) across multiple file types, with auto-deletion after 24 hours.",
    stack: ["AWS Lambda", "Rekognition", "Textract", "S3", "DynamoDB", "API Gateway"],
    type: "Academic Project",
  },
];

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  code: string;
  hash: string;
  date: string;
  competencies: string[];
};

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "Google Cloud Generative AI (L0–L3)",
    issuer: "Google Cloud",
    code: "GCP-GENAI-L0L3",
    hash: "SHA256://8f1c9a2e4b7d0f61c3a9e5d2b8f0146c",
    date: "2024",
    competencies: ["Generative AI Fundamentals", "Large Language Models", "Responsible AI", "Cloud AI Tooling"],
  },
  {
    id: "cert-2",
    title: "AWS Cloud Admin L1",
    issuer: "Amazon Web Services",
    code: "AWS-CADM-L1",
    hash: "SHA256://2d4e8b1a6c9f3057e1b4a7d9c0f2358a",
    date: "2024",
    competencies: ["Cloud Administration", "IAM & Access Control", "Core AWS Services", "Monitoring & Support"],
  },
  {
    id: "cert-3",
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    code: "AZ-900",
    hash: "SHA256://5a7c1f9e3b6d8024f5c1a8e6d3b9f704",
    date: "2023",
    competencies: ["Cloud Concepts", "Azure Services", "Security & Compliance", "Pricing & Support"],
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];
