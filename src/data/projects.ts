export interface Project {
  id: string;
  name: string;
  repo: string;
  live?: string;
  summary: string;
  tags: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "voidlink",
    name: "VoidLink",
    repo: "https://github.com/Radhouen911/VoidLink",
    live: "https://radhouen911.github.io/VoidLink/",
    summary:
      "Zero-trust secure messaging. All cryptography runs client-side, so privacy comes from the design rather than from a promise.",
    tags: ["React", "Node.js", "Cryptography"],
    featured: true,
  },
  {
    id: "ctfd-react-frontend",
    name: "CTFd React Frontend",
    repo: "https://github.com/Radhouen911/CTFd-React-Frontend911",
    live: "https://cybermaze-v5.espark.tn/",
    summary:
      "A custom React frontend for CTFd, used as the official platform theme for CyberMaze 5 (2025) in production.",
    tags: ["React", "CTFd", "Production"],
    featured: true,
  },
  {
    id: "onos-mininet-ai",
    name: "ONOS Mininet AI Optimized",
    repo: "https://github.com/Radhouen911/OnosMininet-AiOptimized",
    summary:
      "Three-container SDN lab integrating ONOS and Mininet, with a middleware container that optimizes routing and network performance.",
    tags: ["Networking", "SDN", "Containers"],
    featured: true,
  },
  {
    id: "ctfd-multi-vps-guide",
    name: "CTFd Multi-VPS Infrastructure Guide",
    repo: "https://github.com/Radhouen911/container_instancer_CTFd_guide",
    summary:
      "A field-tested guide to multi-VPS CTFd + Whale deployment: Docker Swarm, FRP and custom React frontends for scalable CTF infrastructure.",
    tags: ["Docker Swarm", "FRP", "DevOps"],
  },
  {
    id: "ctfd-whale-fork",
    name: "CTFd Whale Fork",
    repo: "https://github.com/Radhouen911/ctfd-whale-fork",
    summary:
      "Fork of CTFd Whale enabling dynamic challenge instancing through FRP, tested live during CyberMaze 2025.",
    tags: ["CTFd", "FRP", "Docker"],
  },
  {
    id: "ramadhan-ctfd-frontend",
    name: "RamadhanCTF Frontend",
    repo: "https://github.com/Radhouen911/RamadhanCTF-Frontend",
    live: "https://radhouen911.github.io/RamadhanCTF-Frontend/",
    summary:
      "Ramadan-themed CTFd frontend with landing page, scoreboard, team management, profiles and archive mode.",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: "aiesec-application-tracker",
    name: "AIESEC Applications Dashboard",
    repo: "https://github.com/Radhouen911/aiesec_application_tracker",
    summary:
      "React dashboard pulling live GraphQL data for AIESEC Bardo: trends, pivot tables and programme analytics for daily and monthly reporting.",
    tags: ["React", "GraphQL", "Analytics"],
  },
  {
    id: "bpamt",
    name: "BPAMT",
    repo: "https://github.com/Radhouen911/BPAMT",
    summary:
      "Python tool for mass-importing challenges into a CTFd instance, with JSON challenge support and credential storage.",
    tags: ["Python", "CTFd", "Automation"],
  },
  {
    id: "bugbountyx",
    name: "BugBountyX",
    repo: "https://github.com/Radhouen911/BugBountyX",
    summary: "Personal bug-bounty oriented platform built with React, Node.js and MongoDB.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: "pooling-app",
    name: "Pooling App",
    repo: "https://github.com/Radhouen911/PoolingApp",
    summary: "Full-stack pooling app with a Laravel backend and React frontend, built to learn backend architecture.",
    tags: ["Laravel", "React", "Full-stack"],
  },
  {
    id: "discord-auto-deletechannel",
    name: "Discord Auto Delete Channel",
    repo: "https://github.com/Radhouen911/discord-auto-deletechannel",
    summary:
      "Discord bot that finds channels matching a naming rule and deletes them on demand, handy for ticket-style cleanup.",
    tags: ["Python", "Discord", "Automation"],
  },
  {
    id: "telegram-scraper",
    name: "Telegram Scraper Group Adder",
    repo: "https://github.com/Radhouen911/Telegram-scraper-groupadder",
    summary:
      "Telegram automation script that collects group members from chat activity and adds them to a target group.",
    tags: ["Python", "Telegram", "Automation"],
  },
];
