import {forwardRef, useCallback, useId} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {useVirtualListItemAnimated} from './use-virtual-list-item-animated.hook'
import {
    InitialVirtualListItemState,
    VirtualListItemBaseProps,
    VirtualListItemProps
} from './Virtual-list-item.interface'

export const processVirtualListItemPropsEqual =
    (prevProps: VirtualListItemProps) => (nextProps: VirtualListItemProps) => {
        const {extraData: prevExtraData, index: prevIndex, item: prevItem} = prevProps
        const {extraData: nextExtraData, index: nextIndex, item: nextItem} = nextProps

        return ![
            prevExtraData?.join() !== nextExtraData?.join(),
            prevIndex !== nextIndex,
            prevItem?.extraData?.join() !== nextItem?.extraData?.join()
        ].some(Boolean)
    }

export const processVirtualListItemVisible = (setState: Updater<InitialVirtualListItemState>) =>
    setState(draft => {
        draft.virtualListItemVisible = false
    })

export const processVirtualListUnmount = (onUnmount?: (value?: string) => void) => (value?: string) =>
    onUnmount?.(value)
export const VirtualListItemBase = forwardRef<View, VirtualListItemBaseProps>(
    (
        {renderItem, item, render, index = 0, itemSize = 0, startIndex = 0, onUnmount, onLoadEnd, ...renderProps},
        ref
    ) => {
        const [{virtualListItemVisible}, setState] = useImmer<InitialVirtualListItemState>({
            virtualListItemVisible: true
        })

        const id = useId()
        const onVirtualListItemVisible = useCallback(() => processVirtualListItemVisible(setState), [setState])
        const onVirtualListUnmount = useCallback(
            () => processVirtualListUnmount(onUnmount)(item?.indexKey as string | undefined),
            [item?.indexKey, onUnmount]
        )

        const containerAnimatedStyle = useVirtualListItemAnimated({top: (startIndex + index) * itemSize})
        const itemElement =
            !item ? <></> : renderItem?.({item: {...item, onVisible: onVirtualListItemVisible, onLoadEnd}, index})

        return render({
            ...renderProps,
            containerAnimatedStyle,
            id,
            itemElement,
            onUnmount: onVirtualListUnmount,
            ref,
            visible: virtualListItemVisible
        })
    }
)
