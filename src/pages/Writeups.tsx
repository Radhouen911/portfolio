import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Writeups.css";

interface CTFFolder {
  name: string;
  path: string;
  challenges: Challenge[];
}

interface Challenge {
  name: string;
  path: string;
}

function Writeups() {
  const [ctfFolders, setCtfFolders] = useState<CTFFolder[]>([]);
  const [expandedCTFs, setExpandedCTFs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCTFFolders();
  }, []);

  const fetchCTFFolders = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/Radhouen911/CTF-Writeups/contents/"
      );

      if (!response.ok) throw new Error("Failed to fetch CTF folders");

      const data = await response.json();
      const folders = data.filter((item: any) => item.type === "dir");

      const foldersWithChallenges = await Promise.all(
        folders.map(async (folder: any) => {
          const challengesResponse = await fetch(
            `https://api.github.com/repos/Radhouen911/CTF-Writeups/contents/${folder.name}`
          );
          const challengesData = await challengesResponse.json();
          const challenges = challengesData
            .filter((item: any) => item.type === "dir")
            .map((challenge: any) => ({
              name: challenge.name,
              path: `${folder.name}/${challenge.name}`,
            }));

          return {
            name: folder.name,
            path: folder.path,
            challenges,
          };
        })
      );

      setCtfFolders(foldersWithChallenges);
      // Expand first CTF by default
      if (foldersWithChallenges.length > 0) {
        setExpandedCTFs(new Set([foldersWithChallenges[0].name]));
      }
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  const toggleCTF = (ctfName: string) => {
    setExpandedCTFs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ctfName)) {
        newSet.delete(ctfName);
      } else {
        newSet.add(ctfName);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedCTFs(new Set(ctfFolders.map((ctf) => ctf.name)));
  };

  const collapseAll = () => {
    setExpandedCTFs(new Set());
  };

  if (loading) {
    return (
      <div className="writeups-page">
        <div className="loading">Loading CTF writeups... 🔍</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="writeups-page">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  const totalWriteups = ctfFolders.reduce(
    (acc, ctf) => acc + ctf.challenges.length,
    0
  );

  return (
    <div className="writeups-page">
      <div className="writeups-header">
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
        <h1>📝 CTF Writeups</h1>
        <p>
          {ctfFolders.length} CTFs • {totalWriteups} writeups
        </p>
        <div className="header-actions">
          <button onClick={expandAll} className="action-btn">
            Expand All
          </button>
          <button onClick={collapseAll} className="action-btn">
            Collapse All
          </button>
        </div>
      </div>

      <div className="ctf-accordion">
        {ctfFolders.map((ctf) => {
          const isExpanded = expandedCTFs.has(ctf.name);
          return (
            <div
              key={ctf.name}
              className={`ctf-item ${isExpanded ? "expanded" : ""}`}
            >
              <button
                className="ctf-header"
                onClick={() => toggleCTF(ctf.name)}
              >
                <span className="ctf-icon">{isExpanded ? "📂" : "📁"}</span>
                <span className="ctf-name">{ctf.name}</span>
                <span className="ctf-count">{ctf.challenges.length}</span>
                <span className={`ctf-chevron ${isExpanded ? "open" : ""}`}>
                  ▼
                </span>
              </button>

              {isExpanded && (
                <div className="ctf-challenges">
                  {ctf.challenges.length > 0 ? (
                    <div className="challenges-grid">
                      {ctf.challenges.map((challenge) => (
                        <Link
                          key={challenge.path}
                          to={`/writeup/${challenge.path}`}
                          className="challenge-link"
                        >
                          <span className="challenge-icon">📄</span>
                          <span className="challenge-name">
                            {challenge.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="no-challenges">No writeups yet</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Writeups;
