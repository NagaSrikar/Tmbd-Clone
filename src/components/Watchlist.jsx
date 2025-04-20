import React, { useEffect, useState, useContext } from 'react';
import genreid from '../utilities/genre';
import { MovieContext } from './Moviecontext';

function Watchlist() {
  const { watchlist, HandleWatchlist } = useContext(MovieContext);
  const [search, setsearch] = useState("");
  const [genrelist, setgenrelist] = useState([]);
  const [currgenre, setcurrgenre] = useState("All genres");

  useEffect(() => {
    if (!watchlist || watchlist.length === 0) {
      setgenrelist(["All genres"]);
      return;
    }

    let temp = watchlist.map((movieObj) => genreid[movieObj.genre_ids[0]]);
    temp = new Set(temp);
    setgenrelist(["All genres", ...temp]);
  }, [watchlist]);

  const HandleGenre = (genre) => {
    setcurrgenre(genre);
  };

  const HandleSearch = (e) => {
    setsearch(e.target.value);
  };

  return (
    <>
      {/* Genre Filter Section */}
      <div className='flex justify-center my-4'>
        {genrelist.map((genre) => (
          <div
            key={genre}
            onClick={() => HandleGenre(genre)}
            className={`${
              currgenre === genre
                ? 'bg-orange-500 text-black shadow-xl scale-105'
                : 'bg-gray-400/50 text-white'
            } rounded-lg py-3 px-6 mx-4 cursor-pointer font-semibold text-lg transition duration-300 transform hover:scale-105`}
          >
            {genre}
          </div>
        ))}
      </div>

      {/* Search Bar Section */}
      <div className='flex justify-center w-full my-4'>
        <input
          type="text"
          placeholder='Search Movies'
          className='bg-gray-700 text-white w-[18rem] h-[3rem] p-3 rounded-lg outline-none border border-gray-600 focus:border-orange-500 transition-all duration-300'
          value={search}
          onChange={HandleSearch}
        />
      </div>

      {/* Watchlist Table Section */}
      <div className='m-8 w-full overflow-x-auto'>
        <table className='w-full table-auto border-collapse'>
          <thead className='bg-gray-700 text-white'>
            <tr>
              <th className='px-6 py-3 text-left'>Name</th>
              <th className='px-6 py-3 text-center'>Ratings</th>
              <th className='px-6 py-3 text-center'>Popularity</th>
              <th className='px-6 py-3 text-center'>Genre</th>
              <th className='px-6 py-3 text-center'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {watchlist &&
              watchlist
                .filter((movieObj) =>
                  currgenre === 'All genres'
                    ? true
                    : genreid[movieObj.genre_ids[0]] === currgenre
                )
                .filter((movieObj) =>
                  movieObj.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((movieObj) => (
                  <tr key={movieObj.id} className='hover:bg-gray-800 border-b border-gray-600 hover:text-white'>
                    <td className='flex items-center px-6 py-4'>
                      <img
                        className="h-[4rem] w-[7rem] object-cover rounded-md"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                        alt={movieObj.title}
                      />
                      <span className='ml-4'>{movieObj.title}</span>
                    </td>
                    <td className='px-6 py-4 text-center'>{movieObj.vote_average}</td>
                    <td className='px-6 py-4 text-center'>{movieObj.popularity}</td>
                    <td className='px-6 py-4 text-center'>{genreid[movieObj.genre_ids[0]]}</td>
                    <td
                      className='px-6 py-4 text-center text-red-500 cursor-pointer hover:text-red-300 transition duration-300'
                      onClick={() => HandleWatchlist(movieObj)}
                    >
                      <span className='font-semibold'>Delete</span>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
