import fs from "fs";
import path from "path";

import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import Player from "../components/Player";
import Emoji from "../components/Emoji";

import { VscGithub } from "react-icons/vsc";
import { ImYoutube } from "react-icons/im";
import {
  FaLinkedinIn,
  FaXTwitter,
  FaPlaneUp,
  FaYoutube,
  FaSatellite,
} from "react-icons/fa6";
import { SiDiscord } from "react-icons/si";
import { RiInstagramLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";

export const getStaticProps: GetStaticProps = async () => {
  const songsDirectory = path.join(process.cwd(), "public/musics");
  const songs = fs.readdirSync(songsDirectory);

  let repos: any[] = [];
  try {
    const res = await fetch("https://api.github.com/users/zf4ke/repos?per_page=100");
    const full = await res.json();
    if (Array.isArray(full)) {
      repos = full
        .filter((r) => !r.fork && r.name !== "zF4ke")
        .map((r) => ({ name: r.name, url: r.svn_url, stars: r.stargazers_count }))
        .sort((a, b) => b.stars - a.stars);
    }
  } catch (e) {
    repos = [];
  }

  return { props: { songs, repos }, revalidate: 3600 };
};

type Project = {
  name: string;
  tag: string;
  blurb: string;
  tech: string[];
  img?: string;
  live?: string;
  code?: string;
  isPrivate?: boolean;
};
type Props = { songs: string[]; repos: any[] };

function getAge(dateString: string) {
  const today = new Date();
  const birth = new Date(dateString);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}
const AGE = getAge("2004/10/07");

const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const FEATURED: Project[] = [
  {
    name: "Sophia",
    tag: "AI agent",
    blurb:
      "A conversational AI agent for Discord that searches your server history and acts on it in plain language, with admin approval on every change. 33 tools running in an agentic loop, with budget limits and role-based access baked in.",
    tech: ["TypeScript", "discord.js", "LLM tools", "SQLite", "Vitest"],
    img: "/images/projects/sophia.png",
    live: "https://zf4ke.github.io/sophia",
    code: "https://github.com/zF4ke/sophia",
  },
  {
    name: "Timebox",
    tag: "Multi-agent",
    blurb:
      "A desktop app where five AI agents draft, critique and vote on your weekly schedule under a quorum you control, then export it straight to your calendar. It ships with its own benchmark harness for comparing models on cost and quality.",
    tech: ["Electron", "React", "TypeScript", "OpenRouter"],
    img: "/images/projects/timebox.png",
    live: "https://zf4ke.github.io/timebox",
    code: "https://github.com/zF4ke/timebox",
  },
  {
    name: "Modern Bazaar",
    tag: "Full-stack",
    blurb:
      "An enterprise-grade market analyzer for a live game economy. A Spring Boot ingestion backend polls and compacts market data, a Next.js dashboard surfaces real-time analytics and trading strategies, all wired with production-style observability.",
    tech: ["Spring Boot", "Next.js", "PostgreSQL", "Grafana", "Docker"],
    img: "/images/projects/modern-bazaar.png",
    live: "https://modern-bazaar.vercel.app",
    code: "https://github.com/zF4ke/ModernBazaar",
  },
  {
    name: "Traveller",
    tag: "Game engine",
    blurb:
      "A multiplayer RPG played inside Discord where decrypting ciphers is the core mechanic. A platform-agnostic game engine with zero Discord imports, data-driven content, swappable storage, and a Next.js authoring dashboard. Its test suite plays entire quests in under a second.",
    tech: ["TS monorepo", "MongoDB", "discord.js", "Next.js"],
    isPrivate: true,
  },
  {
    name: "Neuroevolution",
    tag: "AI / ML",
    blurb:
      "Flappy Bird that teaches itself to fly. Neural networks evolved with a genetic algorithm, visualized generation by generation in the browser so you can watch the population get better in real time.",
    tech: ["JavaScript", "Neural nets", "Genetic algorithms"],
    code: "https://github.com/zF4ke/neuroevolution-flappy-bird",
  },
  {
    name: "2D Game Dev series",
    tag: "Teaching",
    blurb:
      "The open-source code behind my YouTube series on building a 2D game in vanilla JavaScript, from the game loop and rendering to collisions and sprites. Made to teach the fundamentals with no engine in the way.",
    tech: ["JavaScript", "HTML5 Canvas"],
    code: "https://github.com/zF4ke/jogo2d-javascript",
  },
];

const EXPERIENCE = [
  {
    role: "Software & AI",
    org: "AeroTec ATLAS",
    period: "2025 to now",
    url: "https://aerotec.pt/atlas",
    Icon: FaPlaneUp,
    note: "I build computer vision and autonomy software for the only Portuguese university team flying fully autonomous drones. Real-time video pipelines with GStreamer and ROS 2, plus AI inference for object detection.",
  },
  {
    role: "Programming content creator",
    org: "YouTube, zFake",
    period: "2021 to now",
    url: "https://youtube.com/@zFake",
    Icon: FaYoutube,
    note: "I teach coding, science and math to a Portuguese-speaking audience, including a full series on building a 2D game from scratch.",
  },
  {
    role: "Avionics, PalmaSat",
    org: "CanSat Portugal",
    period: "2022",
    url: "https://github.com/zF4ke/cansat-palmasat",
    Icon: FaSatellite,
    note: "Co-built the flight software for a can-sized satellite: telemetry, sensors and radio downlink. The team won the national Technical Performance Award.",
  },
];

const SKILLS = [
  {
    label: "Web",
    items: [
      { name: "JavaScript", icon: `${DEV}/javascript/javascript-original.svg` },
      { name: "TypeScript", icon: `${DEV}/typescript/typescript-original.svg` },
      { name: "React", icon: `${DEV}/react/react-original.svg` },
      { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
      { name: "Node.js", icon: `${DEV}/nodejs/nodejs-original.svg` },
      { name: "Tailwind", icon: `${DEV}/tailwindcss/tailwindcss-original.svg` },
    ],
  },
  {
    label: "AI & Data",
    items: [
      { name: "Python", icon: `${DEV}/python/python-original.svg` },
      { name: "PyTorch", icon: `${DEV}/pytorch/pytorch-original.svg` },
      { name: "OpenCV", icon: `${DEV}/opencv/opencv-original.svg` },
      { name: "Jupyter", icon: `${DEV}/jupyter/jupyter-original.svg` },
      { name: "LLM agents", icon: null },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Java", icon: `${DEV}/java/java-original.svg` },
      { name: "Spring Boot", icon: `${DEV}/spring/spring-original.svg` },
      { name: "PostgreSQL", icon: `${DEV}/postgresql/postgresql-original.svg` },
      { name: "MongoDB", icon: `${DEV}/mongodb/mongodb-original.svg` },
      { name: "Firebase", icon: `${DEV}/firebase/firebase-plain.svg` },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", icon: `${DEV}/git/git-original.svg` },
      { name: "Linux", icon: `${DEV}/linux/linux-original.svg` },
      { name: "Docker", icon: `${DEV}/docker/docker-original.svg` },
      { name: "ROS 2", icon: "https://cdn.simpleicons.org/ros/white" },
      { name: "GStreamer", icon: null },
    ],
  },
];

const SOCIALS = [
  { name: "GitHub", url: "https://github.com/zf4ke", Icon: VscGithub },
  { name: "YouTube", url: "https://youtube.com/@zFake", Icon: ImYoutube },
  { name: "LinkedIn", url: "https://linkedin.com/in/zf4ke", Icon: FaLinkedinIn },
  { name: "Discord", url: "https://discord.com/users/676156690395037713/", Icon: SiDiscord },
  { name: "X", url: "https://twitter.com/zF4ked", Icon: FaXTwitter },
  { name: "Instagram", url: "https://instagram.com/zf4ked/", Icon: RiInstagramLine },
];

const TERMINAL = [
  ["whoami", "Pedro Silva"],
  ["role", "Software & AI Developer"],
  ["studying", "MSc CSE @ IST"],
  ["stack", "TypeScript · Python · Java"],
  ["focus", "AI agents, full-stack web"],
  ["uptime", "coding since age 11"],
];

function TechChip({ name, icon }: { name: string; icon: string | null }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-line bg-base/50 px-2.5 py-1.5 text-sm text-zinc-300">
      {icon ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={icon} alt="" className="h-4 w-4" loading="lazy" />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
      )}
      {name}
    </span>
  );
}

function ProjectThumb({ p }: { p: Project }) {
  if (p.img) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={p.img}
        alt={p.name}
        className="h-44 w-full object-cover object-top"
        loading="lazy"
      />
    );
  }
  return (
    <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-accent-600/25 via-surface to-surface">
      <span className="font-jetbrains text-2xl font-600 text-accent-300/80">{p.name}</span>
    </div>
  );
}

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <article
      onClick={onOpen}
      className="card reveal group cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface/70 hover:border-accent-500/40 hover:bg-surface"
    >
      <div className="overflow-hidden border-b border-line">
        <div className="transition-transform duration-500 group-hover:scale-[1.03]">
          <ProjectThumb p={p} />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-600 text-white">{p.name}</h3>
          <span className="shrink-0 rounded-full bg-accent-500/12 px-2.5 py-1 font-jetbrains text-[11px] text-accent-300 ring-1 ring-accent-500/20">
            {p.tag}
          </span>
        </div>
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-zinc-400">{p.blurb}</p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 font-500 text-accent-300 hover:text-accent-400 transition-colors"
            >
              Live <span aria-hidden="true">↗</span>
            </a>
          )}
          {p.code && (
            <a
              href={p.code}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 font-500 text-zinc-300 hover:text-white transition-colors"
            >
              <VscGithub className="h-4 w-4" /> Code
            </a>
          )}
          <span className="ml-auto font-jetbrains text-[11px] text-zinc-600 group-hover:text-accent-300 transition-colors">
            details +
          </span>
        </div>
      </div>
    </article>
  );
}

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] grid place-items-center bg-black/75 p-4 backdrop-blur-sm sm:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-line bg-surface shadow-2xl shadow-black/60"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-lg bg-black/40 text-zinc-300 backdrop-blur hover:bg-black/60 hover:text-white transition-colors"
        >
          ✕
        </button>
        <ProjectThumb p={{ ...p }} />
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-700 text-white">{p.name}</h3>
            <span className="rounded-full bg-accent-500/12 px-2.5 py-1 font-jetbrains text-[11px] text-accent-300 ring-1 ring-accent-500/20">
              {p.tag}
            </span>
          </div>
          <p className="mt-4 leading-relaxed text-zinc-300">{p.blurb}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span key={t} className="rounded-lg border border-line bg-base/50 px-2.5 py-1 font-jetbrains text-[12px] text-zinc-400">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-2.5 font-500 text-white hover:bg-accent-400 transition-colors"
              >
                Open live demo <span aria-hidden="true">↗</span>
              </a>
            )}
            {p.code && (
              <a
                href={p.code}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/[0.02] px-5 py-2.5 font-500 text-zinc-200 hover:bg-white/5 transition-colors"
              >
                <VscGithub className="h-[18px] w-[18px]" /> View code
              </a>
            )}
            {p.isPrivate && (
              <span className="inline-flex items-center font-jetbrains text-[12px] text-zinc-500">
                private repo, available on request
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Home = ({ songs, repos }: Props) => {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }, []);

  const featuredNames = new Set([
    "sophia",
    "timebox",
    "modernbazaar",
    "traveller",
    "neuroevolution-flappy-bird",
    "jogo2d-javascript",
    "portfolio",
  ]);
  const more = (repos || []).filter((r) => !featuredNames.has(r.name.toLowerCase())).slice(0, 10);

  return (
    <div className="min-h-screen bg-base font-sans text-zinc-300 antialiased">
      <Head>
        <title>Pedro Silva, Software & AI Developer</title>
        <meta
          name="description"
          content="Pedro Silva (zF4ke), a developer from Portugal. MSc Computer Science at IST. AI agents, full-stack web, and autonomous drones."
        />
        <link rel="icon" type="image/png" href="/images/character.png" />
        <link rel="apple-touch-icon" href="/images/character.png" />
      </Head>

      {/* nav */}
      <header className="sticky top-0 z-40 border-b border-line bg-base/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="inline-flex items-center gap-2.5 font-jetbrains text-sm text-zinc-300 hover:text-white transition-colors">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/character.png"
              alt=""
              className="h-8 w-8 object-contain"
            />
            <span>Pedro Silva</span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-zinc-400 sm:flex">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <a
            href="mailto:pedrohsilva955@gmail.com"
            className="rounded-lg bg-accent-500 px-3.5 py-2 text-sm font-500 text-white hover:bg-accent-400 transition-colors"
          >
            Get in touch
          </a>
        </nav>
      </header>

      <main id="top">
        {/* hero */}
        <section className="glow relative overflow-hidden">
          <div className="grid-bg absolute inset-0"></div>
          <div className="relative mx-auto grid max-w-5xl gap-12 px-6 pt-20 pb-24 md:grid-cols-[1.15fr_1fr] md:items-center md:pt-24">
            <div>
              <h1 className="reveal text-4xl font-700 leading-[1.07] tracking-tight text-white sm:text-5xl">
                I like making <br className="hidden sm:block" />
                computers <span className="text-accent-400">smarter</span>.
              </h1>
              <p className="reveal mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
                I&apos;m Pedro, a {AGE} year old developer from Portugal <Emoji symbol="🇵🇹" />. I work on
                AI agents, full-stack web, and software for autonomous drones, and I like shipping things
                that feel effortless to use.
              </p>
              <div className="reveal mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="rounded-xl bg-white px-5 py-3 font-500 text-base text-zinc-950 hover:bg-zinc-200 transition-colors"
                >
                  See my work
                </a>
                <a
                  href="https://github.com/zf4ke"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/[0.02] px-5 py-3 font-500 text-zinc-200 hover:bg-white/5 transition-colors"
                >
                  <VscGithub className="h-[18px] w-[18px]" /> GitHub
                </a>
              </div>
              <div className="reveal mt-8 flex items-center gap-4 text-zinc-500">
                {SOCIALS.map(({ name, url, Icon }) => (
                  <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name} className="hover:text-white transition-colors">
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>

            {/* terminal card */}
            <div className="reveal md:animate-floaty">
              <div className="overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur">
                <div className="flex items-center gap-1.5 border-b border-line bg-white/[0.02] px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-white/15"></span>
                  <span className="h-3 w-3 rounded-full bg-white/15"></span>
                  <span className="h-3 w-3 rounded-full bg-white/15"></span>
                  <span className="ml-2 font-jetbrains text-[12px] text-zinc-500">zf4ke@archlinux: ~</span>
                </div>
                <div className="p-5 font-jetbrains text-[13px] leading-relaxed">
                  <p className="text-zinc-500">
                    <span className="text-accent-400">$</span> neofetch
                  </p>
                  <div className="mt-3 space-y-1.5">
                    {TERMINAL.map(([k, v]) => (
                      <div key={k} className="flex gap-3">
                        <span className="w-20 shrink-0 text-accent-300">{k}</span>
                        <span className="text-zinc-300">{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-zinc-500">
                    <span className="text-accent-400">$</span> <span className="animate-pulse">_</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* about */}
        <section id="about" className="border-t border-line">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
            <p className="reveal font-jetbrains text-sm text-accent-300">{"// about"}</p>
            <div className="reveal mt-5 space-y-5 text-lg leading-relaxed text-zinc-400">
              <p>
                I started coding when I was 11 and never really stopped. These days I&apos;m finishing my
                Master&apos;s in Computer Science and Engineering at IST, after my Bachelor&apos;s at FCUL,
                and most of my energy goes into AI agents and full-stack web.
              </p>
              <p>
                I like problems that sit between research and a real product: things that have to be both
                clever and genuinely usable. That is what pulled me into autonomous drones with{" "}
                <a href="https://aerotec.pt/atlas" target="_blank" rel="noreferrer" className="ulink text-zinc-200">
                  AeroTec ATLAS
                </a>
                , and what keeps me building side projects most weekends.
              </p>
              <p>
                Outside of code I solve{" "}
                <a href="https://enigmatics.org/profile/zf4ke" target="_blank" rel="noreferrer" className="ulink text-zinc-200">
                  puzzles
                </a>{" "}
                and ARGs, and I run a{" "}
                <a href="https://youtube.com/@zFake" target="_blank" rel="noreferrer" className="ulink text-zinc-200">
                  YouTube channel
                </a>{" "}
                where I teach coding and math. Explaining something is still the best way I know to learn it.
              </p>
            </div>
          </div>
        </section>

        {/* projects */}
        <section id="projects" className="border-t border-line">
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
            <p className="reveal font-jetbrains text-sm text-accent-300">{"// projects"}</p>
            <h2 className="reveal mt-3 text-3xl font-700 tracking-tight text-white">Things I&apos;ve built</h2>
            <p className="reveal mt-3 max-w-xl text-zinc-400">
              A few projects I am proud of. Click any of them for a closer look. Three have a live demo you
              can poke at right now.
            </p>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {FEATURED.map((p) => (
                <ProjectCard key={p.name} p={p} onOpen={() => setSelected(p)} />
              ))}
            </div>

            {more.length > 0 && (
              <div className="reveal mt-10">
                <p className="font-jetbrains text-sm text-zinc-500">{"// more on github"}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {more.map((r) => (
                    <a
                      key={r.name}
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-line bg-surface/60 px-3 py-1.5 font-jetbrains text-[12px] text-zinc-400 hover:border-accent-500/40 hover:text-white transition-colors"
                    >
                      {r.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* experience */}
        <section id="experience" className="border-t border-line bg-surface/30">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
            <p className="reveal font-jetbrains text-sm text-accent-300">{"// experience"}</p>
            <h2 className="reveal mt-3 text-3xl font-700 tracking-tight text-white">Where I&apos;ve put it to work</h2>
            <div className="mt-12">
              {EXPERIENCE.map((e) => (
                <div
                  key={e.role + e.org}
                  className="reveal grid gap-3 border-t border-line py-7 md:grid-cols-[180px_1fr] md:gap-8"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex gap-3 items-center">
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-500/12 text-accent-300 ring-1 ring-accent-500/20">
                        <e.Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-jetbrains text-[12px] text-zinc-500">{e.period}</p>
                        <a
                          href={e.url}
                          target="_blank"
                          rel="noreferrer"
                          className="ulink mt-1 inline-block font-600 text-white"
                        >
                          {e.org}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-500 text-zinc-200">{e.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{e.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* skills */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
            <p className="reveal font-jetbrains text-sm text-accent-300">{"// toolbox"}</p>
            <h2 className="reveal mt-3 text-3xl font-700 tracking-tight text-white">What I work with</h2>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {SKILLS.map((g) => (
                <div key={g.label} className="reveal rounded-2xl border border-line bg-surface/60 p-6">
                  <h3 className="font-jetbrains text-sm text-accent-300">{g.label}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <TechChip key={it.name} name={it.name} icon={it.icon} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* services */}
        <section className="border-t border-line bg-surface/30">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
            <p className="reveal font-jetbrains text-sm text-accent-300">{"// freelance"}</p>
            <h2 className="reveal mt-3 text-3xl font-700 tracking-tight text-white">Need something built?</h2>
            <p className="reveal mt-4 text-lg leading-relaxed text-zinc-400">
              I take on small, well-scoped jobs with a fixed quote and a 24 to 48h turnaround. Websites and
              landing pages, bug fixes, Python or JavaScript automation, AI integrations, and data work.
            </p>
            <p className="reveal mt-4 text-zinc-400">
              Describe what you need in two sentences and you&apos;ll get a quote and a delivery date,
              usually the same day.{" "}
              <a href="mailto:pedrohsilva955@gmail.com" className="ulink text-accent-300">
                Send me a message
              </a>
              .
            </p>
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="border-t border-line">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
            <p className="reveal font-jetbrains text-sm text-accent-300">{"// say hi"}</p>
            <h2 className="reveal mt-4 text-4xl font-700 tracking-tight text-white sm:text-5xl">
              Let&apos;s build something.
            </h2>
            <p className="reveal mx-auto mt-5 max-w-md text-lg text-zinc-400">
              Whether it is a job, a freelance project, or just a good puzzle, my inbox is open.
            </p>
            <div className="reveal mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:pedrohsilva955@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 font-500 text-white hover:bg-accent-400 transition-colors"
              >
                <HiOutlineMail className="h-5 w-5" /> pedrohsilva955@gmail.com
              </a>
            </div>
            <div className="reveal mt-8 flex items-center justify-center gap-5 text-zinc-500">
              {SOCIALS.map(({ name, url, Icon }) => (
                <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name} className="hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-zinc-600 sm:flex-row">
          <span className="font-jetbrains">© {new Date().getFullYear()} Pedro Silva</span>
          <div className="flex items-center gap-5 font-jetbrains text-[12px]">
            <a href="https://github.com/zf4ke" target="_blank" rel="noreferrer" className="hover:text-zinc-300 transition-colors">GitHub</a>
            <a href="https://youtube.com/@zFake" target="_blank" rel="noreferrer" className="hover:text-zinc-300 transition-colors">YouTube</a>
            <a href="https://linkedin.com/in/zf4ke" target="_blank" rel="noreferrer" className="hover:text-zinc-300 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* floating music player, an easter egg from the old site */}
      <div className="fixed bottom-4 right-4 z-40 hidden rounded-xl border border-line bg-surface/90 px-3 py-2 backdrop-blur md:block">
        <Player songs={songs} />
      </div>

      {selected && <ProjectModal p={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default Home;
