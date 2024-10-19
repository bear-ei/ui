import {cloneElement, FC, forwardRef} from 'react'
import {View} from 'react-native'
import {TooltipBase} from './Tooltip-base.component'
import {TooltipSupporting} from './Tooltip-supporting'
import {RenderTooltipProps, TooltipProps} from './Tooltip.interface'
import {Container, ContentContainer} from './Tooltip.styles'

/**
 * TODO: "rich"
 */
const render = ({
    children,
    containerCurrent,
    elevation,
    id,
    layout,
    onStateEvent,
    onVisible,
    shape,
    supporting,
    supportingPosition,
    triggerEvent,
    type,
    visible,
    ...containerProps
}: RenderTooltipProps) => {
    const {onFocus, ...onChildrenStateEvent} = onStateEvent

    return (
        <Container
            {...containerProps}
            testID={`tooltip--${id}`}
        >
            <ContentContainer testID={`tooltip__content--${id}`}>
                {children && cloneElement(children, {onFocus, ...onChildrenStateEvent})}
            </ContentContainer>

            {typeof visible === 'boolean' && supporting && (
                <TooltipSupporting
                    containerCurrent={containerCurrent}
                    containerLayout={layout}
                    elevation={elevation}
                    onVisible={onVisible}
                    shape={shape}
                    supporting={supporting}
                    supportingPosition={supportingPosition}
                    triggerEvent={triggerEvent}
                    type={type}
                    visible={visible}
                />
            )}
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
