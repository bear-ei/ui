import {forwardRef, memo} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {UnderlayBase, handleUnderlayPropsEqual} from './Underlay-base.component'
import {RenderUnderlayProps, UnderlayProps} from './Underlay.interface'
import {ActiveLayer, Container, HoverLayer} from './Underlay.style'

const AnimatedHoverLayer = Animated.createAnimatedComponent(HoverLayer)
const AnimatedActiveLayer = Animated.createAnimatedComponent(ActiveLayer)
const render = ({
    active,
    activeColor,
    activeLayerAnimatedStyle,
    height,
    hoverLayerAnimatedStyle,
    id,
    style,
    underlayColor,
    width,
    shape,
    activeShape,
    ...containerProps
}: RenderUnderlayProps) => {
    return (
        <Container
            {...containerProps}
            height={height}
            pointerEvents='none'
            shape={shape}
            style={[style]}
            testID={`underlay--${id}`}
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
}

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
