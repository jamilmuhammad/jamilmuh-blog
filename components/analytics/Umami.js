import Script from "next/script"

import siteMetadata from "@/data/siteMetadata"

const UmamiScript = () => {
  return (
    <>
      <Script
        async
        defer
        data-website-id={siteMetadata.analytics.umamiWebsiteId}
        src="https://analytics-jamilmuhammadblog.vercel.app/script.js" // Replace with your umami instance
        data-domains="https://jamilmuhammad-blog.vercel.app"
      />
    </>
  )
}

export default UmamiScript
