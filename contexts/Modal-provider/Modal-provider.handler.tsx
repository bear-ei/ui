import type {Updater} from 'use-immer'
import type {Modal, ModalState} from './Modal-provider.interface'

export const updateModals = (setState: Updater<ModalState>) => (modal: Modal) => {
        const {id, unmount: isUnmount, props} = modal

        setState(draft => {
                if (isUnmount) {
                        draft.modals = draft.modals?.filter(item => item.id !== id)

                        return
                }

                const existingIndex = draft.modals?.findIndex(item => item.id === id)

                if (existingIndex && existingIndex !== -1 && draft.modals) {
                        draft.modals[existingIndex] = {...draft.modals[existingIndex], props}

                        return
                }

                draft.modals = [...(draft.modals ?? []), modal]
        })
}
