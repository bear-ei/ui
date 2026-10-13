import {memo, type ComponentProps, type ComponentType, type MemoExoticComponent} from 'react'

export const typedMemo = <T extends ComponentType<object>>(
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
		memoized.displayName = `Memo(${component.displayName ?? component.name ?? 'Anonymous'})`
	}

	return memoized
}
