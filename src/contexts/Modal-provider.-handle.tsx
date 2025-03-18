import {WritableDraft} from 'immer'
import {Updater} from 'use-immer'
import {Modal, ModalState} from './contexts.interface'

export const handleModal = (setState: Updater<ModalState>) => (modal: Modal) => {
        const {id, unmount, props} = modal

        setState(draft => {
                if (unmount) {
                        draft.modals = draft.modals.filter(item => item.id !== id)

                        return
                }

                if (draft.modals.length) {
                        draft.modals = draft.modals.reduce((accumulator, modalItem) => {
                                if (modalItem.id === id) {
                                        return [...accumulator, {...modalItem, props}]
                                }

                                return accumulator
                        }, [] as WritableDraft<Modal>[])

                        return
                }

                draft.modals = [modal]
        })
}
