import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import {cloneElement} from 'react'
import Animated from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import {EVENT_NAME} from '../Common'
import {Elevation} from '../Elevation'
import type {IconProps} from '../Icon'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {BUTTON_TYPE} from './Button.enum'
import type {ButtonType, RenderButtonIconOptions, RenderButtonProps} from './Button.interface'
import {
	ActiveIndicatorLayoutAnimated,
	BackgroundUnderlay,
	Container,
	Content,
	IconLayout,
	LabelText,
	Main
} from './Button.styles'

export const renderButtonIcon =
	({disabled, type = BUTTON_TYPE.FILLED, id}: RenderButtonIconOptions) =>
	(theme: DefaultTheme) => {
		const fillType = {
			[BUTTON_TYPE.ELEVATED]: theme.token.scheme.primary,
			[BUTTON_TYPE.FILLED]: theme.token.scheme.onPrimary,
			[BUTTON_TYPE.LINK]: theme.token.scheme.primary,
			[BUTTON_TYPE.TEXT]: theme.token.scheme.primary,
			[BUTTON_TYPE.TONAL]: theme.token.scheme.onSecondaryContainer
		} as Record<ButtonType, string>

		return (icon?: React.JSX.Element) => {
			if (!icon) {
				return icon
			}

			const size = theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)

			return cloneElement<IconProps>(icon, {
				disabled,
				fill: fillType[type],
				size,
				testID: `button__icon--${id}`
			})
		}
	}

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
export const renderButton = ({
	accessibilityLabel,
	backgroundUnderlayAnimatedStyle,
	density,
	disabled,
	elevation,
	eventName,
	iconElement,
	id,
	interactionHandlers,
	labelText,
	labelTextAnimatedStyle,
	loading,
	ref,
	testID,
	type = BUTTON_TYPE.FILLED,
	underlayColor,
	...contentProps
}: RenderButtonProps) => {
	const eventNames = [
		EVENT_NAME.FOCUS,
		EVENT_NAME.HOVER_IN,
		EVENT_NAME.LONG_PRESS,
		EVENT_NAME.PRESS_IN,
		EVENT_NAME.PRESS_OUT,
		EVENT_NAME.PRESS
	] as const

	const isActiveIndicatorVisible =
		type === BUTTON_TYPE.LINK && eventName && eventNames.includes(eventName as (typeof eventNames)[number])

	const isLink = type === BUTTON_TYPE.LINK
	const loadingTypes = [BUTTON_TYPE.LINK, BUTTON_TYPE.OUTLINED, BUTTON_TYPE.TEXT] as const
	const loadingEventName =
		loadingTypes.includes(type as (typeof loadingTypes)[number]) ? EVENT_NAME.NONE : EVENT_NAME.LONG_PRESS

	const shape = isLink ? SHAPE.EXTRA_SMALL : SHAPE.FULL
	const backgroundUnderlayElement = (
		<AnimatedBackgroundUnderlay
			pointerEvents='none'
			shape={shape}
			style={[backgroundUnderlayAnimatedStyle]}
			testID={`button__animatedBackgroundUnderlay--${id}`}
		/>
	)

	const elevationUnderlayElement =
		typeof elevation === 'number' ?
			<Elevation
				level={elevation}
				shape={shape}
				testID={`button__elevation--${id}`}
			/>
		:	<></>

	return (
		<Container
			accessibilityLabel={labelText ?? accessibilityLabel}
			accessibilityRole='button'
			accessibilityState={{disabled}}
			accessible={true}
			testID={testID ?? `button--${id}`}
			type={type}
		>
			<Touchable
				{...interactionHandlers}
				backgroundUnderlay={backgroundUnderlayElement}
				disabled={disabled}
				elevationUnderlay={elevationUnderlayElement}
				hotZone={type !== BUTTON_TYPE.LINK}
				ref={ref}
				shape={shape}
				testID={`button__touchable--${id}`}
				underlayColor={underlayColor}
			>
				<Content
					{...contentProps}
					density={density}
					pointerEvents='none'
					shape={shape}
					testID={`button__content--${id}`}
					type={type}
				>
					<Main
						iconShow={!!iconElement}
						testID={`button__main--${id}`}
						type={type}
					>
						{iconElement && !isLink && (
							<IconLayout testID={`button__iconLayout--${id}`}>
								{iconElement}
							</IconLayout>
						)}

						<AnimatedLabelText
							ellipsizeMode='tail'
							numberOfLines={1}
							size={isLink ? SIZE.SMALL : SIZE.LARGE}
							style={[labelTextAnimatedStyle]}
							testID={`button__animatedLabelText--${id}`}
							type={isLink ? TYPOGRAPHY.BODY : TYPOGRAPHY.LABEL}
						>
							{labelText}
						</AnimatedLabelText>
					</Main>

					{type === BUTTON_TYPE.LINK && (
						<ActiveIndicatorLayoutAnimated
							testID={`button__activeIndicatorLayoutAnimated--${id}`}
							visible={isActiveIndicatorVisible}
						/>
					)}

					<Underlay
						eventName={loading ? loadingEventName : eventName}
						shape={shape}
						testID={`button__underlay--${id}`}
						underlayColor={underlayColor}
					/>
				</Content>
			</Touchable>
		</Container>
	)
}
