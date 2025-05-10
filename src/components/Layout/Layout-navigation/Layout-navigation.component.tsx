import {forwardRef, memo, type FC} from 'react'
import type {View} from 'react-native'
import {LayoutNavigationBase} from './Layout-navigation-base.component'
import type {LayoutNavigationProps} from './Layout-navigation.interface'
import {renderLayoutNavigation} from './Layout-navigation.render'

const LayoutNavigationWithRef = forwardRef<View, LayoutNavigationProps>((props, ref) => (
	<LayoutNavigationBase
		{...props}
		ref={ref}
		renderLayoutNavigation={renderLayoutNavigation}
	/>
))

export const LayoutNavigation = memo(LayoutNavigationWithRef) as FC<LayoutNavigationProps>
