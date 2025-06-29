"use client";

import { BiSearchAlt2 } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";
import LogoutButton from "@/features/auth/ui/logout-button";
import ThemeSwitchButton from "@/features/theme/ui/theme-switch-button";
import { AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { authClient } from "@/shared/lib/auth-client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();
  const session = authClient.useSession();
  const isAuthed = !!session.data?.session;
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие по клику вне dropdown
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  if (!mounted) return null;

  return (
    <header className="header sm:p-2 sticky top-0 z-50">
      <div className="header__wrapper gap-4 max-w-[1400px] w-full mx-auto flex items-center justify-between px-5 py-2.5 rounded bg-primary">
        {/* Логотип и поиск */}
        <div className="header__left flex w-full items-center gap-5 max-w-xl">
          <Link
            href={
              mounted && !session.isPending && isAuthed ? "/dashboard" : "/"
            }
            className="header__text text-base font-bold text-white shrink-0"
          >
            Сайт
          </Link>
          {/* Поиск на всю ширину, скрывается на lg и меньше */}
          <div className="header__search flex items-stretch gap-2 flex-1 w-full lg:flex">
            <motion.input
              type="search"
              className="header__search-input w-full px-4 py-2.5 border-2 border-white text-white rounded bg-transparent outline-none"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              animate={
                inputFocused
                  ? {
                      scale: 1.04,
                      boxShadow: "0 0 0 2px #fff, 0 2px 16px #0002",
                      backgroundColor: "#ffffff18",
                      borderColor: "#fff",
                    }
                  : {
                      scale: 1,
                      boxShadow: "none",
                      backgroundColor: "transparent",
                      borderColor: "#fff",
                    }
              }
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            />
            <motion.button
              aria-label="Искать"
              className="header__search-button cursor-pointer p-2.5 border-2 rounded border-white flex items-center"
              onClick={() => router.push(`/search?query=${searchQuery}`)}
              whileHover={{ scale: 1.12, backgroundColor: "#fff2" }}
              whileTap={{ scale: 0.95, rotate: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <BiSearchAlt2 color="white" fontSize="1.75rem" />
            </motion.button>
          </div>
        </div>
        {/* Навигация и профиль */}
        <div className="header__right text-base font-bold flex items-center gap-5">
          <nav className="hidden lg:flex">
            <ul className="flex items-center gap-5 text-white">
              {mounted && !session.isPending && isAuthed ? (
                <>
                  <li>
                    <motion.div whileHover={{ scale: 1.08 }}>
                      <Link
                        href="/dashboard"
                        className="relative after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 after:transition-transform after:duration-200 after:origin-left hover:after:scale-x-100"
                      >
                        Главная
                      </Link>
                    </motion.div>
                  </li>
                  <li>
                    <motion.div whileHover={{ scale: 1.08 }}>
                      <Link
                        href="/my-subjects"
                        className="relative after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 after:transition-transform after:duration-200 after:origin-left hover:after:scale-x-100"
                      >
                        Мои предметы
                      </Link>
                    </motion.div>
                  </li>
                  {/* <li>
                    <Link href="/queues">Очереди</Link>
                  </li> */}
                </>
              ) : (
                <li>
                  <motion.div whileHover={{ scale: 1.08 }}>
                    <Link
                      href="/sign-in"
                      className="relative after:content-[''] after:block after:h-[2px] after:bg-white after:scale-x-0 after:transition-transform after:duration-200 after:origin-left hover:after:scale-x-100"
                    >
                      Войти
                    </Link>
                  </motion.div>
                </li>
              )}
            </ul>
          </nav>
          {mounted && !session.isPending && isAuthed && (
            <div
              className="relative hidden md:block"
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="flex min-w-44 items-center gap-2 bg-white text-black pl-5 pr-1.5 py-1.5 rounded transition-all"
                onClick={() => setDropdownOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setDropdownOpen(false);
                }}
              >
                <span>{session.data?.user.name}</span>
                <Image
                  width={40}
                  height={40}
                  src={
                    session.data?.user.image || "/images/default-user-image.png"
                  }
                  alt="User Avatar"
                  className="rounded-full"
                />
                <motion.span
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center"
                >
                  <MdKeyboardArrowDown fontSize="1.75rem" />
                </motion.span>
              </button>
              {/* Мостик между кнопкой и dropdown */}
              <div
                className="absolute right-50% -translate-x-1/2 w-[200%]"
                style={{
                  height: 16,
                  top: "100%",
                  zIndex: 10,
                }}
              />
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="header__profile-dropdown-content mt-2 shadow absolute w-[200%] p-2 top-full right-1/2 rounded translate-x-1/2 bg-white flex"
                    tabIndex={-1}
                  >
                    <ul className="flex flex-col gap-4 w-full">
                      <li>
                        <Link
                          className="block w-full px-4 py-2 rounded border-2 border-gray-300 text-black"
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <AiOutlineUser
                            className="inline-block mr-2"
                            fontSize="1.5rem"
                          />
                          Профиль
                        </Link>
                      </li>
                      <li>
                        <LogoutButton className="w-full" />
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {/* ThemeSwitchButton только на десктопе */}
          <div className="hidden lg:block">
            <ThemeSwitchButton />
          </div>
          {/* Бургер только на lg и меньше */}
          <motion.button
            className="flex lg:hidden items-center p-2 text-white"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Открыть меню"
            whileTap={{ scale: 0.9 }}
          >
            <svg width={32} height={32} fill="none" viewBox="0 0 24 24">
              <rect
                x="4"
                y="7"
                width="16"
                height="2"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="4"
                y="15"
                width="16"
                height="2"
                rx="1"
                fill="currentColor"
              />
            </svg>
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[100] bg-black/70 flex"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="ml-auto w-4/5 max-w-xs bg-primary p-6 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="self-end text-white mb-4"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Закрыть меню"
              >
                ✕
              </button>
              {/* Информация о пользователе только для авторизованных */}
              {mounted && !session.isPending && isAuthed && (
                <div className="flex flex-col items-center gap-2 mb-4">
                  <Image
                    width={56}
                    height={56}
                    src={
                      session.data?.user.image ||
                      "/images/default-user-image.png"
                    }
                    alt="User Avatar"
                    className="rounded-full"
                  />
                  <span className="text-white font-semibold">
                    {session.data?.user.name}
                  </span>
                  <span className="text-white text-xs opacity-80">
                    {session.data?.user.email}
                  </span>
                </div>
              )}
              <ul className="flex flex-col gap-4 text-white text-lg">
                <li>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Главная
                  </Link>
                </li>
                <li>
                  <Link
                    href="/my-subjects"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Мои предметы
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Профиль
                  </Link>
                </li>
                <li>
                  <LogoutButton className="w-full" />
                </li>
              </ul>
              {/* ThemeSwitchButton только в мобильном меню */}
              <div className="mt-auto lg:hidden">
                <ThemeSwitchButton />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
