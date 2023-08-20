import React from "react"

export default function ViewCounter({ className, views }) {
  return <span className={className}>{`${views > 0 ? views.toLocaleString() : "–––"}`}</span>
}
