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
  const res = await getAllArticleByTag(tag)

  const data = {
    data: res?.data || null,
    pagination: res?.pagination || null,
    tag,
  }

  return {
    props: {
      data,
    },
  }
}

export default function Tag({ data }) {
  return (
    <>
      <PageSEO
        title={`${data.tag} - ${siteMetadata.author}`}
        description={`${data.tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={data.data} pagination={data.pagination} title={data.tag} />
    </>
  )
}
