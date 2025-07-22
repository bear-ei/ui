import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/element-token'
import {cloneElement, forwardRef, isValidElement} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../../Elevation'
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
			closed,
			containerLayout,
			contentAnimatedStyle,
			elevation,
			height = 0,
			id,
			interactionHandlers,
			shape,
			supporting,
			supportingPosition = SUPPORTING_POSITION.VERTICAL_START,
			testID,
			type,
			width = 0,
			...containerProps
		},
		ref
	) => {
		const {onLayout, ...mainStateEvent} = interactionHandlers
		const mainElement = (
			<Main
				shape={shape ?? SHAPE.EXTRA_SMALL}
				supportingPosition={supportingPosition}
				testID={testID ?? `tooltipSupporting__main--${id}`}
				type={type}
			>
				{isValidElement(supporting) ?
					<Supporting
						onLayout={onLayout}
						testID={`tooltipSupporting__supporting--${id}`}
					>
						{type === TOOLTIP_TYPE.MENU ?
							cloneElement(supporting, {...mainStateEvent})
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
				closed={closed}
				containerHeight={containerLayout.height}
				containerPageX={containerLayout.pageX}
				containerPageY={containerLayout.pageY}
				containerWidth={containerLayout.width}
				height={height}
				ref={ref}
				style={[contentAnimatedStyle]}
				supportingPosition={supportingPosition}
				testID={`tooltipSupporting__supporting--${id}`}
				type={type}
				width={width}
			>
				{type === TOOLTIP_TYPE.MENU ?
					<Content testID={`tooltipSupporting_content--${id}`}>{mainElement}</Content>
				:	<TouchableContent
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
)
