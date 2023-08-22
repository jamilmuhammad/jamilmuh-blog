import fs from "fs"
import PageTitle from "@/components/PageTitle"
import generateRss from "@/lib/generate-rss"
import { MDXLayoutRenderer } from "@/components/MDXComponents"
import { useRouter } from "next/router"
import { useEffect } from "react"
import {
  API_URL,
  ARTICLE_DETAIL_BY_SLUG_URL,
  ARTICLE_URL,
  ARTICLE_URL_PATH_BY_SLUG,
} from "@/lib/utils/constants"
import { fetchData } from "@/service/article"
import { getFileByUrl } from "@/lib/mdx"

const DEFAULT_LAYOUT = "BlogLayout"

export async function getStaticPaths() {
  const { data: paths } = await fetchData(ARTICLE_URL_PATH_BY_SLUG)

  return {
    paths: paths.map((p) => ({
      params: {
        slug: p.path.split("/"),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const data = await fetchData(ARTICLE_DETAIL_BY_SLUG_URL(slug.toString()))

  let activityDetails = false

  if (data?.data?.markdown) activityDetails = await getFileByUrl(data?.data)

  const authorDetails = data?.data?.user

  const { data: posts } = await fetchData(ARTICLE_URL(slug.toString()))

  // //   // rss
  if (posts.length > 0) {
    const rss = generateRss(posts)
    fs.writeFileSync("./public/feed.xml", rss)
  }

  return { props: { data, activityDetails, authorDetails, posts } }
}

export default function Blog({ data, activityDetails, authorDetails, posts }) {
  const { mdxSource, toc, frontMatter } = activityDetails

  const router = useRouter()

  const query = router.query

  useEffect(() => {
    if (router.isReady) {
      router.push(
        {
          query: {
            slug: query.slug,
          },
        },
        undefined,
        { shallow: true }
      )
    }
  }, [router.isReady])

  return (
    <>
      {authorDetails || data?.status != 200 ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          posts={posts}
        />
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
