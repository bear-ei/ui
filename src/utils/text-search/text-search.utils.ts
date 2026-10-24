const matchByKeys = <T>(matchText: string, keys: (keyof T)[], item: T) =>
	keys.some(key => typeof item[key] === 'string' && item[key].toLowerCase().includes(matchText))

/**
 * Substring search across the given keys.
 * - Case-insensitive (lowercases both sides).
 * - **Empty `searchText` returns ALL items** — guard at call site if you need "empty = none".
 * - Non-string field values are skipped (not coerced).
 * - Pure substring match — no regex, no special-character escaping needed.
 */
export const searchItemsByText = <T>(searchText: string, items: T[], keys: (keyof T)[]): T[] => {
	const matchText = searchText.toLowerCase()

	return items.filter(item => matchByKeys(matchText, keys, item))
}
