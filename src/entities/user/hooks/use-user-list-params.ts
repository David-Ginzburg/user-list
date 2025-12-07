import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useUsersList } from "../api/get-user-list";

export const useUserListParams = () => {
	const { data } = useUsersList();

	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const totalPages = data?.length ? data.length / 3 : 0;

	const setFilter = useCallback(
		(name: string, value: string) => {
			console.log(name, value);
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			router.push(pathname + "?" + params.toString());
			return params.toString();
		},
		[pathname, router, searchParams]
	);

	return {
		searchParams,
		setFilter,
		totalPages,
	};
};
