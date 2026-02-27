import { useEffect, useRef, useState } from "react";
import LightRays from "./components/LightRays.jsx";

const USERS = [
  {
    id: "kantuza",
    name: "Kantuza",
    password: "kantuza123",
    photo: "/profiles/kantuza.jpeg",
  },
  {
    id: "akaki",
    name: "Akaki-Kako-Kaki",
    password: "akaki123",
    photo: "/profiles/akaki.jpeg",
  },
  {
    id: "mgeli",
    name: "Mgeli",
    password: "mgeli123",
    photo: "/profiles/mgeli.jpeg",
  },
  {
    id: "amiran",
    name: "Amiran Chubinidze",
    password: "amiran123",
    photo: "/profiles/amiran.jpeg",
  },
  {
    id: "gegsia",
    name: "Gegsia",
    password: "gegsia123",
    photo: "/profiles/gegsia.jpeg",
  },
];

const STORAGE_KEY_MATCHES = "ppc_scheduled";
const STORAGE_KEY_SESSION = "ppc_session";

function loadData(key, fallback) {
  try {
    const raw =
      window.localStorage.getItem(key) ??
      (window.__ppcStore ? window.__ppcStore[key] : null);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveData(key, value) {
  const payload = JSON.stringify(value);
  try {
    window.localStorage.setItem(key, payload);
  } catch {}
  if (!window.__ppcStore) window.__ppcStore = {};
  window.__ppcStore[key] = payload;
}

const APP_CSS = `
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap");

:root {
  --bg: #0b0d12;
  --bg-soft: #121722;
  --panel: #151b28;
  --panel-border: #242c3f;
  --text: #e8edf7;
  --text-soft: #9eabc5;
  --text-dim: #7f8aa1;
  --brand: #5c7cff;
  --brand-soft: #2d3a68;
  --danger: #f26d6d;
  --radius: 14px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Outfit", sans-serif;
  background: radial-gradient(1200px 600px at 80% -10%, #1e2a52 0%, var(--bg) 60%);
  color: var(--text);
}

.screen {
  min-height: 100vh;
  padding: 24px;
}

.center-screen {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
  background-color: var(--panel);
  border: 1px solid var(--panel-border);
  border-radius: var(--radius);
}

.fade-in {
  animation: fadeIn 220ms ease-out both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mono {
  font-family: "Space Mono", monospace;
  letter-spacing: 0.04em;
}

.kicker {
  margin: 0;
  color: #cfd9f7;
  font-size: 11px;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid rgba(146, 170, 234, 0.35);
  border-radius: 999px;
  background: rgba(14, 23, 44, 0.55);
  backdrop-filter: blur(6px);
}

.title {
  margin: 14px 0 0;
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 700;
  line-height: 1.06;
  letter-spacing: -0.02em;
  color: #f3f7ff;
}

.subtitle {
  margin: 10px 0 0;
  color: var(--text-soft);
  font-size: 15px;
}

.landing-wrap {
  width: min(1140px, 100%);
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 26px 24px 20px;
  border: 1px solid rgba(116, 141, 214, 0.24);
  border-radius: 20px;
  background: linear-gradient(
    180deg,
    rgba(16, 24, 44, 0.72) 0%,
    rgba(11, 16, 30, 0.62) 100%
  );
  box-shadow: 0 24px 55px rgba(4, 7, 15, 0.45);
  backdrop-filter: blur(6px);
}

.landing-screen {
  position: relative;
  overflow: hidden;
}

.landing-background {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.5;
}

.landing-shade {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(34, 52, 97, 0.3), rgba(11, 13, 18, 0.72));
  z-index: 1;
  pointer-events: none;
}

.profile-grid {
  margin: 28px auto 0;
  display: flex;
  gap: 16px;
  max-width: 100%;
  width: 100%;
  justify-content: center;
  align-items: stretch;
  overflow-x: auto;
  padding: 4px 4px 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.profile-grid::-webkit-scrollbar {
  display: none;
}

.profile-card {
  border: 1px solid var(--panel-border);
  border-radius: var(--radius);
  background-color: #101724;
  background-size: cover;
  background-position: center;
  aspect-ratio: 1 / 1;
  padding: 16px;
  cursor: pointer;
  text-align: left;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  isolation: isolate;
  transition: border-color 160ms ease, transform 160ms ease;
  flex: 0 0 clamp(172px, 18vw, 214px);
  scroll-snap-align: center;
  box-shadow: 0 10px 26px rgba(5, 9, 18, 0.45);
}

.profile-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(7, 10, 17, 0.12) 30%, rgba(7, 10, 17, 0.82) 100%);
  z-index: 0;
}

.profile-card:hover {
  transform: translateY(-4px);
  border-color: #5f7fd6;
  box-shadow: 0 14px 34px rgba(9, 16, 31, 0.6);
}

.profile-content {
  position: relative;
  z-index: 1;
  width: 100%;
}

.profile-name {
  font-size: clamp(18px, 1.6vw, 21px);
  font-weight: 600;
  color: #eef2ff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
}

.profile-hint {
  margin-top: 6px;
  display: block;
  font-size: 11px;
  color: #d8e1ff;
  text-transform: uppercase;
}

.login-shell {
  width: min(440px, 100%);
  padding: 24px;
}

.login-header {
  margin-bottom: 18px;
}

.field {
  width: 100%;
  background: #0f141f;
  color: var(--text);
  border: 1px solid var(--panel-border);
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 14px;
  outline: none;
}

.field:focus {
  border-color: #4d64a7;
}

.field.error {
  border-color: #b75959;
}

.error-text {
  margin-top: 8px;
  color: var(--danger);
  font-size: 12px;
}

.btn {
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
}

.btn-primary {
  background: var(--brand);
  color: #f4f7ff;
}

.btn-primary:hover {
  background: #516ce0;
}

.btn-soft {
  background: #1a2234;
  border-color: #2e3b60;
  color: #bbcbf6;
}

.btn-soft:hover {
  background: #202b42;
}

.btn-ghost {
  background: transparent;
  border-color: var(--panel-border);
  color: var(--text-dim);
}

.btn-ghost:hover {
  border-color: #3a496d;
  color: #c4d2f2;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dashboard-shell {
  max-width: 980px;
  margin: 0 auto;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  padding: 14px 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #c7d5f7;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--brand);
}

.panel {
  padding: 18px;
}

.section-title {
  margin: 0;
  font-size: 13px;
  color: var(--text-dim);
  text-transform: uppercase;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.match-list {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.match-card {
  border: 1px solid var(--panel-border);
  border-radius: 12px;
  background: #111826;
  padding: 14px;
}

.match-time {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.match-date {
  margin: 0 0 4px;
  color: #b7c7eb;
  font-size: 12px;
}

.muted {
  color: var(--text-dim);
  font-size: 12px;
}

.chips {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  border-radius: 999px;
  width: 36px;
  height: 36px;
  border: 2px solid #324269;
  background: #1d2740;
  display: block;
  overflow: hidden;
  flex: 0 0 36px;
}

.chip.creator {
  border-color: #6c89df;
  box-shadow: 0 0 0 2px rgba(70, 99, 186, 0.28);
}

.chip img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.empty {
  padding: 24px 0;
  text-align: center;
  color: var(--text-dim);
  font-size: 13px;
}

.history-row {
  border: 1px solid var(--panel-border);
  border-radius: 10px;
  background: #111826;
  padding: 12px 14px;
}

.history-main {
  font-size: 14px;
  font-weight: 500;
}

.spacer {
  height: 14px;
}

@media (max-width: 760px) {
  .screen {
    padding: 14px;
  }

  .landing-wrap {
    padding: 18px 14px 14px;
    border-radius: 16px;
  }

  .title {
    margin-top: 10px;
    font-size: clamp(30px, 9vw, 44px);
  }

  .profile-grid {
    max-width: 100%;
    gap: 10px;
    justify-content: flex-start;
    padding-bottom: 2px;
  }

  .profile-card {
    flex: 0 0 min(44vw, 180px);
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .row.mobile-stack {
    flex-direction: column;
    align-items: stretch;
  }
}
`;

function ProfileCard({ user, onClick }) {
  return (
    <button
      className="profile-card fade-in"
      onClick={onClick}
      type="button"
      style={{ backgroundImage: `url(${user.photo})` }}
      aria-label={`Open ${user.name}`}
    >
      <div className="profile-content">
        <div className="profile-name">{user.name}</div>
        <span className="profile-hint mono">enter</span>
      </div>
    </button>
  );
}

function LoginPage({ user, onBack, onLogin }) {
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = () => {
    if (password === user.password) {
      onLogin(user);
      return;
    }
    setShowError(true);
    setTimeout(() => setShowError(false), 1800);
  };

  return (
    <div className="screen center-screen">
      <div className="login-shell card fade-in">
        <div className="row" style={{ marginBottom: 16 }}>
          <button className="btn btn-ghost mono" onClick={onBack} type="button">
            back
          </button>
          <span className="mono muted">authenticate</span>
        </div>

        <div className="login-header">
          <p className="kicker mono">member</p>
          <h2 style={{ margin: 0 }}>{user.name}</h2>
        </div>

        <div className="stack">
          <input
            ref={inputRef}
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? submit() : null)}
            className={`field ${showError ? "error" : ""}`}
          />
          <button className="btn btn-primary" onClick={submit} type="button">
            enter
          </button>
        </div>

        {showError && <div className="error-text mono">wrong password</div>}
      </div>
    </div>
  );
}

function NameTag({ user, isCreator }) {
  return (
    <span
      className={`chip ${isCreator ? "creator" : ""}`}
      title={user.name}
      aria-label={user.name}
    >
      <img src={user.photo} alt={user.name} />
    </span>
  );
}

function ScheduledMatchCard({ match, currentUser, onJoin }) {
  const joined = match.players.includes(currentUser.id);
  const date = new Date(match.datetime);
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="match-card fade-in">
      <div className="row mobile-stack">
        <div>
          <p className="match-date mono">{dateStr}</p>
          <p className="match-time">{timeStr}</p>
          {match.location ? <p className="muted mono">{match.location}</p> : null}
        </div>
        {!joined ? (
          <button className="btn btn-soft mono" onClick={() => onJoin(match.id)} type="button">
            join
          </button>
        ) : (
          <span className="muted mono">joined</span>
        )}
      </div>
      <div className="chips">
        {match.players.map((playerId) => {
          const player = USERS.find((u) => u.id === playerId);
          return player ? (
            <NameTag key={player.id} user={player} isCreator={playerId === match.createdBy} />
          ) : null;
        })}
      </div>
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  const [matches, setMatches] = useState(() => loadData(STORAGE_KEY_MATCHES, []));
  const [showCreate, setShowCreate] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    saveData(STORAGE_KEY_MATCHES, matches);
  }, [matches]);

  const createMatch = () => {
    if (!newDate || !newTime) return;
    const match = {
      id: Date.now().toString(),
      datetime: `${newDate}T${newTime}`,
      location: newLocation || null,
      createdBy: user.id,
      players: [user.id],
    };
    setMatches((prev) => [match, ...prev]);
    setNewDate("");
    setNewTime("");
    setNewLocation("");
    setShowCreate(false);
  };

  const joinMatch = (id) => {
    setMatches((prev) =>
      prev.map((match) => {
        if (match.id !== id || match.players.includes(user.id)) return match;
        return { ...match, players: [...match.players, user.id] };
      })
    );
  };

  const upcoming = matches
    .filter((match) => new Date(match.datetime) >= new Date())
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  const endedMatches = matches
    .filter((match) => new Date(match.datetime) < new Date())
    .sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  return (
    <div className="screen">
      <div className="dashboard-shell fade-in">
        <header className="topbar card">
          <div className="brand mono">
            <span className="dot" />
            <span>PenisPongi</span>
          </div>
          <div className="row">
            <span className="muted">{user.name}</span>
            <button className="btn btn-ghost mono" onClick={onLogout} type="button">
              exit
            </button>
          </div>
        </header>

        <section className="panel card">
          <div className="row">
            <h3 className="section-title mono">Scheduled</h3>
            <button className="btn btn-soft mono" onClick={() => setShowCreate((v) => !v)} type="button">
              {showCreate ? "cancel" : "+ new match"}
            </button>
          </div>

          {showCreate ? (
            <div className="stack" style={{ marginTop: 12 }}>
              <div className="form-grid">
                <input
                  className="field mono"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
                <input
                  className="field mono"
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />
              </div>
              <input
                className="field mono"
                type="text"
                placeholder="location (optional)"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
              <button className="btn btn-primary mono" onClick={createMatch} type="button">
                schedule
              </button>
            </div>
          ) : null}

          <div className="match-list">
            {upcoming.length === 0 ? (
              <div className="empty mono">no matches scheduled</div>
            ) : (
              upcoming.map((match) => (
                <ScheduledMatchCard
                  key={match.id}
                  match={match}
                  currentUser={user}
                  onJoin={joinMatch}
                />
              ))
            )}
          </div>
        </section>

        <div className="spacer" />

        <section className="panel card">
          <div className="row">
            <h3 className="section-title mono">History</h3>
            <span className="muted mono">ended matches</span>
          </div>

          <div className="match-list">
            {endedMatches.length === 0 ? (
              <div className="empty mono">no ended matches yet</div>
            ) : (
              endedMatches.map((match) => {
                const players = match.players
                  .map((id) => USERS.find((u) => u.id === id)?.name)
                  .filter(Boolean);
                const playedAt = new Date(match.datetime);
                return (
                  <div className="history-row fade-in" key={match.id}>
                    <div className="row mobile-stack">
                      <div className="history-main">{players.join(" vs ") || "No players"}</div>
                      <div className="muted mono">
                        {playedAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}{" "}
                        {playedAt.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    {match.location ? <div className="muted mono">{match.location}</div> : null}
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(() => {
    const session = loadData(STORAGE_KEY_SESSION, null);
    const user = USERS.find((u) => u.id === session?.userId);
    return user ? "dashboard" : "landing";
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const session = loadData(STORAGE_KEY_SESSION, null);
    return USERS.find((u) => u.id === session?.userId) || null;
  });

  useEffect(() => {
    if (loggedInUser) {
      saveData(STORAGE_KEY_SESSION, { userId: loggedInUser.id });
      return;
    }
    saveData(STORAGE_KEY_SESSION, null);
  }, [loggedInUser]);

  return (
    <>
      <style>{APP_CSS}</style>

      {page === "landing" ? (
        <div className="screen center-screen landing-screen">
          <div className="landing-background" aria-hidden="true">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1.8}
              lightSpread={1}
              rayLength={3}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              className="custom-rays"
              pulsating={false}
              fadeDistance={1}
              saturation={1}
            />
          </div>
          <div className="landing-shade" aria-hidden="true" />
          <div className="landing-wrap fade-in">
            <p className="kicker mono">PenisPongi</p>
            <h1 className="title">რომელი ხარ?</h1>

            <div className="profile-grid">
              {USERS.map((user) => (
                <ProfileCard
                  key={user.id}
                  user={user}
                  onClick={() => {
                    setSelectedUser(user);
                    setPage("login");
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {page === "login" && selectedUser ? (
        <LoginPage
          user={selectedUser}
          onBack={() => {
            setSelectedUser(null);
            setPage("landing");
          }}
          onLogin={(user) => {
            setLoggedInUser(user);
            setPage("dashboard");
          }}
        />
      ) : null}

      {page === "dashboard" && loggedInUser ? (
        <Dashboard
          user={loggedInUser}
          onLogout={() => {
            setLoggedInUser(null);
            setSelectedUser(null);
            setPage("landing");
          }}
        />
      ) : null}
    </>
  );
}
