import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moviescard from './Moviescard';
import Pagination from './Pagination';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);

  const HandleNextFn = () => setPages(pages + 1);
  const HandlePrevFn = () => {
    if (pages > 1) setPages(pages - 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=991459dc4341e15e78bf990f0bdfc845&language=en-US&page=${pages}`
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error('API fetch error:', error.message);
      });
  }, [pages]);

  return (
    <>
      <h1 className="text-4xl font-extrabold text-center text-orange-500  drop-shadow-lg flex justify-center w-full mt-2">
        Trending Movies
      </h1>
      <div className="px-4 py-6 bg-gradient-to-b from-gray-950 via-gray-900 to-black min-h-screen w-full">
        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {movies.map((movieObj) => (
            <Moviescard key={movieObj.id} movieObject={movieObj} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <Pagination pageNumber={pages} NextFn={HandleNextFn} PrevFn={HandlePrevFn} />
        </div>
      </div>
    </>
  );
}

export default Movies;
