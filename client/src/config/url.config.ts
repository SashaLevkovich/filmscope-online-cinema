export const getGenreSlugUrl = (slug: string) => `/genres/${slug}`
export const getActorSlugUrl = (slug: string) => `/actor/${slug}`
export const getMovieSlugUrl = (slug: string) => `/movies/${slug}`

export const getAdminIdUrl = (id: string) => `/manage/${id}`
export const getAdminHomeIdUrl = () => getAdminIdUrl('').slice(0, -1)
