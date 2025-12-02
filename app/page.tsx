import MotionDiv from "@/components/MotionDiv";
import CanvaScene from "@/components/Scene";
import { Download } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const variants = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,

      opacity: 1,
    },
    transition: {
      duration: 1,
    },
  };

  return (
    <MotionDiv className="h-full" {...variants}>
      <div className="flex h-full w-full flex-col items-center justify-center md:flex-row">
        {/* CANVAS CONTAINER */}
        <div className="h-[50%] w-full md:h-full md:w-[50%]">
          <CanvaScene />
        </div>

        {/* TEXT CONTAINER */}
        <div className="flex flex-col justify-center gap-8 max-lg:px-4 md:h-full md:w-1/2">
          {/* TITLE */}
          <h1 className="text-4xl font-bold md:text-6xl">Hi,</h1>
          {/* DESC */}
          <p className="md:text-xl">
            I’m a frontend-focused full-stack developer with 1.2 years of
            experience building fast, interactive, and visually rich web
            applications. I work extensively with React, Next.js, Vue, and
            TypeScript, and I specialize in crafting smooth UI and 3D
            experiences using Three.js, React Three Fiber, GSAP, and Framer
            Motion. I’m passionate about performance, clean engineering, and
            building engaging digital experiences end-to-end.
          </p>

          {/* BUTTONS */}
          <div className="flex w-full gap-4">
            <a
              href="/senthil_resume.pdf"
              download="senthil_resume.pdf"
              className="flex items-center gap-2 rounded-full bg-black p-1 px-2 text-white dark:bg-white dark:text-black"
            >
              Resume
              <Download size={20} />
            </a>
            <Link
              href="/contact"
              title="Contact Me"
              className="rounded-full bg-black p-1 px-2 text-white dark:bg-white dark:text-black"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
