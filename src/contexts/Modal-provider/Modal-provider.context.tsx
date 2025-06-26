import mitt from 'mitt'
import type {FC, RefAttributes} from 'react'
import {useEffect, useMemo} from 'react'
import type {View, ViewProps} from 'react-native'
import {useImmer} from 'use-immer'
import {Sheet} from '../../components'
import {MODAL_TYPE} from './Modal-provider.enum'
import {manageModalState} from './Modal-provider.handler'
import type {EmitterEvent, ModalItemProps, ModalProps, ModalState} from './Modal-provider.interface'

const ModalItem: FC<ModalItemProps> = ({type, modalProps, testID}) => {
	const component = {[MODAL_TYPE.TOOL_TIP]: <></>, [MODAL_TYPE.SIDE_SHEET]: Sheet}

	if (!type) {
		return <></>
	}

	const ModalComponent = component[type] as FC<ViewProps & RefAttributes<View>>

	return (
		<ModalComponent
			{...modalProps}
			testID={modalProps?.testID ?? testID}
		/>
	)
}

export const emitter = mitt<EmitterEvent>()
export const ModalProvider: FC<ModalProps> = () => {
	const [{modals}, setState] = useImmer<ModalState>({modals: []})
	const onModal = useMemo(() => manageModalState(setState), [setState])

	useEffect(() => {
		emitter.on('modal', modal => onModal(modal))

		return () => emitter.all.clear()
	}, [onModal])

	return (
		<>
			{modals.map(({type, props, id}) => (
				<ModalItem
					key={`${id}`}
					modalProps={props}
					testID={`modal--${id}`}
					type={type}
				/>
			))}
		</>
	)
}
