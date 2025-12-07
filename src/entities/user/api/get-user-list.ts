import { useQuery } from "@tanstack/react-query";
import { User } from "../model/types/user";
import { httpClient } from "@/shared/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];

export const getUserList = (options?: SecondParameter<typeof httpClient>, signal?: AbortSignal) => {
	return httpClient<User[]>(
		{ url: `https://jsonplaceholder.typicode.com/users`, method: "GET", signal },
		options
	);
};

export const useUsersList = () => {
	return useQuery({
		queryKey: ["userList"],
		queryFn: getUserList,
	});
};
