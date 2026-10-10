import {forwardRef} from 'react'
import {Pressable, View} from 'react-native'
import {useTheme} from '../../../hooks'
import {
	DENSITY_SIZE,
	DENSITY_TYPE,
	densitySizeMapTypographySize,
	RADIUS,
	SHAPE,
	TYPOGRAPHY,
	typographyClasses
} from '../../../theme'
import {AnimatedText, AnimatedView} from '../../Animated-component'
import type {PressableType} from '../../Touchable'
import {ACTIVE_ANIMATED, Underlay} from '../../Underlay'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import type {RenderNavigationRailItemProps} from './Navigation-rail-item.interface'
import {LAYOUT} from '../../../constants'

export const RenderNavigationRailItem = forwardRef<PressableType, RenderNavigationRailItemProps>(
	(
		{
			accessibilityLabel,
			active,
			contentAnimatedStyle,
			eventName,
			iconElement,
			id,
			interactionHandlers,
			labelText,
			labelTextAnimatedStyle,
			testID,
			type,
			...touchableProps
		},
		ref
	) => {
		const {token} = useTheme()
		const {classesName, densityClasses} = token.classes
		const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)()
		const densityIconClasses = densityClasses(DENSITY_TYPE.ICON)()
		const densityInsetClasses = densityClasses(DENSITY_TYPE.INSET)(LAYOUT.VERTICAL)
		const activeAnimatedType = type === NAVIGATION_RAIL_TYPE.BLOCK ? ACTIVE_ANIMATED.SCALE : ACTIVE_ANIMATED.SCALE_X
		const activeColor = token.scheme.secondaryContainer
		const radius = RADIUS.FULL
		const shape = SHAPE.ALL
		const underlayColor = token.scheme.onSurface

		return (
			<View
				accessibilityLabel={accessibilityLabel ?? labelText}
				accessibilityRole='tab'
				accessible={true}
				className='overflow-hidden'
				tabIndex={-1}
				testID={testID ?? `navigationRailItem--${id}`}
			>
				<Pressable
					{...touchableProps}
					{...interactionHandlers}
					className='flex w-[--density-layout-navigation] flex-col items-center justify-center outline-none'
					ref={ref}
					testID={`navigationRailItem__touchable--${id}`}
				>
					<AnimatedView
						{...(type !== NAVIGATION_RAIL_TYPE.BLOCK && {style: [contentAnimatedStyle]})}
						className='flex flex-col items-center justify-center gap-[--density-spacing-xx-small]'
						testID={`navigationRailItem__content--${id}`}
					>
						<View
							className={classesName(
								'pointer-events-none relative z-10 flex flex-col items-center justify-center',
								{
									[densityControlClasses(DENSITY_SIZE.XX_LARGE)]: type === NAVIGATION_RAIL_TYPE.BLOCK,
									[`${densityControlClasses(DENSITY_SIZE.MEDIUM)} w-[--density-control-xx-large]`]:
										type !== NAVIGATION_RAIL_TYPE.BLOCK
								}
							)}
							testID={`navigationRailItem__header--${id}`}
						>
							<View
								className={classesName('overflow-hidden', {
									[densityIconClasses(DENSITY_SIZE.SMALL)]: type !== NAVIGATION_RAIL_TYPE.BLOCK,
									[densityIconClasses(DENSITY_SIZE.LARGE)]: type === NAVIGATION_RAIL_TYPE.BLOCK
								})}
								testID={`navigationRailItem__iconLayout--${id}`}
							>
								{iconElement}
							</View>

							<Underlay
								active={active}
								activeAnimatedType={activeAnimatedType}
								activeColor={activeColor}
								activeRadius={radius}
								eventName={eventName}
								radius={radius}
								shape={shape}
								testID={`navigationRailItem__underlay--${id}`}
								underlayColor={underlayColor}
							/>
						</View>

						{type === NAVIGATION_RAIL_TYPE.SEGMENT && (
							<View
								testID={`navigationRailItem__label--${id}`}
								className={classesName(
									'flex flex-col justify-center self-stretch',
									densityInsetClasses(DENSITY_SIZE.XX_SMALL)
								)}
							>
								<AnimatedText
									className={classesName(
										'select-none text-center',
										{
											['font-bold']: active,
											['font-normal']: !active
										},
										typographyClasses(TYPOGRAPHY.LABEL)(
											densitySizeMapTypographySize(DENSITY_SIZE.MEDIUM)
										)()
									)}
									ellipsizeMode='tail'
									numberOfLines={1}
									style={[labelTextAnimatedStyle]}
									testID={`navigationRailItem__animatedLabelText--${id}`}
								>
									{labelText}
								</AnimatedText>
							</View>
						)}
					</AnimatedView>
				</Pressable>
			</View>
		)
	}
)

RenderNavigationRailItem.displayName = 'RenderNavigationRailItem'
