"use client";

import { BsSunFill } from "react-icons/bs";
import { AiOutlineMoon } from "react-icons/ai";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ThemeSwitchButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label="Сменить тему"
      className="header__theme-switcher-button cursor-pointer"
      whileHover={{
        rotate: [0, -15, 15, -10, 10, -5, 5, 0],
        transition: { duration: 0.5 },
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.25 }}
            style={{ display: "inline-block" }}
          >
            <BsSunFill color="white" fontSize={48} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
            transition={{ duration: 0.25 }}
            style={{ display: "inline-block" }}
          >
            <AiOutlineMoon color="white" fontSize={48} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
