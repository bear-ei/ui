import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {emitter} from '../../contexts'
import {
    HandleSideSheetEmitOptions,
    SheetType,
    SideSheetBaseProps,
    SideSheetProps,
    SideSheetState
} from './Side-sheet.interface'

const handleSideSheetClose =
    (setState: Updater<SideSheetState>) => (onClose?: () => void) => {
        setState(draft => {
            draft.sideSheetVisible = false
            draft.nextCloseEvent = () => onClose?.()
        })
    }

const handleSideSheetBack =
    (setState: Updater<SideSheetState>) => (onBack?: () => void) => {
        setState(draft => {
            draft.sideSheetVisible = false
            draft.nextBackEvent = () => onBack?.()
        })
    }

const handleSideSheetVisible =
    (setState: Updater<SideSheetState>) => (visible?: boolean) => {
        if (typeof visible === 'boolean') {
            setState(draft => {
                draft.sideSheetVisible = visible
            })
        }
    }

const handleSideSheetEmit =
    ({id, type}: HandleSideSheetEmitOptions) =>
    (props: SideSheetProps) =>
    (visible?: boolean) => {
        if (typeof visible === 'boolean' && type === 'modal') {
            emitter.emit('modal', {
                id: `sideSheet__${id}`,
                name: 'sideSheet',
                props
            })
        }
    }

const handleSideSheetUnmount = (id: string) => (type: SheetType) => {
    if (type === 'modal') {
        emitter.emit('modal', {
            id: `sideSheet__${id}`,
            name: 'sideSheet',
            unmount: true
        })
    }
}

export const SideSheetBase = forwardRef<View, SideSheetBaseProps>(
    (
        {
            defaultVisible,
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
        const [{sideSheetVisible, nextCloseEvent, nextBackEvent}, setState] =
            useImmer<SideSheetState>({
                nextBackEvent: undefined,
                nextCloseEvent: undefined,
                sideSheetVisible: undefined
            })

        const id = useId()
        const onSideSheetBack = useCallback(
            () => handleSideSheetBack(setState)(onBack),
            [onBack, setState]
        )

        const onSideSheetClose = useCallback(
            () => handleSideSheetClose(setState)(onClose),
            [onClose, setState]
        )

        const onSideSheetVisible = useMemo(
            () => handleSideSheetVisible(setState),
            [setState]
        )

        const renderSheetProps = useMemo(
            () => ({
                ...renderProps,
                onBack: onSideSheetBack,
                onClose: onSideSheetClose,
                onVisible,
                ref,
                type,
                visible: sideSheetVisible
            }),
            [
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

        return ['standard', 'standardContainer'].includes(type) ?
                render(renderSheetProps)
            :   <></>
    }
)
