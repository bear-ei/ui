import {memo, type ComponentProps, type ComponentType, type MemoExoticComponent} from 'react'

/**
 * Memoize a component with an optional custom comparator.
 *
 * The constraint uses `ComponentType<any>` — matching React's own `memo`
 * signature. `any` is necessary here because:
 *
 *  - Contravariance: a concrete props type like `FormItemProps` (with
 *    required fields) is assignable to `ComponentType<any>` but NOT to
 *    `ComponentType<Record<string, unknown>>` (index-signature required)
 *    or `ComponentType<object>` (required fields break).
 *  - Generic components (`<T>(props: FormProps<T>) => ...`) also collapse
 *    to `unknown` under narrower constraints.
 *
 * ⚠️ This `any` does NOT leak: `MemoExoticComponent<T>` preserves the
 * caller's concrete component type. `T` is inferred from `component`, so
 * downstream `<Foo />` usages remain fully typed.
 */
export const typedMemo = <T extends ComponentType<any>>(
	component: T,

	/**
	 * Custom props comparator. Return `true` to SKIP re-render (props considered equal),
	 * `false` to re-render.
	 *
	 * ⚠️ This is the REVERSE of most comparator conventions — `true` means "no change".
	 * A missed field here means the component silently stops updating on that field's change.
	 * (See: NavigationRailItem past bug — missed icon/labelText/type comparison.)
	 */
	propsAreEqual?: (prevProps: Readonly<ComponentProps<T>>, nextProps: Readonly<ComponentProps<T>>) => boolean
): MemoExoticComponent<T> => {
	const memoized = memo(component, propsAreEqual)

	if (process.env.NODE_ENV !== 'production') {
		memoized.displayName = `Memo(${component.displayName || component.name || 'Anonymous'})`
	}

	return memoized
}
