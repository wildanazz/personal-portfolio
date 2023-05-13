import IArticle from '@/interfaces/IArticle'

export async function getArticlesFromAPI(): Promise<IArticle[]> {
  const response = await fetch('https://dev.to/api/articles/me/published', {
    method: 'GET',
    headers: { 'api-key': `${process.env.DEV_API_KEY}` },
  })

  if (!response.ok) {
    // if there is a server error, get articles from cache
    return getArticlesFromAPI()
  } else {
    return response.json()
  }
}
