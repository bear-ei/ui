import {type FC} from 'react'
import {Pressable, View} from 'react-native'

import type {RenderNavigationRailItemProps} from './Navigation-rail-item.interface'

import {EVENT_NAME, LAYOUT} from '../../../constants'
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
import {AnimatedText, AnimatedView} from '../../Animated'
import {ACTIVE_ANIMATED, Underlay} from '../../Underlay'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'

export const RenderNavigationRailItem: FC<RenderNavigationRailItemProps> = ({
	accessibilityLabel,
	active,
	contentAnimatedStyle,
	disabled,
	eventName,
	iconElement,
	id,
	interactionHandlers,
	labelText,
	labelTextAnimatedStyle,
	ref,
	testID,
	type,
	...touchableProps
}) => {
	const {token} = useTheme()
	const underlayEventName = disabled ? EVENT_NAME.NONE : eventName
	const {classesName, densityClasses} = token.classes
	const densityControlClasses = densityClasses(DENSITY_TYPE.CONTROL)
	const densityIconClasses = densityClasses(DENSITY_TYPE.ICON)
	const densityInsetClasses = densityClasses(DENSITY_TYPE.INSET, LAYOUT.VERTICAL)
	const activeAnimatedType = type === NAVIGATION_RAIL_TYPE.BLOCK ? ACTIVE_ANIMATED.SCALE : ACTIVE_ANIMATED.SCALE_X
	const activeColor = token.scheme.secondaryContainer
	const radius = RADIUS.FULL
	const shape = SHAPE.ALL
	const underlayColor = token.scheme.onSurface
	const animatedViewStyle = type !== NAVIGATION_RAIL_TYPE.BLOCK ? contentAnimatedStyle : undefined

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
					className='flex flex-col items-center justify-center gap-[--density-spacing-xx-small]'
					style={animatedViewStyle}
					testID={`navigationRailItem__content--${id}`}
				>
					<View
						className={classesName(
							'pointer-events-none relative z-10 flex flex-col items-center justify-center',
							{
								[`${densityControlClasses(DENSITY_SIZE.MEDIUM)} w-[--density-control-xx-large]`]:
									type !== NAVIGATION_RAIL_TYPE.BLOCK,
								[densityControlClasses(DENSITY_SIZE.XX_LARGE)]: type === NAVIGATION_RAIL_TYPE.BLOCK
							}
						)}
						testID={`navigationRailItem__header--${id}`}
					>
						<View
							className={classesName('overflow-hidden', {
								[densityIconClasses(DENSITY_SIZE.LARGE)]: type === NAVIGATION_RAIL_TYPE.BLOCK,
								[densityIconClasses(DENSITY_SIZE.SMALL)]: type !== NAVIGATION_RAIL_TYPE.BLOCK
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
							eventName={underlayEventName}
							radius={radius}
							shape={shape}
							testID={`navigationRailItem__underlay--${id}`}
							underlayColor={underlayColor}
						/>
					</View>

					{type === NAVIGATION_RAIL_TYPE.SEGMENT && (
						<View
							className={classesName(
								'flex flex-col justify-center self-stretch',
								densityInsetClasses(DENSITY_SIZE.XX_SMALL)
							)}
							testID={`navigationRailItem__label--${id}`}
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
									)
								)}
								ellipsizeMode='tail'
								numberOfLines={1}
								style={labelTextAnimatedStyle}
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
