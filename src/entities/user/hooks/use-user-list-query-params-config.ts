import { StringParam, withDefault } from "use-query-params";
import { BASE_PAGINATION_CONFIG, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/shared/query-params";

export const userListDefaultParamsConfig = {
	page: DEFAULT_PAGE,
	pageSize: DEFAULT_PAGE_SIZE,
	searchQuery: "",
};

export const useUserListQueryParamsConfig = () => {
	return {
		...BASE_PAGINATION_CONFIG,
		searchQuery: withDefault(StringParam, userListDefaultParamsConfig.searchQuery),
	};
};
