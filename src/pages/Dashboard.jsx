import { useState, useEffect, useMemo } from "react";
import MetricCard from "../components/MetricCard";
import "./Dashboard.css";

function Dashboard() {
  const [users, setUsers] = useState(0);
  const [sales, setSales] = useState(0);
  const [orders, setOrders] = useState(0);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false); // NEW

  const fetchData = () => {
    setLoading(true);

    setTimeout(() => {
      setUsers(Math.floor(Math.random() * 5000));
      setSales(Math.floor(Math.random() * 1000));
      setOrders(Math.floor(Math.random() * 300));
      setLoading(false);
    }, 800); // simulate API delay
  };

  // Auto update
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Clock
  useEffect(() => {
    const clock = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  const revenue = useMemo(() => sales * 120, [sales]);

  return (
    <div>
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>📊 Real-Time Dashboard</h1>
          <p>Welcome back, Team</p>
        </div>
        <div className="clock">
          {time.toLocaleTimeString()}
        </div>
      </div>

      {/* KPI */}
      <div className="grid">
        <MetricCard title="Active Users" value={users} />
        <MetricCard title="Total Sales" value={sales} />
        <MetricCard title="Orders" value={orders} />
        <MetricCard title="Revenue (₹)" value={revenue} />
      </div>

      {/* SUMMARY */}
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>📈 Growth</h3>
          <p>+12% compared to last month</p>
        </div>

        <div className="summary-card">
          <h3>⚡ System Health</h3>
          <p>All systems operational</p>
        </div>

        <div className="summary-card">
          <h3>🕒 Last Update</h3>
          <p>{time.toLocaleString()}</p>
        </div>
      </div>

      {/* REFRESH BUTTON */}
      <button
        className="refresh-btn"
        onClick={fetchData}
        disabled={loading}
      >
        {loading ? "⏳ Refreshing..." : "🔄 Refresh Data"}
      </button>
    </div>
  );
}

export default Dashboard;