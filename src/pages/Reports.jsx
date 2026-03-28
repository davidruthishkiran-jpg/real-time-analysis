import { useMemo } from "react";
import "./Reports.css";
function Reports() {

  const monthlyRevenue = useMemo(() => {
    return [
      { month: "Jan", revenue: 120000 },
      { month: "Feb", revenue: 140000 },
      { month: "Mar", revenue: 160000 },
    ];
  }, []);

  const totalRevenue = monthlyRevenue.reduce(
    (acc, curr) => acc + curr.revenue,
    0
  );

  return (
    <div>
      <h1>📑 Business Reports</h1>

      {/* Summary Cards */}
      <div className="report-grid">
        <div className="report-card">
          <h3>Total Revenue</h3>
          <p className="big-number">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="analysis-box">
  <h2>📈 Tournament Summary</h2>
  <ul>
    <li>Total Matches: 12</li>
    <li>Wins: 8</li>
    <li>Losses: 4</li>
    <li>Highest Score: 198</li>
    <li>Best Bowling: 5/19</li>
  </ul>
</div>

        <div className="report-card">
          <h3>Total Orders</h3>
          <p className="big-number">4,820</p>
        </div>

        <div className="report-card">
          <h3>Growth Rate</h3>
          <p className="big-number">+14%</p>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="report-section">
        <h2>📊 Monthly Revenue Breakdown</h2>

        {monthlyRevenue.map((data, index) => (
          <div key={index} className="revenue-bar">
            <span
              style={{
                width: `${data.revenue / 2000}%`
              }}
            >
              {data.month} — ₹{data.revenue.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Detailed Table */}
      <div className="report-section">
        <h2>📋 Detailed Report Table</h2>

        <table className="report-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {monthlyRevenue.map((data, index) => (
              <tr key={index}>
                <td>{data.month}</td>
                <td>₹{data.revenue.toLocaleString()}</td>
                <td className="success">Stable</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download Button */}
      <button 
  className="refresh-btn" 
  onClick={() => {
    const reportData = {
      monthlyRevenue,
      totalRevenue,
      tournamentSummary: {
        totalMatches: 12,
        wins: 8,
        losses: 4,
        highestScore: 198,
        bestBowling: "5/19"
      },
      totalOrders: 4820,
      growthRate: "14%"
    };
    localStorage.setItem("Report", JSON.stringify(reportData));
    alert("✅ Report saved to localStorage as 'Report'");
  }}
>
  ⬇  Report(localStorage)
</button>

      
    </div>
  );
}

export default Reports;