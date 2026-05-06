import { useState } from "react";
import { Link } from "react-router-dom";
import "./CV.css";

function CV() {
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "fr">("en");
  const cvBasePath = import.meta.env.BASE_URL;

  const cvFiles = {
    en: `${cvBasePath}CV_radhoueneng.pdf`,
    fr: `${cvBasePath}cv_radhouenboufatehfr.pdf`,
  };

  const handleDownload = (language: "en" | "fr") => {
    const link = document.createElement("a");
    link.href = cvFiles[language];
    link.download = `CV_Mohamed_Radhouen_Boufath_${language.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="cv-page">
      <div className="cv-header">
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
        <h1>📄 Curriculum Vitae</h1>
        <p>View or download my CV in English or French</p>
      </div>

      <div className="cv-container">
        <div className="language-selector">
          <button
            className={`lang-btn ${selectedLanguage === "en" ? "active" : ""}`}
            onClick={() => setSelectedLanguage("en")}
          >
            🇺🇸 English
          </button>
          <button
            className={`lang-btn ${selectedLanguage === "fr" ? "active" : ""}`}
            onClick={() => setSelectedLanguage("fr")}
          >
            🇫🇷 Français
          </button>
        </div>

        <div className="cv-viewer">
          <div className="cv-actions">
            <button
              onClick={() => handleDownload(selectedLanguage)}
              className="download-btn"
            >
              <span className="btn-icon">⬇️</span>
              Download PDF
            </button>
            <a
              href={cvFiles[selectedLanguage]}
              target="_blank"
              rel="noopener noreferrer"
              className="view-btn"
            >
              <span className="btn-icon">🔍</span>
              Open in New Tab
            </a>
          </div>

          <div className="pdf-container">
            <iframe
              src={`${cvFiles[selectedLanguage]}#toolbar=0&navpanes=0&scrollbar=0`}
              title={`CV - ${
                selectedLanguage === "en" ? "English" : "Français"
              }`}
              className="pdf-viewer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CV;
