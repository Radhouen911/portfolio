import { Link } from "react-router-dom";
import "./Projects.css";

interface Project {
  id: string;
  name: string;
  fullName?: string;
  repo: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "ctfd-react-frontend",
    name: "CTFd React Frontend",
    repo: "https://github.com/Radhouen911/CTFd-React-Frontend911",
    description:
      "Custom React-based CTFd frontend fully compatible with CTFd, used as the official theme for CyberMaze 5 (2025).",
    tags: ["React", "CTFd", "CTF", "Production"],
  },
  {
    id: "onos-mininet-ai",
    name: "ONOS Mininet AI Optimized",
    repo: "https://github.com/Radhouen911/OnosMininet-AiOptimized",
    description:
      "Three-container architecture integrating ONOS with Mininet, including a middleware container that optimizes routing and network performance.",
    tags: ["Networking", "ONOS", "Mininet", "Containers"],
  },
  {
    id: "ctfd-whale-fork",
    name: "CTFd Whale Fork",
    repo: "https://github.com/Radhouen911/ctfd-whale-fork",
    description:
      "Fork of CTFd Whale enabling dynamic challenge instancing using FRP (Fast Reverse Proxy), tested in live production during CyberMaze 2025.",
    tags: ["CTFd", "FRP", "Docker", "Production"],
  },
  {
    id: "telegram-scraper",
    name: "Telegram Scraper Group Adder",
    repo: "https://github.com/Radhouen911/Telegram-scraper-groupadder",
    description:
      "Dynamic Telegram automation script that scrapes group member data from chat activity and adds users to a target group while attempting to respect Telegram API policies.",
    tags: ["Python", "Telegram", "Automation"],
  },
  {
    id: "bpamt",
    name: "BPAMT",
    fullName: "Baby Push All My Tasks",
    repo: "https://github.com/Radhouen911/BPAMT",
    description:
      "Python automation tool for mass-importing challenges into a deployed CTFd instance with credential storage, JSON challenge support, and high verbosity logging.",
    tags: ["Python", "CTFd", "Automation"],
  },
  {
    id: "pooling-app",
    name: "Pooling App",
    repo: "https://github.com/Radhouen911/PoolingApp",
    description:
      "Full pooling application built with Laravel (backend) and React (frontend), developed to explore backend architecture and framework concepts.",
    tags: ["Laravel", "React", "Fullstack"],
  },
  {
    id: "bugbountyx",
    name: "BugBountyX",
    repo: "https://github.com/Radhouen911/BugBountyX",
    description:
      "Personal bug bounty–oriented platform built using ReactJS, Node.js, and MongoDB.",
    tags: ["React", "NodeJS", "MongoDB", "Security"],
  },
];

function Projects() {
  return (
    <div className="projects-container">
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>
      <h1 className="projects-title">🔧 Projects & Tools</h1>
      <p className="projects-subtitle">
        A collection of my open-source projects, tools, and contributions to the
        security community
      </p>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3>{project.name}</h3>
              {project.fullName && (
                <span className="project-fullname">{project.fullName}</span>
              )}
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-actions">
              <Link to={`/project/${project.id}`} className="read-readme">
                📖 Read README
              </Link>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="view-github"
              >
                🔗 View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
