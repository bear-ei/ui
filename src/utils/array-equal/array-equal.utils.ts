/**
 * Shallow equality check for two arrays.
 * - Element comparison uses `Object.is` (NaN equals NaN; +0 ≠ -0).
 * - Objects compared by reference, NOT by content.
 * - Two `undefined` are considered equal.
 * - `[]` vs `undefined` is NOT equal (length mismatch).
 *
 * @example
 * arrayEqual(prev.dependencies, next.dependencies)
 */
export const arrayEqual = <T>(preArray?: T[], nextArray?: T[]) => {
	if (preArray === undefined && nextArray === undefined) {
		return true
	}

	return Boolean(
		preArray?.length === nextArray?.length && preArray?.every((key, index) => Object.is(key, nextArray?.[index]))
	)
}
