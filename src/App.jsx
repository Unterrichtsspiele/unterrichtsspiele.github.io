import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [activeGame, setActiveGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('games.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching games manifest:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loader">Spiele werden geladen...</div>;
  }

  if (activeGame) {
    return (
      <div className="game-view">
        <header className="game-header">
          <button className="back-btn" onClick={() => setActiveGame(null)}>
            ← Zurück zum Launcher
          </button>
          <h2>{activeGame.title}</h2>
          <a href={activeGame.url} target="_blank" rel="noopener noreferrer" className="external-btn">
            In neuem Fenster öffnen ↗
          </a>
        </header>
        <div className="iframe-container">
          <iframe 
            src={activeGame.url} 
            title={activeGame.title}
            className="game-iframe"
          ></iframe>
        </div>
      </div>
    );
  }

  return (
    <div className="launcher">
      <header className="launcher-header">
        <div className="header-content">
          <h1>🚀 Lernspiele Launcher</h1>
          <p>Wähle ein Spiel aus und starte direkt im Browser!</p>
        </div>
      </header>

      <main className="games-grid">
        {games.length === 0 ? (
          <div className="no-games">
            <p>Es wurden keine Spiele gefunden.</p>
            <p>Bitte füge HTML-Dateien in den Ordner <code>public/games/</code> hinzu und baue die Seite neu.</p>
          </div>
        ) : (
          games.map((game) => (
            <div 
              key={game.id} 
              className="game-card"
            >
              <div className="game-card-inner">
                <div className="game-icon">🎮</div>
                <div className="game-info">
                  <h3>{game.title}</h3>
                </div>
                <div className="game-actions">
                  <button 
                    className="action-btn primary" 
                    onClick={() => setActiveGame(game)}
                  >
                    Öffnen
                  </button>
                  <a 
                    href={game.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="action-btn secondary"
                  >
                    Neues Fenster ↗
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App;
