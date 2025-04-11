import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'
import {ModalType} from './contexts.enum'

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
