import {cloneElement, FC, forwardRef, isValidElement} from 'react'
import {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../../Elevation'
import {TooltipSupportingBase} from './Tooltip-supporting-base.component'
import {
    RenderTooltipSupportingProps,
    TooltipSupportingProps
} from './Tooltip-supporting.interface'
import {
    Container,
    Content,
    Main,
    Supporting,
    TooltipSupportingText,
    TouchableContent
} from './Tooltip-supporting.styles'

const AnimateContainer = Animated.createAnimatedComponent(Container)
const render = ({
    closed,
    containerLayout,
    contentAnimatedStyle,
    elevation,
    height = 0,
    id,
    onStateEvent,
    shape,
    supporting,
    supportingPosition = 'verticalStart',
    theme: _,
    type,
    width = 0,
    zIndex,
    ...containerProps
}: RenderTooltipSupportingProps) => {
    const {onLayout, ...mainStateEvent} = onStateEvent
    const mainElement = (
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
                    {type === 'menu' ?
                        cloneElement(supporting, {...mainStateEvent})
                    :   supporting}
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
    )

    return (
        <AnimateContainer
            {...containerProps}
            closed={closed}
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
            zIndex={zIndex}
        >
            {type === 'menu' ?
                <Content testID={`tooltipSupporting_content--${id}`}>
                    {mainElement}
                </Content>
            :   <TouchableContent
                    {...mainStateEvent}
                    testID={`tooltipSupporting_content--${id}`}
                >
                    {mainElement}
                </TouchableContent>
            }

            {elevation && (
                <Elevation
                    level={elevation}
                    shape={shape}
                />
            )}
        </AnimateContainer>
    )
}

const ForwardRefTooltipSupporting = forwardRef<View, TooltipSupportingProps>(
    (props, ref) => (
        <TooltipSupportingBase
            {...props}
            ref={ref}
            render={render}
        />
    )
)

export const TooltipSupporting: FC<TooltipSupportingProps> =
    ForwardRefTooltipSupporting
