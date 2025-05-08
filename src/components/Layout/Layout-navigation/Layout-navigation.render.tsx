import {DURATION, EASING} from '@bearei/material-token'
import {LAYOUT_ANIMATED} from '../../Layout-animated'
import type {RenderLayoutNavigationProps} from './Layout-navigation.interface'
import {ContainerLayout} from './Layout-navigation.styles'

export const renderLayoutNavigation = ({
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
