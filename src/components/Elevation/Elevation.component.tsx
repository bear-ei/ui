import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {ElevationBase} from './Elevation-base.component'
import {ElevationProps, RenderElevationProps} from './Elevation.interface'
import {Container, Shadow} from './Elevation.styles'

const AnimatedShadow = Animated.createAnimatedComponent(Shadow)
const render = ({level, shadowAnimatedStyle, shape, ...containerProps}: RenderElevationProps) => (
        <Container {...containerProps}>
                <AnimatedShadow
                        level={level}
                        shape={shape}
                        style={[shadowAnimatedStyle]}
                />
        </Container>
)

const ForwardRefElevation = forwardRef<View, ElevationProps>((props, ref) => (
        <ElevationBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Elevation: FC<ElevationProps> = ForwardRefElevation
