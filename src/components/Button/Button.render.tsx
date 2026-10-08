import {cloneElement, forwardRef, type FC} from 'react'
import {View} from 'react-native'
import {EVENT_NAME, type EventName} from '../../constants'
import {useTheme} from '../../hooks'
import {
	DENSITY_SIZE,
	DENSITY_TYPE,
	densitySizeMapIconSize,
	densitySizeMapTypographySize,
	DURATION,
	EASING,
	hexToRGBA,
	platformValue,
	RADIUS,
	SHAPE,
	TYPOGRAPHY,
	TYPOGRAPHY_SIZE
} from '../../theme'
import {AnimatedText, AnimatedView} from '../Animated-component'
import {Elevation} from '../Elevation'
import {LayoutAnimated} from '../Layout-animated'
import {Touchable, type PressableType} from '../Touchable'
import {Underlay} from '../Underlay'
import {BUTTON_TYPE} from './Button.enum'
import type {ButtonType, RenderButtonIconProps, RenderButtonProps} from './Button.interface'

export const RenderButtonIcon: FC<RenderButtonIconProps> = ({
	disabled,
	icon,
	id,
	size = DENSITY_SIZE.MEDIUM,
	type = BUTTON_TYPE.FILLED
}) => {
	const {token} = useTheme()
	const color = {
		[BUTTON_TYPE.ELEVATED]: token.scheme.primary,
		[BUTTON_TYPE.FILLED]: token.scheme.onPrimary,
		[BUTTON_TYPE.LINK]: token.scheme.primary,
		[BUTTON_TYPE.OUTLINED]: token.scheme.primary,
		[BUTTON_TYPE.TEXT]: token.scheme.primary,
		[BUTTON_TYPE.TONAL]: token.scheme.onSecondaryContainer
	} as Record<ButtonType, string>

	const disabledColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level5)

	if (!icon) {
		return <></>
	}

	const iconSize = token.density.icon[densitySizeMapIconSize(size)]

	return cloneElement(icon, {
		color: disabled ? disabledColor : color[type],
		disabled,
		size: platformValue(iconSize),
		testID: `button__icon--${id}`
	})
}

export const RenderButton = forwardRef<PressableType, RenderButtonProps>(
	(
		{
			accessibilityLabel,
			backgroundUnderlayAnimatedStyle,
			disabled,
			elevation,
			eventName,
			iconElement,
			id,
			interactionHandlers,
			labelText,
			labelTextAnimatedStyle,
			linkColor,
			loading,
			size = DENSITY_SIZE.MEDIUM,
			stretch,
			style,
			testID,
			type = BUTTON_TYPE.FILLED,
			underlayColor,
			...touchableProps
		}: RenderButtonProps,
		ref
	) => {
		const {token} = useTheme()
		const {densityClasses, classesName, shapeClasses, typographyClasses} = token.classes
		const densityControlClasses = densityClasses()(DENSITY_TYPE.CONTROL)
		const densityInsetClasses = densityClasses()(DENSITY_TYPE.INSET)
		const eventNames = [
			EVENT_NAME.FOCUS,
			EVENT_NAME.HOVER_IN,
			EVENT_NAME.LONG_PRESS,
			EVENT_NAME.PRESS_IN,
			EVENT_NAME.PRESS_OUT,
			EVENT_NAME.PRESS
		] as readonly EventName[]

		const buttonTypes = [BUTTON_TYPE.LINK, BUTTON_TYPE.OUTLINED, BUTTON_TYPE.TEXT] as readonly ButtonType[]
		const isActiveIndicatorVisible = type === BUTTON_TYPE.LINK && eventName && eventNames.includes(eventName)
		const isLink = type === BUTTON_TYPE.LINK
		const loadingEventName = type && buttonTypes.includes(type) ? EVENT_NAME.NONE : EVENT_NAME.LONG_PRESS
		const shape = isLink ? SHAPE.TOP : SHAPE.ALL
		const radius = isLink ? RADIUS.X_SMALL : RADIUS.FULL
		const backgroundUnderlayElement = (
			<AnimatedView
				className={classesName(
					'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10',
					shapeClasses(radius)(shape)
				)}
				style={[backgroundUnderlayAnimatedStyle]}
				testID={`button__backgroundUnderlay--${id}`}
			/>
		)

		const elevationUnderlayElement =
			typeof elevation === 'number' ?
				<Elevation
					level={elevation}
					radius={radius}
					shape={shape}
					testID={`button__elevation--${id}`}
				/>
			:	<></>

		const activeIndicatorStyle = {...(linkColor && {backgroundColor: linkColor})}

		return (
			<View
				accessibilityLabel={accessibilityLabel ?? labelText}
				accessibilityRole='button'
				accessibilityState={{disabled}}
				accessible={true}
				style={[style]}
				className={classesName('cursor-pointer', {
					[`${densityControlClasses(size)} min-w-20`]: !isLink,
					[`${typographyClasses(TYPOGRAPHY.LABEL)(TYPOGRAPHY_SIZE.SMALL)} min-w-6`]: isLink,
					['self-start']: !stretch,
					['self-stretch']: stretch
				})}
				tabIndex={-1}
				testID={testID ?? `button--${id}`}
			>
				<Touchable
					{...touchableProps}
					{...interactionHandlers}
					backgroundUnderlay={backgroundUnderlayElement}
					disabled={disabled}
					elevationUnderlay={elevationUnderlayElement}
					radius={radius}
					ref={ref}
					shape={shape}
					testID={`button__touchable--${id}`}
					underlayColor={underlayColor}
				>
					<View
						className='pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center self-stretch overflow-hidden'
						testID={`button__content--${id}`}
					>
						<View
							className={classesName(
								'z-10 flex flex-1 flex-row items-center justify-center gap-[--density-spacing-snug] self-stretch',
								{[densityInsetClasses(size)]: !isLink}
							)}
							testID={`button__main--${id}`}
						>
							{iconElement && !isLink && (
								<View
									className='flex flex-col items-center justify-center overflow-hidden'
									testID={`button__iconLayout--${id}`}
								>
									{iconElement}
								</View>
							)}

							<AnimatedText
								className={classesName(
									'select-none text-center',
									typographyClasses(isLink ? TYPOGRAPHY.BODY : TYPOGRAPHY.LABEL)(
										densitySizeMapTypographySize(size)
									)()
								)}
								ellipsizeMode='tail'
								numberOfLines={1}
								style={[labelTextAnimatedStyle]}
								testID={`button__animatedLabelText--${id}`}
							>
								{labelText}
							</AnimatedText>
						</View>

						{isLink && (
							<LayoutAnimated
								className='absolute bottom-0 left-0 right-0 z-20 min-h-[--border-small] bg-[--color-primary]'
								entry={{duration: DURATION.SHORT_1, easing: EASING.STANDARD}}
								exit={{duration: DURATION.SHORT_1, easing: EASING.STANDARD}}
								style={[activeIndicatorStyle]}
								testID={`button__activeIndicator--${id}`}
								visible={isActiveIndicatorVisible}
							/>
						)}

						<Underlay
							radius={radius}
							eventName={loading ? loadingEventName : eventName}
							shape={shape}
							testID={`button__underlay--${id}`}
							underlayColor={underlayColor}
						/>
					</View>
				</Touchable>
			</View>
		)
	}
)

RenderButton.displayName = 'RenderButton'
