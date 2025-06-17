import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import {cloneElement, forwardRef, useMemo, type FC} from 'react'
import {Pressable} from 'react-native'
import Animated from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {EVENT_NAME} from '../Common'
import {Elevation} from '../Elevation'
import type {IconProps} from '../Icon'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {BUTTON_TYPE} from './Button.enum'
import type {ButtonType, RenderButtonIconProps, RenderButtonProps} from './Button.interface'
import {
	ActiveIndicatorLayout,
	BackgroundUnderlay,
	Container,
	Content,
	IconLayout,
	LabelText,
	Main
} from './Button.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
export const RenderButtonIcon: FC<RenderButtonIconProps> = ({disabled, type = BUTTON_TYPE.FILLED, id, icon}) => {
	const theme = useTheme()
	const fillType = useMemo(
		() =>
			({
				[BUTTON_TYPE.ELEVATED]: theme.token.scheme.primary,
				[BUTTON_TYPE.FILLED]: theme.token.scheme.onPrimary,
				[BUTTON_TYPE.LINK]: theme.token.scheme.primary,
				[BUTTON_TYPE.TEXT]: theme.token.scheme.primary,
				[BUTTON_TYPE.TONAL]: theme.token.scheme.onSecondaryContainer
			}) as Record<ButtonType, string>,
		[theme.token.scheme.onPrimary, theme.token.scheme.onSecondaryContainer, theme.token.scheme.primary]
	)

	const size = theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)

	if (!icon) {
		return icon
	}

	return cloneElement<IconProps>(icon, {
		disabled,
		fill: fillType[type],
		size,
		testID: `button__icon--${id}`
	})
}

export const RenderButton = forwardRef<typeof Pressable, RenderButtonProps>(
	(
		{
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
			testID,
			type = BUTTON_TYPE.FILLED,
			underlayColor,
			...touchableProps
		}: RenderButtonProps,
		ref
	) => {
		const eventNames = [
			EVENT_NAME.FOCUS,
			EVENT_NAME.HOVER_IN,
			EVENT_NAME.LONG_PRESS,
			EVENT_NAME.PRESS_IN,
			EVENT_NAME.PRESS_OUT,
			EVENT_NAME.PRESS
		] as const

		const isActiveIndicatorVisible =
			type === BUTTON_TYPE.LINK &&
			eventName &&
			eventNames.includes(eventName as (typeof eventNames)[number])

		const isLink = type === BUTTON_TYPE.LINK
		const loadingTypes = [BUTTON_TYPE.LINK, BUTTON_TYPE.OUTLINED, BUTTON_TYPE.TEXT] as const
		const loadingEventName =
			loadingTypes.includes(type as (typeof loadingTypes)[number]) ?
				EVENT_NAME.NONE
			:	EVENT_NAME.LONG_PRESS

		const shape = isLink ? SHAPE.EXTRA_SMALL : SHAPE.FULL
		const backgroundUnderlayElement = (
			<AnimatedBackgroundUnderlay
				pointerEvents='none'
				shape={shape}
				style={[backgroundUnderlayAnimatedStyle]}
				testID={`button__backgroundUnderlay--${id}`}
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
				accessibilityLabel={accessibilityLabel ?? `Button: ${labelText}`}
				accessibilityRole='button'
				accessibilityState={{disabled}}
				accessible={true}
				testID={testID ?? `button--${id}`}
				type={type}
			>
				<Touchable
					{...interactionHandlers}
					{...touchableProps}
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
							<ActiveIndicatorLayout
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
)
