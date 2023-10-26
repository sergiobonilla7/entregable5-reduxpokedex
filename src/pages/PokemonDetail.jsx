import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderPokeball from "../components/layouts/HeaderPokeball";
import { bgByType, textByType, typeByType } from "../constants/pokemon";
import ModalMoves from "../components/pokedex/ModalMoves";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

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

  const { pokemonId } = useParams();

  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  const handleClosedModal = () => {
    setIsShowModal(false);
  };

  const getPercentStat = (statValue) => {
    const MAX_STAT_VALUE = 255;
    const percentStat = ((statValue * 100) / MAX_STAT_VALUE).toFixed(1);
    return `${percentStat}%`;
  };

  const firstType = pokemon?.types[0].type.name
  
  

 

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="relative text-center capitalize">
      <HeaderPokeball handleChangeTheme={handleChangeTheme} theme={theme} />
      <article className="rounded-md overflow-hidden max-w-[700px] relative mx-auto pt-[6rem] pb-[6rem] px-2">
        <header
          className={`rounded-t-md h-[130px] ${bgByType[firstType]} w-full`}
        ></header>
        <div className=" rounded-b-md bg-white dark:bg-[#8a8f98] pb-10">
          <div className="absolute w-full top-0 translate-y-[50%] md:translate-y-[10%]">
            <img
              className="w-[150px] md:w-[200px] mx-auto"
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </div>
          <div className="py-4">
            <h3
              className={`${textByType[firstType]} font-semibold text-[1.75rem]`}
            >
              #{pokemon?.id}
            </h3>
            <h2
              className={`${textByType[firstType]} font-semibold text-[2rem]`}
            >
              {pokemon?.name}
            </h2>
          </div>
          <div className="flex justify-center dark:text-white text-[#0F0F2D] gap-8">
            <div>
              <h5 className="text-[.8rem]">weight</h5>
              <span className="text-[20px] font-semibold">65</span>
            </div>
            <div>
              <h5 className="text-[.8rem]">height</h5>
              <span className="text-[20px] font-semibold">65</span>
            </div>
          </div>

          <div className="flex flex-col justify-center ">
            <div className="grid grid-cols-2 justify-center gap-2 px-8">
              <div>
                <h5 className="text-[21px] dark:text-white text-[#302F2F] pt-2 pb-4">
                  Type
                </h5>
              </div>
              <div className="">
                <h5 className="text-[21px] dark:text-white text-[#302F2F] pt-2 pb-4">
                  Abilities
                </h5>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pr-10 pl-11 justify-center place-items-center pb-8">
              {pokemon?.types.map((type) => (
                <div
                  key={type.type.name}
                  className={`${typeByType[firstType]} rounded-md w-full`}
                >
                  <span className={`font-semibold text-white`}>
                    {type.type.name}
                  </span>
                </div>
              ))}

              {pokemon?.abilities.map((ability) => (
                <div
                  key={ability.ability.name}
                  className="border-2 flex justify-center items-center dark:border-white border-gray-500 rounded-md w-[99%] h-[90%]"
                >
                  <span
                    className={` font-semibold dark:text-white text-[#302F2F]`}
                  >
                    {ability.ability.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <section className="px-10 dark:text-white text-[#302F2F] font-semibold">
            <h3 className="text-center text-[28px]">Stats</h3>
            <ul className="grip gap-8">
              {pokemon?.stats.map((stat) => (
                <li className="capitalize grid gap-1 pb-4" key={stat.stat.name}>
                  <div className="flex justify-between items-center">
                    <h5>{stat.stat.name}</h5>
                    <span>{stat.base_stat}/255</span>
                  </div>
                  {/* Total Bar */}
                  <div className="bg-slate-200 dark:bg-slate-500 rounded-md h-6 overflow-hidden">
                    {/* Bar Progress */}
                    <div
                      style={{ width: getPercentStat(stat.base_stat) }}
                      className={`${typeByType[firstType]} h-full`}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <div className="flex justify-end px-10 py-6">
            <button
              onClick={handleOpenModal}
              className={`${typeByType[firstType]} transition duration-200 hover:brightness-75 px-8 py-1 rounded-md text-white text-[1.1rem] font-semibold`}
            >
              Moves
            </button>
          </div>
        </div>
      </article>

      <ModalMoves
        isShowModal={isShowModal}
        handleClosedModal={handleClosedModal}
        pokemonId={pokemonId}
        setPokemon={setPokemon}
      />
    </main>
  );
};
export default PokemonDetail;
