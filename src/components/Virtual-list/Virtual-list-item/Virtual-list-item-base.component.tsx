import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {useVirtualListItemAnimated} from './use-virtual-list-item-animated.hook'
import {VirtualListItemBaseProps, VirtualListItemProps, VirtualListItemState} from './Virtual-list-item.interface'

export const handleVirtualListItemPropsEqual = (prevProps: VirtualListItemProps) => {
        const {extraData: prevExtraData, index: prevIndex, item: prevItem} = prevProps

        return (nextProps: VirtualListItemProps) => {
                const {extraData: nextExtraData, index: nextIndex, item: nextItem} = nextProps

                return ![
                        prevExtraData?.join() !== nextExtraData?.join(),
                        prevIndex !== nextIndex,
                        prevItem?.extraData?.join() !== nextItem?.extraData?.join()
                ].some(Boolean)
        }
}

export const handleVirtualListItemVisible = (setState: Updater<VirtualListItemState>) =>
        setState(draft => {
                draft.virtualListItemVisible = false
        })

export const handleVirtualListUnmount = (onUnmount?: (value?: string) => void) => (value?: string) => onUnmount?.(value)
export const VirtualListItemBase = forwardRef<View, VirtualListItemBaseProps>(
        (
                {
                        renderItem,
                        item,
                        render,
                        index = 0,
                        itemSize = 0,
                        startIndex = 0,
                        onUnmount,
                        onLoadEnd,
                        ...renderProps
                },
                ref
        ) => {
                const [{virtualListItemVisible}, setState] = useImmer<VirtualListItemState>({
                        virtualListItemVisible: true
                })

                const id = useId()
                const onVirtualListItemVisible = () => handleVirtualListItemVisible(setState)
                const onVirtualListUnmount = () =>
                        handleVirtualListUnmount(onUnmount)(item?.indexKey as string | undefined)

                const {containerAnimatedStyle} = useVirtualListItemAnimated({
                        top: (startIndex + index) * itemSize
                })

                const itemElement =
                        !item ?
                                <></>
                        :       renderItem?.({
                                        item: {...item, onVisible: onVirtualListItemVisible, onLoadEnd},
                                        index
                                })

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
