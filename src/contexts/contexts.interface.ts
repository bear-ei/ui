import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'
import type {MODAL_TYPE} from './contexts.enum'

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE]
export interface Modal {
	id: string
	type?: ModalType
	props?: Record<string, unknown>
	unmount?: boolean
}

export type EmitterEvent = {
	modal: Modal
}

export interface ModalState {
	modals: Modal[]
}

export interface ModalItemProps extends ViewProps, RefAttributes<View> {
	type?: ModalType
	props?: ViewProps & RefAttributes<View>
}

export type ModalProps = Pick<Modal, 'type' | 'props'>
