export const getGenresListEach = (
  name: string,
  index: number,
  length: number
) => (index + 1 === length ? `${name}` : `${name}, `)

interface IArrayItem {
  name: string
}

export const getGenresList = (array: IArrayItem[]) =>
  array.map(i => i.name).join(', ')
