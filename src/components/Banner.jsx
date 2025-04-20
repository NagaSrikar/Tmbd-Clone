import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const API_KEY = '991459dc4341e15e78bf990f0bdfc845';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';

function Banner() {
  const [movies, setMovies] = useState([]);

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 15, // Adds space between slides
    },
  });

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        setMovies(data.results.slice(0, 1)); // just the first movie for banner
      } catch (err) {
        console.error('TMDB fetch error:', err);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="relative w-full">
      <div ref={sliderRef} className="keen-slider h-[80vh] md:h-[85vh]">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="keen-slider__slide relative bg-cover bg-center transition-all duration-500"
            style={{
              backgroundImage: `url(${BASE_IMG_URL}${movie.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-12 lg:px-20 text-white">
              <h2 className="text-4xl  font-extrabold mb-4 drop-shadow-lg  sm:text-3xl">
                {movie.title}
              </h2>
              <p className="text-lg sm:text-xl mb-6 text-gray-200 line-clamp-3 md:max-w-2xl drop-shadow-md">
                {movie.overview}
              </p>
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-lg font-semibold rounded-xl shadow-md">
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
