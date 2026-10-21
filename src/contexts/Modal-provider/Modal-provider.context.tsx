import mitt from 'mitt'
import type {FC} from 'react'
import {useEffect, useMemo} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {PopoverContent, PopoverPressableLayout} from '../../components'
import {typedMemo} from '../../utils'
import {MODAL_TYPE} from './Modal-provider.enum'
import {updateModals} from './Modal-provider.handler'
import type {EmitterEvent, Modal, ModalComponentType, ModalItemProps, ModalState} from './Modal-provider.interface'

const COMPONENT = {
	[MODAL_TYPE.POPOVER]: PopoverContent,
	[MODAL_TYPE.PRESSABLE_LAYOUT]: PopoverPressableLayout,
	[MODAL_TYPE.SIDE_SHEET]: View
}

const ModalItem = typedMemo(({type, componentProps, testID}: ModalItemProps) => {
	if (!type) {
		return <></>
	}

	const {ref, ...props} = componentProps ?? {}

	// Double cast — see comment below for why it's safe.
	const ModalComponent = COMPONENT[type] as ModalComponentType

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
		<ModalComponent
			{...props}
			ref={ref}
			testID={props.testID ?? testID}
		/>
	)
})

let modalProviderCount = 0

/**
 * Global modal host.
 *
 * ⚠️ `props` (callbacks, JSX, refs) are stored in state on purpose. ModalProvider
 * and the opening component (Popover / Sheet / …) are NOT parent-child — the
 * only channel is the shared `emitter`. Without storing props in state, prop
 * updates on the source component could never reach the modal.
 *
 * In `updateModals`, the fast path compares props by reference — using
 * `original()` to unwrap the Immer draft wrapper back to the source ref. If
 * you ever add code that mutates `draft.modals[i].props.*` in place, it will
 * finalize `props` into a NEW object and break ref / callback identity
 * downstream — always replace the whole `props` reference instead.
 */
export const emitter = mitt<EmitterEvent>()
export const ModalProvider: FC = () => {
	const [{modals}, setState] = useImmer<ModalState>({modals: []})
	const runUpdateModals = useMemo(() => updateModals(setState), [setState])

	useEffect(() => {
		const handler = (modal: Modal) => runUpdateModals(modal)

		emitter.on('modal', handler)

		return () => emitter.off('modal', handler)
	}, [runUpdateModals])

	useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			modalProviderCount += 1

			if (modalProviderCount > 1) {
				console.warn('[ModalProvider] Multiple instances mounted. Modals will be rendered more than once.')
			}
		}

		return () => {
			if (process.env.NODE_ENV !== 'production') {
				modalProviderCount -= 1
			}
		}
	}, [])

	return (
		<>
			{modals.map(({type, props, id}) => (
				<ModalItem
					componentProps={props}
					key={id}
					testID={`modal--${id}`}
					type={type}
				/>
			))}
		</>
	)
}
