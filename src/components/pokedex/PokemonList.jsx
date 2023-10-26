import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons }) => {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,_300px)] duration-500 place-items-center justify-center
    mx-auto gap-8 px-4 max-w-[1200px] pt-8 pb-14">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
      ))}
    </section>
  );
};

export default PokemonList;
