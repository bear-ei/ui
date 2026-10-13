import type {ViewProps} from 'react-native'
import type {MODAL_TYPE} from './Modal-provider.enum'

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE]
export interface Modal {
	id: string
	props?: Record<string, unknown>
	type?: ModalType
	unmount?: boolean
}

export type EmitterEvent = {
	modal: Modal
}

export interface ModalState {
	modals: Modal[]
}

export interface ModalItemProps extends Pick<ViewProps, 'testID'> {
	componentProps?: ViewProps
	type?: ModalType
}
