import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedProps, AnimatedStyle} from 'react-native-reanimated'
import type {CircleProps} from 'react-native-svg'

import type {ComponentStatus} from '../../../constants'
import type {InteractionHandlers} from '../../../hooks'
import type {ThemeProps} from '../../../theme'
import type {ProgressProps} from '../Progress.interface'

export interface ProgressActiveIndicatorCircularProps
	extends
		ViewProps,
		RefAttributes<View>,
		ThemeProps,
		Pick<ProgressProps, 'animatedType' | 'value' | 'defaultValue' | 'strokeWidth' | 'size' | 'enableAnimated'> {
	content?: React.JSX.Element
}

export interface ProgressActiveIndicatorCircularState {
	status: ComponentStatus
}

export interface RenderProgressActiveIndicatorCircularProps extends Omit<
	ProgressActiveIndicatorCircularProps,
	'size' | 'radius'
> {
	circleAnimatedProps: AnimatedProps<CircleProps>['animatedProps']
	circumference: number
	containerAnimatedStyle: AnimatedStyle<ViewStyle>
	interactionHandlers: InteractionHandlers
	radius: number
	size: number
	strokeWidth: number
}

export type ProgressActiveIndicatorCircularBaseProps = ProgressActiveIndicatorCircularProps
export interface UseProgressActiveIndicatorCircularAnimatedOptions extends Pick<
	RenderProgressActiveIndicatorCircularProps,
	'circumference' | 'enableAnimated'
> {
	status: ComponentStatus
}
