import { useSearchParameters } from './use-search-params'
import type { QueryParamConfig } from './use-search-params'

export interface UseSearchParamsPaginationProps {
  config: QueryParamConfig
  keys: { pageKey: string; pageSizeKey: string }
}

export const useSearchParamsPagination = ({
  config,
  keys,
}: UseSearchParamsPaginationProps) => {
  const { params, setSearchParams, setListSearchParams } = useSearchParameters(
    config,
    { pageKey: keys.pageKey }
  )

  const onChange = (
    newPage: number | undefined,
    newPageSize: number | undefined
  ) => {
    const hasPageSizeChanged = params[keys.pageSizeKey] !== newPageSize

    if (hasPageSizeChanged) {
      return setListSearchParams({
        [keys.pageSizeKey]: newPageSize,
      })
    }

    const hasPageChanged = params[keys.pageKey] !== newPage

    if (hasPageChanged) {
      return setSearchParams({ [keys.pageKey]: newPage })
    }
  }

  return {
    onChange,
    page: params[keys.pageKey] as number | undefined,
    pageSize: params[keys.pageSizeKey] as number | undefined,
  }
}
