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
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  const getCTFIcon = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("hack") || lowerName.includes("htb")) return "🎯";
    if (lowerName.includes("try") || lowerName.includes("thm")) return "🔓";
    if (lowerName.includes("cyber")) return "🛡️";
    if (lowerName.includes("root")) return "🌳";
    if (lowerName.includes("pico")) return "🏴";
    return "🚩";
  };

  if (loading) {
    return (
      <div className="writeups-container">
        <div className="loading">Loading CTF writeups... 🔍</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="writeups-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="writeups-container">
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>
      <h1 className="writeups-title">📝 CTF Writeups</h1>
      <p className="writeups-subtitle">
        My collection of Capture The Flag challenge solutions and walkthroughs
      </p>

      <div className="ctf-folders">
        {ctfFolders.map((ctf) => (
          <div key={ctf.name} className="ctf-folder">
            <div className="ctf-header">
              <div className="ctf-icon">{getCTFIcon(ctf.name)}</div>
              <h2 className="ctf-name">{ctf.name}</h2>
              <span className="ctf-count">
                {ctf.challenges.length}{" "}
                {ctf.challenges.length === 1 ? "challenge" : "challenges"}
              </span>
            </div>

            {ctf.challenges.length > 0 ? (
              <div className="challenges-grid">
                {ctf.challenges.map((challenge, index) => (
                  <Link
                    key={challenge.path}
                    to={`/writeup/${challenge.path}`}
                    className="challenge-card"
                  >
                    <div className="challenge-info">
                      <span className="challenge-number">{index + 1}</span>
                      <h3>{challenge.name}</h3>
                    </div>
                    <span className="read-more">Read →</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="no-challenges">No challenges yet</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Writeups;
