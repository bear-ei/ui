import {ReactNode} from 'react'

export interface Modal {
    id: string
    render?: () => React.JSX.Element
}

export type EmitterEvent = {
    modal: Modal
}

export interface ModalState {
    modals: Modal[]
}

export interface ModalItemProps {
    render?: () => React.JSX.Element
}

export interface ModalProps {
    children?: ReactNode
}
