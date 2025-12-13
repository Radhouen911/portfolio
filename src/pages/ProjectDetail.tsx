import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
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
    if (project) {
      fetchReadme();
    }
  }, [projectId]);

  const fetchReadme = async () => {
    if (!project) return;

    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/${project.repoPath}/main/README.md`
      );

      if (!response.ok) {
        // Try master branch if main doesn't exist
        const masterResponse = await fetch(
          `https://raw.githubusercontent.com/${project.repoPath}/master/README.md`
        );
        if (!masterResponse.ok) throw new Error("README not found");
        const text = await masterResponse.text();
        setReadme(text);
      } else {
        const text = await response.text();
        setReadme(text);
      }
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

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
            <ReactMarkdown>{readme}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
