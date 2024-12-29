import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {
        VirtualListItemBaseProps,
        VirtualListItemProps,
        VirtualListItemState,
        VirtualListItemUnmountOptions
} from './Virtual-list-item.interface'

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

export const handleVirtualListItemVisible =
        (setState: Updater<VirtualListItemState>) => (onVisible?: (value?: boolean) => void) => {
                const handleNextVisibleEvent = () => onVisible?.(false)

                setState(draft => {
                        draft.visible = false
                        draft.nextVisibleEvent = handleNextVisibleEvent
                })
        }

export const handleVirtualListUnmount =
        (onUnmount?: (options: VirtualListItemUnmountOptions) => void) =>
        (setState: Updater<VirtualListItemState>) =>
        (value?: string) =>
                setState(draft => {
                        onUnmount?.({value, onItemVisible: draft.nextVisibleEvent})
                })

export const VirtualListItemBase = forwardRef<View, VirtualListItemBaseProps>(
        ({index = 0, item, itemSize = 0, onLoadEnd, onUnmount, render, renderItem, ...renderProps}, ref) => {
                const [{visible}, setState] = useImmer<VirtualListItemState>({
                        nextVisibleEvent: undefined,
                        visible: true
                })

                const id = useId()
                const onVirtualListItemVisible = (onVisible?: (value?: boolean) => void) =>
                        handleVirtualListItemVisible(setState)(onVisible)

                const onVirtualListUnmount = () =>
                        handleVirtualListUnmount(onUnmount)(setState)(item?.indexKey as string | undefined)

                const itemElement =
                        !item ?
                                <></>
                        :       renderItem?.({
                                        index,
                                        item: {...item, onVisible: onVirtualListItemVisible, onLoadEnd}
                                })

                return render({
                        ...renderProps,
                        id,
                        itemElement,
                        itemSize,
                        onUnmount: onVirtualListUnmount,
                        ref,
                        visible
                })
        }
)
