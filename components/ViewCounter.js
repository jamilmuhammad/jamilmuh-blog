import React, { useEffect } from "react"
const { default: useSWR } = require("swr")
import fetcher from "lib/fetcher"

export default function ViewCounter(slug, className, blogPage = false) {
  let { data } = useSWR(`/api/views/${slug}`, fetcher)
  let views = new Number(data?.total || 0)

  useEffect(() => {
    let registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: "POST",
      })

    if (blogPage) {
      registerView()
    }
  }, [blogPage, slug])

  return <span className={className}>{`${views > 0 ? views.toLocaleString() : "–––"}`}</span>
}
