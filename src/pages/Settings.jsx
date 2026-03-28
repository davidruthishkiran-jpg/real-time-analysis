import { useState, useEffect } from "react";

function Settings({ setTheme }) {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [favoriteTeam, setFavoriteTeam] = useState("India");
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [saved, setSaved] = useState(false);

  // ================= LOAD SAVED SETTINGS =================
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("settings"));

    if (savedSettings) {
      setDarkMode(savedSettings.darkMode ?? true);
      setNotifications(savedSettings.notifications ?? true);
      setAutoRefresh(savedSettings.autoRefresh ?? true);
      setFavoriteTeam(savedSettings.favoriteTeam ?? "India");
      setRefreshInterval(savedSettings.refreshInterval ?? 5);
    }
  }, []);

  // ================= SAVE SETTINGS =================
  const handleSave = () => {
    const settings = {
      darkMode,
      notifications,
      autoRefresh,
      favoriteTeam,
      refreshInterval,
    };

    localStorage.setItem("settings", JSON.stringify(settings));

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1>⚙️ Dashboard Settings</h1>

      {/* ================= SYSTEM SETTINGS ================= */}
      <h2>🖥️ System Settings</h2>

      {/* Dark Mode */}
      <div className="settings-card">
        <h3>🌙 Dark Mode</h3>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Enable Dark Mode
        </label>
      </div>

      {/* Theme Selection */}
      <div className="settings-card">
        <h3>🎨 Theme Color</h3>

        <div className="color-options">
          <div
            className="color-box dark"
            onClick={() => setTheme("dark")}
            title="Dark Theme"
          ></div>

          <div
            className="color-box blue"
            onClick={() => setTheme("blue")}
            title="Blue Theme"
          ></div>

          <div
            className="color-box green"
            onClick={() => setTheme("green")}
            title="Green Theme"
          ></div>

          <div
            className="color-box purple"
            onClick={() => setTheme("purple")}
            title="Purple Theme"
          ></div>
        </div>
      </div>

      {/* Auto Refresh */}
      <div className="settings-card">
        <h3>🔄 Auto Refresh</h3>
        <label>
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={() => setAutoRefresh(!autoRefresh)}
          />
          Enable Dashboard Auto Refresh
        </label>
      </div>

      {/* Refresh Interval */}
      <div className="settings-card">
        <h3>⏱ Refresh Interval (seconds)</h3>
        <input
          type="number"
          min="1"
          max="30"
          value={refreshInterval}
          onChange={(e) =>
            setRefreshInterval(Number(e.target.value))
          }
        />
      </div>

      {/* ================= CRICKET SETTINGS ================= */}
      <h2>🏏 Cricket Preferences</h2>

      {/* Notifications */}
      <div className="settings-card">
        <h3>🔔 Match Notifications</h3>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Enable Live Match Alerts
        </label>
      </div>

      {/* Favorite Team */}
      <div className="settings-card">
        <h3>🏆 Favorite Team</h3>
        <select
          value={favoriteTeam}
          onChange={(e) => setFavoriteTeam(e.target.value)}
        >
          <option>India</option>
          <option>Australia</option>
          <option>England</option>
          <option>Pakistan</option>
          <option>South Africa</option>
        </select>
      </div>

      {/* ================= SAVE BUTTON ================= */}
      <button className="refresh-btn" onClick={handleSave}>
        💾 Save Settings
      </button>

      {/* SAVE MESSAGE */}
      {saved && (
        <p className="save-message">
          ✅ Settings Saved Successfully!
        </p>
      )}
    </div>
  );
}

export default Settings;