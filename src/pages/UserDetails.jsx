import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const players = [
    {
      id: 1,
      name: "Vamsi",
      role: "Captain",
      email: "vamsi@email.com",
      status: "Active",
      runs: 890,
      wickets: 15,
      strikeRate: 148.5
    },
    {
      id: 2,
      name: "David",
      role: "All-Rounder",
      email: "david@email.com",
      status: "Active",
      runs: 998,
      wickets: 28,
      strikeRate: 158.2
    },
    {
      id: 3,
      name: "Dhanesh",
      role: "Bowler",
      email: "dhanesh@email.com",
      status: "Active",
      runs: 320,
      wickets: 42,
      strikeRate: 112.4
    }
  ];

  
  const rankedPlayers = [...players].sort((a, b) => {
    const scoreA = a.runs + a.wickets * 20 + a.strikeRate;
    const scoreB = b.runs + b.wickets * 20 + b.strikeRate;
    return scoreB - scoreA;
  });

  const player = useMemo(() => {
    return players.find((p) => p.id === Number(id));
  }, [id]);

  if (!player) return <h2>Player Not Found</h2>;

  const rank =
    rankedPlayers.findIndex((p) => p.id === player.id) + 1;

  const matchHistory = [
    { opponent: "Pakistan", runs: 78, wickets: 2, result: "Win", date: "12 Feb 2026" },
    { opponent: "Australia", runs: 45, wickets: 1, result: "Loss", date: "15 Feb 2026" },
    { opponent: "England", runs: 102, wickets: 0, result: "Win", date: "18 Feb 2026" }
  ];

  return (
    <div>
      <h1>🏏 Player Profile</h1>

      
      <div className="details-card">
        <h2>{player.name}</h2>
        <p><strong>Role:</strong> {player.role}</p>
        <p><strong>Email:</strong> {player.email}</p>
        <p><strong>Status:</strong> {player.status}</p>
        <h3>🏆 Current Rank: #{rank}</h3>
      </div>

  
      <div className="details-card">
        <h3>📊 Performance Statistics</h3>
        <p>Total Runs: {player.runs}</p>
        <p>Total Wickets: {player.wickets}</p>
        <p>Strike Rate: {player.strikeRate}</p>
      </div>

      
      <div className="details-card">
        <h3>📅 Match History</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>Opponent</th>
              <th>Runs</th>
              <th>Wickets</th>
              <th>Result</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {matchHistory.map((match, index) => (
              <tr key={index}>
                <td>{match.opponent}</td>
                <td>{match.runs}</td>
                <td>{match.wickets}</td>
                <td
                  className={
                    match.result === "Win"
                      ? "win"
                      : "loss"
                  }
                >
                  {match.result}
                </td>
                <td>{match.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="refresh-btn"
        onClick={() => navigate("/users")}
      >
        ⬅ Back to Players
      </button>
    </div>
  );
}

export default UserDetails;