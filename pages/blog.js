import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import { PageSEO } from "@/components/SEO"
import { ARTICLE_URL } from "@/lib/utils/constants"
import { fetchData } from "@/service/article"

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const { data, pagination, meta } = await fetchData(ARTICLE_URL())

  return { props: { data, pagination } }
}

export default function Blog({ data, pagination }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout posts={data} pagination={pagination} title="All Posts" />
    </>
  )
}
