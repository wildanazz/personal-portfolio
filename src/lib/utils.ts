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

export function getLanguagesFromCache(): Promise<any> {
  const cacheContents = fs.readFileSync(
    path.join(process.cwd(), 'languages-cache.json'),
    'utf-8'
  )

  return JSON.parse(cacheContents)
}

export function writePlaylistsToCache(playlists: any[]) {
  fs.writeFileSync(
    path.join(process.cwd(), 'playlists-cache.json'),
    JSON.stringify(playlists)
  )
}

export function getPlaylistsFromCache(): any[] {
  const cacheContents = fs.readFileSync(
    path.join(process.cwd(), 'playlists-cache.json'),
    'utf-8'
  )

  return JSON.parse(cacheContents)
}
