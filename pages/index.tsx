import fs from "fs";
import path from "path";

import { GetStaticProps } from "next";

import Head from "next/head";
import Main from "../components/Main";
import Section from "../components/Section";

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
    <div className="pattern flex flex-col justify-center items-center min-h-screen h-full bg-zinc-100 dark:bg-dark-blurple p-8 md:p-12 lg:p-14 transition-colors duration-300">
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="My Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main songs={props?.songs} />

      <Section title={"Who Am I"}>
        <p>Test</p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Section>

      <Section title={"Skills"}>
        <p>Sussy</p>
        <br />
        <p>
          Voluptate labore laboris pariatur sunt ex nulla voluptate id cillum.
          Proident laborum ex exercitation aliqua sunt deserunt proident labore
          ut. Do voluptate anim sint adipisicing aliqua labore aliquip.
        </p>
        <br />
        <p>
          Ut amet ad commodo aliqua in enim. Aliquip in sunt adipisicing magna
          laborum nostrud laborum officia ea deserunt est et. Culpa enim magna
          dolor aute officia ut est culpa qui pariatur consequat nulla
          consequat.
        </p>
      </Section>

      <Section title={"Projects"}>
        <p>Oh, Hi my name is Jeniffer</p>
        <br />
        <p>
          Voluptate est consectetur deserunt cillum. Minim nostrud reprehenderit
          voluptate sit tempor qui. Non labore eiusmod sunt pariatur anim cillum
          ipsum veniam esse. Lorem id dolore in enim esse veniam qui sint irure
          elit sint.
        </p>
        <br />
        <p>
          Sit exercitation nisi quis dolor deserunt reprehenderit. Fugiat duis
          proident commodo aute veniam. Eiusmod est quis sunt ex proident cillum
          consectetur sunt minim. Non qui elit velit est velit in exercitation.
          Do Lorem in minim laboris amet. Reprehenderit do velit ut Lorem nulla
          in non officia quis veniam. Consectetur sint excepteur minim in dolore
          laborum. Amet veniam cupidatat amet do in eu nulla ut. Consequat
          nostrud consectetur ullamco exercitation.
        </p>
      </Section>

      <Section title={"Contact"}>
        <p>O.o o.o o.O</p>
        <br />
        <p>
          Aliquip adipisicing consequat aliquip anim irure nostrud veniam ipsum
          tempor. Ipsum sunt amet officia officia id id sunt aliqua exercitation
          laborum ad cupidatat sit eiusmod.
        </p>
        <br />
        <button className="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 transitions-all duration-100 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white">
          Click Me!
        </button>
      </Section>

      <div className="mt-32"></div>

      <footer className="text-center mt-16 font-mono text-zinc-500">
        &copy; zF4ke {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Home;
