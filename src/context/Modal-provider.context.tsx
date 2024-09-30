import mitt from 'mitt'
import {FC} from 'react'
import {Updater, useImmer} from 'use-immer'
import {EmitterEvent, Modal, ModalItemProps, ModalProps, ModalState} from './context.interface'

const handleModal = (setState: Updater<ModalState>) => (modal: Modal) => {
    const {id, render} = modal

    setState(draft => {
        const exist = draft.modals.find(item => item.id === id)

        if (exist) {
            draft.modals = draft.modals
                .map(item => (item.id === id ? {...item, render} : item))
                .filter(item => item.render)

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
