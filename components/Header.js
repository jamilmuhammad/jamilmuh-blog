import siteMetadata from "@/data/siteMetadata"
import headerNavLinks from "@/data/headerNavLinks"
import Logo from "@/data/logo_green.svg"

import Link from "./Link"
import SectionContainer from "./SectionContainer"
import ThemeSwitch from "./ThemeSwitch"
import Typewriter from "typewriter-effect"
import { useRouter } from "next/router"
import DropMenu from "./DropMenu.js"

const Header = () => {
  const router = useRouter()

  return (
    <>
      <header className="fixed top-0 z-50 w-full transition-all">
        <SectionContainer isNav>
          <nav className="supports-backdrop-blur:bg-white/75 bg-white/15 dark:bg-dark/15 sticky top-0 z-40 flex h-full py-5 backdrop-blur lg:flex-wrap">
            <div className=" flex-start flex max-w-3xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
              <Link href="/" aria-label={siteMetadata.headerTitle}>
                <div className="flex items-center justify-between">
                  <div className="mr-1"></div>
                  {/* {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                  {siteMetadata.headerTitle}
                  </div>
                  ) : (
                    siteMetadata.headerTitle
                  )} */}
                </div>
                <div className="text-primary-color dark:text-primary-color-dark flex items-center justify-between text-xl font-semibold">
                  <Logo className="h-18 w-20" />
                  {`~${router.asPath}`}{" "}
                  <Typewriter
                    options={{
                      strings: [],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </div>
              </Link>
            </div>
            <div className="flex-end ml-auto flex content-end items-center justify-end text-base leading-5">
              <div className="flex-end hidden sm:block">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="link-underline rounded px-2 py-1 text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 sm:px-3 sm:py-2"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <ThemeSwitch />
              <DropMenu />
            </div>
          </nav>
        </SectionContainer>
      </header>
    </>
  )
}

export default Header
