import {forwardRef} from 'react'
import {NavigationRailItemBase} from './Navigation-rail-item-base.component'
import {compareNavigationRailItemProps} from './Navigation-rail-item.handler'
import type {NavigationRailItemProps} from './Navigation-rail-item.interface'
import type {PressableType} from '../../Touchable'
import {typedMemo} from '../../../utils'

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
