export default function SectionContainer({ children, isNav = false }) {
  return (
    <div
      className={"mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0" + (isNav ? " " : " mt-16")}
    >
      {children}
    </div>
  )
}
