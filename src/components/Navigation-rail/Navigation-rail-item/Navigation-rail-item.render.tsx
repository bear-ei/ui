import {forwardRef} from 'react'
import {Pressable, View} from 'react-native'
import {useTheme} from '../../../hooks'
import {SHAPE, SIZE, TYPOGRAPHY, typographyClasses} from '../../../theme'
import {AnimatedText, AnimatedView} from '../../Animated-component'
import type {PressableType} from '../../Touchable'
import {ACTIVE_ANIMATED, Underlay} from '../../Underlay'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import type {RenderNavigationRailItemProps} from './Navigation-rail-item.interface'

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
		const {classesName} = token.classes
		// const densityControlClasses = densityClasses()(DENSITY_TYPE.CONTROL)
		const activeAnimatedType = type === NAVIGATION_RAIL_TYPE.BLOCK ? ACTIVE_ANIMATED.SCALE : ACTIVE_ANIMATED.SCALE_X
		const activeColor = token.scheme.secondaryContainer
		const shape = type === NAVIGATION_RAIL_TYPE.BLOCK ? SHAPE.FULL : SHAPE.LARGE
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
					className='flex h-14 w-20 flex-col items-center justify-center outline-none'
					ref={ref}
					testID={`navigationRailItem__touchable--${id}`}
				>
					<AnimatedView
						{...(type !== NAVIGATION_RAIL_TYPE.BLOCK && {style: [contentAnimatedStyle]})}
						className='flex flex-col items-center justify-center'
						testID={`navigationRailItem__content--${id}`}
					>
						<View
							className={classesName(
								'pointer-events-none relative z-10 flex w-14 flex-col items-center justify-center',
								{
									['h-14']: type === NAVIGATION_RAIL_TYPE.BLOCK,
									['h-8']: type !== NAVIGATION_RAIL_TYPE.BLOCK
								}
							)}
							testID={`navigationRailItem__header--${id}`}
						>
							<View
								className={classesName('overflow-hidden', {
									['h-4 w-4']: type !== NAVIGATION_RAIL_TYPE.BLOCK,
									['h-5 w-5']: type === NAVIGATION_RAIL_TYPE.BLOCK
								})}
								testID={`navigationRailItem__iconLayout--${id}`}
							>
								{iconElement}
							</View>

							<Underlay
								active={active}
								activeAnimatedType={activeAnimatedType}
								activeColor={activeColor}
								activeShape={SHAPE.FULL}
								eventName={eventName}
								shape={shape}
								testID={`navigationRailItem__underlay--${id}`}
								underlayColor={underlayColor}
							/>
						</View>

						{type === NAVIGATION_RAIL_TYPE.SEGMENT && (
							<View
								testID={`navigationRailItem__label--${id}`}
								className={classesName(
									'flex h-6 flex-col justify-center self-stretch'
									// densityControlClasses(SIZE.LARGE)
								)}
							>
								<AnimatedText
									className={classesName(
										'select-none text-center',
										{
											['font-bold']: active,
											['font-normal']: !active
										},
										typographyClasses(TYPOGRAPHY.LABEL)(SIZE.MEDIUM)()
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
