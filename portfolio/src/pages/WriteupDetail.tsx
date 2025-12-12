import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import "./WriteupDetail.css";

function WriteupDetail() {
  const { ctf, challenge } = useParams<{ ctf: string; challenge: string }>();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchWriteup();
  }, [ctf, challenge]);

  const fetchWriteup = async () => {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/Radhouen911/CTF-Writeups/main/${ctf}/${challenge}/WRITEUP.md`
      );

      if (!response.ok) throw new Error("Writeup not found");

      const text = await response.text();
      setContent(text);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="writeup-detail-container">
        <div className="loading">Loading writeup... 📖</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="writeup-detail-container">
        <Link to="/writeups" className="back-button">
          ← Back to Writeups
        </Link>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="writeup-detail-container">
      <Link to="/writeups" className="back-button">
        ← Back to Writeups
      </Link>
      <div className="writeup-header">
        <span className="ctf-badge">{ctf}</span>
        <h1 className="challenge-title">{challenge}</h1>
      </div>
      <div className="markdown-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default WriteupDetail;
