import {forwardRef} from 'react'
import type {View} from 'react-native'
import {NavigationRailBase} from './Navigation-rail-base.component'
import type {NavigationRailProps} from './Navigation-rail.interface'
import {renderNavigationRail} from './Navigation-rail.render'

const NavigationRailWithRef = forwardRef<View, NavigationRailProps>((props, ref) => (
	<NavigationRailBase
		{...props}
		ref={ref}
		renderNavigationRail={renderNavigationRail}
	/>
))

export const NavigationRail = NavigationRailWithRef
