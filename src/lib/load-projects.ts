import IProject from '@/interfaces/IProject'
import { getProjectsFromCache } from './utils'

export async function getProjectsFromApi(): Promise<IProject[]> {
  const response = await fetch(
    'https://api.github.com/users/wildanazz/repos?sort=pushed',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  )

  if (!response.ok) {
    // if there is a server error, get projects from cache
    return getProjectsFromCache()
  } else {
    return response.json()
  }
}
