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

interface GitTreeItem {
  path: string;
  type: string;
}

interface GitTreeResponse {
  tree?: GitTreeItem[];
}

function Writeups() {
  const [ctfFolders, setCtfFolders] = useState<CTFFolder[]>([]);
  const [expandedCTFs, setExpandedCTFs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();

    const fetchCTFFolders = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/Radhouen911/CTF-Writeups/git/trees/main?recursive=1",
          { signal: controller.signal }
        );

        if (!response.ok) {
          const masterResponse = await fetch(
            "https://api.github.com/repos/Radhouen911/CTF-Writeups/git/trees/master?recursive=1",
            { signal: controller.signal }
          );

          if (!masterResponse.ok) {
            throw new Error("Failed to fetch CTF writeups tree");
          }

          const masterData = (await masterResponse.json()) as GitTreeResponse;
          if (!controller.signal.aborted) {
            setCtfFolders(buildFoldersFromTree(masterData.tree ?? []));
            setLoading(false);
          }
          return;
        }

        const data = (await response.json()) as GitTreeResponse;
        if (!controller.signal.aborted) {
          setCtfFolders(buildFoldersFromTree(data.tree ?? []));
          setLoading(false);
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    const buildFoldersFromTree = (tree: GitTreeItem[]): CTFFolder[] => {
      const folderMap = new Map<string, CTFFolder>();

      for (const item of tree) {
        if (item.type !== "blob" || !item.path.endsWith("/WRITEUP.md")) {
          continue;
        }

        const [ctfName, challengeName] = item.path.split("/");
        if (!ctfName || !challengeName) {
          continue;
        }

        const existingFolder = folderMap.get(ctfName);
        const challenge = {
          name: challengeName,
          path: `${ctfName}/${challengeName}`,
        };

        if (existingFolder) {
          existingFolder.challenges.push(challenge);
        } else {
          folderMap.set(ctfName, {
            name: ctfName,
            path: ctfName,
            challenges: [challenge],
          });
        }
      }

      return Array.from(folderMap.values()).sort((left, right) =>
        left.name.localeCompare(right.name)
      );
    };

    fetchCTFFolders();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (ctfFolders.length > 0) {
      setExpandedCTFs(new Set([ctfFolders[0].name]));
    }
  }, [ctfFolders]);

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
        <div className="loading">
          <div className="spinner"></div>
          <div className="loading-text">Loading CTF writeups...</div>
        </div>
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
                          to={`/writeup/${encodeURIComponent(ctf.name)}/${encodeURIComponent(challenge.name)}`}
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
