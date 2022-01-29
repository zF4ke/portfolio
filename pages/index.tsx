import type { NextPage } from "next";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.scss";

import { MoonIcon, SunIcon } from "@heroicons/react/solid";

import Emoji from "../components/Emoji";
import Box from "../components/Box";
import SkillsBox from "../components/SkillsBox";
import Player from "../components/Player";

const Home: NextPage = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const age = 17;

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
    <div className="pattern flex justify-center h-screen bg-zinc-100 dark:bg-dark-blurple p-8 md:p-12 lg:p-14 transition-colors duration-300">
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="My Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <main className="relative max-w-lg space-y-8 md:max-w-[40rem] md:space-y-12 lg:max-w-3xl lg:space-y-16 ">
          <div className="fixed top-25 right-0 absolute">
            {renderThemeChanger()}
          </div>

          <header className="space-y-5 lg:space-y-10 text-center">
            <h1 className="text-base md:text-xl lg:text-2xl ">
              Hey there! <Emoji symbol="👋" />
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
              , a {age} y&apos;o Student and Full Stack Developer{" "}
              <Emoji symbol="👨‍💻" />
            </h2>
          </header>

          <div className="space-y-5 md:space-y-7 lg:space-y-8">
            <div className="flex flex-col justify-center items-center space-y-5 sm:space-y-0 sm:flex-row sm:space-x-5 md:space-x-7 lg:space-x-8">
              <Box name="Who Am I" description="A couple things about me." />
              <Box
                name="Projects"
                description="All my github public repositories and more."
              />
              <Box name="Contact" description="Get in touch with me!" />
            </div>

            <div className="flex justify-center">
              <SkillsBox />
            </div>
          </div>

          <div className="flex justify-center">
            <Player />
          </div>
        </main>
        <footer className="text-center mt-16 font-mono text-zinc-500">
          &copy; zF4ke {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default Home;
