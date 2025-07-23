import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/element-token'
import {cloneElement, forwardRef, isValidElement} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../../Elevation'
import type {MenuProps} from '../../Menu'
import {TOOLTIP_TYPE} from '../Tooltip.enum'
import {SUPPORTING_POSITION} from './Tooltip-supporting.enum'
import type {RenderTooltipSupportingProps} from './Tooltip-supporting.interface'
import {
	Container,
	Content,
	Main,
	Supporting,
	TooltipSupportingText,
	TouchableContent
} from './Tooltip-supporting.styles'

const AnimateContainer = Animated.createAnimatedComponent(Container)
export const RenderTooltipSupporting = forwardRef<View, RenderTooltipSupportingProps>(
	(
		{
			containerLayout,
			contentAnimatedStyle,
			elevation,
			height = 0,
			id,
			interactionHandlers,
			shape = SHAPE.EXTRA_SMALL,
			supporting,
			supportingPosition = SUPPORTING_POSITION.VERTICAL_START,
			testID,
			type,
			width = 0,
			visible,
			menuPosition,
			...containerProps
		},
		ref
	) => {
		const {onLayout, ...mainInteractionHandlers} = interactionHandlers
		const mainElement = (
			<Main
				{...(type === TOOLTIP_TYPE.PLAIN && {onLayout})}
				shape={shape}
				testID={`tooltipSupporting__main--${id}`}
				type={type}
			>
				{isValidElement(supporting) ?
					<Supporting
						{...(type === TOOLTIP_TYPE.MENU && {onLayout})}
						testID={`tooltipSupporting__supporting--${id}`}
					>
						{type === TOOLTIP_TYPE.MENU ?
							cloneElement<MenuProps>(
								supporting as React.ReactElement<
									MenuProps,
									string | React.JSXElementConstructor<unknown>
								>,
								{...mainInteractionHandlers, visible}
							)
						:	supporting}
					</Supporting>
				:	<TooltipSupportingText
						ellipsizeMode='tail'
						numberOfLines={1}
						size={SIZE.SMALL}
						testID={`tooltipSupporting__supportingText--${id}`}
						type={TYPOGRAPHY.BODY}
					>
						{supporting}
					</TooltipSupportingText>
				}
			</Main>
		)

		return (
			<AnimateContainer
				{...containerProps}
				containerLayout={containerLayout}
				menuPosition={menuPosition}
				height={height}
				ref={ref}
				style={[contentAnimatedStyle]}
				supportingPosition={supportingPosition}
				testID={testID ?? `tooltipSupporting__supporting--${id}`}
				type={type}
				visible={visible}
				width={width}
			>
				{type === TOOLTIP_TYPE.MENU ?
					<Content testID={`tooltipSupporting_content--${id}`}>{mainElement}</Content>
				:	<TouchableContent
						{...mainInteractionHandlers}
						testID={`tooltipSupporting_content--${id}`}
					>
						{mainElement}
					</TouchableContent>
				}

				{elevation && (
					<Elevation
						level={elevation}
						shape={shape}
						testID={`tooltipSupporting_elevation--${id}`}
					/>
				)}
			</AnimateContainer>
		)
	}
)
