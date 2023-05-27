import fs from 'fs'
import path from 'path'
import IArticle from '@/interfaces/IArticle'
import IProject from '@/interfaces/IProject'

export function writeArticlesToCache(articles: IArticle[]) {
  fs.writeFileSync(
    path.join(process.cwd(), 'cache.json'),
    JSON.stringify(articles)
  )
}

export function getArticlesFromCache(): IArticle[] {
  const cacheContents = fs.readFileSync(
    path.join(process.cwd(), 'cache.json'),
    'utf-8'
  )

  return JSON.parse(cacheContents)
}

export function writeProjectsToCache(projects: IProject[]) {
  fs.writeFileSync(
    path.join(process.cwd(), 'projects-cache.json'),
    JSON.stringify(projects)
  )
}

export function getProjectsFromCache(): IProject[] {
  const cacheContents = fs.readFileSync(
    path.join(process.cwd(), 'projects-cache.json'),
    'utf-8'
  )

  return JSON.parse(cacheContents)
}
