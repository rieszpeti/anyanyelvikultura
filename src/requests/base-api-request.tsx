export interface BaseApiResponse<T> {
  docs: T[]
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: string | null
  page: number
  pagingCounter: number
  prevPage: string | null
  totalDocs: number
  totalPages: number
}
