import { BASE_PAGINATION_CONFIG, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/shared/query-params";
import type { QueryParamConfig } from "@/shared/query-params/use-search-params";

export const userListDefaultParamsConfig = {
	page: DEFAULT_PAGE,
	pageSize: DEFAULT_PAGE_SIZE,
	searchQuery: "",
};

export const useUserListQueryParamsConfig = (): QueryParamConfig => {
	return {
		...BASE_PAGINATION_CONFIG,
		searchQuery: {
			defaultValue: userListDefaultParamsConfig.searchQuery,
		},
	};
};
