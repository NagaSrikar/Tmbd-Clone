import React, { useState, useEffect } from "react";

export const MovieContext = React.createContext();

export const MovieProvider = ({ children }) => {
  // Initialize watchlist from localStorage
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem('movieWatchlist');
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Add/remove movies from watchlist
  const HandleWatchlist = (movieObj) => {
    const movieExists = watchlist.some(item => item.id === movieObj.id);
    
    if (!movieExists) {
      setWatchlist([...watchlist, movieObj]);
    } else {
      setWatchlist(watchlist.filter(item => item.id !== movieObj.id));
    }
  };

  return (
    <MovieContext.Provider value={{ watchlist, HandleWatchlist }}>
      {children}
    </MovieContext.Provider>
  );
};