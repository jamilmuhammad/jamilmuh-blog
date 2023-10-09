import { Suspense, useEffect, useState } from "react"
import { ClapButton } from "@lyket/react"
import ScrollTop from "@/components/ScrollTop"

const ScrollTopAndComment = ({ slug }) => {
  const [show, setShow] = useState(false)

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
        className={`fixed bottom-9 right-12 hidden flex-col gap-6 ${
          show ? "md:flex" : "md:hidden"
        }`}
      >
        <Suspense>
          <span className="mb-16">
            <ClapButton
              id={slug}
              namespace="post"
              hideCounterIfLessThan={0}
              data-umami-event={`Support Clap: ${slug}`}
            />
          </span>
        </Suspense>
      </div>
      <ScrollTop />
    </>
  )
}

export default ScrollTopAndComment
