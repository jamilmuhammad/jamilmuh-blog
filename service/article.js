import { ARTICLE_URL } from "@/lib/utils/constants"
import { atom } from "jotai"

const isSSR = typeof window === "undefined"

const ARTICLE_DATA = []

export const fetchData = async (url) => {
  const response = await fetch(url, {
    headers: {
      Accept: "*/*",
    },
    method: "GET",
  })

  if (!response.ok) {
    throw new Error(`Failed to retrieve data / Error: ${response.status}`)
  }

  const data = await response.json()

  return {
    ...data,
    status: response.status,
  }
}

export const preparePostData = async () => {
  const prefetched = await fetchData(ARTICLE_URL)
  return prefetched
}

export const articleListCache = atom(ARTICLE_URL)

export const articleListData = atom(async (get) => {
  const cache = await fetchData(get(articleListCache))
  if (isSSR || cache) {
    return cache || ARTICLE_DATA
  }
})
