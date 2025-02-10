import {forwardRef, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {handleVirtualListItemClose, handleVirtualListItemUnmount} from './Virtual-list-item-handle'
import {VirtualListItemBaseProps, VirtualListItemState} from './Virtual-list-item.interface'
import {useVirtualListItemAnimated} from './use-virtual-list-item-animated.hook'

export const VirtualListItemBase = forwardRef<View, VirtualListItemBaseProps>(
        ({index = 0, item, itemSize = 0, onLoadEnd, onUnmount, render, renderItem, ...renderProps}, ref) => {
                const [{visible}, setState] = useImmer<VirtualListItemState>({visible: true})
                const id = useId()
                const offsetY = useMemo(() => itemSize * index, [index, itemSize])
                const {containerAnimatedStyle} = useVirtualListItemAnimated({offsetY})
                const onVirtualListItemClose = handleVirtualListItemClose(setState)
                const onVirtualListItemUnmount = handleVirtualListItemUnmount(onUnmount)(item?.indexKey as string)
                const itemElement =
                        !item ?
                                <></>
                        :       renderItem?.({index, item: {...item, onClose: onVirtualListItemClose, onLoadEnd}})

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
