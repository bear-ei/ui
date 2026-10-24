/**
 * Shallow equality check for two arrays.
 * - Element comparison uses `Object.is` (NaN equals NaN; +0 ≠ -0).
 * - Objects compared by reference, NOT by content.
 * - Two `undefined` are considered equal.
 * - `[]` vs `undefined` is NOT equal (length mismatch).
 *
 * @example
 * isArrayEqual(prev.dependencies, next.dependencies)
 */
export const isArrayEqual = <T>(prevArray?: T[], nextArray?: T[]) => {
	if (prevArray === undefined && nextArray === undefined) {
		return true
	}

	return Boolean(
		prevArray?.length === nextArray?.length && prevArray?.every((key, index) => Object.is(key, nextArray?.[index]))
	)
}
