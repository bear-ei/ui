import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {ProgressActiveIndicatorBase} from './Progress-active-indicator-base.component'
import {ProgressActiveIndicatorProps, RenderProgressActiveIndicatorProps} from './Progress-active-indicator.interface'
import {Container} from './Progress-active-indicator.styles'

const AnimatedContainer = Animated.createAnimatedComponent(Container)
const render = ({id, containerAnimatedStyle, testID, ...containerProps}: RenderProgressActiveIndicatorProps) => (
        <AnimatedContainer
                {...containerProps}
                pointerEvents='none'
                shape='small'
                style={[containerAnimatedStyle]}
                testID={testID ?? `progressActiveIndicator--${id}`}
        />
)

const ForwardRefProgressActiveIndicator = forwardRef<View, ProgressActiveIndicatorProps>((props, ref) => (
        <ProgressActiveIndicatorBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const ProgressActiveIndicator: FC<ProgressActiveIndicatorProps> = ForwardRefProgressActiveIndicator
