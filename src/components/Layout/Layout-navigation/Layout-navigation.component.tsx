import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {LayoutNavigationBase} from './Layout-navigation-base.component'
import type {LayoutNavigationProps} from './Layout-navigation.interface'

const LayoutNavigationWithRef = forwardRef<View, LayoutNavigationProps>((props, ref) => (
	<LayoutNavigationBase
		{...props}
		ref={ref}
	/>
))

export const LayoutNavigation = typedMemo(LayoutNavigationWithRef)()
