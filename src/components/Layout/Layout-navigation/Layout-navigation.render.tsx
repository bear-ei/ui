import {DURATION, EASING} from '@bearei/material-token'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import type {RenderLayoutNavigationProps} from './Layout-navigation.interface'
import {Container} from './Layout-navigation.styles'

export const RenderLayoutNavigation = forwardRef<View, RenderLayoutNavigationProps>(
	({children, id, testID, ...containerProps}, ref) => (
		<Container
			{...containerProps}
			entry={{duration: DURATION.MEDIUM_3, easing: EASING.EMPHASIZED_DECELERATE}}
			exit={{duration: DURATION.SHORT_3, easing: EASING.EMPHASIZED_ACCELERATE}}
			ref={ref}
			testID={testID ?? `layoutNavigation--${id}`}
		>
			{children}
		</Container>
	)
)
