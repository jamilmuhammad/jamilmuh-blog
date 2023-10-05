import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { fetchData } from "@/service/article"
import { ARTICLE_URL, ARTICLE_URL_PAGINATION } from "@/lib/utils/constants"
import { getAllArticleByPage } from "@/lib/api"
import PageTitle from "@/components/PageTitle"

export async function getStaticPaths() {
  const data = await fetchData(ARTICLE_URL())
  const paths = Array.from({ length: data?.pagination?.total_page }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { page } }) {
  const res = await fetchData(ARTICLE_URL_PAGINATION(page))

  if (!res) {
    return {
      props: {
        error: true,
      },
    }
  }

  const data = res?.data || []

  const pagination = res?.pagination || {}

  return {
    props: {
      data,
      pagination,
      error: false,
    },
  }
}

export default function PostPage({ data, error }) {
  return (
    <>
      {!error && data?.data.length > 0 ? (
        <>
          <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
          <ListLayout posts={data.data} pagination={data.pagination} title="All Posts" />
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
