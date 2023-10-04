import { fetchData } from "@/service/article"
import { ARTICLE_URL, ARTICLE_URL_PAGINATION } from "./utils/constants"

export async function getAllArticleByPage(page) {
  const { data, pagination } = await fetchData(ARTICLE_URL_PAGINATION(page))

  return { data, pagination }
}

export async function getAllArticleByTag(tag) {
  const { data, pagination } = await fetchData(ARTICLE_URL("", tag))

  return { data, pagination }
}
