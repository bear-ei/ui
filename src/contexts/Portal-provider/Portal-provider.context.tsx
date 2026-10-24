import type {FC} from 'react'

import mitt from 'mitt'
import {useEffect, useMemo} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'

import type {EmitterEvent, Portal, PortalComponentType, PortalItemProps, PortalState} from './Portal-provider.interface'

import {PopoverContent, PopoverPressableLayout} from '../../components'
import {typedMemo} from '../../utils'
import {PORTAL_TYPE} from './Portal-provider.enum'
import {updatePortals} from './Portal-provider.handler'

const COMPONENT = {
	[PORTAL_TYPE.POPOVER]: PopoverContent,
	[PORTAL_TYPE.PRESSABLE_LAYOUT]: PopoverPressableLayout,
	[PORTAL_TYPE.SIDE_SHEET]: View
}

const PortalItem = typedMemo(({componentProps, testID, type}: PortalItemProps) => {
	if (!type) {
		return <></>
	}

	const {ref, ...props} = componentProps ?? {}

	// Double cast — see comment below for why it's safe.
	const PortalComponent = COMPONENT[type] as PortalComponentType

	// NOTE: `{...componentProps}` spreads `ref` as a plain object field —
	// React only recognizes a top-level `ref` prop. Hence the explicit
	// `ref={componentProps?.ref}` after the spread to restore forwarding.
	//
	// Cast is safe at runtime:
	//   - PopoverContent / PopoverPressableLayout are memo(forwardRef(...))
	//     → memo transparently forwards refs to the inner forwardRef component.
	//   - View is a forwardRef component directly.
	// Only the TypeScript wrapper type (MemoExoticComponent vs
	// ForwardRefExoticComponent) mismatches — not the runtime behavior.
	return (
		<PortalComponent
			{...props}
			ref={ref}
			testID={props.testID ?? testID}
		/>
	)
})

let portalProviderCount = 0

/**
 * Global portal host.
 *
 * ⚠️ `props` (callbacks, JSX, refs) are stored in state on purpose. PortalProvider
 * and the opening component (Popover / Sheet / …) are NOT parent-child — the
 * only channel is the shared `emitter`. Without storing props in state, prop
 * updates on the source component could never reach the portal.
 *
 * In `updatePortals`, the fast path compares props by reference — using
 * `original()` to unwrap the Immer draft wrapper back to the source ref. If
 * you ever add code that mutates `draft.portals[i].props.*` in place, it will
 * finalize `props` into a NEW object and break ref / callback identity
 * downstream — always replace the whole `props` reference instead.
 */
export const emitter = mitt<EmitterEvent>()
export const PortalProvider: FC = () => {
	const [{portals}, setState] = useImmer<PortalState>({portals: []})
	const runUpdatePortals = useMemo(() => updatePortals(setState), [setState])

	useEffect(() => {
		const handler = (portal: Portal) => runUpdatePortals(portal)

		emitter.on('portal', handler)

		return () => emitter.off('portal', handler)
	}, [runUpdatePortals])

	useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			portalProviderCount += 1

			if (portalProviderCount > 1) {
				console.warn('[PortalProvider] Multiple instances mounted. Portals will be rendered more than once.')
			}
		}

		return () => {
			if (process.env.NODE_ENV !== 'production') {
				portalProviderCount -= 1
			}
		}
	}, [])

	return (
		<>
			{portals.map(({id, props, type}) => (
				<PortalItem
					componentProps={props}
					key={id}
					testID={`portal--${id}`}
					type={type}
				/>
			))}
		</>
	)
}
