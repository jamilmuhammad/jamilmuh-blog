import { Fragment, useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import { motion } from "framer-motion"
import classNames from "classnames"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "./Link"
import {
  CodeIcon,
  HomeIcon,
  Pencil1Icon,
  DiscIcon,
  HamburgerMenuIcon,
  Cross1Icon,
  FrameIcon,
  LaptopIcon,
  BarChartIcon,
  DrawingPinIcon,
  Link2Icon,
  QuoteIcon,
  CalendarIcon,
  PersonIcon,
  ArchiveIcon,
  TwitterLogoIcon,
  RocketIcon,
  ChatBubbleIcon,
  EnterIcon,
} from "@radix-ui/react-icons"
import useSound from "use-sound"

export default function DropMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const toggleIcon = () => {
    setIsOpen(!isOpen)
  }

  const [ThemeSound] = useSound("/static/sounds/page-change.mp3")

  return (
    <Menu as="div" className="relative z-10 inline-block text-left ">
      <div>
        <Menu.Button className=" ml-2 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:bg-violet-400 hover:ring-1 dark:bg-zinc-700 dark:ring-violet-700 dark:hover:bg-violet-600">
          <motion.button
            className="flex h-8 w-8 items-center justify-center p-2"
            whileTap={{
              scale: 0.5,
            }}
            transition={{ duration: 0.1, ease: "easeIn" }}
            aria-label="Toggle List Menu"
            type="button"
          >
            {isOpen ? (
              <HamburgerMenuIcon className="h-4 w-4" />
            ) : (
              <HamburgerMenuIcon className="h-4 w-4" />
            )}
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
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <HomeIcon className="mr-4 mt-0.5" /> Home
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/blog"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <Pencil1Icon className="mr-4 mt-0.5" /> Blog
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/snippets"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <CodeIcon className="mr-4 mt-0.5" /> Snippets
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/projects"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <ArchiveIcon className="mr-4 mt-0.5" /> Projects
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/about"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <PersonIcon className="mr-4 mt-0.5" /> About
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <>
                  <Link>
                    <a
                      className={classNames(
                        active
                          ? "cursor-pointer bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                          : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                        "block cursor-pointer px-4 py-2 text-sm"
                      )}
                    >
                      <div className="flex flex-row">
                        {session ? (
                          <>
                            <div className="mr-2 flex flex-row items-center">
                              {session.user?.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  className="h-6 w-6 cursor-pointer rounded-full"
                                  src={session.user.image}
                                  alt="User Profile Icon"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="" onClick={() => signOut()}>
                              Sign Out
                            </div>
                          </>
                        ) : (
                          <>
                            <EnterIcon />
                            <div className="ml-4" onClick={() => signIn()}>
                              Sign In
                            </div>
                          </>
                        )}
                      </div>
                    </a>
                  </Link>
                </>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/contact"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <Link2Icon className="mr-4 mt-0.5" /> Contact
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/tags"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <FrameIcon className="mr-4 mt-0.5" /> Tags
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/guestbook"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <ChatBubbleIcon className="mr-4 mt-0.5" /> Guestbook
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/uses"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <LaptopIcon className="mr-4 mt-0.5" /> Uses
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/now"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <DiscIcon className="mr-4 mt-0.5" /> Now
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/stats"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <BarChartIcon className="mr-4 mt-0.5" /> Stats
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/journey"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <RocketIcon className="mr-4 mt-0.5" /> Journey
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/recommends"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <DrawingPinIcon className="mr-4 mt-0.5" /> Recommends
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/quotes"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <QuoteIcon className="mr-4 mt-0.5" /> Quotes
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/activity"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <CalendarIcon className="mr-4 mt-0.5" /> Activity
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/tweets"
                  className={classNames(
                    active
                      ? "bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300"
                      : "bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex flex-row">
                    <TwitterLogoIcon className="mr-4 mt-0.5" /> Tweets
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
