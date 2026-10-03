import {Circle} from 'lucide-react-native'
import {cloneElement, forwardRef, type FC} from 'react'
import {View} from 'react-native'
import {useTheme} from '../../hooks'
import {DENSITY_TYPE, SHAPE, SIZE} from '../../theme'
import {hexToRGBA, platformValue, processIconSize} from '../../utils'
import {AnimatedView} from '../Animated-component'
import {LayoutAnimated} from '../Layout-animated'
// import {Progress, PROGRESS_ANIMATED, PROGRESS_TYPE} from '../Progress'
import {Touchable, type PressableType} from '../Touchable'
import {ACTIVE_ANIMATED, Underlay} from '../Underlay'
import {ICON_BUTTON_TYPE} from './Icon-button.enum'
import type {RenderIconButtonIconProps, RenderIconButtonProps} from './Icon-button.interface'

export const RenderIconButtonIcon: FC<RenderIconButtonIconProps> = ({
	disabled,
	icon,
	iconColor: rawColor,
	id,
	loading,
	size = SIZE.MEDIUM,
	type
}) => {
	const {token} = useTheme()
	const color = {
		[ICON_BUTTON_TYPE.ACTIVE]: token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.FILLED]: token.scheme.onPrimary,
		[ICON_BUTTON_TYPE.OUTLINED]: token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.STANDARD]: token.scheme.onSurfaceVariant,
		[ICON_BUTTON_TYPE.TONAL]: token.scheme.onSecondaryContainer
	}

	const disabledColor = hexToRGBA(token.scheme.onSurface)(token.opacity.level5)
	const iconColor = rawColor ?? (!loading ? color[type as keyof typeof color] : token.scheme.onSurfaceVariant)
	const iconSize = processIconSize(token)(size)

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
			interactionHandlers,
			labelText,
			loading,
			size = SIZE.MEDIUM,
			testID,
			type,
			underlayColor,
			...touchableProps
		},
		ref
	) => {
		const theme = useTheme()
		const {token} = useTheme()
		const {densityClasses, classesName, shapeClasses} = token.classes
		const densityControlClasses = densityClasses()(DENSITY_TYPE.CONTROL)
		const shape = SHAPE.FULL
		const activeColor = theme.token.scheme.secondaryContainer
		const backgroundUnderlayElement = (
			<AnimatedView
				className={classesName(
					'pointer-events-none absolute bottom-0 left-0 right-0 top-0 -z-10',
					shapeClasses(shape)
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
					['pointer-events-none']: loading
				})}
				tabIndex={-1}
				testID={testID ?? `iconButton--${id}`}
			>
				<LayoutAnimated
					className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'
					lazy={true}
					testID={`iconButton__contentItemLayout--${id}`}
					visible={loading}
				>
					{/*<Progress
						animatedType={PROGRESS_ANIMATED.INDETERMINATE}
						content={iconElement}
						enableAnimated={loading}
						size={size}
						testID={`iconButton__progress--${id}`}
						type={PROGRESS_TYPE.CIRCULAR}
					/>*/}
				</LayoutAnimated>

				<LayoutAnimated
					className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'
					testID={`iconButton__contentItemLayout--${id}`}
					visible={!loading}
				>
					<Touchable
						{...touchableProps}
						{...interactionHandlers}
						backgroundUnderlay={backgroundUnderlayElement}
						centered={true}
						disabled={disabled}
						enableTouchableRipple={type !== ICON_BUTTON_TYPE.ACTIVE}
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
								eventName={eventName}
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
