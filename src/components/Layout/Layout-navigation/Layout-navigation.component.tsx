import {DURATION, EASING} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {LAYOUT_ANIMATED} from '../../Layout-animated'
import {LayoutNavigationBase} from './Layout-navigation-base.component'
import type {LayoutNavigationProps, RenderLayoutNavigationProps} from './Layout-navigation.interface'
import {ContainerLayout} from './Layout-navigation.styles'

const renderLayoutNavigation = ({
	animatedType = LAYOUT_ANIMATED.COLLAPSE_X,
	children,
	defaultVisible = true,
	testID,
	...containerProps
}: RenderLayoutNavigationProps) => (
	<ContainerLayout
		{...containerProps}
		animatedType={animatedType}
		defaultVisible={defaultVisible}
		entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
		exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
		testID={`layoutNavigation--${testID}`}
	>
		{children}
	</ContainerLayout>
)

const LayoutNavigationWithRef = forwardRef<View, LayoutNavigationProps>((props, ref) => (
	<LayoutNavigationBase
		{...props}
		ref={ref}
		renderLayoutNavigation={renderLayoutNavigation}
	/>
))

export const LayoutNavigation = LayoutNavigationWithRef as FC<LayoutNavigationProps>
