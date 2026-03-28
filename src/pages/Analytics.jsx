import { useMemo } from "react";
import "./Analytics.css";

function Analytics() {
  const performanceScore = useMemo(() => {
    return Math.floor(Math.random() * 30) + 70;
  }, []);

  return (
    <div>
      <h1>📊 Analytics Dashboard</h1>

      {/* ================= BUSINESS ANALYTICS ================= */}
      <h2> Analytics</h2>
{/*
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Conversion Rate</h3>
          <p className="big-number">12.8%</p>
        </div>

        <div className="analytics-card">
          <h3>Customer Retention</h3>
          <p className="big-number">87%</p>
        </div>

        <div className="analytics-card">
          <h3>Performance Score</h3>
          <p className="big-number">{performanceScore}%</p>
        </div>
      </div>
*/}
      {/* SYSTEM PERFORMANCE */}
      <div className="analytics-section">
        <h2>⚙️ System Performance</h2>

        <div className="progress-bar">
          <span style={{ width: "80%" }}>Server Load – 80%</span>
        </div>

        <div className="progress-bar">
          <span style={{ width: "65%" }}>Database Usage – 65%</span>
        </div>

        <div className="progress-bar">
          <span style={{ width: "90%" }}>API Response – 90%</span>
        </div>
      </div>

      {/* USER ACTIVITY */}
      <div className="analytics-section">
        <h2>🧑‍💻 User Activity</h2>

        <table className="analytics-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>David</td>
              <td>Generated Report</td>
              <td className="active">Completed</td>
            </tr>
            <tr>
              <td>Dhanesh</td>
              <td>Updated Settings</td>
              <td className="inactive">Pending</td>
            </tr>
            <tr>
              <td>Vamsi</td>
              <td>Viewed Dashboard</td>
              <td className="active">Success</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* INSIGHTS */}
      <div className="analytics-section">
        <h2>💡 Business Insights</h2>
        <ul className="insight-list">
          <li>✔ Revenue increased by 12%</li>
          <li>✔ Engagement improved by 8%</li>
          <li>✔ Server stability above 95%</li>
          <li>✔ User growth is positive</li>
        </ul>
      </div>

      {/* ================= CRICKET ANALYTICS ================= */}
      <h2 style={{ marginTop: "40px" }}>🏏 Cricket Analytics</h2>

      <div className="cricket-grid">
        <div className="cricket-card">
          <h3>Batting Analysis</h3>
          <p>Top order contributed 65% of runs.</p>
        </div>

        <div className="cricket-card">
          <h3>Bowling Efficiency</h3>
          <p>Economy rate below 6 in middle overs.</p>
        </div>

        <div className="cricket-card">
          <h3>Fielding Impact</h3>
          <p>2 run-outs changed momentum.</p>
        </div>

        <div className="cricket-card">
          <h3>Win Probability</h3>
          <p>78% after 15 overs.</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;