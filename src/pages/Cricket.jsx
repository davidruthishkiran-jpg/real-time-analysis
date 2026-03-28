import { useState, useEffect, useCallback } from "react";
import "./Cricket.css"; // Make sure this file exists in the same directory

const Cricket = () => {
  // Match State
  const [matchState, setMatchState] = useState({
    isLive: true,
    innings: 1,
    battingTeam: "India",
    bowlingTeam: "West Indies",
    runs: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    target: null,
    isSecondInnings: false,
  });

  const [scorecard, setScorecard] = useState({
    recentBalls: [],
    partnership: { runs: 0, balls: 0 },
    lastWicket: null,
  });

  const [winProbability, setWinProbability] = useState(65);
  const [runRate, setRunRate] = useState(0);
  const [requiredRunRate, setRequiredRunRate] = useState(0);
  const [matchEvent, setMatchEvent] = useState("🏏 Toss won by India, elected to bat first");

  const [keyPlayers, setKeyPlayers] = useState({
    striker: { name: "Virat Kohli", runs: 0, balls: 0, fours: 0, sixes: 0 },
    nonStriker: { name: "Rohit Sharma", runs: 0, balls: 0, fours: 0, sixes: 0 },
    bowler: { name: "Alzarri Joseph", overs: 0, runs: 0, wickets: 0 },
  });

  // Batting order
  const indiaBattingOrder = [
    "Rohit Sharma", "Virat Kohli", "KL Rahul", "Suryakumar Yadav", 
    "Hardik Pandya", "Ravindra Jadeja", "Axar Patel", 
    "Mohammed Shami", "Jasprit Bumrah", "Kuldeep Yadav", "Mohammed Siraj"
  ];
  
  const westIndiesBattingOrder = [
    "Shai Hope", "Brandon King", "Nicholas Pooran", "Rovman Powell",
    "Shimron Hetmyer", "Jason Holder", "Romario Shepherd",
    "Akeal Hosein", "Alzarri Joseph", "Gudakesh Motie", "Jayden Seales"
  ];

  const [battingOrder, setBattingOrder] = useState(indiaBattingOrder);
  const [currentBatsmanIndex, setCurrentBatsmanIndex] = useState(2);

  // Get new batsman
  const getNewBatsman = useCallback((wickets, isIndia) => {
    const order = isIndia ? indiaBattingOrder : westIndiesBattingOrder;
    const index = Math.min(wickets, order.length - 1);
    return { 
      name: order[index], 
      runs: 0, 
      balls: 0, 
      fours: 0, 
      sixes: 0 
    };
  }, []);

  // Calculate win probability
  const calculateWinProbability = useCallback((runs, wickets, target, oversBowled) => {
    if (!target) return 50;
    const resourcesUsed = (wickets / 10) * 0.4 + (oversBowled / 20) * 0.6;
    const runsScoredPercent = runs / target;
    let probability = (runsScoredPercent - resourcesUsed + 0.5) * 100;
    probability = Math.min(95, Math.max(5, probability));
    return Math.floor(probability);
  }, []);

  // Simulate ball outcome
  const simulateBall = useCallback(() => {
    if (!matchState.isLive) return;

    // Calculate outcome probabilities
    const getBallOutcome = () => {
      const pressure = (matchState.wickets / 10) * 0.3;
      const random = Math.random();
      
      if (random < 0.05 + pressure) return "wicket";
      if (random < 0.12) return "dot";
      if (random < 0.28) return "single";
      if (random < 0.38) return "two";
      if (random < 0.44) return "three";
      if (random < 0.62) return "four";
      return "six";
    };

    const outcome = getBallOutcome();
    let runsAdded = 0;
    let wicketFall = false;
    let wicketPlayer = null;

    // Process outcome
    switch (outcome) {
      case "dot":
        runsAdded = 0;
        break;
      case "single":
        runsAdded = 1;
        break;
      case "two":
        runsAdded = 2;
        break;
      case "three":
        runsAdded = 3;
        break;
      case "four":
        runsAdded = 4;
        setKeyPlayers(prev => ({
          ...prev,
          striker: { ...prev.striker, fours: prev.striker.fours + 1 }
        }));
        break;
      case "six":
        runsAdded = 6;
        setKeyPlayers(prev => ({
          ...prev,
          striker: { ...prev.striker, sixes: prev.striker.sixes + 1 }
        }));
        break;
      case "wicket":
        wicketFall = true;
        runsAdded = 0;
        wicketPlayer = keyPlayers.striker.name;
        break;
      default:
        runsAdded = 0;
    }

    // Update striker stats
    if (!wicketFall && runsAdded > 0) {
      setKeyPlayers(prev => ({
        ...prev,
        striker: {
          ...prev.striker,
          runs: prev.striker.runs + runsAdded,
          balls: prev.striker.balls + 1
        }
      }));
    } else if (!wicketFall) {
      setKeyPlayers(prev => ({
        ...prev,
        striker: {
          ...prev.striker,
          balls: prev.striker.balls + 1
        }
      }));
    }

    // Update partnership
    setScorecard(prev => ({
      ...prev,
      partnership: {
        runs: wicketFall ? 0 : prev.partnership.runs + runsAdded,
        balls: wicketFall ? 0 : prev.partnership.balls + 1
      },
      recentBalls: [
        { outcome, runs: runsAdded, wicket: wicketFall, player: wicketPlayer },
        ...prev.recentBalls.slice(0, 5)
      ],
      lastWicket: wicketFall ? { player: wicketPlayer, runs: keyPlayers.striker.runs, balls: keyPlayers.striker.balls } : prev.lastWicket
    }));

    // Update bowler stats
    setKeyPlayers(prev => ({
      ...prev,
      bowler: {
        ...prev.bowler,
        runs: prev.bowler.runs + runsAdded,
        wickets: prev.bowler.wickets + (wicketFall ? 1 : 0)
      }
    }));

    // Update match state
    let newRuns = matchState.runs + runsAdded;
    let newWickets = matchState.wickets + (wicketFall ? 1 : 0);
    let newBalls = matchState.balls + 1;
    let newOvers = matchState.overs;
    let newStriker = keyPlayers.striker;
    let newNonStriker = keyPlayers.nonStriker;

    // Handle over completion
    if (newBalls === 6) {
      newOvers += 1;
      newBalls = 0;
      [newStriker, newNonStriker] = [newNonStriker, newStriker];
      
      setKeyPlayers(prev => ({
        ...prev,
        striker: newStriker,
        nonStriker: newNonStriker,
        bowler: {
          ...prev.bowler,
          overs: prev.bowler.overs + 1
        }
      }));
    }

    // Handle wicket
    if (wicketFall) {
      setMatchEvent(`${wicketPlayer} departs! ${keyPlayers.bowler.name} gets the breakthrough!`);
      
      if (newBalls % 6 !== 0) {
        [newStriker, newNonStriker] = [newNonStriker, newStriker];
      }
      
      const newBatsman = getNewBatsman(newWickets, matchState.battingTeam === "India");
      setKeyPlayers(prev => ({
        ...prev,
        striker: newBatsman,
        nonStriker: newNonStriker,
      }));
    }

    // Check innings end
    const isInningsComplete = () => {
      if (matchState.isSecondInnings) {
        if (newWickets >= 10) return true;
        if (newRuns > matchState.target) return true;
        if (newOvers >= 20) return true;
      } else {
        if (newWickets >= 10) return true;
        if (newOvers >= 20) return true;
      }
      return false;
    };

    if (isInningsComplete()) {
      if (!matchState.isSecondInnings) {
        const target = newRuns + 1;
        setMatchEvent(`🏆 End of 1st Innings! ${matchState.battingTeam} score ${newRuns}/${newWickets} in ${newOvers}.${newBalls} overs. Target: ${target}`);
        
        setMatchState(prev => ({
          ...prev,
          isSecondInnings: true,
          innings: 2,
          battingTeam: prev.bowlingTeam,
          bowlingTeam: prev.battingTeam,
          runs: 0,
          wickets: 0,
          overs: 0,
          balls: 0,
          target: target,
          isLive: true
        }));
        
        setKeyPlayers({
          striker: { name: "Shai Hope", runs: 0, balls: 0, fours: 0, sixes: 0 },
          nonStriker: { name: "Brandon King", runs: 0, balls: 0, fours: 0, sixes: 0 },
          bowler: { name: "Jasprit Bumrah", overs: 0, runs: 0, wickets: 0 },
        });
        
        setScorecard({ recentBalls: [], partnership: { runs: 0, balls: 0 }, lastWicket: null });
        setWinProbability(50);
      } else {
        const matchResult = newRuns > matchState.target ? 
          `${matchState.battingTeam} wins by ${10 - newWickets} wickets!` :
          `${matchState.bowlingTeam} wins by ${matchState.target - newRuns} runs!`;
        
        setMatchEvent(`🏆 MATCH COMPLETE! ${matchResult}`);
        setMatchState(prev => ({ ...prev, isLive: false }));
      }
      return;
    }

    // Update match state
    setMatchState(prev => ({
      ...prev,
      runs: newRuns,
      wickets: newWickets,
      overs: newOvers,
      balls: newBalls
    }));

    // Update run rates
    const currentRunRate = (newRuns / (newOvers + newBalls / 6)).toFixed(2);
    setRunRate(currentRunRate);
    
    if (matchState.isSecondInnings && matchState.target) {
      const oversBowled = newOvers + newBalls / 6;
      const runsNeeded = matchState.target - newRuns;
      const oversRemaining = 20 - oversBowled;
      const reqRR = oversRemaining > 0 ? (runsNeeded / oversRemaining).toFixed(2) : 0;
      setRequiredRunRate(reqRR);
      setWinProbability(calculateWinProbability(newRuns, newWickets, matchState.target, oversBowled));
    }

    // Rotate strike on odd runs
    if (runsAdded % 2 === 1 && !wicketFall) {
      [newStriker, newNonStriker] = [newNonStriker, newStriker];
      setKeyPlayers(prev => ({
        ...prev,
        striker: newStriker,
        nonStriker: newNonStriker
      }));
    }
  }, [matchState, keyPlayers, getNewBatsman, calculateWinProbability]);

  // Auto-simulate every 2 seconds
  useEffect(() => {
    if (!matchState.isLive) return;
    
    const interval = setInterval(() => {
      simulateBall();
    }, 2000);
    
    return () => clearInterval(interval);
  }, [simulateBall, matchState.isLive]);

  // Format overs
  const formatOvers = () => {
    return `${matchState.overs}.${matchState.balls}`;
  };

  // Control functions
  const toggleLiveSimulation = () => {
    setMatchState(prev => ({ ...prev, isLive: !prev.isLive }));
  };

  const resetMatch = () => {
    setMatchState({
      isLive: true,
      innings: 1,
      battingTeam: "India",
      bowlingTeam: "West Indies",
      runs: 0,
      wickets: 0,
      overs: 0,
      balls: 0,
      target: null,
      isSecondInnings: false,
    });
    
    setKeyPlayers({
      striker: { name: "Virat Kohli", runs: 0, balls: 0, fours: 0, sixes: 0 },
      nonStriker: { name: "Rohit Sharma", runs: 0, balls: 0, fours: 0, sixes: 0 },
      bowler: { name: "Alzarri Joseph", overs: 0, runs: 0, wickets: 0 },
    });
    
    setScorecard({ recentBalls: [], partnership: { runs: 0, balls: 0 }, lastWicket: null });
    setMatchEvent("🏏 Match reset! Toss won by India, elected to bat first");
    setWinProbability(65);
    setRunRate(0);
    setRequiredRunRate(0);
  };

  return (
    <div className="cricket-dashboard">
      {/* Header */}
      <div className="hero-section">
        <h1>🏏 CRICKET EDGE</h1>
        <p className="subtitle">Real-time Match Intelligence | Ball-by-Ball Simulation</p>
        <div className="match-status">
          <span className={`live-indicator ${matchState.isLive ? 'live' : 'completed'}`}>
            {matchState.isLive ? "🔴 LIVE" : "⚫ MATCH ENDED"}
          </span>
          <span className="innings-badge">
            {matchState.innings === 1 ? "1st Innings" : "2nd Innings"} • {matchState.battingTeam} batting
          </span>
        </div>
      </div>

      {/* Live Scorecard */}
      <div className="scorecard-main">
        <div className="score-big">
          <div className="score-number">
            {matchState.runs}/{matchState.wickets}
            <span className="overs-detail">({formatOvers()} ov)</span>
          </div>
          {matchState.isSecondInnings && matchState.target && (
            <div className="target-info">
              Target: {matchState.target} runs • Need {matchState.target - matchState.runs} in {(20 - (matchState.overs + matchState.balls / 6)).toFixed(1)} overs
            </div>
          )}
        </div>
        
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-label">Current Run Rate</div>
            <div className="stat-value">{runRate}</div>
          </div>
          {matchState.isSecondInnings && (
            <div className="stat-card">
              <div className="stat-label">Required Run Rate</div>
              <div className="stat-value">{requiredRunRate}</div>
            </div>
          )}
          <div className="stat-card">
            <div className="stat-label">Win Probability</div>
            <div className="stat-value win-prob">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${winProbability}%` }}></div>
              </div>
              {winProbability}%
            </div>
          </div>
        </div>
      </div>

      {/* Players Duel */}
      <div className="players-duel">
        <h3>⚔️ Key Battle</h3>
        <div className="duel-container">
          <div className="player-card batsman">
            <div className="player-role">🏏 STRIKER</div>
            <div className="player-name">{keyPlayers.striker.name}</div>
            <div className="player-stats">
              {keyPlayers.striker.runs} ({keyPlayers.striker.balls}) • {keyPlayers.striker.fours} fours • {keyPlayers.striker.sixes} sixes
            </div>
            <div className="strike-rate">
              SR: {keyPlayers.striker.balls > 0 ? ((keyPlayers.striker.runs / keyPlayers.striker.balls) * 100).toFixed(1) : 0}
            </div>
          </div>
          <div className="vs-badge">VS</div>
          <div className="player-card bowler">
            <div className="player-role">⚡ BOWLER</div>
            <div className="player-name">{keyPlayers.bowler.name}</div>
            <div className="player-stats">
              {keyPlayers.bowler.overs}.0 overs • {keyPlayers.bowler.runs}/{keyPlayers.bowler.wickets}
            </div>
            <div className="economy">
              Economy: {(keyPlayers.bowler.runs / (keyPlayers.bowler.overs || 1)).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Match Details Grid */}
      <div className="match-details-grid">
        <div className="info-card">
          <h4>🤝 Current Partnership</h4>
          <div className="partnership-stats">
            <div className="partnership-runs">{scorecard.partnership.runs} runs</div>
            <div className="partnership-balls">{scorecard.partnership.balls} balls</div>
          </div>
          {scorecard.lastWicket && (
            <div className="last-wicket">
              🪄 Last Wicket: {scorecard.lastWicket.player} ({scorecard.lastWicket.runs} off {scorecard.lastWicket.balls})
            </div>
          )}
        </div>
        
        <div className="info-card">
          <h4>📊 Recent Balls</h4>
          <div className="recent-balls">
            {scorecard.recentBalls.slice(0, 6).map((ball, idx) => (
              <span key={idx} className={`ball-result ${ball.wicket ? 'wicket' : ball.runs === 0 ? 'dot' : ball.runs === 4 || ball.runs === 6 ? ball.runs === 4 ? 'four' : 'six' : ''}`}>
                {ball.wicket ? "W" : ball.runs === 0 ? "●" : ball.runs}
              </span>
            ))}
          </div>
        </div>
        
        <div className="info-card">
          <h4>📈 Match Event</h4>
          <div className="match-event">{matchEvent}</div>
        </div>
      </div>

      {/* Fixtures & Analysis */}
      <div className="fixtures-analysis">
        <div className="upcoming-matches">
          <h3>📅 Upcoming Fixtures</h3>
          <div className="match-list">
            <div className="match-item">
              <div className="teams">🏏 Australia vs England</div>
              <div className="date">March 05, 2026 • MCG</div>
              <div className="countdown">4 days to go</div>
            </div>
            <div className="match-item">
              <div className="teams">🏏 South Africa vs Pakistan</div>
              <div className="date">March 08, 2026 • Cape Town</div>
              <div className="countdown">7 days to go</div>
            </div>
            <div className="match-item">
              <div className="teams">🏏 New Zealand vs Sri Lanka</div>
              <div className="date">March 12, 2026 • Auckland</div>
              <div className="countdown">11 days to go</div>
            </div>
          </div>
        </div>
        
        <div className="tactical-analysis">
          <h3>📊 Tactical Insights</h3>
          <ul>
            <li>🎯 Powerplay aggression setting the tone • {matchState.overs < 6 ? "Field restrictions active" : "Middle overs consolidation"}</li>
            <li>🔄 Bowling changes crucial in death overs • Spinners controlling the middle phase</li>
            <li>⚡ {keyPlayers.striker.name} key wicket • Pressure index {Math.min(100, matchState.wickets * 10 + matchState.overs * 2)}%</li>
            <li>📈 Projected total: {Math.floor((runRate || 8) * 20)} runs if current rate maintained</li>
          </ul>
        </div>
      </div>

      {/* Control Panel */}
      <div className="control-panel">
        <button onClick={toggleLiveSimulation} className={`btn ${matchState.isLive ? 'btn-pause' : 'btn-resume'}`}>
          {matchState.isLive ? "⏸️ Pause Simulation" : "▶️ Resume Simulation"}
        </button>
        <button onClick={resetMatch} className="btn btn-reset">
          🔄 Reset Match
        </button>
      </div>
    </div>
  );
};

export default Cricket;