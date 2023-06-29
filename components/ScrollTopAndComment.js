import { useEffect, useState } from "react"
import { ClapButton } from "@lyket/react"
import ScrollTop from "@/components/ScrollTop"

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener("scroll", handleWindowScroll)
    return () => window.removeEventListener("scroll", handleWindowScroll)
  }, [])

  return (
    <>
      <div
        className={`fixed bottom-9 right-8 hidden flex-col gap-6 ${show ? "md:flex" : "md:hidden"}`}
      >
        {mounted && (
          <span className="mb-16">
            <ClapButton id="diy-fish-holder" namespace="post" hideCounterIfLessThan={1} />
          </span>
        )}
      </div>
      <ScrollTop />
    </>
  )
}

export default ScrollTopAndComment
