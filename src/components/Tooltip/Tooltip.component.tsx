import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {TooltipBase} from './Tooltip-base.component'
import {TooltipSupporting} from './Tooltip-supporting'
import {RenderTooltipProps, TooltipProps} from './Tooltip.interface'
import {Container, Content, ContentContainer} from './Tooltip.styles'

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
    type,
    visible,
    ...containerProps
}: RenderTooltipProps) => {
    return (
        <Container
            {...containerProps}
            testID={`tooltip--${id}`}
        >
            <ContentContainer testID={`tooltip__contentXXXXX--${id}`}>
                <Content
                    {...onStateEvent}
                    testID={`tooltip__content--${id}`}
                >
                    {children}
                </Content>
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
