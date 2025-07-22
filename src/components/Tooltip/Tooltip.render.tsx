import {cloneElement, forwardRef} from 'react'
import type {View} from 'react-native'
import type {RenderTooltipProps} from './Tooltip.interface'
import {Container, Content} from './Tooltip.styles'

export const RenderTooltip = forwardRef<View, RenderTooltipProps>(
	({children, id, interactionHandlers, testID, ...containerProps}, ref) => {
		const {onFocus, ...onChildrenStateEvent} = interactionHandlers

		return (
			<Container
				{...containerProps}
				testID={testID ?? `tooltip--${id}`}
				ref={ref}
			>
				<Content testID={`tooltip__content--${id}`}>
					{children && cloneElement(children, {onFocus, ...onChildrenStateEvent})}
				</Content>
			</Container>
		)
	}
)
