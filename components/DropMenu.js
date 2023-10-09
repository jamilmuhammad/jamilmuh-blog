import React, { Fragment, Suspense, useEffect, useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import { motion } from "framer-motion"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "./LinkHeader"
import {
  CodeIcon,
  HomeIcon,
  Pencil1Icon,
  PersonIcon,
  ArchiveIcon,
  EnterIcon,
  HamburgerMenuIcon,
  FrameIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons"
import useSound from "use-sound"

export default function DropMenu() {
  const ref = React.createRef()

  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const toggleIcon = () => {
    setIsOpen(!isOpen)
  }

  const [ThemeSound] = useSound("/static/sounds/page-change.mp3")

  return (
    <Menu as="div" className="z-80 relative  text-left ">
      <div>
        <Menu.Button
          as={React.Fragment}
          className=" ml-2 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:bg-violet-400 hover:ring-1 dark:bg-zinc-700 dark:ring-violet-700 dark:hover:bg-violet-600"
        >
          <motion.button
            className="flex h-8 w-8 items-center justify-center p-2"
            whileTap={{
              scale: 0.5,
            }}
            transition={{ duration: 0.1, ease: "easeIn" }}
            aria-label="Toggle List Menu"
            type="button"
          >
            <Suspense>
              {isOpen ? (
                <HamburgerMenuIcon className="h-4 w-4" />
              ) : (
                <HamburgerMenuIcon className="h-4 w-4" />
              )}
            </Suspense>
          </motion.button>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        afterEnter={() => {
          toggleIcon()
          ThemeSound()
        }}
        afterLeave={() => {
          toggleIcon()
          ThemeSound()
        }}
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-zinc-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-zinc-700 dark:bg-zinc-800 ">
          <div className="py-1">
            <Menu.Item ref={ref}>
              {({ active }) => (
                <Link
                  href="/"
                  className={
                    (active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm")
                  }
                >
                  <div className="flex flex-row">
                    <Suspense>
                      <HomeIcon className="mr-4 mt-0.5" /> Home
                    </Suspense>
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item ref={ref}>
              {({ active }) => (
                <Link
                  href="/blog"
                  className={
                    (active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm")
                  }
                >
                  <div className="flex flex-row">
                    <Suspense>
                      <Pencil1Icon className="mr-4 mt-0.5" /> Blog
                    </Suspense>
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item ref={ref}>
              {({ active }) => (
                <Link
                  href="/tags"
                  className={
                    (active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm")
                  }
                >
                  <div className="flex flex-row">
                    <Suspense>
                      <FrameIcon className="mr-4 mt-0.5" /> Tags
                    </Suspense>
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item ref={ref}>
              {({ active }) => (
                <Link
                  href="/projects"
                  className={
                    (active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm")
                  }
                  data-umami-event={`Navigate Menu: Projects`}
                >
                  <div className="flex flex-row">
                    <Suspense>
                      <ArchiveIcon className="mr-4 mt-0.5" /> Projects
                    </Suspense>
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item ref={ref}>
              {({ active }) => (
                <Link
                  href="/guestbook"
                  className={
                    (active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm")
                  }
                  data-umami-event={`Navigate Menu: Guestbook`}
                >
                  <div className="flex flex-row">
                    <Suspense>
                      <ChatBubbleIcon className="mr-4 mt-0.5" /> Guestbook
                    </Suspense>
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item ref={ref}>
              {({ active }) => (
                <Link
                  href="/about"
                  className={
                    (active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm")
                  }
                  data-umami-event={`Navigate Menu: About`}
                >
                  <div className="flex flex-row">
                    <Suspense>
                      <PersonIcon className="mr-4 mt-0.5" /> About
                    </Suspense>
                  </div>
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
