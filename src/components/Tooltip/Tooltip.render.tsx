import {cloneElement, forwardRef} from 'react'
import type {View} from 'react-native'
import {TOOLTIP_TYPE} from './Tooltip.enum'
import type {RenderTooltipProps} from './Tooltip.interface'
import {Container} from './Tooltip.styles'

export const RenderTooltip = forwardRef<View, RenderTooltipProps>(
	({children, id, interactionHandlers, onContextMenu, testID, type, ...containerProps}, ref) => {
		const {onFocus, onHoverIn, ...onChildrenInteractionHandlers} = interactionHandlers

		return (
			<Container
				{...containerProps}
				testID={testID ?? `tooltip--${id}`}
				ref={ref}
			>
				{children &&
					cloneElement(children, {
						onFocus,
						onHoverIn,
						...onChildrenInteractionHandlers,
						...(type === TOOLTIP_TYPE.MENU && {onContextMenu})
					})}
			</Container>
		)
	}
)
