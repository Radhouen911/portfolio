import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <section className="hero">
      <div className="hero-greeting">👋 Hey there, I'm</div>
      <h1>
        Mohamed Radhouen Boufath <span className="nickname">aka Angel911</span>
      </h1>
      <p className="hero-intro">
        I'm a curious and driven{" "}
        <strong>Networks & Cybersecurity student</strong> who loves learning by
        building, breaking, and defending systems — ethically, of course. 🛡️
        Whether it's solving CTFs 🚩, digging into web exploitation 🕸️, or
        scripting solutions to automate tasks ⚙️, I'm passionate about exploring
        the inner workings of systems and the web. 🔍
      </p>

      <div className="hero-content-wrapper">
        <div className="hero-about">
          <h2>🧠 About Me</h2>
          <ul className="about-list">
            <li>
              Constantly learning through hands-on labs, CTFs, and real-world
              attack scenarios 🎯
            </li>
            <li>
              Fascinated by web application security and how the internet can be
              both powerful and vulnerable 🕸️
            </li>
            <li>
              Curious about DevOps, system automation, and the tooling behind
              secure development workflows ⚙️
            </li>
            <li>
              Enjoy building things with JavaScript, diving into web
              development, and writing clean, functional code 💻
            </li>
            <li>
              Love simplifying security concepts and building small tools to
              help others stay protected 🔐
            </li>
          </ul>
        </div>

        <div className="tech-stack">
          <h2>🛠️ Tech Stack</h2>
          <div className="tech-categories">
            <div className="tech-category">
              <span className="tech-label">💻 Operating Systems & Tools:</span>
              <span className="tech-items">
                Linux • Bash • Docker • Git • Wireshark • Burp Suite • Nmap • VS
                Code
              </span>
            </div>
            <div className="tech-category">
              <span className="tech-label">⚡ Programming & Scripting:</span>
              <span className="tech-items">Python • JavaScript • Bash</span>
            </div>
            <div className="tech-category">
              <span className="tech-label">🌐 Web Development:</span>
              <span className="tech-items">
                HTML • CSS • Node.js • React.js • Angular • Firebase • REST APIs
              </span>
            </div>
            <div className="tech-category">
              <span className="tech-label">🗄️ Databases:</span>
              <span className="tech-items">SQL • MongoDB</span>
            </div>
            <div className="tech-category">
              <span className="tech-label">🔒 Cybersecurity & CTF:</span>
              <span className="tech-items">
                Web Exploitation • Forensics • Networks Security • Enumeration •
                Privilege Escalation
              </span>
            </div>
            <div className="tech-category">
              <span className="tech-label">🚀 Learning & Exploring:</span>
              <span className="tech-items">
                DevOps Basics • Secure Development • Container Hardening • CI/CD
                • Infrastructure as Code (IaC)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-buttons">
        <Link to="/writeups" className="btn btn-primary">
          📝 View CTF Writeups
        </Link>
        <Link to="/projects" className="btn btn-secondary">
          🔧 Explore Projects
        </Link>
      </div>
    </section>
  );
}

export default Home;
