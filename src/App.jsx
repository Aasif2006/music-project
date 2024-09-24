import React, { useEffect, useState } from 'react';
import './App.css'; // Import the updated CSS file
import Loding from './Loding';

function App() {
  const [state, setState] = useState([]);
  const [query, setQuery] = useState("daku"); // Default search term
  const [loading, setLoading] = useState(false);

  // API URL with dynamic search query and limit set to 20
  const Api = `https://v1.nocodeapi.com/ashif9660/spotify/LrMWqBbKbgHMopiq/search?q=${query}&type=track&limit=20`;

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(Api);
      const data = await res.json();
      console.log(data.tracks.items);
      setState(data.tracks.items);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever the query changes
  useEffect(() => {
    getData();
  }, [query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      {/* Search bar */}
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search for a track..."
          value={query}
          onChange={handleSearch}
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading indicator */}
      {loading ? (
        <Loding/>
      ) : (
        <div className="track-container">
          {state.map((track) => (
            <div key={track.id} className="track-card">
              <img src={track.album.images[0].url} alt={track.name} />
              <p>{track.name}</p>
              <audio src={track.preview_url} controls></audio>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
