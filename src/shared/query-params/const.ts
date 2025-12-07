/* eslint-disable no-magic-numbers */
import type { QueryParamConfig } from './use-search-params'

export const PAGE_SIZE_KEY = 'page_size'
export const PAGE_KEY = 'page'
export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 20

export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 50]

export const BASE_PAGINATION_CONFIG: QueryParamConfig = {
  [PAGE_KEY]: {
    defaultValue: DEFAULT_PAGE,
    parse: (value: string) => {
      const num = Number(value)
      return isNaN(num) ? DEFAULT_PAGE : num
    },
  },
  [PAGE_SIZE_KEY]: {
    defaultValue: DEFAULT_PAGE_SIZE,
    parse: (value: string) => {
      const num = Number(value)
      return isNaN(num) ? DEFAULT_PAGE_SIZE : num
    },
  },
}
