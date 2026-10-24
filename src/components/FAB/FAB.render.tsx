import {cloneElement, type FC} from 'react'
import {View} from 'react-native'

import type {FABType, RenderFABIconProps, RenderFABProps} from './FAB.interface'

import {COMPONENT_STATUS, EVENT_NAME, ORIENTATION} from '../../constants'
import {useTheme} from '../../hooks'
import {
	DENSITY_SIZE,
	DENSITY_TYPE,
	hexToRGBA,
	RADIUS,
	SHAPE,
	stepDownDensitySize,
	TYPOGRAPHY,
	TYPOGRAPHY_SIZE
} from '../../theme'
import {toPlatformUnit} from '../../utils'
import {AnimatedText, AnimatedView} from '../Animated'
import {Elevation} from '../Elevation'
import {Touchable} from '../Touchable'
import {Underlay} from '../Underlay'
import {FAB_TYPE} from './FAB.enum'

const SHAPE_SIZE_MAP = {
	[DENSITY_SIZE.LARGE]: RADIUS.LARGE,
	[DENSITY_SIZE.MEDIUM]: RADIUS.MEDIUM,
	[DENSITY_SIZE.SMALL]: RADIUS.MEDIUM,
	[DENSITY_SIZE.X_LARGE]: RADIUS.LARGE,
	[DENSITY_SIZE.X_SMALL]: RADIUS.SMALL,
	[DENSITY_SIZE.XX_LARGE]: RADIUS.X_LARGE,
	[DENSITY_SIZE.XX_SMALL]: RADIUS.X_SMALL
}

export const RenderFABIcon: FC<RenderFABIconProps> = ({
	disabled,
	extended,
	icon,
	id,
	size: rawSize = DENSITY_SIZE.MEDIUM,
	type = FAB_TYPE.PRIMARY
}) => {
	const {token} = useTheme()
	const color = {
		[FAB_TYPE.PRIMARY]: token.colors.onPrimaryContainer,
		[FAB_TYPE.SECONDARY]: token.colors.onSecondaryContainer,
		[FAB_TYPE.SURFACE]: token.colors.primary,
		[FAB_TYPE.TERTIARY]: token.colors.onTertiaryContainer
	} as Record<FABType, string>

	const disabledColor = hexToRGBA(token.colors.onSurface, token.opacity.level5)

	if (!icon) {
		return <></>
	}

	const iconSize =
		extended ? token.density.icon[DENSITY_SIZE.MEDIUM] : token.density.icon[stepDownDensitySize(rawSize)]

	// Intentional override: the parent FAB's semantic props (type, disabled)
	// win over anything the caller set on the icon element. This guarantees
	// the icon's color, size, and disabled state stay in sync with the FAB's
	// appearance instead of drifting from it.
	return cloneElement(icon, {
		color: disabled ? disabledColor : color[type],
		disabled,
		size: toPlatformUnit(iconSize),
		testID: `fab__icon--${id}`
	})
}

export const RenderFAB: FC<RenderFABProps> = ({
	accessibilityLabel,
	backgroundUnderlayAnimatedStyle,
	disabled,
	elevation,
	eventName,
	extended,
	iconElement,
	id,
	labelText,
	labelTextAnimatedStyle,
	loading,
	onInteractionStateChange,
	size = DENSITY_SIZE.MEDIUM,
	status,
	testID,
	underlayColor,
	...touchableProps
}) => {
	const {token} = useTheme()
	const {classNames, densityClasses, shapeClasses, typographyClasses} = token.classes
	const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)
	const densityInsetClasses = densityClasses(DENSITY_TYPE.INSET, ORIENTATION.HORIZONTAL)
	const shape = SHAPE.ALL
	const radius = SHAPE_SIZE_MAP[size]
	const underlayEventName =
		disabled ? EVENT_NAME.NONE
		: loading ? EVENT_NAME.LONG_PRESS
		: eventName

	const backgroundUnderlayElement = (
		<AnimatedView
			className={classNames(
				'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10',
				shapeClasses(shape)(radius)
			)}
			style={backgroundUnderlayAnimatedStyle}
			testID={`fab__backgroundUnderlay--${id}`}
		/>
	)

	const elevationUnderlayElement =
		typeof elevation === 'number' ?
			<Elevation
				level={elevation}
				radius={radius}
				shape={shape}
				testID={`fab__elevation--${id}`}
			/>
		:	<></>

	return (
		<View
			accessibilityLabel={accessibilityLabel ?? labelText}
			accessibilityRole='button'
			accessibilityState={{disabled}}
			className={classNames('cursor-pointer', {
				[`${densityControlClasses(size)} min-w-24 self-start`]: extended,
				[densityControlClasses(size)]: !extended,
				['pointer-events-none']: disabled
			})}
			tabIndex={-1}
			testID={testID ?? `fab--${id}`}
		>
			{status === COMPONENT_STATUS.SUCCEEDED && (
				<Touchable
					{...touchableProps}
					backgroundUnderlay={backgroundUnderlayElement}
					disabled={disabled}
					elevationUnderlay={elevationUnderlayElement}
					onInteractionStateChange={onInteractionStateChange}
					radius={radius}
					shape={shape}
					testID={`fab__touchable--${id}`}
					underlayColor={underlayColor}
				>
					<View
						className='pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center self-stretch overflow-hidden'
						testID={`fab__content--${id}`}
					>
						<View
							className={classNames(
								'z-10 flex flex-1 flex-row items-center justify-center self-stretch',
								{[`gap-[--density-spacing-snug] ${densityInsetClasses(size)}`]: extended}
							)}
							testID={`fab__main--${id}`}
						>
							{iconElement && (
								<View
									className='flex flex-col items-center justify-center overflow-hidden'
									testID={`fab__iconLayout--${id}`}
								>
									{iconElement}
								</View>
							)}

							{extended && labelText && (
								<AnimatedText
									className={classNames(
										'select-none text-center',
										typographyClasses(TYPOGRAPHY.LABEL)(TYPOGRAPHY_SIZE.LARGE)
									)}
									ellipsizeMode='tail'
									numberOfLines={1}
									style={labelTextAnimatedStyle}
									testID={`fab__animatedLabelText--${id}`}
								>
									{labelText}
								</AnimatedText>
							)}
						</View>

						<Underlay
							interactionEventName={underlayEventName}
							radius={radius}
							shape={shape}
							testID={`fab__underlay--${id}`}
							underlayColor={underlayColor}
						/>
					</View>
				</Touchable>
			)}
		</View>
	)
}
