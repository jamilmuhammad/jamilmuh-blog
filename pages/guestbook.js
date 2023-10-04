import Guestbook from "@/components/Guestbook"
import siteMetadata from "@/data/siteMetadata"
import { PageSEO } from "@/components/SEO"
import { fetchData } from "@/service/article"
import { GUESTBOOK_URL } from "@/lib/utils/constants"

export default function GuestbookPage({ fallbackData }) {
  return (
    <>
      <PageSEO
        title={`Guestbook - ${siteMetadata.author}`}
        description="Guestbook for my future visitors"
      />
      <div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
        {/* <h1 className="mb-4 text-3xl font-bold 
      tracking-tight text-black dark:text-white md:text-5xl">
        Guestbook
      </h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Leave a comment below. It could be anything – appreciation, information, wisdom, or even
        humor. Surprise me!
      </p> */}
        <div className="space-y-2 pb-6 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Guestbook
          </h1>
          <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
            Hey there, fellow traveler of the internet! I'm thrilled to have you stop by my little
            corner of the web.
          </p>
          <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
            Leave a comment below for every travelers. Feel free to set foot, jot down whether it's
            a warm hello, a kind word, or a memorable anecdote. This space is ours to express and
            connect.
          </p>
          <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
            Thanks for being a part of my journey.
          </p>
        </div>
        <Guestbook fallbackData={fallbackData} />
      </div>
    </>
  )
}
export async function getStaticProps() {
  const { data, pagination, meta } = await fetchData(GUESTBOOK_URL)

  return {
    props: {
      data,
    },
    revalidate: 60,
  }
}
