import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {NavigationRailBase} from './Navigation-rail-base.component'
import type {NavigationRailProps} from './Navigation-rail.interface'

const NavigationRailWithRef = forwardRef<View, NavigationRailProps>((props, ref) => (
	<NavigationRailBase
		{...props}
		ref={ref}
	/>
))

export const NavigationRail = typedMemo(NavigationRailWithRef)()
