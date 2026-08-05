import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {VirtualListItemBase} from './Virtual-list-item-base.component'
import {compareVirtualListItemProps} from './Virtual-list-item.handler'
import type {VirtualListItemProps} from './Virtual-list-item.interface'

const VirtualListItemWithRef = forwardRef<View, VirtualListItemProps>((props, ref) => (
    <VirtualListItemBase
        {...props}
        ref={ref}
    />
))

VirtualListItemWithRef.displayName = 'VirtualListItemWithRef'

export const VirtualListItem = typedMemo(VirtualListItemWithRef)((prevProps, nextProps) =>
    compareVirtualListItemProps(prevProps)(nextProps)
)
