import fs from "fs";
import path from "path";

import { GetStaticProps } from "next";
import Head from "next/head";
import { useRef } from "react";

import Main from "../components/Main";
import Section from "../components/Section";
import Emoji from "../components/Emoji";

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
  const whoAmISectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  return (
    <div className="pattern flex flex-col justify-center items-center min-h-screen h-full bg-zinc-100 dark:bg-dark-blurple p-8 md:p-12 lg:p-14 transition-colors duration-300">
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="My Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main
        songs={props?.songs}
        whoAmISectionRef={whoAmISectionRef}
        projectsSectionRef={projectsSectionRef}
        contactSectionRef={contactSectionRef}
      />

      <Section title={"Who Am I"}>
        <div ref={whoAmISectionRef}>
          <p>zf4ke@archlinux</p>
          <br />
          <p>
            Hey! My name is <strong>Pedro Silva</strong>, I&apos;m 17 years old,
            I&apos;m Portuguese <Emoji symbol="🇵🇹" /> and I&apos;m currently in
            my last year of high school. I started coding since I was 11 years
            old and I&apos;m particularly interested in Web Development and
            Cyber Security.
          </p>
          <br />
          <p>
            When I&apos;m not coding in my bedroom I&apos;m probably listening
            to music, watching a movie or just sleeping :)
          </p>
        </div>
      </Section>

      <Section title={"Skills"}>
        <div>
          <p>[...in progress]</p>
          <br />
          <p>
            Voluptate labore laboris pariatur sunt ex nulla voluptate id cillum.
            Proident laborum ex exercitation aliqua sunt deserunt proident
            labore ut. Do voluptate anim sint adipisicing aliqua labore aliquip.
          </p>
          <br />
          <p>
            Ut amet ad commodo aliqua in enim. Aliquip in sunt adipisicing magna
            laborum nostrud laborum officia ea deserunt est et. Culpa enim magna
            dolor aute officia ut est culpa qui pariatur consequat nulla
            consequat.
          </p>
        </div>
      </Section>

      <Section title={"Projects"}>
        <div ref={projectsSectionRef}>
          <p>{"{ github.com/zf4ke }"}</p>
          <br />
          <p>
            In progress... voluptate est consectetur deserunt cillum. Minim
            nostrud reprehenderit voluptate sit tempor qui. Non labore eiusmod
            sunt pariatur anim cillum ipsum veniam esse. Lorem id dolore in enim
            esse veniam qui sint irure elit sint.
          </p>
          <br />
          <p>
            Sit exercitation nisi quis dolor deserunt reprehenderit. Fugiat duis
            proident commodo aute veniam. Eiusmod est quis sunt ex proident
            cillum consectetur sunt minim. Non qui elit velit est velit in
            exercitation. Do Lorem in minim laboris amet. Reprehenderit do velit
            ut Lorem nulla in non officia quis veniam. Consectetur sint
            excepteur minim in dolore laborum. Amet veniam cupidatat amet do in
            eu nulla ut. Consequat nostrud consectetur ullamco exercitation.
          </p>
        </div>
      </Section>

      <Section title={"Contact"}>
        <div ref={contactSectionRef}>
          <p>O.o ~ o.o ~ o.O</p>
          <br />
          <ul>
            <li>github: @zf4ke</li>
            <li>youtube: zFake</li>
            <li>linkedin: @zf4ke</li>
            <li>discord: zF4ke#8556</li>
            <li>twitter: @zF4ked</li>
            <li>instagram: @zF4ked</li>
          </ul>
          <p>...</p>
          <br />
          <button className="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 transitions-all duration-100 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white">
            Click Me!
          </button>
        </div>
      </Section>

      <div className="mt-32"></div>

      <footer className="text-center mt-16 font-mono text-zinc-500">
        &copy; zF4ke {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Home;
