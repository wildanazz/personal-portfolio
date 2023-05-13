import fs from 'fs'
import path from 'path'
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
    const cacheContents = fs.readFileSync(
      path.join(process.cwd(), 'cache.json'),
      'utf-8'
    )
    return JSON.parse(cacheContents)
    // const article = JSON.parse(cacheContents).find(
    //   (cachedArticle: { id: number; slug: string }) =>
    //     cachedArticle.slug === params.slug
    // )
  } else {
    return await response.json()
  }
}
