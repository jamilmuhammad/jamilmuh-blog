import { PageSEO, TagSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import generateRss from "@/lib/generate-rss"
import { getAllArticleByTag } from "@/lib/api"
import { ARTICLE_URL, TAG_URL_PATH } from "@/lib/utils/constants"
import { fetchData } from "@/service/article"
import fs from "fs"

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

  if (!res?.data) {
    return {
      redirect: {
        destination: "/tags",
        permanent: false,
      },
    }
  }
  // //   // rss
  if (res?.data.length > 0) {
    const rss = generateRss(res?.data)
    fs.writeFileSync("./public/feed.xml", rss)
  }

  return {
    props: {
      data: res?.data,
      pagination: res?.pagination,
      tag,
    },
    revalidate: 43200,
  }
}

export default function Tag({ data, pagination, tag }) {
  return (
    <>
      <PageSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={data} pagination={pagination} title={tag} />
    </>
  )
}
