const matchByKeys = <T>(keys: (keyof T)[], item: T, matchText: string) =>
	keys.some(key => typeof item[key] === 'string' && item[key].toLowerCase().includes(matchText))

/**
 * Substring search across the given keys.
 * - Case-insensitive (lowercases both sides).
 * - **Empty `searchText` returns ALL items** — guard at call site if you need "empty = none".
 * - Non-string field values are skipped (not coerced).
 * - Pure substring match — no regex, no special-character escaping needed.
 */
export const textSearch = <T>(data: T[], keys: (keyof T)[], searchText: string): T[] => {
	const matchText = searchText.toLowerCase()

	return data.filter(item => matchByKeys(keys, item, matchText))
}
