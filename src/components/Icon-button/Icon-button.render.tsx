import {Circle} from 'lucide-react-native'
import {cloneElement, type FC} from 'react'
import {View} from 'react-native'

import type {IconButtonType, RenderIconButtonIconProps, RenderIconButtonProps} from './Icon-button.interface'

import {EVENT_NAME} from '../../constants'
import {useTheme} from '../../hooks'
import {
	BORDER_SIZE,
	DENSITY_SIZE,
	DENSITY_TYPE,
	ENTRY_EXIT,
	stepDownDensitySize,
	hexToRGBA,
	RADIUS,
	SHAPE
} from '../../theme'
import {toPlatformUnit} from '../../utils'
import {AnimatedView} from '../Animated'
import {LAYOUT_ANIMATION, LayoutAnimated} from '../Layout-animated'
import {Progress, PROGRESS_MODE, PROGRESS_TYPE} from '../Progress'
import {Touchable} from '../Touchable'
import {ACTIVE_ANIMATION, Underlay} from '../Underlay'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'

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
		[ICON_BUTTON_TYPE.FILLED]: token.colors.onPrimary,
		[ICON_BUTTON_TYPE.OUTLINED]: token.colors.onSurfaceVariant,
		[ICON_BUTTON_TYPE.SELECTED]: token.colors.onSecondaryContainer,
		[ICON_BUTTON_TYPE.STANDARD]: token.colors.onSurfaceVariant,
		[ICON_BUTTON_TYPE.TONAL]: token.colors.onSecondaryContainer
	} as Record<IconButtonType, string>

	const disabledColor = hexToRGBA(token.colors.onSurface, token.opacity.level5)
	const iconColor = rawColor ?? color[type]
	const iconSize = token.density.icon[stepDownDensitySize(size)]

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
		size: toPlatformUnit(iconSize),
		testID: `iconButton__icon--${id}`
	})
}

export const RenderIconButton: FC<RenderIconButtonProps> = ({
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
	onInteractionStateChange,
	ref,
	size = DENSITY_SIZE.MEDIUM,
	testID,
	type,
	underlayColor,
	...touchableProps
}) => {
	const {token} = useTheme()
	const {classNames, densityClasses, shapeClasses} = token.classes
	const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)
	const activeColor = token.colors.secondaryContainer
	const radius = RADIUS.FULL
	const shape = SHAPE.ALL
	const underlayEventName = disabled ? EVENT_NAME.NONE : eventName
	const {entry, exit} = ENTRY_EXIT.SHORT

	const backgroundUnderlayElement = (
		<AnimatedView
			className={classNames(
				'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10',
				shapeClasses(shape)(radius)
			)}
			style={backgroundUnderlayAnimatedStyle}
			testID={`iconButton__backgroundUnderlay--${id}`}
		/>
	)

	return (
		<View
			accessibilityLabel={accessibilityLabel ?? labelText}
			accessibilityRole='button'
			accessibilityState={{disabled}}
			accessible={true}
			className={classNames('relative cursor-pointer', densityControlClasses(size), {
				['pointer-events-none']: disabled
			})}
			tabIndex={-1}
			testID={testID ?? `iconButton--${id}`}
		>
			<LayoutAnimated
				animation={LAYOUT_ANIMATION.FADE}
				className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center '
				entry={entry}
				exit={exit}
				lazyMount={true}
				testID={`iconButton__contentItemLayout--${id}`}
				visible={loading}
			>
				<Progress
					enableLoop={loading}
					mode={PROGRESS_MODE.INDETERMINATE}
					overlayContent={iconElement}
					size={stepDownDensitySize(size)}
					strokeWidth={token.border[BORDER_SIZE.MEDIUM]}
					testID={`iconButton__progress--${id}`}
					type={PROGRESS_TYPE.CIRCULAR}
				/>
			</LayoutAnimated>

			<LayoutAnimated
				animation={LAYOUT_ANIMATION.FADE}
				className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'
				entry={entry}
				exit={exit}
				testID={`iconButton__contentItemLayout--${id}`}
				visible={!loading}
			>
				<Touchable
					{...touchableProps}
					backgroundUnderlay={backgroundUnderlayElement}
					disabled={disabled}
					enableTouchableRipple={type !== ICON_BUTTON_TYPE.SELECTED}
					onInteractionStateChange={onInteractionStateChange}
					radius={radius}
					ref={ref}
					rippleCentered={true}
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
							activeAnimation={ACTIVE_ANIMATION.SCALE}
							activeColor={activeColor}
							defaultActive={defaultActive}
							interactionEventName={underlayEventName}
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
