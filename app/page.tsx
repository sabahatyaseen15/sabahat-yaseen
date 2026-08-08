'use client';

import Head from "next/head";
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import Image from "next/image";
import ctnjohnson from '../public/porfile.png';
import design from '../public/design.png';
import code from '../public/code.png';
import consulting from '../public/consulting.png';
import web1 from "../public/davico.png";
import web2 from "../public/qimmit.png";
import web3 from "../public/chta-app.png";
import web4 from "../public/Novotel.png";
import web5 from "../public/plantgaming.png";
import React, { useState, useEffect, useRef } from 'react';
import Contact from "../app/contact"; 
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillInstagram,
} from 'react-icons/ai';


function TagHeading({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-sm tracking-wide text-amber-600 dark:text-amber-400">
        {`<${tag}>`}
      </p>
      <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-1">
        {title}
      </h3>
      <p className="font-mono text-sm tracking-wide text-amber-600 dark:text-amber-400 mt-1">
        {`</${tag}>`}
      </p>
    </div>
  );
}
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function WindowChrome({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      {label && (
        <span className="ml-2 font-mono text-[11px] text-slate-500 dark:text-slate-400 truncate">
          {label}
        </span>
      )}
    </div>
  );
}

const skillGroups = [
  {
    icon: design,
    file: "frontend.tsx",
    title: "Frontend Development",
    desc: "Responsive, interactive interfaces built with clean, reusable components and a focus on seamless user experience.",
    tags: ["Angular", "React.js", "Next.js", "JavaScript", "TypeScript"],
  },
  {
    icon: code,
    file: "ui-styling.css",
    title: "UI & Responsive Design",
    desc: "Turning designs into pixel-perfect interfaces that hold up across desktop, tablet, and mobile.",
    tags: ["Tailwind CSS", "Bootstrap", "Material UI", "Responsive Design", "Figma to Code"],
  },
  {
    icon: consulting,
    file: "api.service.ts",
    title: "APIs & App Development",
    desc: "REST API integration, authentication, and state management wired together into complete, reliable web apps.",
    tags: ["REST APIs", "API Integration", "Authentication", "State Management", "Git & GitHub"],
  },
];

const projects = [
  {
    img: web1,
    name: "davico",
    title: "DAVICO",
    desc: "Vehicle rental & visa assistance platform",
    tags: ["Angular", "Bootstrap"],
    link: "https://davco-pk.vercel.app/",
  },
  {
    img: web2,
    name: "Qimaat",
    title: "Qimaat E-commerce Platform",
    desc: "A modern e-commerce platform with product browsing, shopping cart, checkout, and a seamless online shopping experience.",
    tags: ["React", "Next.js", "Tailwind CSS"],
    link: "https://staging.qimaat.com/",
  },
  {
    img: web3,

    name: "Chat App",

    title: "Real-Time Chat Application",

    desc: "A real-time messaging application built with Firebase for instant communication and live chat updates.",

    tags: ["React", "Firebase"],

    link: "https://chatapp-psi-one.vercel.app/",
  },

  {
    img: web4,

    name: "Hotel Management System",

    title: "Hotel Management & Reservation Platform",

    desc: "A comprehensive hotel management system for managing rooms, reservations, guests, billing, and daily hotel operations.",

    tags: ["Angular", "Bootstrap", "TypeScript"],
    link: "https://hotel-management-srj8.vercel.app/",
  }
  ,
  {
    img: web5,

    name: "SmartSoft Gaming",

    title: "Gaming & Casino Platform",

    desc: "Interactive gaming platform featuring engaging crash and instant games with a modern, responsive user experience.",

    tags: ["Next.js", "Tailwind CSS"],

    link: "https://smartsoftgame.vercel.app/dashboard",
  },
];

const stats = [
  { value: "2+", label: "years experience" },
  { value: "20+", label: "projects shipped" },
  { value: "8+", label: "core technologies" },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Sabahat Yaseen — Web Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Fonts + entrance animation, scoped globally so Tailwind's
          font-mono / font-sans utilities pick them up everywhere. */}
      <style jsx global>{`
        :root {
          --font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
          --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
        }
        body {
          font-family: var(--font-display);
        }
        .font-mono {
          font-family: var(--font-mono) !important;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: fadeUp 0.7s ease-out both;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        .dot-grid {
          background-image: radial-gradient(currentColor 1px, transparent 1px);
          background-size: 22px 22px;
        }
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .hero-photo {
          animation: fadeUp 0.7s ease-out both, float 4.5s ease-in-out 0.7s infinite;
        }
        .nav-underline {
          position: relative;
        }
        .nav-underline::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.3s ease;
        }
        .nav-underline:hover::after {
          width: 100%;
        }
      `}</style>

      <main className="bg-slate-50 px-6 md:px-20 lg:px-40 dark:bg-[#0B1120] transition-colors duration-300 overflow-hidden">

        {/* ---------------- Nav ---------------- */}
        <nav className="py-8 flex items-center justify-between">
          <h1 className="nav-underline inline-block font-mono text-lg text-slate-900 dark:text-white cursor-default">
            <span className="text-amber-600 dark:text-amber-400">&lt;</span>
            Sabahat.dev
            <span className="text-amber-600 dark:text-amber-400"> /&gt;</span>
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle color theme"
            className="flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-mono text-slate-700 dark:text-slate-200 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            {darkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
            {darkMode ? "light" : "dark"}
          </button>
        </nav>

        {/* ---------------- Hero ---------------- */}
        <section className="relative min-h-[85vh] grid md:grid-cols-2 gap-12 items-center">
          {/* Faint dot-grid, like a code editor's minimap texture */}
          <div className="dot-grid absolute inset-0 -z-10 text-slate-300/60 dark:text-slate-700/40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />

          <div className="fade-up" style={{ animationDelay: "0.05s" }}>
            <p className="font-mono text-amber-600 dark:text-amber-400 text-sm mb-3">
              {'// Web developer'}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight whitespace-nowrap">
              Sabahat Yaseen
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mt-3 font-mono">
              building web apps, one component at a time
              <span className="text-amber-500 cursor-blink">_</span>
            </p>
            <p className="text-base md:text-lg leading-8 text-slate-700 dark:text-slate-300 mt-6 max-w-lg">
              I&apos;m a Web Developer with 2+ years of hands-on experience
              building modern, responsive, and user-friendly web applications.
              I specialize in Angular, React, and Next.js, with experience in
              API integration, authentication, state management, and clean,
              scalable UI.
            </p>

            {/* Terminal-style stats strip */}
            <div className="flex gap-8 mt-8 font-mono">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
                    {s.value}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mt-9 flex-wrap ">
              <div className="flex flex-row items-center gap-2 sm:gap-4">
                <a
                  href="#portfolio"
                  className="group/cta flex items-center gap-1 sm:gap-2 rounded-md bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-mono px-3 py-2 sm:px-5 sm:py-3 whitespace-nowrap shadow-lg shadow-amber-600/25 hover:shadow-amber-500/30 transition-all"
                >
                  view my work
                  <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="/resume.pdf"
                  download="Sabahat-Yaseen-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 sm:gap-2 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 text-xs sm:text-sm font-mono px-3 py-2 sm:px-5 sm:py-3 whitespace-nowrap transition-all"
                >
                  download resume
                </a>
              </div>
              <div className="flex gap-4 text-2xl text-slate-500 dark:text-slate-400">

                <a href="https://github.com/sabahatyaseen15" aria-label="GitHub"
                  className="hover:text-amber-500 hover:-translate-y-0.5 transition-all">
                  <AiFillGithub />
                </a>
                <a href="https://www.linkedin.com/in/sabahat-yaseen-4a4193235/" aria-label="LinkedIn"
                  className="hover:text-amber-500 hover:-translate-y-0.5 transition-all">
                  <AiFillLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div
            className="hero-photo mx-auto w-full max-w-sm rounded-xl overflow-hidden shadow-xl shadow-slate-300/40 dark:shadow-black/40 border border-slate-200 dark:border-slate-800"
            style={{ animationDelay: "0.2s" }}
          >
            <WindowChrome label="sabahat.tsx" />
            <div className="relative h-80 md:h-96 w-full">
              <Image
                src={ctnjohnson}
                alt="Sabahat Yaseen"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ---------------- About / Skills ---------------- */}
        <section className="py-20">
          <Reveal>
            <TagHeading tag="About" title="A little about me" />
            <p className="text-base md:text-lg leading-8 text-slate-700 dark:text-slate-300 max-w-2xl">
              I&apos;m a Web Developer with 2+ years of hands-on experience in
              building modern, responsive, and user-friendly web applications. I
              specialize in Angular and have also worked extensively with React
              and Next.js. I enjoy transforming ideas into clean, scalable, and
              interactive digital experiences while focusing on performance,
              usability, and maintainable code.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {skillGroups.map((skill, i) => (
              <Reveal key={skill.file} delay={i * 120}
                className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <WindowChrome label={skill.file} />
                <div className="p-8 text-center">
                  <Image
                    alt=""
                    className="mx-auto"
                    src={skill.icon}
                    height={80}
                  />
                  <h3 className="text-lg font-semibold pt-6 pb-2 text-slate-900 dark:text-white">
                    {skill.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {skill.desc}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Portfolio ---------------- */}
        <section className="py-20" id="portfolio">
          <Reveal>
            <TagHeading tag="Projects" title="Portfolio" />
            <p className="text-base md:text-lg leading-8 text-slate-700 dark:text-slate-300 max-w-2xl">
              A few projects from my journey as a Web Developer — spanning
              business platforms, management systems, and interactive web
              applications, all built while learning something new along the way.
            </p>
          </Reveal>

          <div className="grid gap-8 mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.name} delay={i * 100}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <WindowChrome label={`${project.name}.app`} />
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      className="object-fit group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="font-mono text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">
                        view project
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {project.title}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-2 py-1 rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
<Contact />
        {/* ---------------- Footer ---------------- */}
        <footer className="py-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Sabahat Yaseen — built with Next.js &amp; Tailwind.
          </p>
          <div className="flex gap-5 text-xl text-slate-500 dark:text-slate-400">
            <a href="https://github.com/sabahatyaseen15" aria-label="GitHub" className="hover:text-amber-500 transition-colors"><AiFillGithub /></a>
            <a href="https://www.linkedin.com/in/sabahat-yaseen-4a4193235/" aria-label="LinkedIn" className="hover:text-amber-500 transition-colors"><AiFillLinkedin /></a>
          </div>
        </footer>

      </main>
    </div>
  )
}