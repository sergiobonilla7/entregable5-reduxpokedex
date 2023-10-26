import { IconSquareRoundedXFilled } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ModalMoves = ({ isShowModal, handleClosedModal, }) => {

    const [pokemon, setPokemon] = useState(null)
    const { pokemonId } = useParams();
    useEffect(() => {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
          .then(({ data }) => setPokemon(data))
          .catch((err) => console.log(err));
      }, []);

  return (
    <section
      className={`fixed top-0 bottom-0 left-0 right-0 bg-black/70 dark:bg-black/80
      flex justify-center items-center px-3 transition-all
      duration-200  ${
        isShowModal ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <article
        className="drop-shadow-2xl dark:bg-gray-400 bg-white p-4 rounded-md grid gap-3 
        w-[300px] sm:w-[650px] h-[700px] overflow-y-scroll 
        relative"
      >
        <button
          onClick={handleClosedModal}
          type="button"
          className="text-red-500 hover:text-red-700 dark:text-red-600 dark:hover:text-red-800 transition-colors 
        absolute top-2 right-2"
        >
          <IconSquareRoundedXFilled />
        </button>
        <h2 className="text-[1.8rem] font-semiboldaaaa">Moves</h2>
        <div className=" py-4 grid grid-cols-[repeat(auto-fit,_150px)] gap-4 place-content-center">
          {pokemon?.moves.map((move) => (
            <div
              key={move.move.name}
              className=" flex justify-center items-center  dark:bg-gray-500 bg-gray-300 rounded-md w-full h-[2rem]"
            >
              <span className="font-semibold text-[#302F2F] dark:text-white ">
                {move.move.name}
              </span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
export default ModalMoves