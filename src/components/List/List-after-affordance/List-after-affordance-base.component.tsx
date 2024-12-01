import {FC, useEffect, useId, useMemo} from 'react'
import {GestureResponderEvent} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {
        HandleListAfterAffordanceCancelOptions,
        HandleListAfterAffordanceConfirmOptions,
        ListAfterAffordanceBaseProps,
        ListAfterAffordanceState
} from './List-after-affordance.interface'
import {useListAfterAffordanceAnimated} from './use-list-after-affordance-animated.hook'

const handleListAfterAffordanceConfirm =
        ({onConfirm, doubleConfirmed, itemKey}: HandleListAfterAffordanceConfirmOptions) =>
        (_event: GestureResponderEvent) =>
                onConfirm?.({itemKey, doubleConfirmed})

const handleListAfterAffordanceCancel =
        ({onCancel, doubleConfirmed, itemKey}: HandleListAfterAffordanceCancelOptions) =>
        (setState: Updater<ListAfterAffordanceState>) =>
        (_event: GestureResponderEvent) => {
                const handleNextCancelEvent = () => onCancel?.({itemKey, doubleConfirmed})

                setState(draft => {
                        draft.doubleConfirmed = !doubleConfirmed
                        draft.nextCancelEvent = handleNextCancelEvent
                })
        }

const handleListAfterAffordanceVisible = (setState: Updater<ListAfterAffordanceState>) => (value?: boolean) => {
        if (!value) {
                setState(draft => {
                        draft.doubleConfirmed = false
                })
        }
}

export const ListAfterAffordanceBase: FC<ListAfterAffordanceBaseProps> = ({
        itemKey,
        onCancel,
        onConfirm,
        render,
        visible,
        ...renderProps
}) => {
        const [{doubleConfirmed, nextCancelEvent}, setState] = useImmer<ListAfterAffordanceState>({
                doubleConfirmed: undefined,
                nextCancelEvent: undefined
        })

        const theme = useTheme()
        const id = useId()
        const fill = theme.token.scheme.onPrimary
        const onListAfterAffordanceConfirm = handleListAfterAffordanceConfirm({
                doubleConfirmed,
                onConfirm,
                itemKey
        })

        const onListAfterAffordanceCancel = handleListAfterAffordanceCancel({
                doubleConfirmed,
                onCancel,
                itemKey
        })(setState)

        const onListAfterAffordanceVisible = useMemo(() => handleListAfterAffordanceVisible(setState), [setState])
        const {dangerAnimatedStyle} = useListAfterAffordanceAnimated({doubleConfirmed})

        useEffect(() => {
                onListAfterAffordanceVisible(visible)
        }, [onListAfterAffordanceVisible, visible])

        useEffect(() => {
                nextCancelEvent?.()
        }, [nextCancelEvent])

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
