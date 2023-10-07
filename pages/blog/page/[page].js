import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import PageTitle from "@/components/PageTitle"
import { useRouter } from "next/router"
import useSWR from "swr"
import Fetcher from "@/lib/fetcher"
import { API_URL } from "@/lib/utils/constants"

export default function PostPage() {
  const router = useRouter()

  const { page } = router.query

  const { data: responseDataArticle, error: responseErrorArticle } = useSWR(
    `${API_URL}article?page=${page}`,
    Fetcher
  )
  const { data: dataArticle } = responseDataArticle || {}
  const { response: errorArticle } = responseErrorArticle || {}

  if (errorArticle) {
    throw new Error(`Failed to retrieve data / Error: ${errorArticle?.data?.message}`)
  }

  const posts = dataArticle ? dataArticle : []

  const pagination = responseDataArticle?.pagination ? dataArticle.pagination : {}
  return (
    <>
      {posts != null ? (
        <>
          <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
          <ListLayout posts={posts} pagination={pagination} title="All Posts" />
        </>
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{" "}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
