import {forwardRef, useEffect, useId} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {handleVirtualListItemVisible} from './Virtual-list-item-handle'
import {VirtualListItemBaseProps, VirtualListItemState} from './Virtual-list-item.interface'

export const VirtualListItemBase = forwardRef<View, VirtualListItemBaseProps>(
        ({index = 0, item, itemSize = 0, onLoadEnd, onUnmount, render, renderItem, ...renderProps}, ref) => {
                const [{visible, nextVisibleEvent}, setState] = useImmer<VirtualListItemState>({visible: true})
                const id = useId()
                const onVirtualListItemVisible = (onVisible?: (value?: boolean) => void) =>
                        handleVirtualListItemVisible(setState)(onVisible)

                const itemElement =
                        !item ?
                                <></>
                        :       renderItem?.({index, item: {...item, onVisible: onVirtualListItemVisible, onLoadEnd}})

                useEffect(() => {
                        nextVisibleEvent?.()
                }, [nextVisibleEvent])

                return render({
                        ...renderProps,
                        id,
                        index,
                        itemElement,
                        itemSize,
                        onUnmount: () => onUnmount?.(item?.indexKey as string | undefined),
                        ref,
                        visible
                })
        }
)
