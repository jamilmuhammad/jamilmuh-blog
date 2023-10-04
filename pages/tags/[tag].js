import { TagSEO } from "@/components/SEO"
import siteMetadata from "@/data/siteMetadata"
import ListLayout from "@/layouts/ListLayout"
import generateRss from "@/lib/generate-rss"
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
  const { data, pagination, meta, status } = await fetchData(ARTICLE_URL("", tag))

  // //   // rss
  if (data.length > 0) {
    const rss = generateRss(data)
    fs.writeFileSync("./public/feed.xml", rss)
  }

  return {
    props: {
      data,
      pagination,
      tag,
    },
    revalidate: 43200,
  }
}

export default function Tag({ data, pagination, tag }) {
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={data} pagination={pagination} title={tag} />
    </>
  )
}
