import {forwardRef, isValidElement} from 'react'
import {Platform, Pressable, Text, View, type ViewStyle} from 'react-native'
import {POPOVER_CONTENT_POSITION, POPOVER_TYPE, type PopoverType} from '..'
import {useTheme} from '../../../hooks'
import {DENSITY_SIZE, platformValue, RADIUS, SHAPE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '../../../theme'
import {Elevation} from '../../Elevation'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../../Layout-animated'
import {Mask} from '../../Mask'
import {getSafeMenuPosition} from './Popover-content.handler'
import type {RenderPopoverContentProps} from './Popover-content.interface'

export const RenderPopoverContent = forwardRef<View, RenderPopoverContentProps>(
	(
		{
			containerLayout,
			content,
			elevation,
			height = 0,
			id,
			interactionHandlers,
			menuPosition,
			onElevationAnimationFinished,
			onMaskPressOut,
			popoverContentPosition = POPOVER_CONTENT_POSITION.VERTICAL_START,
			shape = SHAPE.ALL,
			radius = RADIUS.FULL,
			testID,
			type,
			visible,
			width = 0,
			windowHeight = 0,
			windowWidth = 0,
			...containerProps
		},
		ref
	) => {
		const {onLayout, ...mainInteractionHandlers} = interactionHandlers
		const {token} = useTheme()
		const {classesName, shapeClasses, typographyClasses} = token.classes
		const {
			height: containerHeight = 0,
			width: containerWidth = 0,
			x: containerX = 0,
			y: containerY = 0
		} = containerLayout ?? {}

		const isMenuOrPicker =
			type &&
			([POPOVER_TYPE.CONTEXT_MENU, POPOVER_TYPE.TEXT_INPUT_PICKER] as readonly PopoverType[]).includes(type)

		const position = {
			[POPOVER_CONTENT_POSITION.VERTICAL_START]: () => {
				const x = containerX - (width - containerWidth) / 2
				const y =
					containerY -
					height -
					(type === POPOVER_TYPE.TEXT_INPUT_PICKER ?
						token.density.spacing[DENSITY_SIZE.NONE]
					:	token.density.spacing[DENSITY_SIZE.XX_SMALL])

				const {left} = getSafeMenuPosition({
					height,
					margin: token.density.spacing[DENSITY_SIZE.MEDIUM],
					width,
					windowHeight,
					windowWidth,
					x,
					y
				})

				return {left, top: y}
			},
			[POPOVER_CONTENT_POSITION.VERTICAL_END]: () => {
				const x = containerX - (width - containerWidth) / 2
				const y =
					containerY +
					containerHeight +
					(type === POPOVER_TYPE.TEXT_INPUT_PICKER ?
						token.density.spacing[DENSITY_SIZE.NONE]
					:	token.density.spacing[DENSITY_SIZE.XX_SMALL])

				const {left} = getSafeMenuPosition({
					height,
					margin: token.density.spacing[DENSITY_SIZE.MEDIUM],
					width,
					windowHeight,
					windowWidth,
					x,
					y
				})

				return {left, top: y}
			},
			[POPOVER_CONTENT_POSITION.HORIZONTAL_START]: () => {
				const x = containerX - width - token.density.spacing[DENSITY_SIZE.XX_SMALL]
				const y = containerY - (height - containerHeight) / 2
				const {top} = getSafeMenuPosition({
					height,
					margin: token.density.spacing[DENSITY_SIZE.MEDIUM],
					width,
					windowHeight,
					windowWidth,
					x,
					y
				})

				return {left: x, top}
			},
			[POPOVER_CONTENT_POSITION.HORIZONTAL_END]: () => {
				const x = containerX + containerWidth + token.density.spacing[DENSITY_SIZE.XX_SMALL]
				const y = containerY - (height - containerHeight) / 2
				const {top} = getSafeMenuPosition({
					height,
					margin: token.density.spacing[DENSITY_SIZE.MEDIUM],
					width,
					windowHeight,
					windowWidth,
					x,
					y
				})

				return {left: x, top}
			}
		}

		const contentPosition = position[popoverContentPosition]()
		const isMainLayoutCompleted = type === POPOVER_TYPE.TEXT_INPUT_PICKER ? true : !!(height && width)
		const contentStyle = {
			height: platformValue(height),
			width: platformValue(width),
			...(type === POPOVER_TYPE.CONTEXT_MENU ?
				{
					left: platformValue(menuPosition.left ?? token.density.spacing[DENSITY_SIZE.NONE]),
					top: platformValue(menuPosition.top ?? token.density.spacing[DENSITY_SIZE.NONE])
				}
			:	{
					left: isMainLayoutCompleted ? platformValue(contentPosition.left) : -16384,
					top: isMainLayoutCompleted ? platformValue(contentPosition.top) : -16384,
					...(!isMainLayoutCompleted && {opacity: 0, pointerEvents: 'none', zIndex: -4096})
				})
		} as ViewStyle

		const elevationLayoutStyle = {
			height: platformValue(height + containerHeight),
			width: platformValue(width),
			...(type === POPOVER_TYPE.CONTEXT_MENU ?
				{
					left: platformValue(menuPosition.left ?? token.density.spacing[DENSITY_SIZE.NONE]),
					top: platformValue(menuPosition.top ?? token.density.spacing[DENSITY_SIZE.NONE])
				}
			:	{left: platformValue(containerX), top: platformValue(containerY)})
		} as ViewStyle

		const verticalAnimatedType = isMenuOrPicker ? LAYOUT_ANIMATED.COLLAPSE_Y : LAYOUT_ANIMATED.COLLAPSE_Y_AND_FADE
		const horizontalAnimatedType = isMenuOrPicker ? LAYOUT_ANIMATED.COLLAPSE_X : LAYOUT_ANIMATED.COLLAPSE_X_AND_FADE
		const endOutputRanges =
			type === POPOVER_TYPE.TOOLTIP ?
				[-token.density.spacing[DENSITY_SIZE.X_SMALL], token.density.spacing[DENSITY_SIZE.NONE]]
			:	undefined

		const startOutputRanges =
			type === POPOVER_TYPE.TOOLTIP ?
				[token.density.spacing[DENSITY_SIZE.X_SMALL], token.density.spacing[DENSITY_SIZE.NONE]]
			:	undefined

		const positionOutputRanges = {
			[POPOVER_CONTENT_POSITION.VERTICAL_START]: {
				animatedType: verticalAnimatedType,
				outputRanges: startOutputRanges
			},
			[POPOVER_CONTENT_POSITION.VERTICAL_END]: {
				animatedType: verticalAnimatedType,
				outputRanges: endOutputRanges
			},
			[POPOVER_CONTENT_POSITION.HORIZONTAL_START]: {
				animatedType: horizontalAnimatedType,
				outputRanges: startOutputRanges
			},
			[POPOVER_CONTENT_POSITION.HORIZONTAL_END]: {
				animatedType: horizontalAnimatedType,
				outputRanges: endOutputRanges
			}
		}

		const {animatedType, outputRanges} = positionOutputRanges[popoverContentPosition]
		const mainElement = (
			<View
				{...(type === POPOVER_TYPE.TOOLTIP && {onLayout})}
				className={classesName(
					'absolute bottom-0 top-0 overflow-hidden',
					{
						['min-h-[--typography-body-small-height] bg-[--color-inverse-surface] pb-1 pl-2 pr-2 pt-1']:
							type === POPOVER_TYPE.TOOLTIP,
						['left-0 right-0']: isMenuOrPicker,
						['pointer-events-none']: !isMenuOrPicker
					},
					shapeClasses(radius)(type === POPOVER_TYPE.TEXT_INPUT_PICKER ? SHAPE.BOTTOM : shape)
				)}
				testID={`popoverContent__main--${id}`}
			>
				{isValidElement(content) && type !== POPOVER_TYPE.TOOLTIP ?
					<View
						{...(isMenuOrPicker && {onLayout})}
						testID={`popoverContent__supporting--${id}`}
					>
						{/*{isMenuOrPicker ?
							cloneElement<MenuProps>(
								content as React.ReactElement<MenuProps, string | React.JSXElementConstructor<unknown>>,
								{...mainInteractionHandlers, visible}
							)
						:	content}*/}
					</View>
				:	<Text
						ellipsizeMode='tail'
						numberOfLines={1}
						testID={`popoverContent__supportingText--${id}`}
						className={classesName(
							'select-none text-center',
							typographyClasses(TYPOGRAPHY.BODY)(TYPOGRAPHY_SIZE.SMALL)({
								colorClasses: 'color-[--color-inverse-on-surface]'
							})
						)}
					>
						{content}
					</Text>
				}
			</View>
		)

		return (
			<>
				<LayoutAnimated
					{...containerProps}
					animatedType={animatedType}
					contentSize={{height, width}}
					className={classesName('z-50 ', {
						['absolute']: Platform.OS !== 'web',
						['fixed']: Platform.OS === 'web',
						['min-h-[--typography-body-small-height]']: !isMenuOrPicker
					})}
					outputRanges={outputRanges}
					ref={ref}
					style={[contentStyle]}
					testID={testID ?? `popoverContent__content--${id}`}
					translate={!isMenuOrPicker}
					visible={isMainLayoutCompleted ? visible : undefined}
				>
					{isMenuOrPicker ?
						mainElement
					:	<Pressable
							{...mainInteractionHandlers}
							className='relative flex-1 self-stretch outline-none'
							testID={`popoverContent_pressable--${id}`}
						>
							{mainElement}
						</Pressable>
					}
				</LayoutAnimated>

				{isMenuOrPicker && (
					<Mask
						backgroundColor={token.scheme.scrim}
						onPressOut={onMaskPressOut}
						opacity={token.opacity.level0}
						testID={`popoverContent__mask--${id}`}
						visible={visible}
					/>
				)}

				{isMenuOrPicker && (
					<View
						className={classesName('-z-20', {
							['absolute']: Platform.OS !== 'web',
							['fixed']: Platform.OS === 'web'
						})}
						style={[elevationLayoutStyle]}
						testID={`popoverContent_elevationLayout--${id}`}
					>
						<Elevation
							level={elevation}
							onAnimationFinished={onElevationAnimationFinished}
							radius={RADIUS.MEDIUM}
							shape={shape}
							testID={`popoverContent_elevation--${id}`}
						/>
					</View>
				)}
			</>
		)
	}
)

RenderPopoverContent.displayName = 'RenderPopoverContent'
