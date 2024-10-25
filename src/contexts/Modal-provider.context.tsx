import {WritableDraft} from 'immer'
import mitt from 'mitt'
import {FC, useEffect, useId} from 'react'
import {Updater, useImmer} from 'use-immer'
import {SideSheet, TooltipSupporting} from '../components'
import {EmitterEvent, Modal, ModalItemProps, ModalProps, ModalState} from './contexts.interface'

const handleModal = (setState: Updater<ModalState>) => (modal: Modal) => {
        const {id, unmount, props} = modal

        setState(draft => {
                if (unmount) {
                        draft.modals = draft.modals.filter(item => item.id !== id)

                        return
                }

                if (draft.modals.length) {
                        draft.modals = draft.modals.reduce((accumulator, item) => {
                                if (item.id === id) {
                                        return [...accumulator, {...item, props}]
                                }

                                return accumulator
                        }, [] as WritableDraft<Modal>[])

                        return
                }

                draft.modals = [modal]
        })
}

const ModalItem: FC<ModalItemProps> = ({name, props}) => {
        const component = {
                tooltip: TooltipSupporting,
                sideSheet: SideSheet
        }

        if (!name) {
                return <></>
        }

        const ModalComponent = component[name] as FC<unknown>

        return <ModalComponent {...props} />
}

export const emitter = mitt<EmitterEvent>()
export const ModalProvider: FC<ModalProps> = () => {
        const [{modals}, setState] = useImmer<ModalState>({modals: []})
        const modalId = useId()

        useEffect(() => {
                emitter.on('modal', modal => handleModal(setState)(modal))

                return () => {
                        emitter.all.clear()
                }
        }, [setState])

        return (
                <>
                        {modals.map(({name, props, id}) => (
                                <ModalItem
                                        key={id}
                                        name={name}
                                        props={props}
                                        testID={`modalItem--${modalId}`}
                                />
                        ))}
                </>
        )
}
