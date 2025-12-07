import { useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { PAGE_KEY } from "./const";

// Типы для конфигурации параметров
export type QueryParamConfig = {
	[key: string]: {
		defaultValue?: string | number;
		parse?: (value: string) => string | number | undefined;
		serialize?: (value: string | number) => string;
	};
};

export interface UseSearchParametersProps {
	pageKey?: string;
}

// Функция для парсинга значения из URL
const parseValue = (
	value: string | null,
	config?: QueryParamConfig[string]
): string | number | undefined => {
	if (!value) return undefined;
	if (config?.parse) {
		return config.parse(value);
	}
	// Пытаемся определить тип автоматически
	const numValue = Number(value);
	if (!isNaN(numValue) && value.trim() !== "") {
		return numValue;
	}
	return value;
};

// Функция для сериализации значения в URL
const serializeValue = (
	value: string | number | undefined,
	config?: QueryParamConfig[string]
): string | undefined => {
	if (value === undefined || value === null) return undefined;
	if (config?.serialize) {
		return config.serialize(value);
	}
	return String(value);
};

export const useSearchParameters = (
	config: QueryParamConfig = {},
	{ pageKey = PAGE_KEY }: UseSearchParametersProps = {}
) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	// Парсим все параметры из URL
	const params = useMemo(() => {
		const result: Record<string, string | number | undefined> = {};

		// Получаем все параметры из URL
		searchParams.forEach((value, key) => {
			const paramConfig = config[key];
			result[key] = parseValue(value, paramConfig) ?? paramConfig?.defaultValue;
		});

		// Добавляем значения по умолчанию для параметров, которых нет в URL
		Object.keys(config).forEach((key) => {
			if (!(key in result) && config[key].defaultValue !== undefined) {
				result[key] = config[key].defaultValue;
			}
		});

		return result;
	}, [searchParams, config]);

	// Функция для обновления параметров
	const updateSearchParams = useCallback(
		(updates: Record<string, string | number | undefined>) => {
			const current = new URLSearchParams(searchParams.toString());

			Object.entries(updates).forEach(([key, value]) => {
				const serialized = serializeValue(value, config[key]);
				if (serialized === undefined || serialized === "") {
					current.delete(key);
				} else {
					current.set(key, serialized);
				}
			});

			// Удаляем параметры со значениями по умолчанию
			Object.keys(config).forEach((key) => {
				const currentValue = current.get(key);
				const defaultValue = config[key].defaultValue;
				if (currentValue && defaultValue !== undefined) {
					const serializedDefault = serializeValue(defaultValue, config[key]);
					if (currentValue === serializedDefault) {
						current.delete(key);
					}
				}
			});

			router.push(`${pathname}?${current.toString()}`, { scroll: false });
		},
		[searchParams, router, pathname, config]
	);

	const setSearchParams = useCallback(
		(value: Record<string, string | number | undefined>) => {
			updateSearchParams(value);
		},
		[updateSearchParams]
	);

	const setListSearchParams = useCallback(
		(value: Record<string, string | number | undefined>) => {
			// При изменении фильтров сбрасываем страницу
			updateSearchParams({
				[pageKey]: undefined,
				...value,
			});
		},
		[updateSearchParams, pageKey]
	);

	return {
		params,
		setListSearchParams,
		setSearchParams,
	};
};
