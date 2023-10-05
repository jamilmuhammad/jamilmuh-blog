import PageTitle from "@/components/PageTitle"
import { PageSEO, TagSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { getAllArticleByTag } from "@/lib/api"
import { ARTICLE_URL, TAG_URL_PATH } from "@/lib/utils/constants"
import { fetchData } from "@/service/article"

export async function getStaticPaths() {
  const { data: paths } = await fetchData(TAG_URL_PATH)

  return {
    paths: paths.map((p) => ({
      params: {
        tag: p.path,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params: { tag } }) {
  try {
    const response = await fetch(`https://jamilmuhammad.my.id/api/v1/article?ex_tag=${tag}`)

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
        tag,
      },
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return {
      props: {
        posts: null,
        pagination: null,
        tag: null,
      }, // You can handle errors gracefully
    }
  }
}

export default function Tag({ posts, pagination, tag }) {
  return (
    <>
      {posts != null || posts.length > 0 ? (
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
