/* eslint-disable jsx-a11y/anchor-has-content */
import Link from "next/link"
import { forwardRef } from "react"

const CustomLinkHeader = forwardRef(({ href, ...rest }, ref) => {
  const isInternalLink = href && href.startsWith("/")
  const isAnchorLink = href && href.startsWith("#")

  if (isInternalLink) {
    return (
      <Link ref={ref} href={href} passHref legacyBehavior>
        <a {...rest} />
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a ref={ref} href={href} {...rest} />
  }

  return (
    <a
      ref={ref}
      className="special-underline-new no-underline hover:text-gray-100 dark:hover:text-gray-100"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    />
  )
})

CustomLinkHeader.displayName = "CustomLinkHeader"

export default CustomLinkHeader
