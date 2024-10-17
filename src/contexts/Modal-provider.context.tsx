import mitt from 'mitt'
import {FC} from 'react'
import {Updater, useImmer} from 'use-immer'
import {EmitterEvent, Modal, ModalItemProps, ModalProps, ModalState} from './contexts.interface'

const handleModal = (setState: Updater<ModalState>) => (modal: Modal) => {
    const {id, render} = modal

    setState(draft => {
        const modalIndex = draft.modals.findIndex(item => item.id === id)

        if (modalIndex !== -1) {
            draft.modals = draft.modals.reduce((accumulator, item) => {
                if (item.id === id && render) {
                    return [...accumulator, {...item, render}]
                }

                return accumulator
            }, [] as Modal[])

            return
        }

        draft.modals = [...draft.modals, modal]
    })
}

const Item: FC<ModalItemProps> = ({render}) => <>{render?.()}</>

export const emitter = mitt<EmitterEvent>()
export const ModalProvider: FC<ModalProps> = () => {
    const [{modals}, setState] = useImmer<ModalState>({modals: []})

    emitter.on('modal', modal => handleModal(setState)(modal))

    return (
        <>
            {modals.map(({render, id}) => (
                <Item
                    render={render}
                    key={id}
                />
            ))}
        </>
    )
}
