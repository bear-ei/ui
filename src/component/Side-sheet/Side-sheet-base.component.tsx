import {forwardRef, useCallback, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {emitter} from '../../context'
import {InitialSideSheetState, ProcessSideSheetEmitOptions, SheetType, SideSheetBaseProps} from './Side-sheet.interface'

const processSideSheetClose = (setState: Updater<InitialSideSheetState>) => (onClose?: () => void) => {
    setState(draft => {
        draft.sideSheetVisible = false
        draft.nextCloseCallback = () => onClose?.()
    })
}

const processSideSheetVisible = (setState: Updater<InitialSideSheetState>) => (visible?: boolean) =>
    typeof visible === 'boolean' &&
    setState(draft => {
        draft.sideSheetVisible = visible
    })

const processSideSheetEmit =
    ({id, type}: ProcessSideSheetEmitOptions) =>
    (renderSheet: () => React.JSX.Element) =>
    (visible?: boolean) =>
        typeof visible === 'boolean' &&
        type === 'modal' &&
        emitter.emit('modal', {id: `sideSheet__${id}`, render: renderSheet})

const processSideSheetUnmount = (id: string) => (type: SheetType) =>
    type === 'modal' && emitter.emit('modal', {id: `sideSheet__${id}`, render: undefined})

export const SideSheetBase = forwardRef<View, SideSheetBaseProps>(
    ({defaultVisible, onVisible, render, type = 'modal', visible, onClose, ...renderProps}, ref) => {
        const [{sideSheetVisible, nextCloseCallback}, setState] = useImmer<InitialSideSheetState>({
            nextCloseCallback: undefined,
            sideSheetVisible: undefined
        })

        const id = useId()
        const onSideSheetVisible = useMemo(() => processSideSheetVisible(setState), [setState])
        const onSideSheetClose = useCallback(() => processSideSheetClose(setState)(onClose), [onClose, setState])
        const renderSheet = useCallback(
            () => render({...renderProps, onClose: onSideSheetClose, onVisible, ref, type, visible: sideSheetVisible}),
            [onSideSheetClose, onVisible, ref, render, renderProps, sideSheetVisible, type]
        )

        const onSideSheetEmit = useMemo(() => processSideSheetEmit({id, type})(renderSheet), [id, renderSheet, type])

        useEffect(() => {
            onSideSheetVisible(visible ?? defaultVisible)
        }, [defaultVisible, onSideSheetVisible, visible])

        useEffect(() => {
            onSideSheetEmit(sideSheetVisible)
        }, [onSideSheetEmit, sideSheetVisible])

        useEffect(
            () => () => {
                processSideSheetUnmount(id)(type)
            },
            [id, type]
        )

        useEffect(() => {
            nextCloseCallback?.()
        }, [nextCloseCallback])

        return type === 'standard' ? renderSheet() : <></>
    }
)
