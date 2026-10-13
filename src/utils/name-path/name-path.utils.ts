import type {NamePath} from './name-path.interface'

/**
 * Normalize a `NamePath` (single key or array of keys) into an array.
 *
 * Input → Output:
 *   undefined   → undefined   ("not specified" — call site treats as "all")
 *   'a'         → ['a']
 *   ['a', 'b']  → ['a', 'b']
 *   []          → []          (empty set, NOT the same as undefined)
 *
 * Used by Form.store to distinguish "query all fields" (undefined)
 * from "query specific fields" (array).
 */
export const namePath = <T = Record<string, unknown>>(name?: NamePath<T>): (keyof T)[] | undefined => {
	if (name === undefined) {
		return undefined
	}

	return Array.isArray(name) ? name : [name]
}
