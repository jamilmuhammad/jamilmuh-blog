import PageTitle from "@/components/PageTitle"
import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import Fetcher from "@/lib/fetcher"
import { API_URL } from "@/lib/utils/constants"
import { useRouter } from "next/router"
import useSWR from "swr"

export default function Tag() {
  const router = useRouter()

  const { tag } = router.query

  const { data: responseDataArticle, error: responseErrorArticle } = useSWR(
    `${API_URL}article?ex_tag=${tag}`,
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
          <PageSEO
            title={`${tag} - ${siteMetadata.author}`}
            description={`${tag} tags - ${siteMetadata.author}`}
          />
          <ListLayout posts={posts} pagination={pagination} title={tag} />
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
