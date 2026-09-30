import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import FloatingPlayer from "../components/FloatingPlayer";
import ProjectsDisclosure from "../components/ProjectsDisclosure";
import Emoji from "../components/Emoji";
import songs from "../public/musics/songs.json";

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

type Song = {
  name: string;
  url: string;
};

type Project = {
  name: string;
  icon: string;
  umbrella?: string;
  tag: string;
  blurb: string;
  tech: string[];
  img?: string;
  live?: string;
  liveLabel?: string;
  download?: string;
  code?: string;
  isPrivate?: boolean;
};
type Props = { songs: Song[]; repos: any[] };

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
    icon: "/images/project-icons/sophia.svg",
    umbrella: "AI",
    tag: "AI agent",
    blurb:
      "A self-hosted AI agent for Discord that plans and carries out multi-step tasks. She researches server history and the web, writes and runs code in an isolated Docker workspace, analyzes files and media, and remembers useful context between conversations. You can redirect her mid-task, resume saved work, and schedule follow-ups. She also drafts reusable skills from completed work, with actions governed by explicit user permissions.",
    tech: ["TypeScript", "discord.js", "LLM tools", "SQLite", "Docker"],
    img: "/images/projects/sophia.png",
    live: "https://zf4ke.github.io/sophia",
    liveLabel: "Website & docs",
    code: "https://github.com/zF4ke/sophia",
  },
  {
    name: "ModernBazaar",
    icon: "/images/project-icons/modernbazaar.svg",
    umbrella: "Web",
    tag: "Full-stack",
    blurb:
      "A market analytics platform for Hypixel SkyBlock with live price and volume tracking, historical charts, and trading opportunity scoring. A Java/Spring Boot backend and TypeScript/Next.js dashboard run with PostgreSQL, Docker, and Prometheus/Grafana monitoring. Includes Auth0 login and Stripe subscriptions.",
    tech: ["Spring Boot", "Next.js", "PostgreSQL", "Grafana", "Docker"],
    img: "/images/projects/modern-bazaar.png",
    code: "https://github.com/zF4ke/ModernBazaar",
  },
  {
    name: "ATLAS Onboard Video & SLAM",
    icon: "/images/link-icons/aerotec.png",
    umbrella: "Robotics",
    tag: "Drones",
    blurb:
      "Onboard and ground-station software for the ATLAS drone, with low-latency WifiBroadcast video and a selectable RTSP backup over ZeroTier. Runs RealSense-based ORB-SLAM3 and YOLO person detection through DeepStream/TensorRT on a Jetson. MAVLink controls each mode independently, while a supervisor restarts failed processes.",
    tech: ["Python", "GStreamer", "ORB-SLAM3", "TensorRT", "MAVLink"],
    img: "/images/projects/atlas-swai.png",
    isPrivate: true,
  },
  {
    name: "Timebox",
    icon: "/images/project-icons/timebox.png",
    umbrella: "AI",
    tag: "Multi-agent",
    blurb:
      "A desktop scheduler that turns plain-language tasks and deadlines into a weekly study plan. Five specialist AI agents critique and vote on drafts, while a planner revises the schedule toward a configurable approval quorum. Exports calendar files and includes a benchmark suite for comparing model quality and cost.",
    tech: ["Electron", "React", "TypeScript", "OpenRouter"],
    img: "/images/projects/timebox.png",
    live: "https://zf4ke.github.io/timebox",
    code: "https://github.com/zF4ke/timebox",
  },
  {
    name: "Book2English",
    icon: "/images/project-icons/book2english.svg",
    umbrella: "AI",
    tag: "AI tool",
    blurb:
      "A PDF reader that translates text into English or Portuguese and fits it back into the original page layout, preserving illustrations and columns. PDF rendering and translation caching happen in the browser; translation uses OpenRouter with your own API key.",
    tech: ["Next.js", "TypeScript", "pdf.js", "OpenRouter"],
    img: "/images/projects/book2english.png",
    live: "https://book2english.zf4ke.me",
    code: "https://github.com/zF4ke/Book2English",
  },
  {
    name: "Buckshot Roulette Solver",
    icon: "/images/project-icons/buckshot.png",
    umbrella: "Games",
    tag: "Game solver",
    blurb:
      "An offline desktop solver for Buckshot Roulette. Enter the visible round state and a Python engine uses memoized expectimax with time-bounded iterative deepening to recommend a move, estimate its odds, and explain the choice. Electron and React provide the interface.",
    tech: ["Electron", "React", "TypeScript", "Python"],
    img: "/images/projects/buckshot.png",
    download: "https://github.com/zF4ke/Buckshot-Roulette-Solver/releases",
    code: "https://github.com/zF4ke/Buckshot-Roulette-Solver",
  },
  {
    name: "Traveller",
    icon: "/images/project-icons/traveller.png",
    umbrella: "Games",
    tag: "Game engine",
    blurb:
      "A multiplayer mystery RPG played through Discord, where solving ciphers drives the story and player progression. A platform-independent TypeScript engine runs data-driven campaigns, while a Next.js dashboard supports content authoring and playable previews.",
    tech: ["TS monorepo", "MongoDB", "discord.js", "Next.js"],
    isPrivate: true,
  },
];

const EXTRA_PROJECTS: Project[] = [
  {
    name: "Poeta",
    icon: "/images/project-icons/poeta.svg",
    umbrella: "AI",
    tag: "NLP",
    blurb:
      "A writing app for rap and poetry with a custom Portuguese phonetic rhyme engine and pronunciation-based English rhymes. Suggests perfect and near rhymes, tracks rhyme schemes and syllable counts, and saves drafts locally without an account. Optional AI helps continue or rewrite lines.",
    tech: ["Next.js", "TypeScript", "TipTap", "OpenRouter"],
    img: "/images/projects/poeta.png",
    live: "https://poeta.zf4ke.me",
    code: "https://github.com/zF4ke/poeta",
  },
  {
    name: "PalmaSat / MoVe",
    icon: "/images/project-icons/cansat.svg",
    umbrella: "Robotics",
    tag: "Flight software",
    blurb:
      "Python flight software for MoVe, our entry in the 9th edition of CanSat Portugal. Handles sensor readings, camera capture, onboard commands, and radio telemetry for a can-sized satellite.",
    tech: ["Python", "Sensors", "Radio telemetry"],
    code: "https://github.com/zF4ke/cansat-palmasat",
  },
  {
    name: "Neuroevolution Flappy Bird",
    icon: "/images/project-icons/neuroevolution.svg",
    umbrella: "AI",
    tag: "Neuroevolution",
    blurb:
      "A JavaScript Flappy Bird simulation where a genetic algorithm evolves neural-network controllers. Each generation uses survival scores to select and mutate networks for the next population.",
    tech: ["JavaScript", "Neural networks", "Genetic algorithms"],
    code: "https://github.com/zF4ke/neuroevolution-flappy-bird",
  },
  {
    name: "2D game tutorial",
    icon: "/images/project-icons/jogo2d.svg",
    umbrella: "Games",
    tag: "Game development",
    blurb:
      "Source code for my YouTube series on building a 2D fighting game from scratch in vanilla JavaScript, including canvas rendering, sprite animation, and player controls.",
    tech: ["JavaScript", "Canvas", "Sprite animation"],
    live: "https://youtube.com/@zFake",
    liveLabel: "YouTube",
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
    note: "I build onboard and ground-station software for autonomous drones. My work includes GStreamer/ROS 2 video pipelines, Jetson-based SLAM and person detection, and MAVLink control of independent onboard subsystems.",
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
    label: "Web & desktop",
    items: [
      { name: "JavaScript", icon: `${DEV}/javascript/javascript-original.svg` },
      { name: "TypeScript", icon: `${DEV}/typescript/typescript-original.svg` },
      { name: "React", icon: `${DEV}/react/react-original.svg` },
      { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
      { name: "Electron", icon: `${DEV}/electron/electron-original.svg` },
      { name: "Tailwind", icon: `${DEV}/tailwindcss/tailwindcss-original.svg` },
    ],
  },
  {
    label: "AI & computer vision",
    items: [
      { name: "Python", icon: `${DEV}/python/python-original.svg` },
      { name: "PyTorch", icon: `${DEV}/pytorch/pytorch-original.svg` },
      { name: "OpenCV", icon: `${DEV}/opencv/opencv-original.svg` },
      { name: "LLM agents", icon: null },
      { name: "DeepStream", icon: "https://cdn.simpleicons.org/nvidia/76B900" },
      { name: "TensorRT", icon: "https://cdn.simpleicons.org/nvidia/76B900" },
    ],
  },
  {
    label: "Backend & data",
    items: [
      { name: "Java", icon: `${DEV}/java/java-original.svg` },
      { name: "Spring Boot", icon: `${DEV}/spring/spring-original.svg` },
      { name: "PostgreSQL", icon: `${DEV}/postgresql/postgresql-original.svg` },
      { name: "MongoDB", icon: `${DEV}/mongodb/mongodb-original.svg` },
      { name: "Node.js", icon: `${DEV}/nodejs/nodejs-original.svg` },
      { name: "SQLite", icon: `${DEV}/sqlite/sqlite-original.svg` },
    ],
  },
  {
    label: "Tools & robotics",
    items: [
      { name: "Git", icon: `${DEV}/git/git-original.svg` },
      { name: "Linux", icon: `${DEV}/linux/linux-original.svg` },
      { name: "Docker", icon: `${DEV}/docker/docker-original.svg` },
      { name: "ROS 2", icon: "https://cdn.simpleicons.org/ros/white" },
      { name: "GStreamer", icon: null },
      { name: "MAVLink", icon: null },
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
  ["focus", "AI agents, full-stack web"],
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

function ProjectIcon({ p }: { p: Project }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={p.icon} alt="" className="mr-2 inline-block h-5 w-5 shrink-0 object-contain align-[-0.2em]" loading="lazy" />
  );
}

function BioLink({ href, icon, children }: { href: string; icon: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-zinc-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" className="h-4 w-4 object-contain" loading="lazy" />
      <span className="ulink">{children}</span>
    </a>
  );
}

function ProjectThumb({ p, tall = false }: { p: Project; tall?: boolean }) {
  const h = tall ? "h-72 sm:h-80" : "h-52";
  if (p.img) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={p.img}
        alt={p.name}
        className={`${h} w-full object-cover object-top`}
        loading="lazy"
      />
    );
  }
  return (
    <div className={`flex ${h} w-full items-center justify-center bg-gradient-to-br from-accent-600/25 via-surface to-surface`}>
      <span className="font-jetbrains text-2xl font-600 text-accent-300/80">{p.name}</span>
    </div>
  );
}

function TagPills({ umbrella, tag, size = "sm" }: { umbrella?: string; tag: string; size?: "sm" | "md" }) {
  const pad = size === "md" ? "px-2.5 py-1 text-[11px]" : "px-2 py-0.5 text-[10px]";
  return (
    <span className="flex flex-wrap items-center gap-1.5">
      {umbrella && (
        <span className={`rounded-full bg-white/[0.05] font-jetbrains text-zinc-400 ring-1 ring-white/10 ${pad}`}>
          {umbrella}
        </span>
      )}
      <span className={`rounded-full bg-accent-500/12 font-jetbrains text-accent-300 ring-1 ring-accent-500/20 ${pad}`}>
        {tag}
      </span>
    </span>
  );
}

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <article
      onClick={onOpen}
      className="card reveal group cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface/70 shadow-lift hover:border-accent-500/40 hover:bg-surface"
    >
      <div className="overflow-hidden border-b border-line">
        <div className="transition-transform duration-500 group-hover:scale-[1.03]">
          <ProjectThumb p={p} />
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="inline-flex items-center text-lg font-600 text-white"><ProjectIcon p={p} />{p.name}</h3>
          <div className="shrink-0">
            <TagPills umbrella={p.umbrella} tag={p.tag} size="md" />
          </div>
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
              {p.liveLabel || "Website"} <span aria-hidden="true">↗</span>
            </a>
          )}
          {p.download && (
            <a
              href={p.download}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 font-500 text-accent-300 hover:text-accent-400 transition-colors"
            >
              Download <span aria-hidden="true">↗</span>
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
        </div>
      </div>
    </article>
  );
}

function ProjectRow({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="group flex cursor-pointer items-center gap-4 px-2 py-4 transition-colors duration-200 hover:bg-surface/50 sm:gap-5"
    >
      <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-line sm:h-[4.5rem] sm:w-32">
        {p.img ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={p.img}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-accent-600/25 to-surface font-jetbrains text-xs text-accent-300/80">
            {p.name.split(" ")[0]}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-base font-600 text-white"><ProjectIcon p={p} />{p.name}</h3>
          <TagPills umbrella={p.umbrella} tag={p.tag} size="sm" />
        </div>
        <p className="mt-1 line-clamp-1 text-sm text-zinc-400">{p.blurb}</p>
        <div className="mt-1.5 hidden flex-wrap gap-x-3 gap-y-1 font-jetbrains text-[11px] text-zinc-600 sm:flex">
          {p.tech.slice(0, 4).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <div className="hidden items-center gap-4 text-sm sm:flex">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-500 text-accent-300 transition-colors hover:text-accent-400"
            >
              {p.liveLabel || "Website"}
            </a>
          )}
          {p.download && (
            <a
              href={p.download}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-500 text-accent-300 transition-colors hover:text-accent-400"
            >
              Download
            </a>
          )}
          {p.code && (
            <a
              href={p.code}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="Code"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <VscGithub className="h-[18px] w-[18px]" />
            </a>
          )}
        </div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-[18px] w-[18px] shrink-0 text-zinc-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent-300"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </div>
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
        <ProjectThumb p={p} tall />
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="inline-flex items-center font-display text-2xl font-700 text-white"><ProjectIcon p={p} />{p.name}</h3>
            <TagPills umbrella={p.umbrella} tag={p.tag} size="md" />
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
                className="btn-motion inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-2.5 font-500 text-white hover:bg-accent-400"
              >
                {p.liveLabel || "Website"} <span aria-hidden="true">↗</span>
              </a>
            )}
            {p.download && (
              <a
                href={p.download}
                target="_blank"
                rel="noreferrer"
                className="btn-motion inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-2.5 font-500 text-white hover:bg-accent-400"
              >
                Download <span aria-hidden="true">↗</span>
              </a>
            )}
            {p.code && (
              <a
                href={p.code}
                target="_blank"
                rel="noreferrer"
                className="btn-motion inline-flex items-center gap-2 rounded-xl border border-line bg-white/[0.02] px-5 py-2.5 font-500 text-zinc-200 hover:bg-white/5"
              >
                <VscGithub className="h-[18px] w-[18px]" /> View code
              </a>
            )}
            {p.isPrivate && (
              <span className="inline-flex items-center font-jetbrains text-[12px] text-zinc-500">
                private repo
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
  const featured = FEATURED.slice(0, 2);
  const rest = FEATURED.slice(2);

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
    "book2english",
    "poeta",
    "traveller",
    "neuroevolution-flappy-bird",
    "buckshot-roulette-solver",
    "cansat-palmasat",
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
          <div className="flex items-center gap-2">
            <a
              href="/Pedro-Silva-CV.pdf"
              download
              className="btn-motion inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-sm font-500 text-zinc-300 hover:border-white/25 hover:bg-white/5 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14" />
              </svg>
              CV
            </a>
            <a
              href="mailto:pedrohsilva955@gmail.com"
              className="btn-motion rounded-lg bg-accent-500 px-3.5 py-2 text-sm font-500 text-white hover:bg-accent-400"
            >
              Get in touch
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* hero */}
        <section className="glow relative overflow-hidden">
          <div className="grid-bg absolute inset-0"></div>
          <div className="relative z-10 mx-auto grid max-w-5xl gap-12 px-6 pt-20 pb-24 md:grid-cols-[1.15fr_1fr] md:items-center md:pt-24">
            <div>
              <h1 className="reveal text-4xl font-700 leading-[1.07] tracking-tight text-white sm:text-5xl">
                I like making <br className="hidden sm:block" />
                computers <span className="text-accent-400">smarter</span>.
              </h1>
              <p className="reveal mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
                I&apos;m Pedro, a {AGE} year old developer from Portugal <Emoji symbol="🇵🇹" />. I work on
                AI agents, full-stack web, and software for autonomous drones. I like building tools
                that feel effortless to use and help people make smarter decisions.
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
                I&apos;m doing a Master&apos;s in Computer Science and Engineering at IST, after my
                Bachelor&apos;s at FCUL. Most of what I build involves AI agents or full-stack web.
              </p>
              <p>
                I like working at the edge of research and engineering, taking an idea and figuring
                out how to get it working in practice. That&apos;s part of what I do at{" "}
                <BioLink href="https://aerotec.pt/atlas" icon="/images/link-icons/aerotec.png">
                  AeroTec ATLAS
                </BioLink>
                , writing software for autonomous drones, and in my own projects.
              </p>
              <p>
                Outside of code I solve{" "}
                <BioLink href="https://enigmatics.org/profile/zf4ke" icon="/images/link-icons/puzzles.png">
                  puzzles
                </BioLink>{" "}
                and ARGs, and I run a{" "}
                <BioLink href="https://youtube.com/@zFake" icon="/images/link-icons/youtube.png">
                  YouTube channel
                </BioLink>{" "}
                where I share what I learn about coding, science and math.
              </p>
            </div>
          </div>
        </section>

        {/* projects */}
        <section id="projects" className="border-t border-line">
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
            <p className="reveal font-jetbrains text-sm text-accent-300">{"// projects"}</p>
            <h2 className="reveal mt-3 font-display text-3xl font-700 tracking-tight text-white">Things I&apos;ve built</h2>
            <p className="reveal mt-3 max-w-xl text-zinc-400">
              Click a project for the full description and links.
            </p>

            {/* two flagships as large image-forward cards */}
            <div className="reveal mt-12 grid gap-5 sm:grid-cols-2">
              {featured.map((p) => (
                <ProjectCard key={p.name} p={p} onOpen={() => setSelected(p)} />
              ))}
            </div>

            {/* the rest as a compact index */}
            <div className="reveal mt-6 divide-y divide-line border-t border-line">
              {rest.map((p) => (
                <ProjectRow key={p.name} p={p} onOpen={() => setSelected(p)} />
              ))}
            </div>

            <ProjectsDisclosure>
              <div className="mt-6 divide-y divide-line border-t border-line">
                {EXTRA_PROJECTS.map((p) => (
                  <ProjectRow key={p.name} p={p} onOpen={() => setSelected(p)} />
                ))}
              </div>
              {more.length > 0 && (
                <div className="mt-10">
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
            </ProjectsDisclosure>
          </div>
        </section>

        {/* experience */}
        <section id="experience" className="border-t border-line bg-surface/30">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
            <p className="reveal font-jetbrains text-sm text-accent-300">{"// experience"}</p>
            <h2 className="reveal mt-3 font-display text-3xl font-700 tracking-tight text-white">Where I&apos;ve put it to work</h2>
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
            <h2 className="reveal mt-3 font-display text-3xl font-700 tracking-tight text-white">What I work with</h2>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {SKILLS.map((g) => (
                <div key={g.label} className="reveal rounded-2xl border border-line bg-surface/60 p-6 shadow-lift">
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
            <h2 className="reveal mt-3 font-display text-3xl font-700 tracking-tight text-white">Need something built?</h2>
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
        <section id="contact" className="aura border-t border-line">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
            <p className="reveal font-jetbrains text-sm text-accent-300">{"// say hi"}</p>
            <h2 className="reveal mt-4 font-display text-4xl font-700 tracking-tight text-white sm:text-5xl">
              Let&apos;s build something.
            </h2>
            <p className="reveal mx-auto mt-5 max-w-md text-lg text-zinc-400">
              Whether it is a job, a freelance project, or just a good puzzle, my inbox is open.
            </p>
            <div className="reveal mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:pedrohsilva955@gmail.com"
                className="btn-motion inline-flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 font-500 text-white hover:bg-accent-400"
              >
                <HiOutlineMail className="h-5 w-5" /> pedrohsilva955@gmail.com
              </a>
            </div>
            <div className="reveal mt-8 flex items-center justify-center gap-5 text-zinc-500">
              {SOCIALS.map(({ name, url, Icon }) => (
                <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name} className="icon-life hover:text-white">
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
      <FloatingPlayer songs={songs} />

      {selected && <ProjectModal p={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default Home;
