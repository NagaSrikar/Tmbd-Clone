import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import MovieRecomendation from "./components/MovieRecomendation";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./components/Moviecontext"; // use the provider wrapper

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-10 flex flex-wrap">
                <Banner />
                <Movies />
              </div>
            }
          />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/recommend" element={<MovieRecomendation />} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
