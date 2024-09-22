import {FC, useEffect, useId, useMemo} from 'react'
import {GestureResponderEvent} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {
    ListAfterAffordanceBaseProps,
    ListAfterAffordanceInitialState,
    ListAfterAffordancePressOutOptions,
    ProcessListAfterAffordanceCancelOptions,
    ProcessListAfterAffordanceConfirmOptions
} from './List-after-affordance.interface'
import {useListAfterAffordanceAnimated} from './use-list-after-affordance-animated.hook'

const processListAfterAffordanceConfirm =
    ({onConfirm, doubleConfirmed, itemKey}: ProcessListAfterAffordanceConfirmOptions) =>
    (_event: GestureResponderEvent) =>
        onConfirm?.({itemKey, doubleConfirmed})

const createNextCancelCallback =
    (onCancel?: (options: ListAfterAffordancePressOutOptions) => void) =>
    ({itemKey, doubleConfirmed}: ProcessListAfterAffordanceCancelOptions) =>
    () =>
        onCancel?.({itemKey, doubleConfirmed})

const processListAfterAffordanceCancel =
    ({onCancel, doubleConfirmed, itemKey}: ProcessListAfterAffordanceCancelOptions) =>
    (setState: Updater<ListAfterAffordanceInitialState>) =>
    (_event: GestureResponderEvent) => {
        setState(draft => {
            draft.doubleConfirmed = !doubleConfirmed
            draft.nextCancelCallback = createNextCancelCallback(onCancel)({itemKey, doubleConfirmed})
        })
    }

const processListAfterAffordanceVisible = (setState: Updater<ListAfterAffordanceInitialState>) => (value?: boolean) =>
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
    const onListAfterAffordanceConfirm = processListAfterAffordanceConfirm({doubleConfirmed, onConfirm, itemKey})
    const onListAfterAffordanceCancel = processListAfterAffordanceCancel({doubleConfirmed, onCancel, itemKey})(setState)
    const onListAfterAffordanceVisible = useMemo(() => processListAfterAffordanceVisible(setState), [setState])
    const dangerAnimatedStyle = useListAfterAffordanceAnimated({doubleConfirmed})

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
