import {forwardRef, useEffect, useId} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../../utils'
import {handleVirtualListItemUnmount, handleVirtualListItemVisible} from './Virtual-list-item-handle'
import {VirtualListItemBaseProps, VirtualListItemState} from './Virtual-list-item.interface'
import {useVirtualListItemAnimated} from './use-virtual-list-item-animated.hook'

export const VirtualListItemBase = forwardRef<View, VirtualListItemBaseProps>(
        ({index = 0, item, itemSize = 0, onLoadEnd, onUnmount, render, renderItem, ...renderProps}, ref) => {
                const [{visible, nextVisibleEvent}, setState] = useImmer<VirtualListItemState>({visible: true})
                const id = useId()
                const offsetY = itemSize * index

                const {containerAnimatedStyle} = useVirtualListItemAnimated({offsetY})
                const onVirtualListItemVisible = (onVisible?: (value?: boolean) => void) =>
                        handleVirtualListItemVisible(setState)(onVisible)

                const onVirtualListItemUnmount = handleVirtualListItemUnmount(onUnmount)(item?.indexKey as string)

                const itemElement =
                        !item ?
                                <></>
                        :       renderItem?.({index, item: {...item, onVisible: onVirtualListItemVisible, onLoadEnd}})

                useEffect(() => {
                        runAfterInteractions(nextVisibleEvent)()
                }, [nextVisibleEvent])

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
