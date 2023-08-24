import { getPlaylistsFromCache } from './utils'

export async function getAccessToken(): Promise<any> {
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
            ':' +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64'),
    },
    body: params,
  })

  return response.json()
}

export async function getPlaylistFromAPI(): Promise<any> {
  const { access_token } = await getAccessToken()

  const response = await fetch(
    'https://api.spotify.com/v1/users/31gv36hn5nnojr335xoy327cixs4/playlists?limit=8',
    { method: 'GET', headers: { Authorization: 'Bearer ' + access_token } }
  )

  if (!response.ok) {
    // if there is a server error, get projects from cache
    return getPlaylistsFromCache()
  } else {
    return response.json()
  }
}
