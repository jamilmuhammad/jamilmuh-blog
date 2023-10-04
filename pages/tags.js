import Link from "@/components/Link"
import { PageSEO } from "@/components/SEO"
import Tag from "@/components/Tag"
import siteMetadata from "@/data/siteMetadata"
import { TAG_URL } from "@/lib/utils/constants"
import { fetchData } from "@/service/article"

export async function getStaticProps() {
  const res = await fetchData(TAG_URL)
  const { data, meta, pagination, status } = res

  return { props: { data } }
}

export default function Tags({ data }) {
  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      {
        <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-x-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
              Tags
            </h1>
          </div>
          <div className="flex max-w-lg flex-wrap">
            {data?.length === 0 && "No tags found."}
            {data?.map((tag) => {
              return (
                <div key={tag?.id} className="mb-2 mr-5 mt-2">
                  <Tag text={tag?.name} />
                  <Link
                    href={`/tags/${tag?.name}`}
                    className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  >
                    {` (${tag?.articles_count})`}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      }
    </>
  )
}
