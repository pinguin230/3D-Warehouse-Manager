import { useState } from "react";

type FetchCallback<T> = (...args: never[]) => Promise<T>

type UseFetchingReturnType<T> = [
	fetchData: (...args: never[]) => Promise<T | null>,
	isLoading: boolean,
	error: string,
	response: T | null
]

export const useFetching = <T,>(callback: FetchCallback<T>): UseFetchingReturnType<T> => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [response, setResponse] = useState<T[]>([]);

	const fetchData = async (...args:never[]):Promise<T | null> => {
		try {
			setIsLoading(true);
			const res = await callback(...args);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			setResponse(res);
			return res;
		} catch (error) {
			setError(error.message);
			return null;
		} finally {
			setIsLoading(false);
		}
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	return [ fetchData, isLoading, error, response ] as const
}