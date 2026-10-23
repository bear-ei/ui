import type {NavigationRailItemProps} from './Navigation-rail-item.interface'

import {typedMemo} from '../../../utils'
import {NavigationRailItemBase} from './Navigation-rail-item-base.component'
import {compareNavigationRailItemProps} from './Navigation-rail-item.handler'

export const NavigationRailItem = typedMemo(
	(props: NavigationRailItemProps) => <NavigationRailItemBase {...props} />,
	compareNavigationRailItemProps
)
