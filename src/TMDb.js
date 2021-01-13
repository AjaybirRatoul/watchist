import defaultMoviePoster from "./assets/default_movie_poster.png"

// Constants for base URLS
export const baseURLTMDbAPI = "https://api.themoviedb.org/3/"
export const baseURLTMDbPoster = "https://image.tmdb.org/t/p/w342/"
export const baseURLTMDbBackDrop = "https://image.tmdb.org/t/p/original/"

// Searching TMDb with query
export async function searchWithQuery(query) {
  const res = await fetch(
    `${baseURLTMDbAPI}search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  )
  const resJSON = res.json()
  return resJSON
}

// Searching TMDb with id and type
export async function searchWithID(id, type) {
  const res = await fetch(
    type === "movie"
      ? `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      : `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  )
  const resJSON = res.json()
  return resJSON
}

// Filtering data of a media result
export function filterData(result) {
  return {
    title: result.original_title || result.original_name || "No title",
    poster: result.poster_path
      ? `${baseURLTMDbPoster}${result.poster_path}`
      : defaultMoviePoster,
    posterBackdrop: result.backdrop_path
      ? `${baseURLTMDbBackDrop}${result.backdrop_path}`
      : null,
    yearRelease: result.release_date
      ? result.release_date.substring(0, 4)
      : result.first_air_date
      ? result.first_air_date.substring(0, 4)
      : "No Date",
    type: result.media_type === "movie" ? "Movie" : "Show",
    id: result.id,
    overview: result.overview,
  }
}
