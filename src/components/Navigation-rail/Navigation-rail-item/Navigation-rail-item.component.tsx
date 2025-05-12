import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {NavigationRailItemBase} from './Navigation-rail-item-base.component'
import {handleNavigationRailItemPropsEqual} from './Navigation-rail-item-handle'
import type {NavigationRailItemProps} from './Navigation-rail-item.interface'
import {renderNavigationRailItem} from './Navigation-rail-item.render'

const NavigationRailItemWithRef = forwardRef<View, NavigationRailItemProps>((props, ref) => (
	<NavigationRailItemBase
		{...props}
		ref={ref}
		renderNavigationRailItem={renderNavigationRailItem}
	/>
))

export const NavigationRailItem = typedMemo(NavigationRailItemWithRef)((prevProps, nextProps) =>
	handleNavigationRailItemPropsEqual(prevProps)(nextProps)
)
