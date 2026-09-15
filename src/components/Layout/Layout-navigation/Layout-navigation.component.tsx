import {forwardRef} from 'react'
import type {View} from 'react-native'
import {LayoutNavigationBase} from './Layout-navigation-base.component'
import type {LayoutNavigationProps} from './Layout-navigation.interface'
import {typedMemo} from '../../../utils'

const LayoutNavigationWithRef = forwardRef<View, LayoutNavigationProps>((props, ref) => (
	<LayoutNavigationBase
		{...props}
		ref={ref}
	/>
))

LayoutNavigationWithRef.displayName = 'LayoutNavigationWithRef'

export const LayoutNavigation = typedMemo(LayoutNavigationWithRef)()
