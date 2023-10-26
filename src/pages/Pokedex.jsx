import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonList from "../components/pokedex/PokemonList";
import HeaderPokeball from "../components/layouts/HeaderPokeball";
import { paginateData } from "../utils/paginations";
import Pagination from "../components/layouts/Pagination";

const Pokedex = () => {
  //? Aqui estan todos nuestros pokemons
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }
    return "light"
  })
useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme])
const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
  }

  const trainerName = useSelector((store) => store.trainerName);

  
  const pokemonsByName = pokemons.filter((pokemon) =>
  pokemon.name.includes(pokemonName)
  );

  const { itemsInCurrentPage, lastPage, pagesInCurrentBlock } = paginateData(pokemonsByName, currentPage)

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim());
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  }

  const handlePreviusPage = () => {
    const newCurrentPage = currentPage - 1
    if(newCurrentPage >= 1) setCurrentPage(newCurrentPage)
  }

  const handleNextPage = () => {
    const newCurrentPage = currentPage +1
    if(newCurrentPage <= lastPage) setCurrentPage(newCurrentPage)
  }

  //? Trea todos los pokemons

  useEffect(() => {
    if(currentType === ""){
      axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
      .then(({ data }) => setPokemons(data.results))
      .catch((err) => console.log(err));
    }
  }, [currentType]);

  //? trae todos los types disponibles para los pokemons

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, []);

  //? trae todos los pokemons con base a un tipo

  useEffect(() => {
    if (currentType !== ""){
      axios
      .get(`https://pokeapi.co/api/v2/type/${currentType}/`)
      .then(({data}) => {
      setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon))
      })
      .catch((err) => console.log(err))
    }
  }, [currentType])

  useEffect(() => {
    setCurrentPage(1)
  }, [currentType])
  

  return (
    <main className="relative pb-10 duration-500">
      <HeaderPokeball handleChangeTheme={handleChangeTheme} theme={theme}/>
      <section>
        <p className="text-lg duration-500 dark:text-white text-center pt-8">
          <span className="text-[#FE1936] dark:text-[#f43c53] duration-500">Welcome {trainerName}, </span>
           here you can find your favorite pokemon.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-6 justify-center py-10">
          <div className="flex">
            <input name="pokemonName" type="text" className="outline-none bg-white duration-500 dark:bg-gray-500 dark:text-white shadow-lg w-[10rem] md:w-[19rem] px-4"/>
            <button className="bg-[#D93F3F] duration-500 transition-colors hover:bg-red-700 dark:bg-[#b52e2e] dark:hover:bg-red-800 shadow-lg px-8 py-2 text-white text-lg">Search</button>
          </div>

          <select onChange={handleChangeType} className="duration-500 capitalize dark:bg-gray-500 dark:text-white bg-white h-[2.8rem] shadow-lg border w-[10rem] md:w-[19rem] px-4">
            <option value="">All pokemons</option>
            {types.map((type) => (
              <option value={type.name} key={type.url}>
                {type.name}
              </option>
            ))}
          </select>
        </form>
      </section>

      <Pagination
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePreviusPage={handlePreviusPage}
        pagesInCurrentBlock={pagesInCurrentBlock}
        setCurrentPage={setCurrentPage}
        lastPage={lastPage}
      />

      <PokemonList pokemons={itemsInCurrentPage} />

      <Pagination
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePreviusPage={handlePreviusPage}
        pagesInCurrentBlock={pagesInCurrentBlock}
        setCurrentPage={setCurrentPage}
        lastPage={lastPage}
      />

    </main>
  );
};

export default Pokedex;
