import React, { useEffect, useState } from "react";

export default function NewRobloxGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("https://games.roblox.com/v1/games/list?sortOrder=Desc&limit=20");
        const data = await res.json();
        setGames(data.data || []);
      } catch (error) {
        console.error("Erro ao buscar jogos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Jogos mais novos do Roblox</h1>
      <input
        placeholder="Buscar por nome..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, width: "100%", marginBottom: 20 }}
      />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        filteredGames.map(game => (
          <div key={game.id} style={{ marginBottom: 10 }}>
            <a href={`https://www.roblox.com/games/${game.id}`} target="_blank" rel="noopener noreferrer">
              {game.name}
            </a> (ID: {game.id})
          </div>
        ))
      )}
    </div>
  );
}
