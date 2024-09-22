import mitt from 'mitt'
import React, {FC} from 'react'
import {Updater, useImmer} from 'use-immer'
import {EmitterEvent, Modal, ModalInitialState, ModalItemProps, ModalProps} from './context.interface'

const processModal = (setState: Updater<ModalInitialState>) => (modal: Modal) => {
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
    const [{modals}, setState] = useImmer<ModalInitialState>({modals: []})

    emitter.on('modal', modal => processModal(setState)(modal))

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
