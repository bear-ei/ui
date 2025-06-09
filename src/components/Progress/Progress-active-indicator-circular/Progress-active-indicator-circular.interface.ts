import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedProps, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {CircleProps} from 'react-native-svg'
import type {DefaultTheme} from 'styled-components/native'
import type {ShapeProps} from '../../Common'
import type {ProgressProps} from '../Progress.interface'

export interface ProgressActiveIndicatorCircularProps
	extends ViewProps,
		RefAttributes<View>,
		ShapeProps,
		Pick<
			ProgressProps,
			'animatedType' | 'value' | 'defaultValue' | 'strokeWidth' | 'size' | 'enableAnimated'
		> {
	content?: React.JSX.Element
}

export interface RenderProgressActiveIndicatorCircularProps extends ProgressActiveIndicatorCircularProps {
	circleAnimatedProps: AnimatedProps<CircleProps>['animatedProps']
	circumference: number
	containerAnimatedStyle: AnimatedStyle<ViewStyle>
	radius: number
	strokeWidth: number
	theme: DefaultTheme
}

export interface ProgressActiveIndicatorCircularBaseProps extends ProgressActiveIndicatorCircularProps {
	renderProgressActiveIndicatorCircular: (props: RenderProgressActiveIndicatorCircularProps) => React.JSX.Element
}

export type UseProgressActiveIndicatorCircularAnimatedOptions = Pick<
	RenderProgressActiveIndicatorCircularProps,
	'circumference' | 'enableAnimated'
>

export interface AnimateProgressActiveIndicatorCircularSharedValues {
	containerSharedValue: SharedValue<number>
	circleSharedValue: SharedValue<number>
}
