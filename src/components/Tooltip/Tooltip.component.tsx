import {cloneElement, FC, forwardRef} from 'react'
import {View} from 'react-native'
import {TooltipBase} from './Tooltip-base.component'
import {RenderTooltipProps, TooltipProps} from './Tooltip.interface'
import {Container, ContentContainer} from './Tooltip.styles'

/**
 * TODO: "rich"
 */
const render = ({
    children,
    id,
    onStateEvent,
    ...containerProps
}: RenderTooltipProps) => {
    const {onFocus, ...onChildrenStateEvent} = onStateEvent

    return (
        <Container
            {...containerProps}
            testID={`tooltip--${id}`}
        >
            <ContentContainer testID={`tooltip__content--${id}`}>
                {children &&
                    cloneElement(children, {onFocus, ...onChildrenStateEvent})}
            </ContentContainer>
        </Container>
    )
}

const ForwardRefTooltip = forwardRef<View, TooltipProps>((props, ref) => (
    <TooltipBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const Tooltip: FC<TooltipProps> = ForwardRefTooltip
