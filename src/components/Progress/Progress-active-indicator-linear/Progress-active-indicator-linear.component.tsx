import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {ProgressActiveIndicatorLinearBase} from './Progress-active-indicator-linear-base.component'
import {
        ProgressActiveIndicatorLinearProps,
        RenderProgressActiveIndicatorLinearProps
} from './Progress-active-indicator-linear.interface'
import {Container} from './Progress-active-indicator-linear.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({id, containerAnimatedStyle, testID, ...containerProps}: RenderProgressActiveIndicatorLinearProps) => (
        <AnimatedContainer
                {...containerProps}
                pointerEvents='none'
                shape='small'
                style={[containerAnimatedStyle]}
                testID={testID ?? `progressActiveIndicatorLinear--${id}`}
        />
)

const ForwardRefProgressActiveIndicatorLinear = forwardRef<View, ProgressActiveIndicatorLinearProps>((props, ref) => (
        <ProgressActiveIndicatorLinearBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const ProgressActiveIndicatorLinear: FC<ProgressActiveIndicatorLinearProps> =
        ForwardRefProgressActiveIndicatorLinear
