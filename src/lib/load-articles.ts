import IArticle from '@/interfaces/IArticle'

export async function getArticlesFromAPI(): Promise<IArticle[]> {
  const response = await fetch('https://dev.to/api/articles/me/published', {
    method: 'GET',
    headers: { 'api-key': `${process.env.DEV_API_KEY}` },
  })

  if (!response.ok) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(`Failed to fetch posts, received status ${response.status}`)
  }

  const articles = await response.json()

  return articles
}
