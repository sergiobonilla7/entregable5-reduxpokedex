import { IconMoon, IconSun } from "@tabler/icons-react";

const HeaderPokeball = ({handleChangeTheme, theme}) => {
  return (
    <header className="">
      <img
        className="w-[54px] md:w-[64px] absolute top-[4.2rem] right-0 -translate-x-4 md:-translate-x-3/4 -translate-y-1/2"
        src="./images/pokeball.png"
        alt=""
      />
      <button
        className="absolute right-0 -translate-x-[1.85rem] translate-y-[.5rem] md:right-0 md:-translate-x-[1rem] md:translate-y-[.8rem]"
        onClick={handleChangeTheme}
      >
        {theme === "light" ? (
          <IconMoon size={28} />
        ) : (
          <IconSun color="white" size={28} />
        )}
      </button>

      <div className="bg-[#DD1A1A] h-16">
        <div className="h-full pl-2 md:pl-12 ">
          <img
            className=" h-[35px] md:h-full  md:w-auto translate-y-9 md:translate-y-4"
            src="/images/logopokedex.png"
            alt=""
          />
        </div>
      </div>
      <div className="bg-[#0C0C0C] h-10"></div>
    </header>
  );
}
export default HeaderPokeball