import {forwardRef, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {UnderlayBase, handleUnderlayPropsEqual} from './Underlay-base.component'
import {RenderUnderlayProps, UnderlayProps} from './Underlay.interface'
import {ActiveLayer, Container, HoverLayer} from './Underlay.styles'

const AnimatedHoverLayer = Animated.createAnimatedComponent(HoverLayer)
const AnimatedActiveLayer = Animated.createAnimatedComponent(ActiveLayer)
const render = ({
        active,
        activeColor,
        activeLayerAnimatedStyle,
        activeShape,
        height,
        hoverLayerAnimatedStyle,
        id,
        onStateEvent,
        shape,
        style,
        testID,
        underlayColor,
        width,
        ...containerProps
}: RenderUnderlayProps) => (
        <Container
                {...containerProps}
                {...onStateEvent}
                height={height}
                pointerEvents='none'
                shape={shape}
                style={[style]}
                testID={testID ?? `underlay--${id}`}
                width={width}
        >
                <AnimatedHoverLayer
                        shape={shape}
                        style={[hoverLayerAnimatedStyle]}
                        testID={`underlay__hoverLayer--${id}`}
                        underlayColor={underlayColor}
                />

                {typeof active === 'boolean' && activeColor && (
                        <AnimatedActiveLayer
                                activeColor={activeColor}
                                shape={activeShape ?? shape}
                                style={[activeLayerAnimatedStyle]}
                                testID={`underlay__activeLayer--${id}`}
                        />
                )}
        </Container>
)

const ForwardRefUnderlay = forwardRef<View, UnderlayProps>((props, ref) => (
        <UnderlayBase
                {...props}
                ref={ref}
                render={render}
        />
))

export const Underlay = memo(ForwardRefUnderlay, (prevProps, nextProps) =>
        handleUnderlayPropsEqual(prevProps)(nextProps)
) as typeof ForwardRefUnderlay
