import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {debounce, runAfterInteractions} from '../../../utils'
import {
        handleVirtualListItemClose,
        handleVirtualListItemStatus,
        handleVirtualListItemUnmount
} from './Virtual-list-item-handle'
import {VirtualListItemBaseProps, VirtualListItemState} from './Virtual-list-item.interface'
import {useVirtualListItemAnimated} from './use-virtual-list-item-animated.hook'

export const VirtualListItemBase = forwardRef<View, VirtualListItemBaseProps>(
        ({index = 0, item, itemSize = 0, onLoadEnd, onUnmount, render, renderItem, onClose, ...renderProps}, ref) => {
                const [{visible, nextCloseEvent, status}, setState] = useImmer<VirtualListItemState>({
                        visible: true,
                        status: 'idle'
                })

                const id = useId()
                const offsetY = useMemo(() => itemSize * index, [index, itemSize])
                const {containerAnimatedStyle} = useVirtualListItemAnimated({offsetY})
                const onVirtualListItemStatus = useMemo(
                        () => debounce(handleVirtualListItemStatus(setState))(50),
                        [setState]
                )

                const onVirtualListItemClose = handleVirtualListItemClose(setState)(onClose)
                const onVirtualListItemUnmount = handleVirtualListItemUnmount(onUnmount)(item?.indexKey as string)
                const itemElement =
                        !item ?
                                <></>
                        :       renderItem?.({index, item: {...item, onClose: onVirtualListItemClose, onLoadEnd}})

                useEffect(() => {
                        runAfterInteractions(nextCloseEvent)()
                }, [nextCloseEvent])

                useEffect(() => {
                        runAfterInteractions(onVirtualListItemStatus)()
                }, [onVirtualListItemStatus])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        ...renderProps,
                        containerAnimatedStyle,
                        id,
                        index,
                        itemElement,
                        itemSize,
                        onUnmount: onVirtualListItemUnmount,
                        ref,
                        visible
                })
        }
)
