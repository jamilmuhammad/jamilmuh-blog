export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const ARTICLE_URL = (slug = "", tag = "") => {
  return (
    `${API_URL}article` +
    (slug != "" ? `?ex_slug=${slug}` : ``) +
    (tag != "" ? `?ex_tag=${tag}` : ``)
  )
}

export const ARTICLE_URL_PAGINATION = (page = "") => {
  return `${API_URL}article` + (page != "" ? `?page=${page}` : ``)
}

export const ARTICLE_DETAIL_BY_SLUG_URL = (slug) => `${API_URL}article/slug?q=${slug}`

export const ARTICLE_URL_PATH_BY_SLUG = `${API_URL}article/slug/path`

export const TAG_URL = `${API_URL}tag`

export const TAG_URL_PATH = `${API_URL}tag/path`

export const GUESTBOOK_URL = `${API_URL}guestbook`
