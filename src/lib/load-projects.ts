import { getProjectsFromCache } from './utils'

export async function getProjectsFromApi(): Promise<any> {
  const response = await fetch(
    'https://api.github.com/users/wildanazz/repos?sort=pushed&per_page=9',
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
