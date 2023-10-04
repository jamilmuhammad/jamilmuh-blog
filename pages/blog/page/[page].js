import { PageSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { fetchData } from "@/service/article"
import { ARTICLE_URL, ARTICLE_URL_PAGINATION } from "@/lib/utils/constants"
import { getAllArticleByPage } from "@/lib/api"

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
  const res = await getAllArticleByPage(page)

  return {
    props: {
      data: res?.data,
      pagination: res?.pagination,
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
