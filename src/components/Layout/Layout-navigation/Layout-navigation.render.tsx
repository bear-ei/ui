import {DURATION, EASING} from '@bearei/material-token'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {LAYOUT_ANIMATED} from '../../Layout-animated'
import type {RenderLayoutNavigationProps} from './Layout-navigation.interface'
import {ContainerLayout} from './Layout-navigation.styles'

export const RenderLayoutNavigation = forwardRef<View, RenderLayoutNavigationProps>(
	(
		{
			animatedType = LAYOUT_ANIMATED.COLLAPSE_X,
			children,
			defaultVisible = true,
			id,
			testID,
			...containerProps
		},
		ref
	) => (
		<ContainerLayout
			{...containerProps}
			animatedType={animatedType}
			defaultVisible={defaultVisible}
			entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
			exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
			ref={ref}
			testID={testID ?? `layoutNavigation--${id}`}
		>
			{children}
		</ContainerLayout>
	)
)
