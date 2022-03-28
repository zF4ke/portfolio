import fs from "fs";
import path from "path";

import { GetStaticProps } from "next";
import Head from "next/head";
import { useRef } from "react";

import Main from "../components/Main";
import Section from "../components/Section";
import Emoji from "../components/Emoji";
import SocialNetwork from "../components/SocialNetwork";
import Repo from "../components/Repo";

import { VscGithub, VscTwitter } from "react-icons/vsc";
import { ImYoutube } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";
import { RiInstagramLine } from "react-icons/ri";

export const getStaticProps: GetStaticProps = async () => {
  const songsDirectory = path.join(process.cwd(), "public/musics");
  const songs = fs.readdirSync(songsDirectory);

  const reposRes = await fetch("https://api.github.com/users/zf4ke/repos");
  const repos = await reposRes.json();

  repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

  return {
    props: {
      songs,
      repos,
    },
    revalidate: 3600,
  };
};

type props = {
  songs: Array<String>;
  repos: Array<any>;
};

const handleClickScroll = (ref) => {
  if (!ref || ref.current == null) return;

  ref.current.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};

const Home = (props: props) => {
  const whoAmISectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  return (
    <div className="pattern cursor-default flex flex-col justify-center items-center min-h-screen h-full bg-zinc-100 dark:bg-dark-blurple p-8 md:p-12 lg:p-14 transition-colors duration-300">
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
            <strong>Hey!</strong> My name is{" "}
            <strong
              className="text-violet-500 cursor-pointer link link-underline link-underline-violet-500"
              onClick={() => handleClickScroll(contactSectionRef)}
            >
              Pedro Silva
            </strong>
            , I&apos;m 17 years old, I&apos;m Portuguese <Emoji symbol="🇵🇹" />{" "}
            and I&apos;m currently in my last year of high school. I started
            coding since I was 11 years old and I&apos;m particularly interested
            in Web Development and Cyber Security.
          </p>
          <br />
          <p>
            When I&apos;m not coding I&apos;m probably listening to music,
            watching a movie or just sleeping :)
          </p>
        </div>
      </Section>

      {/* <Section title={"Skills"}>
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
      </Section> */}

      <Section title={"Projects"}>
        <div ref={projectsSectionRef}>
          <p>{"{ github.com/zf4ke }"}</p>
          <br />
          <div className="flex max-h-[660px] overflow-auto">
            <div className="space-y-7">
              {props?.repos &&
                props?.repos.map((r) => {
                  if (!r.fork && r.name != "zF4ke")
                    return <Repo key={r.id.toString()} repo={r} />;
                })}
            </div>
            <div className="w-6"></div>
          </div>
        </div>
      </Section>

      <Section title={"Contact"}>
        <div ref={contactSectionRef}>
          <p>O.o ~ o.o ~ o.O</p>
          <br />
          <ul className="space-y-1.5">
            <SocialNetwork
              name="Github"
              url="//github.com/zf4ke"
              username="@zf4ke"
              Icon={VscGithub}
            />

            <SocialNetwork
              name="Youtube"
              url="//youtube.com/c/zFake/"
              username="zFake"
              Icon={ImYoutube}
            />

            <SocialNetwork
              name="LinkedIn"
              url="//linkedin.com/in/zf4ke"
              username="@zf4ke"
              Icon={FaLinkedinIn}
            />

            <SocialNetwork
              name="Discord"
              url="//discord.com/users/676156690395037713/"
              username="zF4ke#8556"
              Icon={SiDiscord}
            />

            <SocialNetwork
              name="Twitter"
              url="//twitter.com/zF4ked"
              username="@zF4ked"
              Icon={VscTwitter}
            />

            <SocialNetwork
              name="Instagram"
              url="//instagram.com/zf4ked/"
              username="@zF4ked"
              Icon={RiInstagramLine}
            />
          </ul>
          <p>...</p>
          <br />
          <a
            href="mailto:pedrohsilva955@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 transitions-all duration-100 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
          >
            Email Me!
          </a>
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
