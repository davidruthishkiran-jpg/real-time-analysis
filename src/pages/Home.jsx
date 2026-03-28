import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const teamMembers = [
    { name: "David", role: "Team Lead", icon: "👨‍💻", color: "#3b82f6" },
    { name: "Vamsi", role: "Team Member", icon: "📊", color: "#10b981" },
    { name: "Dhanesh", role: "Team Member", icon: "🎨", color: "#f59e0b" },
  ];

  const handleEnterApp = () => {
    navigate("/cricket");
  };

  return (
    <div className="home-container">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-sphere"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
      </div>

      {/* Main Content */}
      <div className="home-content">
        {/* Header */}
        <div className="header-section">
          <div className="live-badge">
            <span className="pulse-dot"></span>
            LIVE DATA STREAM
          </div>
          <h1 className="main-title">
            <span className="text">Real-Time Analytics</span>
            <span className="title-underline">Dashboard</span>
          </h1>
          <p className="subtitle">
            Experience next-generation sports analytics with ball-by-ball simulation,
            real-time statistics, and predictive insights
          </p>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2 className="team-title">
            <span className="title-icon">👥</span>
            Meet Our Team
          </h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="team-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-icon" style={{ background: member.color }}>
                  {member.icon}
                </div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <div className="member-stats">
                  <span>📈 Real-time Expert</span>
                  <span>⚡ {Math.floor(Math.random() * 50 + 50)} Projects</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Live Monitoring</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Accuracy Rate</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="stat-label">Real-Time Updates</div>
          </div>
        </div>

        {/* Enter Button */}
        <div className="button-container">
          <button
            className={`enter-btn ${isHovered ? 'hovered' : ''}`}
            onClick={handleEnterApp}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="btn-text">Enter Our App</span>
            <span className="btn-icon">🚀</span>
          </button>
          <p className="btn-hint">Click to explore the Cricket Analytics Dashboard</p>
        </div>

        {/* Features Preview */}
        <div className="features-preview">
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <div className="feature-text">Ball-by-Ball Simulation</div>
          </div>
          <div className="feature">
            <div className="feature-icon">📊</div>
            <div className="feature-text">Real-Time Analytics</div>
          </div>
          <div className="feature">
            <div className="feature-icon">🤖</div>
            <div className="feature-text">Insights</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;