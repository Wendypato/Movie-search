import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  //funcion para cuando se hace click en bsucar
  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError('');
    setMovies([]);

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
      const data = await res.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error || 'No se encontraron resultados');
      }
    } catch (err) {
      //por si hay un error de red o conexion
      setError('Error al conectar con la API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className = "app-container">
      <h1 className = "header">Movie Search</h1>

      <div className = "search-section">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className = "input"
        />
        <button
          onClick={handleSearch}
          className = "btn"
        >
          Buscar
        </button>
      </div>


      <div className = "movie">
        {movies.map((movie) => (
          <div key={movie.imdbID} className = "movie-card" >
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'} alt={movie.Title} className = "movie-img"/>
            <h3 className = "header3">{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

