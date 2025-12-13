import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <section className="hero">
      <div className="hero-intro-section">
        <p className="hero-greeting">Hey there, I'm</p>
        <h1 className="hero-name">Mohamed Radhouen Boufath</h1>
        <p className="hero-alias">aka Angel911</p>
        <p className="hero-tagline">Networks & Cybersecurity Student</p>
        <p className="hero-description">
          I build, break, and defend systems — ethically. Passionate about CTFs,
          web security, and creating tools that make a difference.
        </p>
      </div>

      <div className="hero-sections">
        <div className="hero-card">
          <h2>About Me</h2>
          <ul className="about-list">
            <li>
              Learning through hands-on labs, CTFs, and real-world scenarios
            </li>
            <li>Fascinated by web application security and vulnerabilities</li>
            <li>Building tools with JavaScript and Python</li>
            <li>Exploring DevOps and secure development workflows</li>
          </ul>
        </div>

        <div className="hero-card">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-group">
              <h3>Security</h3>
              <div className="skill-tags">
                <span>Web Exploitation</span>
                <span>Forensics</span>
                <span>Network Security</span>
                <span>OSINT</span>
              </div>
            </div>
            <div className="skill-group">
              <h3>Development</h3>
              <div className="skill-tags">
                <span>React</span>
                <span>Node.js</span>
                <span>Python</span>
                <span>TypeScript</span>
              </div>
            </div>
            <div className="skill-group">
              <h3>Tools</h3>
              <div className="skill-tags">
                <span>Burp Suite</span>
                <span>Docker</span>
                <span>Linux</span>
                <span>Git</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-buttons">
        <Link to="/writeups" className="btn btn-primary">
          View CTF Writeups
        </Link>
        <Link to="/projects" className="btn btn-secondary">
          Explore Projects
        </Link>
      </div>
    </section>
  );
}

export default Home;
