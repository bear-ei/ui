import {nanoid} from 'nanoid'
import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
import {
        handleSideSheetBack,
        handleSideSheetClose,
        handleSideSheetEmit,
        handleSideSheetUnmount,
        handleSideSheetVisible
} from './Side-sheet-handle'
import {SideSheetBaseProps, SideSheetState} from './Side-sheet.interface'

export const SideSheetBase = forwardRef<View, SideSheetBaseProps>(
        (
                {
                        defaultVisible,
                        disabledClose,
                        onBack,
                        onClose,
                        onVisible,
                        render,
                        type = 'modal',
                        visible,
                        ...renderProps
                },
                ref
        ) => {
                const [{sideSheetVisible, nextCloseEvent, nextBackEvent, nextCancelEvent}, setState] =
                        useImmer<SideSheetState>({})

                const emitId = useMemo(() => nanoid(), [])
                const id = useId()
                const onSideSheetBack = useCallback(
                        () => handleSideSheetBack({onBack, disabledClose, type})(setState),
                        [disabledClose, onBack, setState, type]
                )

                const onSideSheetClose = useCallback(() => handleSideSheetClose(setState)(onClose), [onClose, setState])
                const onSideSheetVisible = useMemo(() => handleSideSheetVisible(setState), [setState])
                const renderSheetProps = useMemo(
                        () => ({
                                ...renderProps,
                                disabledClose,
                                id,
                                onBack: onSideSheetBack,
                                onClose: onSideSheetClose,
                                onVisible,
                                ref,
                                type,
                                visible: sideSheetVisible
                        }),
                        [
                                disabledClose,
                                id,
                                onSideSheetBack,
                                onSideSheetClose,
                                onVisible,
                                ref,
                                renderProps,
                                sideSheetVisible,
                                type
                        ]
                )

                const onSideSheetEmit = useMemo(
                        () => handleSideSheetEmit({id: emitId, type})(renderSheetProps),
                        [emitId, renderSheetProps, type]
                )

                useEffect(() => {
                        onSideSheetVisible(visible ?? defaultVisible)
                }, [defaultVisible, onSideSheetVisible, visible])

                useEffect(() => {
                        onSideSheetEmit(sideSheetVisible)
                }, [onSideSheetEmit, sideSheetVisible])

                useEffect(
                        () => () => {
                                handleSideSheetUnmount(emitId)(type)
                        },
                        [emitId, type]
                )

                useEffect(() => {
                        runAfterInteractions(nextCloseEvent)()
                }, [nextCloseEvent])

                useEffect(() => {
                        runAfterInteractions(nextBackEvent)()
                }, [nextBackEvent])

                useEffect(() => {
                        runAfterInteractions(nextCancelEvent)()
                }, [nextCancelEvent])

                return new Set(['standard', 'standardContainer']).has(type) ? render(renderSheetProps) : <></>
        }
)
