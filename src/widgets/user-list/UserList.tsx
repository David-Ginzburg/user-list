"use client";

import { useUserList } from "@/entities/user/hooks/use-user-list";
import { useUserListParams } from "@/entities/user/hooks/use-user-list-params";
import type { User } from "@/entities/user/model/types/user";
import { Pagination } from "@/shared/components/pagination";
import { TypographyLead, TypographySmall } from "@/shared/components/typography";
import { usePagination } from "@/shared/lib/pagination";
import { Input } from "@/shared/shadcn/ui/input";
import { Spinner } from "@/shared/shadcn/ui/spinner";
import Link from "next/link";
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { debounce } from "@/shared/debounce/debounce";

const ITEMS_PER_PAGE = 3;

export const UserList = () => {
	const { params, setFilters, setPage } = useUserListParams();
	const { searchQuery, page } = params;

	// Локальное состояние для немедленного обновления UI при вводе
	const [inputValue, setInputValue] = useState(() => searchQuery || "");

	// Храним актуальную функцию setFilters в ref
	const setFiltersRef = useRef(setFilters);

	// Обновляем ref при изменении setFilters
	useEffect(() => {
		setFiltersRef.current = setFilters;
	}, [setFilters]);

	// Создаем debounced функцию один раз и храним в ref
	const debouncedSetFiltersRef = useRef<ReturnType<typeof debounce> | null>(null);

	useEffect(() => {
		// Инициализируем debounced функцию один раз
		if (debouncedSetFiltersRef.current === null) {
			debouncedSetFiltersRef.current = debounce((value: string) => {
				setFiltersRef.current({ searchQuery: value });
			}, 500);
		}
	}, []);

	// Обработчик изменения input
	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		if (debouncedSetFiltersRef.current) {
			debouncedSetFiltersRef.current(value);
		}
	}, []);

	const { filteredUsers, isFetching } = useUserList({
		searchQuery,
	});

	const { totalPages, startIndex, endIndex, pageNumbers } = usePagination({
		currentPage: page,
		totalItems: filteredUsers.length,
		itemsPerPage: ITEMS_PER_PAGE,
	});

	const paginatedUsers = useMemo(() => {
		return filteredUsers.slice(startIndex, endIndex);
	}, [filteredUsers, startIndex, endIndex]);

	if (isFetching) {
		return <Spinner />;
	}

	return (
		<div className=" flex flex-col gap-4">
			<div className="flex">
				<Input
					className="w-auto"
					value={inputValue}
					onChange={handleInputChange}
					placeholder="Поиск пользователей..."
				/>
			</div>

			<div className="flex flex-col gap-2 p-1">
				{paginatedUsers?.map((user: User) => {
					return (
						<div key={user.id} className="border p-2">
							<Link href={`/user/${user.id}`} className="text-xl font-bold flex flex-col gap-2">
								<TypographyLead>{user.name}</TypographyLead>
								<div className="flex flex-col gap-2">
									<TypographySmall>id: {user.id}</TypographySmall>
									<TypographySmall>{user.phone}</TypographySmall>
									<TypographySmall>{user.email}</TypographySmall>
								</div>
							</Link>
						</div>
					);
				})}
				<Pagination
					currentPage={page}
					totalPages={totalPages}
					pageNumbers={pageNumbers}
					onPageChange={setPage}
				/>
			</div>
		</div>
	);
};
