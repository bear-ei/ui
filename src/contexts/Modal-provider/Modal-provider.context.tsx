import mitt from 'mitt'
import type {FC} from 'react'
import {useEffect, useMemo} from 'react'
import {View, type ViewProps} from 'react-native'
import {useImmer} from 'use-immer'
import {PopoverContent, PopoverPressableLayout} from '../../components'
import {MODAL_TYPE} from './Modal-provider.enum'
import {updateModals} from './Modal-provider.handler'
import type {EmitterEvent, Modal, ModalItemProps, ModalState} from './Modal-provider.interface'

const COMPONENT = {
	[MODAL_TYPE.POPOVER]: PopoverContent,
	[MODAL_TYPE.PRESSABLE_LAYOUT]: PopoverPressableLayout,
	[MODAL_TYPE.SIDE_SHEET]: View
}

const ModalItem: FC<ModalItemProps> = ({type, componentProps, testID}) => {
	if (!type) {
		return <></>
	}

	const ModalComponent = COMPONENT[type] as FC<ViewProps>

	return (
		<ModalComponent
			{...componentProps}
			testID={componentProps?.testID ?? testID}
		/>
	)
}

/**
 * Global emitter. Constraint: only ONE ModalProvider may be mounted
 * at a time — multiple instances would each subscribe and render
 * duplicate modals. Do not nest ThemeProvider.
 */
export const emitter = mitt<EmitterEvent>()

let modalProviderCount = 0
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
