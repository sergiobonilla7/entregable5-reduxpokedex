import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bgByType, borderByType, textByType } from "../../constants/pokemon";

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);

  const types = pokemon?.types.map((type) => type.type.name).join(" / ");

  const firstType = pokemon?.types[0].type.name

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((error) => console.log(error));
  }, []);
  

  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className={`capitalize border-8 ${borderByType[firstType]} w-[300px] grid place-items-center  rounded-lg overflow-hidden bg-white dark:bg-gray-400`}
    >
      <header className={`h-[150px] ${bgByType[firstType]} w-full`}></header>
      <div className="relative pt-10 pb-5 ">
        <div className="  grid gap-1 pb-3 place-items-center">
          <div className="absolute w-full top-0 -translate-y-[75%]">
            <img
              className="w-[160px] mx-auto"
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </div>
          <h3 className={`${textByType[firstType]} text-3xl font-semibold`}>
            {pokemon?.name}
          </h3>
          <span className="text-[#4F4F4F] dark:text-white">{types}</span>
          <h5 className="text-[#9F9F9F] dark:text-white text-[.7rem]">type</h5>
        </div>
        <hr />
        <ul className="grid grid-cols-2  gap-x-8 gap-y-6 pt-6">
          {pokemon?.stats.slice(0, 4).map((stat) => (
            <li key={stat.stat.name} className="">
              <h6 className="text-[#9F9F9F] dark:text-white text-[.7rem] text-center uppercase">
                {stat.stat.name}
              </h6>
              <span
                className={`${textByType[firstType]} flex justify-center text-[1.3rem]`}
              >
                {stat.base_stat}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};
export default PokemonCard;
