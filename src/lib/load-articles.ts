import IArticle from '@/interfaces/IArticle'

export async function getArticlesFromAPI(): Promise<IArticle[]> {
  const response = await fetch('https://dev.to/api/articles/me', {
    method: 'GET',
    headers: { 'api-key': `${process.env.DEV_API_KEY}` },
    next: { revalidate: 300 },
  })
  const articles = await response.json()

  return articles
}
