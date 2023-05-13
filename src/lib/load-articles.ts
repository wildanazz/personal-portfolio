import IArticle from '@/interfaces/IArticle'

export async function getArticlesFromAPI(): Promise<IArticle[]> {
  const response = await fetch('https://dev.to/api/articles/me/published', {
    method: 'GET',
    headers: { 'api-key': `${process.env.DEV_API_KEY}` },
    next: { revalidate: 10 },
  })
  const articles = await response.json()

  return articles
}
