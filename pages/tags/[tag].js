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
  const res = await fetchData(ARTICLE_URL("", tag))

  if (!res) {
    return {
      props: {
        error: true,
      },
    }
  }

  const data = {
    data: res?.data,
    pagination: res?.pagination,
    tag,
  }

  return {
    props: {
      data,
      error: false,
    },
  }
}

export default function Tag({ data, error }) {
  return (
    <>
      {!error && data?.data.length > 0 ? (
        <>
          <PageSEO
            title={`${data.tag} - ${siteMetadata.author}`}
            description={`${data.tag} tags - ${siteMetadata.author}`}
          />
          <ListLayout posts={data.data} pagination={data.pagination} title={data.tag} />
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
