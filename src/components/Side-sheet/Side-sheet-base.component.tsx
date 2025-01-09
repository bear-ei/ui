import {nanoid} from 'nanoid'
import {forwardRef, useCallback, useEffect, useMemo} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
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

                const id = useMemo(() => nanoid(), [])
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
                                onBack: onSideSheetBack,
                                onClose: onSideSheetClose,
                                onVisible,
                                ref,
                                type,
                                visible: sideSheetVisible
                        }),
                        [
                                disabledClose,
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
                        () => handleSideSheetEmit({id, type})(renderSheetProps),
                        [id, renderSheetProps, type]
                )

                useEffect(() => {
                        onSideSheetVisible(visible ?? defaultVisible)
                }, [defaultVisible, onSideSheetVisible, visible])

                useEffect(() => {
                        onSideSheetEmit(sideSheetVisible)
                }, [onSideSheetEmit, sideSheetVisible])

                useEffect(
                        () => () => {
                                handleSideSheetUnmount(id)(type)
                        },
                        [id, type]
                )

                useEffect(() => {
                        nextCloseEvent?.()
                }, [nextCloseEvent])

                useEffect(() => {
                        nextBackEvent?.()
                }, [nextBackEvent])

                useEffect(() => {
                        nextCancelEvent?.()
                }, [nextCancelEvent])

                return ['standard', 'standardContainer'].includes(type) ? render(renderSheetProps) : <></>
        }
)
