import {useClearComponentEvent} from '@/hooks'
import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {SIDE_SHEET_TYPE} from './Sheet.enum'
import {
    emitSheetModal,
    emitSheetModalUnmount,
    setSheetVisible,
    updateSheetBackWithEvent,
    updateSheetClose
} from './Sheet.handler'
import type {SheetBaseProps, SheetState} from './Sheet.interface'
import {RenderSheet} from './Sheet.render'

export const SheetBase = forwardRef<View, SheetBaseProps>(
    (
        {
            defaultVisible,
            disabledClose,
            onBack: rawOnBack,
            onClose: rawOnClose,
            onVisible,
            type = SIDE_SHEET_TYPE.MODAL,
            visible,
            ...renderSheetProps
        },
        ref
    ) => {
        const [{sheetVisible: isSheetVisible, nextCloseEvent, nextBackEvent, nextCancelEvent}, setState] =
            useImmer<SheetState>({})

        useClearComponentEvent(setState)

        const emitId = useMemo(() => `${Date.now()}`, [])
        const id = useId()
        const onBack = useMemo(
            () => updateSheetBackWithEvent({onBack: rawOnBack, disabledClose, type})(setState),
            [disabledClose, rawOnBack, setState, type]
        )

        const onClose = useMemo(() => updateSheetClose(rawOnClose)(setState), [rawOnClose, setState])
        const runSetVisible = useMemo(() => setSheetVisible(setState), [setState])
        const runEmitModalUnmount = useMemo(() => emitSheetModalUnmount(emitId), [emitId])
        const renderProps = useMemo(
            () => ({
                ...renderSheetProps,
                disabledClose,
                id,
                onBack,
                onClose,
                onVisible,
                ref,
                type,
                visible: isSheetVisible
            }),
            [disabledClose, id, isSheetVisible, onBack, onClose, onVisible, ref, renderSheetProps, type]
        )

        const runEmitSheetModal = useMemo(
            () => emitSheetModal({id: emitId, type})(renderProps),
            [emitId, renderProps, type]
        )

        useEffect(() => {
            runSetVisible(visible ?? defaultVisible)
        }, [runSetVisible, defaultVisible, visible])

        useEffect(() => {
            runEmitSheetModal(isSheetVisible)
        }, [runEmitSheetModal, isSheetVisible])

        useEffect(() => {
            nextCloseEvent?.()
        }, [nextCloseEvent])

        useEffect(() => {
            nextBackEvent?.()
        }, [nextBackEvent])

        useEffect(() => {
            nextCancelEvent?.()
        }, [nextCancelEvent])

        useEffect(
            () => () => {
                runEmitModalUnmount(type)
            },
            [runEmitModalUnmount, type]
        )

        return type === SIDE_SHEET_TYPE.SIDEBAR ? <RenderSheet {...renderProps} /> : <></>
    }
)

SheetBase.displayName = 'SheetBase'
