import {hexToRGBA} from '@bearei/element-token'
import {cloneElement, forwardRef} from 'react'
import type {View, ViewStyle} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Mask} from '../Mask'
import {TOOLTIP_TYPE} from './Tooltip.enum'
import type {RenderTooltipProps} from './Tooltip.interface'
import {Container, Content} from './Tooltip.styles'

export const RenderTooltip = forwardRef<View, RenderTooltipProps>(
	(
		{
			children,
			id,
			interactionHandlers,
			onContextMenu,
			onMaskPressOut,
			testID,
			type,
			visible,
			...containerProps
		},
		ref
	) => {
		const {onFocus, onHoverIn, ...onChildrenInteractionHandlers} = interactionHandlers
		const theme = useTheme()
		const maskStyle = {position: 'fixed'} as unknown as ViewStyle

		return (
			<Container
				{...containerProps}
				testID={testID ?? `tooltip--${id}`}
				ref={ref}
			>
				<Content testID={`tooltip__content--${id}`}>
					{children &&
						cloneElement(children, {
							onFocus,
							onHoverIn,
							...onChildrenInteractionHandlers,
							...(type === TOOLTIP_TYPE.MENU && {onContextMenu})
						})}

					{type === TOOLTIP_TYPE.MENU && (
						<Mask
							backgroundColor={hexToRGBA(theme.token.scheme.scrim)(0)}
							onPressOut={onMaskPressOut}
							style={maskStyle}
							testID={`tooltip__mask--${id}`}
							visible={visible}
						/>
					)}
				</Content>
			</Container>
		)
	}
)
