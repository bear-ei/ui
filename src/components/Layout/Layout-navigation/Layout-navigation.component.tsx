import {DURATION, EASING} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {LAYOUT_ANIMATED} from '../../Layout-animated'
import {LayoutNavigationBase} from './Layout-navigation-base.component'
import type {LayoutNavigationProps, RenderLayoutNavigationProps} from './Layout-navigation.interface'
import {ContainerLayout} from './Layout-navigation.styles'

const render = ({
	animatedType = LAYOUT_ANIMATED.COLLAPSE_X,
	children,
	defaultVisible = true,
	id,
	testID,
	...containerProps
}: RenderLayoutNavigationProps) => (
	<ContainerLayout
		{...containerProps}
		animatedType={animatedType}
		defaultVisible={defaultVisible}
		entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
		exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
		testID={testID ?? `layoutNavigation--${id}`}
	>
		{children}
	</ContainerLayout>
)

const ForwardRefLayoutNavigation = forwardRef<View, LayoutNavigationProps>((props, ref) => (
	<LayoutNavigationBase
		{...props}
		ref={ref}
		render={render}
	/>
))

export const LayoutNavigation = ForwardRefLayoutNavigation as FC<LayoutNavigationProps>
