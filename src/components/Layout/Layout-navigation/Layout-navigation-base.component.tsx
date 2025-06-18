import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import {LAYOUT_ANIMATED} from '../../Layout-animated'
import type {LayoutNavigationBaseProps} from './Layout-navigation.interface'
import {RenderLayoutNavigation} from './Layout-navigation.render'

export const LayoutNavigationBase = forwardRef<View, LayoutNavigationBaseProps>(
	({animatedType = LAYOUT_ANIMATED.STANDARD, defaultVisible = true, ...renderLayoutNavigationProps}, ref) => {
		const id = useId()

		return (
			<RenderLayoutNavigation
				{...renderLayoutNavigationProps}
				animatedType={animatedType}
				defaultVisible={defaultVisible}
				id={id}
				ref={ref}
			/>
		)
	}
)
