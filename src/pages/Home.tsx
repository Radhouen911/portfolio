import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Networks & Cybersecurity Student";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">angel911@portfolio ~ </span>
        </div>

        <div className="terminal-body">
          <div className="terminal-line">
            <span className="prompt">$</span>
            <span className="command">whoami</span>
          </div>
          <div className="terminal-output name-output">
            Mohamed Radhouen Boufath
          </div>

          <div className="terminal-line">
            <span className="prompt">$</span>
            <span className="command">cat role.txt</span>
          </div>
          <div className="terminal-output typing">
            {typedText}
            <span className="cursor">|</span>
          </div>

          <div className="terminal-line">
            <span className="prompt">$</span>
            <span className="command">cat about.md</span>
          </div>
          <div className="terminal-output about-output">
            <p>I build, break, and defend systems — ethically.</p>
            <p>Passionate about CTFs, web security, and automation.</p>
          </div>

          <div className="terminal-line">
            <span className="prompt">$</span>
            <span className="command">ls skills/</span>
          </div>
          <div className="terminal-output skills-output">
            <span className="folder">security/</span>
            <span className="folder">development/</span>
            <span className="folder">tools/</span>
          </div>

          <div className="terminal-line">
            <span className="prompt">$</span>
            <span className="command">tree skills/ --depth 1</span>
          </div>
          <div className="terminal-output tree-output">
            <div className="tree-section">
              <span className="tree-folder">security/</span>
              <span className="tree-item">├── web-exploitation</span>
              <span className="tree-item">├── forensics</span>
              <span className="tree-item">├── network-security</span>
              <span className="tree-item">└── privilege-escalation</span>
            </div>
            <div className="tree-section">
              <span className="tree-folder">development/</span>
              <span className="tree-item">├── react</span>
              <span className="tree-item">├── node.js</span>
              <span className="tree-item">├── python</span>
              <span className="tree-item">└── typescript</span>
            </div>
            <div className="tree-section">
              <span className="tree-folder">tools/</span>
              <span className="tree-item">├── burp-suite</span>
              <span className="tree-item">├── docker</span>
              <span className="tree-item">├── linux</span>
              <span className="tree-item">└── git</span>
            </div>
          </div>

          <div className="terminal-line active">
            <span className="prompt">$</span>
            <span className="cursor-blink">_</span>
          </div>
        </div>
      </div>

      <div className="nav-buttons">
        <Link to="/writeups" className="nav-btn">
          <span className="nav-icon">📝</span>
          <span className="nav-text">CTF Writeups</span>
        </Link>
        <Link to="/projects" className="nav-btn">
          <span className="nav-icon">🔧</span>
          <span className="nav-text">Projects</span>
        </Link>
        <Link to="/cv" className="nav-btn">
          <span className="nav-icon">📄</span>
          <span className="nav-text">My CV</span>
        </Link>
        <a
          href="https://github.com/Radhouen911"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn"
        >
          <span className="nav-icon">⚡</span>
          <span className="nav-text">GitHub</span>
        </a>
      </div>
    </div>
  );
}

export default Home;
