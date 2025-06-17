import {forwardRef} from 'react'
import type {Pressable} from 'react-native'
import {typedMemo} from '../../../utils'
import {NavigationRailItemBase} from './Navigation-rail-item-base.component'
import {compareNavigationRailItemProps} from './Navigation-rail-item.handler'
import type {NavigationRailItemProps} from './Navigation-rail-item.interface'

const NavigationRailItemWithRef = forwardRef<typeof Pressable, NavigationRailItemProps>((props, ref) => (
	<NavigationRailItemBase
		{...props}
		ref={ref}
	/>
))

export const NavigationRailItem = typedMemo(NavigationRailItemWithRef)((prevProps, nextProps) =>
	compareNavigationRailItemProps(prevProps)(nextProps)
)
