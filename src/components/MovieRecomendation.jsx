import React, { useContext, useEffect, useState } from 'react';
import { MovieContext } from './Moviecontext.jsx';
import { getMovieRecommendations } from '../config/gemini.js';
import { Loader2 } from 'lucide-react';

const MovieRecomendations = () => {
  const { watchlist } = useContext(MovieContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (watchlist.length < 2) return;

      setLoading(true);
      setError(null);

      try {
        const result = await getMovieRecommendations(watchlist);
        if (result?.recommendations?.length > 0) {
          setRecommendations(result.recommendations);
        } else {
          throw new Error("No recommendations received");
        }
      } catch (err) {
        console.error('Error getting movie recommendations:', err);
        setError('Failed to get recommendations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (watchlist.length >= 2) {
      fetchRecommendations();
    }
  }, [watchlist]);

  if (watchlist.length < 2) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-xl mx-4 my-6 shadow-md">
        <p className="text-base font-medium">
          Add at least <span className="font-bold">2 movies</span> to your watchlist to get personalized recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto bg-gradient-to-b from-black via-gray-900 to-gray-950 rounded-lg shadow-xl mt-8">
      <h2 className="text-3xl font-extrabold text-orange-500 mb-6 text-center tracking-wide">
        🎬 AI Recommended Movies
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
          <span className="mt-4 text-white text-lg font-medium">Getting your personalized recommendations...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg text-center shadow-md">
          <p className="font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition duration-300"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((movie, index) => (
            <div 
              key={index}
              className="bg-gray-800 border border-gray-700 text-white rounded-xl p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <span className="bg-green-200 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full shadow">
                  {movie.confidence}% Match
                </span>
              </div>
              <p className="text-gray-300 text-sm mt-2">{movie.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieRecomendations;
