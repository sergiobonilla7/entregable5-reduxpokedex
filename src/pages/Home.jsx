import { setTrainerName } from "../store/slices/trainerName.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerName(e.target.trainerName.value));
    navigate("/pokedex");
  };

  return (
    <main className="relative h-screen max-w-[1440px] grid grid-rows-[1fr_auto]">

      <section className="h-full flex flex-col justify-center items-center gap-8">
        <div>
          <img
            className="sm:w-[500px] w-[300px]"
            src="/images/logopokedex.png"
            alt=""
          />
        </div>
        <div>
          <h3 className="text-[#FE1936] text-[2.5rem] font-bold text-center">
            ¡Hi Coach!
          </h3>
          <p className="text-center font-semibold text-gray-700">
            {" "}
            To start give me your name.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex shadow-lg">
          <input
            className="bg-white border w-56 sm:w-80 px-4"
            name="trainerName"
            type="text"
            placeholder="Your name..."
          />
          <button className="bg-[#D93F3F] shadow-lg px-8 py-2 text-white text-lg">
            Start!
          </button>
        </form>
      </section>
      <div className="flex justify-center">
        <img
          className="w-[74px] absolute bottom-0 z-10"
          src="./images/pokeball.png"
          alt=""
        />
      </div>
      <footer className="">
        <div className="bg-[#DD1A1A] h-14"></div>
        <div className="bg-[#0C0C0C] h-10"></div>
      </footer>
    </main>
  );
};

export default Home;
