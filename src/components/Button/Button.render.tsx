import {cloneElement, useMemo, type FC} from 'react'
import {View} from 'react-native'

import type {ButtonType, RenderButtonIconProps, RenderButtonProps} from './Button.interface'

import {COMPONENT_STATUS, EVENT_NAME, LAYOUT, type EventName} from '../../constants'
import {useTheme} from '../../hooks'
import {
	DENSITY_SIZE,
	DENSITY_TYPE,
	densitySizeMapIconSize,
	densitySizeMapTypographySize,
	DURATION,
	EASING,
	hexToRGBA,
	RADIUS,
	SHAPE,
	TYPOGRAPHY,
	TYPOGRAPHY_SIZE
} from '../../theme'
import {platformValue} from '../../utils'
import {AnimatedText, AnimatedView} from '../Animated'
import {Elevation} from '../Elevation'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../Layout-animated'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {BUTTON_TYPE} from './Button.enum'

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

	const disabledColor = hexToRGBA(token.scheme.onSurface, token.opacity.level5)

	if (!icon) {
		return <></>
	}

	const iconSize = token.density.icon[densitySizeMapIconSize(size)]

	// Intentional override: the parent Button's semantic props (type, disabled)
	// win over anything the caller set on the icon element. This guarantees
	// the icon's color/size/disabled state stays in sync with the Button's
	// state machine instead of drifting from it.
	return cloneElement(icon, {
		color: disabled ? disabledColor : color[type],
		disabled,
		size: platformValue(iconSize),
		testID: `button__icon--${id}`
	})
}

const LOADING_SUPPRESSED_TYPES = [BUTTON_TYPE.LINK, BUTTON_TYPE.OUTLINED, BUTTON_TYPE.TEXT] as readonly ButtonType[]
const ACTIVE_INDICATOR_EVENT_NAMES = [
	EVENT_NAME.FOCUS,
	EVENT_NAME.HOVER_IN,
	EVENT_NAME.LONG_PRESS,
	EVENT_NAME.PRESS_IN,
	EVENT_NAME.PRESS_OUT,
	EVENT_NAME.PRESS
] as readonly EventName[]

export const RenderButton: FC<RenderButtonProps> = ({
	accessibilityLabel,
	backgroundUnderlayAnimatedStyle,
	disabled,
	elevation,
	eventName,
	iconElement,
	id,
	labelText,
	labelTextAnimatedStyle,
	linkColor,
	loading,
	onStateEventChange,
	ref,
	size = DENSITY_SIZE.MEDIUM,
	status,
	stretch,
	style,
	testID,
	type = BUTTON_TYPE.FILLED,
	underlayColor,
	...touchableProps
}) => {
	const {token} = useTheme()
	const {classesName, densityClasses, shapeClasses, typographyClasses} = token.classes
	const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)
	const densityInsetClasses = densityClasses(DENSITY_TYPE.INSET, LAYOUT.HORIZONTAL)
	const isActiveIndicatorVisible =
		type === BUTTON_TYPE.LINK && ACTIVE_INDICATOR_EVENT_NAMES.includes(eventName) && !disabled

	const isLink = type === BUTTON_TYPE.LINK
	const loadingEventName = LOADING_SUPPRESSED_TYPES.includes(type) ? EVENT_NAME.NONE : EVENT_NAME.LONG_PRESS
	const underlayEventName =
		disabled ? EVENT_NAME.NONE
		: loading ? loadingEventName
		: eventName

	const shape = isLink ? SHAPE.TOP : SHAPE.ALL
	const radius = isLink ? RADIUS.X_SMALL : RADIUS.FULL
	const {entry, exit} = useMemo(
		() => ({
			entry: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_DECELERATE},
			exit: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_ACCELERATE}
		}),
		[]
	)

	const backgroundUnderlayElement = (
		<AnimatedView
			className={classesName(
				'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10',
				shapeClasses(shape, radius)
			)}
			style={backgroundUnderlayAnimatedStyle}
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

	const activeIndicatorStyle = useMemo(() => ({...(linkColor && {backgroundColor: linkColor})}), [linkColor])

	return (
		<View
			accessibilityLabel={accessibilityLabel ?? labelText}
			accessibilityRole='button'
			accessibilityState={{disabled}}
			accessible={true}
			className={classesName('cursor-pointer', {
				[`${densityControlClasses(size)} w-auto min-w-20`]: !isLink,
				[`${typographyClasses(TYPOGRAPHY.LABEL)(TYPOGRAPHY_SIZE.SMALL)} min-w-[--density-inline-xx-small]`]:
					isLink,
				['pointer-events-none']: disabled,
				['self-start']: !stretch,
				['self-stretch']: stretch
			})}
			style={style}
			tabIndex={-1}
			testID={testID ?? `button--${id}`}
		>
			{status === COMPONENT_STATUS.SUCCEEDED && (
				<Touchable
					{...touchableProps}
					backgroundUnderlay={backgroundUnderlayElement}
					disabled={disabled}
					elevationUnderlay={elevationUnderlayElement}
					onStateEventChange={onStateEventChange}
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
									)
								)}
								ellipsizeMode='tail'
								numberOfLines={1}
								style={labelTextAnimatedStyle}
								testID={`button__animatedLabelText--${id}`}
							>
								{labelText}
							</AnimatedText>
						</View>

						{isLink && (
							<LayoutAnimated
								animatedType={LAYOUT_ANIMATED.FADE}
								className='absolute bottom-0 left-0 right-0 z-20 min-h-[--border-small] bg-[--color-primary]'
								entry={entry}
								exit={exit}
								style={activeIndicatorStyle}
								testID={`button__activeIndicator--${id}`}
								visible={isActiveIndicatorVisible}
							/>
						)}

						<Underlay
							eventName={underlayEventName}
							radius={radius}
							shape={shape}
							testID={`button__underlay--${id}`}
							underlayColor={underlayColor}
						/>
					</View>
				</Touchable>
			)}
		</View>
	)
}

RenderButton.displayName = 'RenderButton'
