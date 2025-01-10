import { getFilmsFromCache } from './utils'

export async function getFilmsFromAPI(): Promise<any> {
  // const response = await fetch('http://localhost:5000/films', {
  //   method: 'GET',
  //   headers: { 'api-key': `${process.env.LB_API_KEY}` },
  // })

    // if (!response.ok) {
        // if there is a server error, get projects from cache
        return getFilmsFromCache()
    // } else {
    //     return response.json()
    // }
}
