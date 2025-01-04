import mitt from 'mitt'
import {FC, useEffect, useId} from 'react'
import {useImmer} from 'use-immer'
import {SideSheet} from '../components'
import {EmitterEvent, ModalItemProps, ModalProps, ModalState} from './contexts.interface'
import {handleModal} from './Modal-provider.-handle'

const ModalItem: FC<ModalItemProps> = ({name, props}) => {
        const component = {
                tooltip: <></>,
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
