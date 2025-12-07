import { useMemo } from "react";
import { useUsersList } from "../api/get-user-list";
import { User } from "../model/types/user";

interface UseUserListParams {
	searchQuery: string | undefined;
}

/**
 * Рекурсивная функция для поиска значения в объекте
 * Обходит все поля объекта, включая вложенные объекты и массивы
 */
const searchInObject = (obj: unknown, searchQuery: string | undefined): boolean => {
	if (!searchQuery) {
		return true;
	}

	// Преобразуем searchQuery в строку на случай, если это не строка
	const searchString = String(searchQuery);
	const searchLower = searchString.toLowerCase();

	// Если это примитивное значение (строка или число)
	if (typeof obj === "string" || typeof obj === "number") {
		return String(obj).toLowerCase().includes(searchLower);
	}

	// Если это null или undefined, пропускаем
	if (obj === null || obj === undefined) {
		return false;
	}

	// Если это массив, проверяем каждый элемент
	if (Array.isArray(obj)) {
		return obj.some((item) => searchInObject(item, searchQuery));
	}

	// Если это объект, рекурсивно проверяем все его свойства
	if (typeof obj === "object") {
		return Object.values(obj).some((value) => searchInObject(value, searchQuery));
	}

	return false;
};

export const useUserList = ({ searchQuery }: UseUserListParams) => {
	const { isFetching, data = [] } = useUsersList();

	const filteredUsers = useMemo(() => {
		if (!searchQuery) {
			return data;
		}

		return data.filter((user: User) => {
			return searchInObject(user, searchQuery);
		});
	}, [data, searchQuery]);

	return {
		data,
		filteredUsers,
		isFetching,
	};
};
