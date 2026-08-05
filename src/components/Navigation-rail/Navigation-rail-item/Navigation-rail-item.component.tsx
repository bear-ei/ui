import type {PressableType} from '@/components/Touchable'
import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import {NavigationRailItemBase} from './Navigation-rail-item-base.component'
import {compareNavigationRailItemProps} from './Navigation-rail-item.handler'
import type {NavigationRailItemProps} from './Navigation-rail-item.interface'

const NavigationRailItemWithRef = forwardRef<PressableType, NavigationRailItemProps>((props, ref) => (
    <NavigationRailItemBase
        {...props}
        ref={ref}
    />
))

NavigationRailItemWithRef.displayName = 'NavigationRailItemWithRef'

export const NavigationRailItem = typedMemo(NavigationRailItemWithRef)((prevProps, nextProps) =>
    compareNavigationRailItemProps(prevProps)(nextProps)
)
