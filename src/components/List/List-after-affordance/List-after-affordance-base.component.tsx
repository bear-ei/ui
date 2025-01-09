import {FC, useEffect, useMemo} from 'react'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {
        handleListAfterAffordanceCancel,
        handleListAfterAffordanceConfirm,
        handleListAfterAffordanceVisible
} from './List-after-affordance-handle'
import {ListAfterAffordanceBaseProps, ListAfterAffordanceState} from './List-after-affordance.interface'
import {useListAfterAffordanceAnimated} from './use-list-after-affordance-animated.hook'

export const ListAfterAffordanceBase: FC<ListAfterAffordanceBaseProps> = ({
        itemKey,
        onCancel,
        onConfirm,
        render,
        visible,
        ...renderProps
}) => {
        const [{doubleConfirmed, nextCancelEvent}, setState] = useImmer<ListAfterAffordanceState>({})
        const theme = useTheme()
        const onListAfterAffordanceConfirm = handleListAfterAffordanceConfirm({doubleConfirmed, onConfirm, itemKey})
        const onListAfterAffordanceCancel = handleListAfterAffordanceCancel({doubleConfirmed, onCancel, itemKey})(
                setState
        )

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
                onCancel: onListAfterAffordanceCancel,
                onConfirm: onListAfterAffordanceConfirm,
                theme,
                visible
        })
}
