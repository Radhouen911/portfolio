import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useParams } from "react-router-dom";
import "./WriteupDetail.css";

function WriteupDetail() {
  const { ctf, challenge } = useParams<{ ctf: string; challenge: string }>();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();

    const fetchWriteup = async () => {
      try {
        setLoading(true);
        setError(null);
        setContent("");

        const response = await fetch(
          `https://raw.githubusercontent.com/Radhouen911/CTF-Writeups/main/${encodeURIComponent(ctf ?? "")}/${encodeURIComponent(challenge ?? "")}/WRITEUP.md`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error("Writeup not found");

        const text = await response.text();
        if (!controller.signal.aborted) {
          setContent(text);
          setLoading(false);
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchWriteup();

    return () => controller.abort();
  }, [ctf, challenge]);

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
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default WriteupDetail;
