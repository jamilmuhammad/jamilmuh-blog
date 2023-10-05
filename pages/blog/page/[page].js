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
  try {
    const response = await fetch(`https://jamilmuhammad.my.id/api/v1/article?page=${page}`)

    if (!response.ok) {
      throw new Error(`Failed to retrieve data / Error: ${response.status}`)
    }

    const data = await response.json()

    const posts = data?.data ? data.data : []

    const pagination = data?.pagination ? data.pagination : {}

    return {
      props: {
        posts,
        pagination,
      },
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return {
      props: {
        posts: null,
        pagination: null,
      }, // You can handle errors gracefully
    }
  }
}

export default function PostPage({ posts, pagination }) {
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
