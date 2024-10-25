import {RefAttributes} from 'react'
import {View, ViewProps} from 'react-native'

export type ModalName = 'tooltip' | 'sideSheet'
export interface Modal {
        id: string
        name?: ModalName
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
        name?: ModalName
        props?: ViewProps & RefAttributes<View>
}

export type ModalProps = Pick<Modal, 'name' | 'props'>
