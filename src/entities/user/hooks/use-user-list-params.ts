import { useSearchParameters } from "@/shared/query-params";
import { useUserListQueryParamsConfig } from "./use-user-list-query-params-config";

export const useUserListParams = () => {
	const ticketListQueryParamsConfig = useUserListQueryParamsConfig();

	const { params, setSearchParams, setListSearchParams } = useSearchParameters(
		ticketListQueryParamsConfig,
		{
			pageKey: "page",
		}
	);

	const searchQuery = typeof params.searchQuery === "string" ? params.searchQuery : "";
	const page = (params.page as number) || 1;
	const pageSize = (params.page_size as number) || 20;

	const setFilters = (filters: { searchQuery?: string }) => {
		setListSearchParams(filters);
	};

	const setPage = (newPage: number) => {
		setSearchParams({ page: newPage });
	};

	return {
		params: {
			searchQuery,
			page,
			pageSize,
		},
		setFilters,
		setPage,
	};
};
