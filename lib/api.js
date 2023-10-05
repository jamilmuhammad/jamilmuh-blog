import { fetchData } from "@/service/article"
import { ARTICLE_URL, ARTICLE_URL_PAGINATION } from "./utils/constants"

export async function getAllArticleByPage(page) {
  try {
    const { data, pagination } = await fetchData(ARTICLE_URL_PAGINATION(page))
    return { data, pagination }
  } catch (error) {
    return { data: [], pagination: {} }
  }
}

export async function getAllArticleByTag(tag) {
  try {
    const { data, pagination } = await fetchData(ARTICLE_URL("", tag))
    return { data, pagination }
  } catch (error) {
    return { data: [], pagination: {} }
  }
}
