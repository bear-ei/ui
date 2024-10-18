import {FC, forwardRef, isValidElement} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../../Elevation'
import {TooltipSupportingBase} from './Tooltip-supporting-base.component'
import {RenderTooltipSupportingProps, TooltipSupportingProps} from './Tooltip-supporting.interface'
import {
    Container,
    Content,
    Main,
    Supporting,
    TooltipSupportingText,
    TouchableContent
} from './Tooltip-supporting.styles'

const AnimateContent = Animated.createAnimatedComponent(Content)
const render = ({
    closed,
    containerLayout,
    contentAnimatedStyle,
    elevation,
    height = 0,
    id,
    onStateEvent,
    onVisible,
    shape,
    supporting,
    supportingPosition = 'verticalStart',
    theme: _,
    type,
    width = 0,
    ...containerProps
}: RenderTooltipSupportingProps) => {
    // const containerStyle = {
    //     transform: [
    //         {
    //             translateX:
    //                 supportingPosition?.startsWith('vertical') ?
    //                     -(width / 2)
    //                 :   theme.adaptSize(theme.token.spacing.none)
    //         },
    //         {
    //             translateY:
    //                 supportingPosition?.startsWith('horizontal') ?
    //                     -(height / 2)
    //                 :   theme.adaptSize(theme.token.spacing.none)
    //         }
    //     ]
    // }

    const {onLayout, ...contentStateEvent} = onStateEvent

    return (
        <Container
            closed={closed}
            onPressOut={() => onVisible?.(false)}
            testID={`tooltipSupporting__supporting--${id}`}
        >
            <AnimateContent
                {...containerProps}
                containerHeight={containerLayout.height}
                containerPageX={containerLayout.pageX}
                containerPageY={containerLayout.pageY}
                containerWidth={containerLayout.width}
                height={height}
                style={[contentAnimatedStyle]}
                supportingPosition={supportingPosition}
                testID={`tooltipSupporting__supporting--${id}`}
                type={type}
                width={width}
            >
                <TouchableContent
                    {...contentStateEvent}
                    testID={`tooltipSupporting_content--${id}`}
                >
                    <Main
                        shape={shape ?? 'extraSmall'}
                        supportingPosition={supportingPosition}
                        testID={`tooltipSupporting__main--${id}`}
                        type={type}
                    >
                        {isValidElement(supporting) ?
                            <Supporting
                                onLayout={onLayout}
                                testID={`tooltipSupporting__supporting--${id}`}
                            >
                                {supporting}
                            </Supporting>
                        :   <TooltipSupportingText
                                ellipsizeMode='tail'
                                numberOfLines={1}
                                size='small'
                                testID={`tooltipSupporting__supportingText--${id}`}
                                type='body'
                            >
                                {supporting}
                            </TooltipSupportingText>
                        }
                    </Main>
                </TouchableContent>

                {elevation && (
                    <Elevation
                        level={elevation}
                        shape={shape}
                    />
                )}
            </AnimateContent>
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
