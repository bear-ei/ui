import {cloneElement, forwardRef, type FC} from 'react'
import {View} from 'react-native'
import {useTheme} from '../../hooks'
import {AnimatedText, AnimatedView} from '../Animated-component'
import {Touchable, type PressableType} from '../Touchable'
import {Underlay} from '../Underlay'
import {FAB_TYPE} from './FAB.enum'
import type {FABType, RenderFABIconProps, RenderFABProps} from './FAB.interface'
import {
	DENSITY_SIZE,
	DENSITY_TYPE,
	densitySizeMapIconSize,
	hexToRGBA,
	platformValue,
	RADIUS,
	SHAPE,
	TYPOGRAPHY,
	TYPOGRAPHY_SIZE
} from '../../theme'
import {Elevation} from '../Elevation'
import {COMPONENT_STATUS, LAYOUT} from '../../constants'

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
		[FAB_TYPE.PRIMARY]: token.scheme.onPrimaryContainer,
		[FAB_TYPE.SECONDARY]: token.scheme.onSecondaryContainer,
		[FAB_TYPE.SURFACE]: token.scheme.primary,
		[FAB_TYPE.TERTIARY]: token.scheme.onTertiaryContainer
	} as Record<FABType, string>

	const disabledColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level5)

	if (!icon) {
		return <></>
	}

	const iconSize =
		extended ? token.density.icon[DENSITY_SIZE.MEDIUM] : token.density.icon[densitySizeMapIconSize(rawSize)]

	return cloneElement(icon, {
		color: disabled ? disabledColor : color[type],
		disabled,
		size: platformValue(iconSize),
		testID: `fab__icon--${id}`
	})
}

export const RenderFAB = forwardRef<PressableType, RenderFABProps>(
	(
		{
			accessibilityLabel,
			backgroundUnderlayAnimatedStyle,
			disabled,
			elevation,
			eventName,
			extended,
			iconElement,
			id,
			interactionHandlers,
			labelText,
			labelTextAnimatedStyle,
			size = DENSITY_SIZE.MEDIUM,
			status,
			testID,
			underlayColor,
			...touchableProps
		}: RenderFABProps,
		ref
	) => {
		const {token} = useTheme()
		const {densityClasses, classesName, shapeClasses, typographyClasses} = token.classes
		const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)()
		const densityInsetClasses = densityClasses(DENSITY_TYPE.INSET)(LAYOUT.HORIZONTAL)
		const shape = SHAPE.ALL
		const shapeSize = {
			[DENSITY_SIZE.LARGE]: RADIUS.LARGE,
			[DENSITY_SIZE.MEDIUM]: RADIUS.MEDIUM,
			[DENSITY_SIZE.SMALL]: RADIUS.MEDIUM,
			[DENSITY_SIZE.X_LARGE]: RADIUS.LARGE,
			[DENSITY_SIZE.X_SMALL]: RADIUS.SMALL,
			[DENSITY_SIZE.XX_LARGE]: RADIUS.X_LARGE,
			[DENSITY_SIZE.XX_SMALL]: RADIUS.X_SMALL
		}

		const radius = shapeSize[size]
		const backgroundUnderlayElement = (
			<AnimatedView
				className={classesName(
					'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10',
					shapeClasses(radius)(shape)
				)}
				style={[backgroundUnderlayAnimatedStyle]}
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
				className={classesName('cursor-pointer', {
					[densityControlClasses(size)]: !extended,
					[`${densityControlClasses(size)} min-w-24 self-start`]: extended
				})}
				tabIndex={-1}
				testID={testID ?? `fab--${id}`}
			>
				{status === COMPONENT_STATUS.SUCCEEDED && (
					<Touchable
						{...interactionHandlers}
						{...touchableProps}
						backgroundUnderlay={backgroundUnderlayElement}
						disabled={disabled}
						elevationUnderlay={elevationUnderlayElement}
						radius={radius}
						ref={ref}
						shape={shape}
						testID={`fab__touchable--${id}`}
						underlayColor={underlayColor}
					>
						<View
							className='pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center self-stretch overflow-hidden'
							testID={`fab__content--${id}`}
						>
							<View
								className={classesName(
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
										className={classesName(
											'select-none text-center',
											typographyClasses(TYPOGRAPHY.LABEL)(TYPOGRAPHY_SIZE.LARGE)()
										)}
										ellipsizeMode='tail'
										numberOfLines={1}
										style={[labelTextAnimatedStyle]}
										testID={`fab__animatedLabelText--${id}`}
									>
										{labelText}
									</AnimatedText>
								)}
							</View>

							<Underlay
								eventName={eventName}
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
)

RenderFAB.displayName = 'RenderFAB'
