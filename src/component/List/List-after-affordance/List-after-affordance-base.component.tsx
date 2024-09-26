import {FC, useEffect, useId, useMemo} from 'react'
import {GestureResponderEvent} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {
    HandleListAfterAffordanceCancelOptions,
    HandleListAfterAffordanceConfirmOptions,
    ListAfterAffordanceBaseProps,
    ListAfterAffordanceInitialState,
    ListAfterAffordancePressOutOptions
} from './List-after-affordance.interface'
import {useListAfterAffordanceAnimated} from './use-list-after-affordance-animated.hook'

const handleListAfterAffordanceConfirm =
    ({onConfirm, doubleConfirmed, itemKey}: HandleListAfterAffordanceConfirmOptions) =>
    (_event: GestureResponderEvent) =>
        onConfirm?.({itemKey, doubleConfirmed})

const createNextCancelCallback =
    (onCancel?: (options: ListAfterAffordancePressOutOptions) => void) =>
    ({itemKey, doubleConfirmed}: HandleListAfterAffordanceCancelOptions) =>
    () =>
        onCancel?.({itemKey, doubleConfirmed})

const handleListAfterAffordanceCancel =
    ({onCancel, doubleConfirmed, itemKey}: HandleListAfterAffordanceCancelOptions) =>
    (setState: Updater<ListAfterAffordanceInitialState>) =>
    (_event: GestureResponderEvent) => {
        setState(draft => {
            draft.doubleConfirmed = !doubleConfirmed
            draft.nextCancelCallback = createNextCancelCallback(onCancel)({itemKey, doubleConfirmed})
        })
    }

const handleListAfterAffordanceVisible = (setState: Updater<ListAfterAffordanceInitialState>) => (value?: boolean) =>
    !value &&
    setState(draft => {
        draft.doubleConfirmed = false
    })

export const ListAfterAffordanceBase: FC<ListAfterAffordanceBaseProps> = ({
    itemKey,
    onCancel,
    onConfirm,
    render,
    visible,
    ...renderProps
}) => {
    const [{doubleConfirmed, nextCancelCallback}, setState] = useImmer<ListAfterAffordanceInitialState>({
        doubleConfirmed: undefined,
        nextCancelCallback: undefined
    })

    const theme = useTheme()
    const id = useId()
    const fill = theme.token.scheme.onPrimary
    const onListAfterAffordanceConfirm = handleListAfterAffordanceConfirm({doubleConfirmed, onConfirm, itemKey})
    const onListAfterAffordanceCancel = handleListAfterAffordanceCancel({doubleConfirmed, onCancel, itemKey})(setState)
    const onListAfterAffordanceVisible = useMemo(() => handleListAfterAffordanceVisible(setState), [setState])
    const {dangerAnimatedStyle} = useListAfterAffordanceAnimated({doubleConfirmed})

    useEffect(() => {
        onListAfterAffordanceVisible(visible)
    }, [onListAfterAffordanceVisible, visible])

    useEffect(() => {
        nextCancelCallback?.()
    }, [nextCancelCallback])

    return render({
        ...renderProps,
        dangerAnimatedStyle,
        doubleConfirmed,
        fill,
        id,
        onCancel: onListAfterAffordanceCancel,
        onConfirm: onListAfterAffordanceConfirm
    })
}
