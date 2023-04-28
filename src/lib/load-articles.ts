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

export async function getLatestAndFeaturedArticles(): Promise<{
  latestArticle: IArticle
  featuredArticle: IArticle | null
}> {
  const articles = await getArticlesFromAPI()

  // Get latest article
  const latestArticle = articles[0]

  // Get featured article
  const featuredArticle =
    articles.find(
      (article) =>
        article.slug ===
        'deploy-docker-application-to-droplet-using-github-actions-cicd-o8a'
    ) || null

  return { latestArticle, featuredArticle }
}
