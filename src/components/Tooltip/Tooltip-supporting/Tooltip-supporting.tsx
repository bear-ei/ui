import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {TooltipSupportingBase} from './Tooltip-supporting-base'
import {RenderTooltipSupportingProps, TooltipSupportingProps} from './Tooltip-supporting.interface'
import {Container, Content, TooltipSupportingText, TouchableContent} from './Tooltip-supporting.styles'

const AnimatedContent = Animated.createAnimatedComponent(Content)
const render = ({
    animatedStyle,
    containerLayout,
    height = 0,
    id,
    onStateEvent,
    supportingPosition = 'verticalStart',
    supportingText,
    theme,
    type,
    width = 0,
    ...containerProps
}: RenderTooltipSupportingProps) => {
    const containerStyle = {
        transform: [
            {
                translateX:
                    supportingPosition?.startsWith('vertical') ?
                        -(width / 2)
                    :   theme.adaptSize(theme.token.spacing.none)
            },
            {
                translateY:
                    supportingPosition?.startsWith('horizontal') ?
                        -(height / 2)
                    :   theme.adaptSize(theme.token.spacing.none)
            }
        ]
    }

    return (
        <Container
            {...containerProps}
            containerHeight={containerLayout.height}
            containerPageX={containerLayout.pageX}
            containerPageY={containerLayout.pageY}
            containerWidth={containerLayout.width}
            height={height}
            style={[containerStyle]}
            supportingPosition={supportingPosition}
            testID={`tooltipSupporting__supporting--${id}`}
            type={type}
            width={width}
        >
            <TouchableContent
                {...onStateEvent}
                testID={`tooltipSupporting__supportingInner--${id}`}
            >
                <AnimatedContent
                    shape='extraSmall'
                    style={[animatedStyle]}
                    supportingPosition={supportingPosition}
                    testID={`tooltipSupporting__content--${id}`}
                    type={type}
                >
                    <TooltipSupportingText
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        size='small'
                        testID={`tooltipSupporting__supportingText--${id}`}
                        type='body'
                    >
                        {supportingText}
                    </TooltipSupportingText>
                </AnimatedContent>
            </TouchableContent>
        </Container>
    )
}

const ForwardRefTooltipSupporting = forwardRef<View, TooltipSupportingProps>((props, ref) => (
    <TooltipSupportingBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const TooltipSupporting: FC<TooltipSupportingProps> = ForwardRefTooltipSupporting
