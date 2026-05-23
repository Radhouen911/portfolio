import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useParams } from "react-router-dom";
import "./ProjectDetail.css";

interface Project {
  name: string;
  fullName?: string;
  repo: string;
  repoPath: string;
  description: string;
  tags: string[];
}

const projectsData: Record<string, Project> = {
  voidlink: {
    name: "VoidLink",
    repo: "https://github.com/Radhouen911/VoidLink",
    repoPath: "Radhouen911/VoidLink",
    description:
      "Zero-trust secure messaging system where privacy is mathematically guaranteed. All cryptographic operations happen client-side, creating mathematical privacy guarantees instead of relying on policy promises.",
    tags: ["React", "NodeJS", "Cryptography", "Zero-Trust", "Security"],
  },
  "container-instancer-ctfd-guide": {
    name: "CTFd Multi-VPS Infrastructure Guide",
    fullName: "Ramadhan CTF Multi-VPS Infrastructure Guide",
    repo: "https://github.com/Radhouen911/container_instancer_CTFd_guide",
    repoPath: "Radhouen911/container_instancer_CTFd_guide",
    description:
      "Battle-tested guide for multi-VPS CTFd + Whale deployment. Covers Docker Swarm, FRP, and custom React frontends as a production-ready roadmap for scalable, secure CTF infrastructure.",
    tags: ["CTFd", "Whale", "Docker Swarm", "FRP", "DevOps"],
  },
  "aiesec-application-tracker": {
    name: "AIESEC Applications Dashboard",
    fullName: "AIESEC Bardo Applications Dashboard",
    repo: "https://github.com/Radhouen911/aiesec_application_tracker",
    repoPath: "Radhouen911/aiesec_application_tracker",
    description:
      "React-based dashboard for AIESEC Bardo applications and applicants. Pulls live GraphQL data, shows trends, pivot tables, and programme analytics for daily and monthly reporting.",
    tags: ["React", "AIESEC", "Graphs", "Analytics", "Dashboard"],
  },
  "discord-auto-deletechannel": {
    name: "Discord Auto Delete Channel",
    repo: "https://github.com/Radhouen911/discord-auto-deletechannel",
    repoPath: "Radhouen911/discord-auto-deletechannel",
    description:
      "Small Discord bot utility that scans a guild for channels matching a naming rule and deletes them on demand. Useful for cleaning up temporary or ticket-style channels.",
    tags: ["Python", "Discord", "Automation"],
  },
  "ramadhan-ctfd-frontend": {
    name: "Ramadhan CTFd Theme",
    fullName: "RamadhanCTF Frontend",
    repo: "https://github.com/Radhouen911/RamadhanCTF-Frontend",
    repoPath: "Radhouen911/RamadhanCTF-Frontend",
    description:
      "Ramadan-themed CTFd frontend mounted inside the CTFd theme system. Includes landing, scoreboard, team management, profile pages, and archive-mode support.",
    tags: ["React", "CTFd", "TypeScript", "Tailwind", "Frontend"],
  },
  "ctfd-react-frontend": {
    name: "CTFd React Frontend",
    repo: "https://github.com/Radhouen911/CTFd-React-Frontend911",
    repoPath: "Radhouen911/CTFd-React-Frontend911",
    description:
      "Custom React-based CTFd frontend fully compatible with CTFd, used as the official theme for CyberMaze 5 (2025).",
    tags: ["React", "CTFd", "CTF", "Production"],
  },
  "onos-mininet-ai": {
    name: "ONOS Mininet AI Optimized",
    repo: "https://github.com/Radhouen911/OnosMininet-AiOptimized",
    repoPath: "Radhouen911/OnosMininet-AiOptimized",
    description:
      "Three-container architecture integrating ONOS with Mininet, including a middleware container that optimizes routing and network performance.",
    tags: ["Networking", "ONOS", "Mininet", "Containers"],
  },
  "ctfd-whale-fork": {
    name: "CTFd Whale Fork",
    repo: "https://github.com/Radhouen911/ctfd-whale-fork",
    repoPath: "Radhouen911/ctfd-whale-fork",
    description:
      "Fork of CTFd Whale enabling dynamic challenge instancing using FRP (Fast Reverse Proxy), tested in live production during CyberMaze 2025.",
    tags: ["CTFd", "FRP", "Docker", "Production"],
  },
  "telegram-scraper": {
    name: "Telegram Scraper Group Adder",
    repo: "https://github.com/Radhouen911/Telegram-scraper-groupadder",
    repoPath: "Radhouen911/Telegram-scraper-groupadder",
    description:
      "Dynamic Telegram automation script that scrapes group member data from chat activity and adds users to a target group while attempting to respect Telegram API policies.",
    tags: ["Python", "Telegram", "Automation"],
  },
  bpamt: {
    name: "BPAMT",
    fullName: "Baby Push All My Tasks",
    repo: "https://github.com/Radhouen911/BPAMT",
    repoPath: "Radhouen911/BPAMT",
    description:
      "Python automation tool for mass-importing challenges into a deployed CTFd instance with credential storage, JSON challenge support, and high verbosity logging.",
    tags: ["Python", "CTFd", "Automation"],
  },
  "pooling-app": {
    name: "Pooling App",
    repo: "https://github.com/Radhouen911/PoolingApp",
    repoPath: "Radhouen911/PoolingApp",
    description:
      "Full pooling application built with Laravel (backend) and React (frontend), developed to explore backend architecture and framework concepts.",
    tags: ["Laravel", "React", "Fullstack"],
  },
  bugbountyx: {
    name: "BugBountyX",
    repo: "https://github.com/Radhouen911/BugBountyX",
    repoPath: "Radhouen911/BugBountyX",
    description:
      "Personal bug bounty–oriented platform built using ReactJS, Node.js, and MongoDB.",
    tags: ["React", "NodeJS", "MongoDB", "Security"],
  },
};

function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const [readme, setReadme] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const project = projectId ? projectsData[projectId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();

    const fetchReadme = async () => {
      if (!project) {
        setLoading(false);
        setError(null);
        setReadme("");
        return;
      }

      setLoading(true);
      setError(null);
      setReadme("");

      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/${project.repoPath}/main/README.md`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          const masterResponse = await fetch(
            `https://raw.githubusercontent.com/${project.repoPath}/master/README.md`,
            { signal: controller.signal }
          );
          if (!masterResponse.ok) throw new Error("README not found");
          const text = await masterResponse.text();
          if (!controller.signal.aborted) {
            setReadme(text);
          }
        } else {
          const text = await response.text();
          if (!controller.signal.aborted) {
            setReadme(text);
          }
        }

        if (!controller.signal.aborted) {
          setLoading(false);
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchReadme();

    return () => controller.abort();
  }, [projectId, project]);

  if (!project) {
    return (
      <div className="project-detail-container">
        <Link to="/projects" className="back-button">
          ← Back to Projects
        </Link>
        <div className="error">Project not found</div>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <Link to="/projects" className="back-button">
        ← Back to Projects
      </Link>

      <div className="project-detail-header">
        <h1>{project.name}</h1>
        {project.fullName && (
          <span className="project-detail-fullname">{project.fullName}</span>
        )}
        <p className="project-detail-description">{project.description}</p>
        <div className="project-detail-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-detail-tag">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          🔗 View on GitHub →
        </a>
      </div>

      <div className="readme-container">
        <h2>📖 README</h2>
        {loading ? (
          <div className="loading">Loading README... 📖</div>
        ) : error ? (
          <div className="readme-error">
            <p>Could not load README from repository.</p>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              View project on GitHub →
            </a>
          </div>
        ) : (
          <div className="readme-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
