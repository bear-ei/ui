import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {ProgressProps} from '../Progress.interface'

export interface ProgressActiveIndicatorLinearProps
	extends ViewProps,
		RefAttributes<View>,
		Pick<ProgressProps, 'animatedType' | 'value' | 'defaultValue'> {}

export interface RenderProgressActiveIndicatorLinearProps extends ProgressActiveIndicatorLinearProps {
	contentAnimatedStyle: AnimatedStyle<ViewStyle>
}

export interface ProgressActiveIndicatorLinearBaseProps extends ProgressActiveIndicatorLinearProps {
	renderProgressActiveIndicatorLinear: (props: RenderProgressActiveIndicatorLinearProps) => React.JSX.Element
}

export type UseProgressActiveIndicatorLinearAnimatedOptions = Pick<
	ProgressActiveIndicatorLinearProps,
	'defaultValue' | 'value'
>
