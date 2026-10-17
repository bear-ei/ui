import {Circle} from 'lucide-react-native'
import {cloneElement, forwardRef, useMemo, type FC} from 'react'
import {View} from 'react-native'
import {EVENT_NAME} from '../../constants'
import {useTheme} from '../../hooks'
import {
	BORDER_SIZE,
	DENSITY_SIZE,
	DENSITY_TYPE,
	densitySizeMapIconSize,
	densitySizeMapInlineSize,
	DURATION,
	EASING,
	hexToRGBA,
	RADIUS,
	SHAPE
} from '../../theme'
import {platformValue} from '../../utils'
import {AnimatedView} from '../Animated'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../Layout-animated'
import {Progress, PROGRESS_ANIMATED, PROGRESS_TYPE} from '../Progress'
import {Touchable, type PressableType} from '../Touchable'
import {ACTIVE_ANIMATED, Underlay} from '../Underlay'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {IconButtonType, RenderIconButtonIconProps, RenderIconButtonProps} from './Icon-button.interface'

export const RenderIconButtonIcon: FC<RenderIconButtonIconProps> = ({
	disabled,
	icon,
	iconColor: rawColor,
	id,
	size = DENSITY_SIZE.MEDIUM,
	type = ICON_BUTTON_TYPE.STANDARD
}) => {
	const {token} = useTheme()
	const color = {
		[ICON_BUTTON_TYPE.ACTIVE]: token.scheme.onSecondaryContainer,
		[ICON_BUTTON_TYPE.FILLED]: token.scheme.onPrimary,
		[ICON_BUTTON_TYPE.OUTLINED]: token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.STANDARD]: token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.TONAL]: token.scheme.onSecondaryContainer
	} as Record<IconButtonType, string>

	const disabledColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level5)
	const iconColor = rawColor ?? color[type]
	const iconSize = token.density.icon[densitySizeMapIconSize(size)]

	// Intentional override: the parent IconButton's semantic props (type, disabled)
	// take precedence over whatever the caller set on the icon element. This keeps
	// the icon's color/size/disabled state locked to the IconButton's state machine,
	// preventing visual drift when the icon is reused across different contexts.

	// Fallback to a plain Circle when no icon is provided — an IconButton without
	// any icon would render an empty touchable target, which is visually confusing.
	// Button (the labeled variant) omits the icon area entirely in that case.
	return cloneElement(icon ?? <Circle />, {
		color: disabled ? disabledColor : iconColor,
		disabled,
		size: platformValue(iconSize),
		testID: `iconButton__icon--${id}`
	})
}

export const RenderIconButton = forwardRef<PressableType, RenderIconButtonProps>(
	(
		{
			accessibilityLabel,
			active,
			backgroundUnderlayAnimatedStyle,
			defaultActive,
			disabled,
			eventName,
			iconElement,
			id,
			labelText,
			loading,
			onStateEventChange,
			size = DENSITY_SIZE.MEDIUM,
			testID,
			type,
			underlayColor,
			...touchableProps
		},
		ref
	) => {
		const {token} = useTheme()
		const {densityClasses, classesName, shapeClasses} = token.classes
		const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)()
		const activeColor = token.scheme.secondaryContainer
		const radius = RADIUS.FULL
		const shape = SHAPE.ALL
		const underlayEventName = disabled ? EVENT_NAME.NONE : eventName
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
					shapeClasses(radius)(shape)
				)}
				style={[backgroundUnderlayAnimatedStyle]}
				testID={`iconButton__backgroundUnderlay--${id}`}
			/>
		)

		return (
			<View
				accessibilityLabel={accessibilityLabel ?? labelText}
				accessibilityRole='button'
				accessibilityState={{disabled}}
				accessible={true}
				className={classesName('relative cursor-pointer', densityControlClasses(size), {
					['pointer-events-none']: disabled
				})}
				tabIndex={-1}
				testID={testID ?? `iconButton--${id}`}
			>
				<LayoutAnimated
					animatedType={LAYOUT_ANIMATED.FADE}
					className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center '
					entry={entry}
					exit={exit}
					lazy={true}
					testID={`iconButton__contentItemLayout--${id}`}
					visible={loading}
				>
					<Progress
						animatedType={PROGRESS_ANIMATED.INDETERMINATE}
						content={iconElement}
						enableAnimated={loading}
						size={densitySizeMapInlineSize(size)}
						strokeWidth={token.border[BORDER_SIZE.MEDIUM]}
						testID={`iconButton__progress--${id}`}
						type={PROGRESS_TYPE.CIRCULAR}
					/>
				</LayoutAnimated>

				<LayoutAnimated
					animatedType={LAYOUT_ANIMATED.FADE}
					className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'
					entry={entry}
					exit={exit}
					testID={`iconButton__contentItemLayout--${id}`}
					visible={!loading}
				>
					<Touchable
						{...touchableProps}
						backgroundUnderlay={backgroundUnderlayElement}
						centered={true}
						disabled={disabled}
						enableTouchableRipple={type !== ICON_BUTTON_TYPE.ACTIVE}
						onStateEventChange={onStateEventChange}
						radius={radius}
						ref={ref}
						shape={shape}
						testID={`iconButton__touchable--${id}`}
						underlayColor={underlayColor}
					>
						<View
							className='pointer-events-none relative z-10 flex flex-1 self-stretch overflow-hidden'
							testID={`iconButton__content--${id}`}
						>
							<View
								className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center'
								testID={`iconButton__main--${id}`}
							>
								{iconElement}
							</View>

							<Underlay
								active={active}
								activeAnimatedType={ACTIVE_ANIMATED.SCALE}
								activeColor={activeColor}
								defaultActive={defaultActive}
								eventName={underlayEventName}
								radius={radius}
								shape={shape}
								testID={`iconButton__underlay--${id}`}
								underlayColor={underlayColor}
							/>
						</View>
					</Touchable>
				</LayoutAnimated>
			</View>
		)
	}
)

RenderIconButton.displayName = 'RenderIconButton'
