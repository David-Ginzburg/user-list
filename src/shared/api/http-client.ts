import axios, { AxiosRequestConfig } from "axios";

const CREATE_PARAMS = {
	baseURL: "https://jsonplaceholder.typicode.com/",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"cache-control": "no-cache",
	},
};

export const client = axios.create(CREATE_PARAMS);

export const httpClient = async <T>(
	config: AxiosRequestConfig,
	options?: AxiosRequestConfig
): Promise<T> => {
	return await client({
		...config,
		...options,
	}).then(({ data }) => data);
};
