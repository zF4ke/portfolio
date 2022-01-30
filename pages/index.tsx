import fs from "fs";
import path from "path";

import { GetStaticProps } from "next";

import Head from "next/head";
import Main from "../components/Main";

export const getStaticProps: GetStaticProps = async () => {
  const songsDirectory = path.join(process.cwd(), "public/musics");
  const songs = fs.readdirSync(songsDirectory);

  return {
    props: {
      songs,
    },
  };
};

type props = {
  songs: Array<String>;
};

const Home = (props: props) => {
  return (
    <div className="pattern flex justify-center min-h-screen h-full bg-zinc-100 dark:bg-dark-blurple p-8 md:p-12 lg:p-14 transition-colors duration-300">
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="My Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Main songs={props?.songs} />

        <footer className="text-center mt-16 font-mono text-zinc-500">
          &copy; zF4ke {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default Home;
