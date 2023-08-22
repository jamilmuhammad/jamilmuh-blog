import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { fetchData } from "@/service/article"
import { ARTICLE_URL, ARTICLE_URL_PAGINATION } from "@/lib/utils/constants"

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
  const pageNumber = parseInt(page)

  const { data, pagination, meta, status } = await fetchData(ARTICLE_URL_PAGINATION(pageNumber))

  if (status !== 200) {
    throw new Error(`Failed to fetch posts, received status ${status}`)
  }

  return {
    props: {
      data,
      pagination,
    },
    revalidate: 43200,
  }
}

export default function PostPage({ data, pagination }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout posts={data} pagination={pagination} title="All Posts" />
    </>
  )
}
