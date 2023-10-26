import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import PrivateRoutes from "./components/PrivateRoutes";
import Pokedex from "./pages/Pokedex";


function App() {
  return (
    <div className="font-['Lato'] h-screen">
      <div className="min-h-screen fontt px-2 fixed min-w-full duration-500 dark:brightness-[.30]"></div>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:pokemonId" element={<PokemonDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
