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
  const [selectedCTF, setSelectedCTF] = useState<string | null>(null);
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
      if (foldersWithChallenges.length > 0) {
        setSelectedCTF(foldersWithChallenges[0].name);
      }
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  const selectedCTFData = ctfFolders.find((ctf) => ctf.name === selectedCTF);

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

  return (
    <div className="writeups-page">
      <div className="writeups-header">
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
        <h1>📝 CTF Writeups</h1>
        <p>Select a CTF to view challenges</p>
      </div>

      <div className="writeups-layout">
        {/* CTF Tabs */}
        <div className="ctf-tabs">
          {ctfFolders.map((ctf) => (
            <button
              key={ctf.name}
              className={`ctf-tab ${selectedCTF === ctf.name ? "active" : ""}`}
              onClick={() => setSelectedCTF(ctf.name)}
            >
              <span className="ctf-tab-icon">🚩</span>
              <span className="ctf-tab-name">{ctf.name}</span>
              <span className="ctf-tab-count">{ctf.challenges.length}</span>
            </button>
          ))}
        </div>

        {/* Challenges List */}
        <div className="challenges-panel">
          {selectedCTFData && (
            <>
              <div className="challenges-header">
                <h2>{selectedCTFData.name}</h2>
                <span>{selectedCTFData.challenges.length} writeups</span>
              </div>

              {selectedCTFData.challenges.length > 0 ? (
                <div className="challenges-list">
                  {selectedCTFData.challenges.map((challenge) => (
                    <Link
                      key={challenge.path}
                      to={`/writeup/${challenge.path}`}
                      className="challenge-item"
                    >
                      <span className="challenge-icon">📄</span>
                      <span className="challenge-name">{challenge.name}</span>
                      <span className="challenge-arrow">→</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="no-challenges">
                  <span>📭</span>
                  <p>No writeups yet for this CTF</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Writeups;
