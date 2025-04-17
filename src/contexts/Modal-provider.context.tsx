import mitt from 'mitt'
import type {FC} from 'react'
import {useEffect, useId} from 'react'
import {useImmer} from 'use-immer'
import {SideSheet} from '../components'
import {MODAL_TYPE} from './contexts.enum'
import type {EmitterEvent, ModalItemProps, ModalProps, ModalState} from './contexts.interface'
import {handleModal} from './Modal-provider-handle'

const ModalItem: FC<ModalItemProps> = ({type, props}) => {
	const component = {[MODAL_TYPE.TOOL_TIP]: <></>, [MODAL_TYPE.SIDE_SHEET]: SideSheet}

	if (!type) {
		return <></>
	}

	const ModalComponent = component[type] as FC<unknown>

	return <ModalComponent {...props} />
}

export const emitter = mitt<EmitterEvent>()
export const ModalProvider: FC<ModalProps> = () => {
	const [{modals}, setState] = useImmer<ModalState>({modals: []})
	const id = useId()

	useEffect(() => {
		emitter.on('modal', modal => handleModal(setState)(modal))

		return () => {
			emitter.all.clear()
		}
	}, [setState])

	return (
		<>
			{modals.map(({type, props, id: modalId}) => (
				<ModalItem
					key={modalId}
					type={type}
					props={props}
					testID={id}
				/>
			))}
		</>
	)
}
