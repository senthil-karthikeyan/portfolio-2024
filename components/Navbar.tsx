"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import linksData from "@/links.json";
import DarkModeToggle from "./DarkMode";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Mail } from "lucide-react";
Mail;

export const Navbar = () => {
  const path = usePathname();
  const splitUrl = path.slice(1);
  const url = splitUrl.split("/")[0];
  const link = linksData.links;
  const socialLink = [
    {
      link: "https://github.com/senthil-karthikeyan",
      icon: GitHubLogoIcon,
    },
    {
      link: "https://www.linkedin.com/in/senthil-karthikeyan",
      icon: LinkedInLogoIcon,
    },
    {
      link: "mailto:senthil.karthikeyan.official@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <div className="fixed top-0 z-[10] flex h-[5vh] w-full max-w-7xl items-center gap-5 backdrop-blur">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center justify-center rounded-md p-1 text-sm font-semibold"
      >
        <span className="mr-1 text-black dark:text-white">Senthil</span>
        <span className="flex h-8 w-12 items-center justify-center rounded bg-black text-white transition-all dark:bg-white dark:text-black">
          .dev
        </span>
      </Link>

      {/* Web Navbar */}
      <div className="hidden w-full items-center justify-between gap-5 md:flex">
        <div className="flex gap-5">
          {link.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className={`group flex flex-col ${
                item.link.slice(1) === url &&
                "rounded-md bg-green-300 px-2 text-black hover:bg-green-400/80 hover:transition-all hover:duration-300"
              }`}
            >
              {item.name}
              <span
                className={`${
                  item.link.slice(1) !== url &&
                  "w-[20%] rounded-2xl border-b-4 border-green-400 duration-300 group-hover:w-[80%]"
                } `}
              ></span>
            </Link>
          ))}
        </div>
        <div className="ml-auto flex gap-5">
          {socialLink.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                href={item.link}
                key={index}
                className="group relative h-[24px] w-[24px]"
                target="_blank"
              >
                <Icon className="h-full w-full group-hover:scale-150 group-hover:transition-all group-hover:duration-300" />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="ml-auto flex gap-6 md:gap-0">
        <DarkModeToggle />
        {/* Mobile Navbar */}
        <div className="z-50 flex items-center justify-between border-red-300 md:hidden md:translate-y-80">
          <MobileNav />
        </div>
      </div>
    </div>
  );
};
