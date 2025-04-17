import {SHAPE, SIZE, TYPOGRAPHY} from '@bearei/material-token'
import type {FC} from 'react'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {Elevation} from '../Elevation'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {ButtonBase} from './Button-base.component'
import {BUTTON_TYPE} from './Button.enum'
import type {ButtonProps, RenderButtonProps} from './Button.interface'
import {
	ActiveIndicatorLayoutAnimated,
	BackgroundUnderlay,
	Container,
	Content,
	IconLayout,
	LabelText,
	Main
} from './Button.styles'

const AnimatedLabelText = Animated.createAnimatedComponent(LabelText)
const AnimatedBackgroundUnderlay = Animated.createAnimatedComponent(BackgroundUnderlay)
const render = ({
	backgroundUnderlayAnimatedStyle,
	density,
	disabled = false,
	elevation,
	eventName,
	icon,
	id,
	labelText,
	labelTextAnimatedStyle,
	loading,
	ref,
	interactionHandlers,
	testID,
	type = BUTTON_TYPE.FILLED,
	underlayColor,
	...contentProps
}: RenderButtonProps) => {
	const isActiveIndicatorVisible =
		type === BUTTON_TYPE.LINK &&
		eventName &&
		['focus', 'hoverIn', 'longPress', 'press', 'pressIn', 'pressOut'].includes(eventName)

	const isLink = type === BUTTON_TYPE.LINK
	const loadingTypes = [BUTTON_TYPE.LINK, BUTTON_TYPE.OUTLINED, BUTTON_TYPE.TEXT] as const
	const loadingEventName = loadingTypes.includes(type as (typeof loadingTypes)[number]) ? 'none' : 'longPress'
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
			accessibilityLabel={labelText}
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
						iconShow={!!icon}
						testID={`button__main--${id}`}
						type={type}
					>
						{icon && !isLink && (
							<IconLayout testID={`button__iconLayout--${id}`}>
								{icon}
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

const ForwardRefButton = forwardRef<View, ButtonProps>((props, ref) => (
	<ButtonBase
		{...props}
		ref={ref}
		render={render}
	/>
))

export const Button: FC<ButtonProps> = ForwardRefButton
