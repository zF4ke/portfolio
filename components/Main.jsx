import Emoji from "./Emoji";
import Box from "./Box";
import SkillsBox from "./SkillsBox";
import Player from "./Player";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import { MoonIcon, SunIcon } from "@heroicons/react/solid";

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const Main = (props) => {
  const age = getAge("2004/10/07").toString();

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []); // check if the pages is mounted

  const renderThemeChanger = () => {
    if (!mounted) return null; // dont load the icon if the page isnt mounted for better user experience

    const currentTheme = theme == "system" ? systemTheme : theme;

    if (currentTheme == "dark") {
      return (
        <SunIcon
          className="w-5 h-5 md:w-7 md:h-7"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-5 h-5 md:w-7 md:h-7"
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  return (
    <main className="relative max-w-lg space-y-8 md:max-w-[40rem] md:space-y-12 lg:max-w-3xl lg:space-y-16">
      <div className="fixed top-10 right-0 absolute">
        {renderThemeChanger()}
      </div>

      <header className="space-y-5 lg:space-y-10 text-center">
        <h1 className="text-base md:text-xl lg:text-2xl ">
          Hey there!{" "}
          <span className="animate-pulse">
            <Emoji symbol="👋" />
          </span>
        </h1>
        <h2 className="text-lg md:text-2xl lg:text-3xl font-mono">
          I&apos;m <strong>Pedro Silva</strong>,{" "}
          <a
            href="//github.com/zf4ke"
            className="text-purple link link-underline link-underline-purple"
            target="_blank"
            rel="noreferrer"
          >
            aka zF4ke
          </a>
          , an {age} y&apos;o Computer Science Student and AI Aspirant{" "}
          <Emoji symbol="👨‍💻" />
        </h2>
      </header>

      <div className="space-y-5 md:space-y-7 lg:space-y-8">
        <div className="flex flex-col justify-center items-center space-y-5 sm:space-y-0 sm:flex-row sm:space-x-5 md:space-x-7 lg:space-x-8">
          <Box
            name="Who Am I"
            description="A couple things about me."
            onClickRef={props.whoAmISectionRef}
          />
          <Box
            name="Projects"
            description="All my github public repositories and more."
            onClickRef={props.projectsSectionRef}
          />
          <Box
            name="Contact"
            description="Get in touch with me!"
            onClickRef={props.contactSectionRef}
          />
        </div>

        <div className="flex justify-center">
          <SkillsBox />
        </div>
      </div>

      <div className="flex justify-center">
        <Player songs={props?.songs} />
      </div>
    </main>
  );
};

export default Main;
