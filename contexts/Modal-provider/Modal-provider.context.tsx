import mitt from 'mitt'
import type {FC, RefAttributes} from 'react'
import {useEffect, useMemo} from 'react'
import {View, type ViewProps} from 'react-native'
import {useImmer} from 'use-immer'
import {MODAL_TYPE} from './Modal-provider.enum'
import {updateModals} from './Modal-provider.handler'
import type {EmitterEvent, ModalItemProps, ModalProps, ModalState} from './Modal-provider.interface'

const ModalItem: FC<ModalItemProps> = ({type, modalProps, testID}) => {
        const component = {[MODAL_TYPE.TOOL_TIP]: View, [MODAL_TYPE.SIDE_SHEET]: View}

        if (!type) {
                return <></>
        }

        const ModalComponent = component[type] as unknown as FC<ViewProps & RefAttributes<View>>

        return (
                <ModalComponent
                        {...modalProps}
                        testID={modalProps?.testID ?? testID}
                />
        )
}

export const emitter = mitt<EmitterEvent>()
export const ModalProvider: FC<ModalProps> = () => {
        const [{modals}, setState] = useImmer<ModalState>({})
        const runUpdateModals = useMemo(() => updateModals(setState), [setState])

        useEffect(() => {
                emitter.on('modal', modal => runUpdateModals(modal))

                return () => emitter.all.clear()
        }, [runUpdateModals])

        return (
                <>
                        {modals?.map(({type, props, id}) => (
                                <ModalItem
                                        key={`${id}`}
                                        modalProps={props}
                                        testID={`modal--${id}`}
                                        type={type}
                                />
                        ))}
                </>
        )
}
