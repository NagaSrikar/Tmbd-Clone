import React, { useContext } from 'react';
import { MovieContext } from './Moviecontext';

function Moviescard({ movieObject }) {
  let { HandleWatchlist, watchlist } = useContext(MovieContext);

  // Check if the movie is already in the watchlist
  function MovieContain() {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id === movieObject.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="space-x-10 space-y-10">
      <div
        className="relative h-[40vh] w-[200px] bg-cover rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieObject.poster_path})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Watchlist Icon */}
        <div
          className={`absolute top-3 right-3 p-2 rounded-full ${
            MovieContain() ? 'bg-red-600' : 'bg-orange-500'
          } hover:bg-opacity-80 cursor-pointer`}
          onClick={() => HandleWatchlist(movieObject)}
        >
          {MovieContain() ? (
            <span className="text-white text-xl">&#10060;</span>
          ) : (
            <span className="text-white text-xl">&#128525;</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Moviescard;
