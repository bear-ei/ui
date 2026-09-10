const matchByKeys =
	<T>(keys: (keyof T)[]) =>
	(item: T) =>
	(matchText: string) =>
		keys.some(key => typeof item[key] === 'string' && item[key]?.toString().toLowerCase()?.includes(matchText))

export const textSearch =
	<T>(data: T[]) =>
	(keys: (keyof T)[]) =>
	(searchText: string): T[] => {
		const matchText = searchText.toLowerCase()

		return data.filter(item => matchByKeys(keys)(item)(matchText))
	}
