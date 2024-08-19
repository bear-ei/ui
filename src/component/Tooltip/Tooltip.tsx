import {FC, forwardRef} from 'react'
import {View} from 'react-native'
import {TooltipBase} from './Tooltip-base'
import {TooltipSupporting} from './Tooltip-supporting'
import {RenderTooltipProps, TooltipProps} from './Tooltip.interface'
import {Container, Content} from './Tooltip.style'

/**
 * TODO: "rich","Check style"
 */

const render = ({
    children,
    containerCurrent,
    id,
    onStateEvent,
    onVisible,
    supportingPosition,
    supportingText,
    visible,
    ...containerProps
}: RenderTooltipProps) => (
    <Container
        {...containerProps}
        testID={`tooltip--${id}`}
    >
        <Content
            {...onStateEvent}
            testID={`tooltip__content--${id}`}
        >
            {children}
        </Content>

        {typeof visible === 'boolean' && typeof supportingText === 'string' && (
            <TooltipSupporting
                containerCurrent={containerCurrent}
                onVisible={onVisible}
                supportingPosition={supportingPosition}
                supportingText={supportingText}
                visible={visible}
            />
        )}
    </Container>
)

const ForwardRefTooltip = forwardRef<View, TooltipProps>((props, ref) => (
    <TooltipBase
        {...props}
        ref={ref}
        render={render}
    />
))

export const Tooltip: FC<TooltipProps> = ForwardRefTooltip
