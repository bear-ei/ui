import {cloneElement, forwardRef, isValidElement, useMemo} from 'react'
import {Platform, Pressable, Text, View, type ViewStyle} from 'react-native'

import type {MenuProps} from '../../Menu'
import type {RenderPopoverContentProps} from './Popover-content.interface'

import {POPOVER_CONTENT_POSITION, POPOVER_TYPE} from '..'
import {LAYOUT, OFF_SCREEN_LAYOUT} from '../../../constants'
import {useTheme} from '../../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, DURATION, EASING, RADIUS, SHAPE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '../../../theme'
import {platformValue} from '../../../utils'
import {Elevation} from '../../Elevation'
import {LAYOUT_ANIMATED, LayoutAnimated} from '../../Layout-animated'
import {Mask} from '../../Mask'
import {getSafeMenuPosition} from './Popover-content.handler'

export const RenderPopoverContent = forwardRef<View, RenderPopoverContentProps>(
	(
		{
			containerLayout,
			content,
			elevation,
			height = 0,
			id,
			interactionHandlers,
			menuOrPicker,
			menuPosition,
			onElevationAnimationFinished,
			onMaskPressOut,
			popoverContentPosition = POPOVER_CONTENT_POSITION.VERTICAL_START,
			radius = RADIUS.MEDIUM,
			shape = SHAPE.ALL,
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
		const {classesName, densityClasses, shapeClasses, typographyClasses} = token.classes
		const densityHorizontalInsetClasses = densityClasses(DENSITY_TYPE.INSET)(LAYOUT.HORIZONTAL)
		const {
			height: containerHeight = 0,
			width: containerWidth = 0,
			x: containerX = 0,
			y: containerY = 0
		} = containerLayout ?? {}

		const position = useMemo(
			() => ({
				[POPOVER_CONTENT_POSITION.HORIZONTAL_END]: () => {
					const x = containerX + containerWidth + token.density.spacing[DENSITY_SIZE.X_SMALL]
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
				[POPOVER_CONTENT_POSITION.HORIZONTAL_START]: () => {
					const x = containerX - width - token.density.spacing[DENSITY_SIZE.X_SMALL]
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
				[POPOVER_CONTENT_POSITION.VERTICAL_END]: () => {
					const x = containerX - (width - containerWidth) / 2
					const y =
						containerY +
						containerHeight +
						(type === POPOVER_TYPE.TEXT_INPUT_PICKER ?
							token.density.spacing[DENSITY_SIZE.NONE]
						:	token.density.spacing[DENSITY_SIZE.X_SMALL])

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
				[POPOVER_CONTENT_POSITION.VERTICAL_START]: () => {
					const x = containerX - (width - containerWidth) / 2
					const y =
						containerY -
						height -
						(type === POPOVER_TYPE.TEXT_INPUT_PICKER ?
							token.density.spacing[DENSITY_SIZE.NONE]
						:	token.density.spacing[DENSITY_SIZE.X_SMALL])

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
				}
			}),
			[
				containerHeight,
				containerWidth,
				containerX,
				containerY,
				height,
				token.density.spacing,
				type,
				width,
				windowHeight,
				windowWidth
			]
		)

		const contentPosition = useMemo(() => position[popoverContentPosition](), [position, popoverContentPosition])
		const isMainLayoutCompleted = type === POPOVER_TYPE.TEXT_INPUT_PICKER ? true : !!(height && width)
		const contentStyle = useMemo(
			() =>
				({
					height: platformValue(height),
					width: platformValue(width),
					...(type === POPOVER_TYPE.CONTEXT_MENU ?
						{
							left: platformValue(menuPosition.left ?? token.density.spacing[DENSITY_SIZE.NONE]),
							top: platformValue(menuPosition.top ?? token.density.spacing[DENSITY_SIZE.NONE])
						}
					:	{
							left:
								isMainLayoutCompleted ?
									platformValue(contentPosition.left)
								:	OFF_SCREEN_LAYOUT.position,
							top:
								isMainLayoutCompleted ? platformValue(contentPosition.top) : OFF_SCREEN_LAYOUT.position,
							...(!isMainLayoutCompleted && {
								opacity: 0,
								pointerEvents: 'none',
								zIndex: OFF_SCREEN_LAYOUT.zIndex
							})
						})
				}) as ViewStyle,
			[contentPosition, height, isMainLayoutCompleted, menuPosition, token, type, width]
		)

		// For TEXT_INPUT_PICKER: elevation covers both the trigger and the dropdown,
		// forming a single continuous shadow surface.
		// NOTE: relies on the dropdown being flush with the trigger (gap = 0).
		// If gap changes, this style needs to account for it.
		const elevationLayoutStyle = useMemo(
			() =>
				({
					height: platformValue(height + containerHeight),
					width: platformValue(width),
					...(type === POPOVER_TYPE.CONTEXT_MENU ?
						{
							left: platformValue(menuPosition.left ?? token.density.spacing[DENSITY_SIZE.NONE]),
							top: platformValue(menuPosition.top ?? token.density.spacing[DENSITY_SIZE.NONE])
						}
					:	{left: platformValue(containerX), top: platformValue(containerY)})
				}) as ViewStyle,
			[containerHeight, menuPosition, token, containerX, containerY, height, type, width]
		)

		const verticalAnimatedType = menuOrPicker ? LAYOUT_ANIMATED.COLLAPSE_Y : LAYOUT_ANIMATED.COLLAPSE_Y_AND_FADE
		const horizontalAnimatedType = menuOrPicker ? LAYOUT_ANIMATED.COLLAPSE_X : LAYOUT_ANIMATED.COLLAPSE_X_AND_FADE
		const endOutputRanges = useMemo(
			() =>
				type === POPOVER_TYPE.TOOLTIP ?
					[-token.density.spacing[DENSITY_SIZE.SMALL], token.density.spacing[DENSITY_SIZE.NONE]]
				:	undefined,
			[token.density.spacing, type]
		)

		const startOutputRanges = useMemo(
			() =>
				type === POPOVER_TYPE.TOOLTIP ?
					[token.density.spacing[DENSITY_SIZE.SMALL], token.density.spacing[DENSITY_SIZE.NONE]]
				:	undefined,
			[token.density.spacing, type]
		)

		const positionOutputRanges = useMemo(
			() => ({
				[POPOVER_CONTENT_POSITION.HORIZONTAL_END]: {
					animatedType: horizontalAnimatedType,
					outputRanges: endOutputRanges
				},
				[POPOVER_CONTENT_POSITION.HORIZONTAL_START]: {
					animatedType: horizontalAnimatedType,
					outputRanges: startOutputRanges
				},
				[POPOVER_CONTENT_POSITION.VERTICAL_END]: {
					animatedType: verticalAnimatedType,
					outputRanges: endOutputRanges
				},
				[POPOVER_CONTENT_POSITION.VERTICAL_START]: {
					animatedType: verticalAnimatedType,
					outputRanges: startOutputRanges
				}
			}),
			[startOutputRanges, verticalAnimatedType, endOutputRanges, horizontalAnimatedType]
		)

		const {animatedType, outputRanges} = positionOutputRanges[popoverContentPosition]
		const {entry, exit} = useMemo(
			() => ({
				entry: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_DECELERATE},
				exit: {duration: DURATION.SHORT_2, easing: EASING.STANDARD_ACCELERATE}
			}),
			[]
		)

		const contentSize = useMemo(() => ({height, width}), [height, width])
		const mainElement = (
			<View
				{...(type === POPOVER_TYPE.TOOLTIP && {onLayout})}
				className={classesName(
					'absolute bottom-0 top-0 flex justify-center overflow-hidden',
					{
						[`${densityHorizontalInsetClasses(DENSITY_SIZE.SMALL)} min-h-[--density-spacing-x-large] bg-[--color-inverse-surface]`]:
							type === POPOVER_TYPE.TOOLTIP,
						['left-0 right-0']: menuOrPicker
					},
					shapeClasses(radius)(type === POPOVER_TYPE.TEXT_INPUT_PICKER ? SHAPE.BOTTOM : shape)
				)}
				testID={`popoverContent__main--${id}`}
			>
				{isValidElement(content) && type !== POPOVER_TYPE.TOOLTIP ?
					<View
						{...(menuOrPicker && {onLayout})}
						testID={`popoverContent__supporting--${id}`}
					>
						{/* Intentional override: the Menu inside a Popover receives the popover's
							interaction handlers (except onLayout, which is handled separately) and
							mirrors the popover's visibility. User-provided handlers on the Menu are
							ignored — the popover owns the interaction state machine. */}
						{menuOrPicker ?
							cloneElement<MenuProps>(
								content as React.ReactElement<MenuProps, string | React.JSXElementConstructor<unknown>>,
								{...mainInteractionHandlers, visible}
							)
						:	content}
					</View>
				:	<Text
						className={classesName(
							'select-none text-center',
							typographyClasses(TYPOGRAPHY.BODY)(TYPOGRAPHY_SIZE.SMALL)({
								colorClasses: 'color-[--color-inverse-on-surface]'
							})
						)}
						ellipsizeMode='tail'
						numberOfLines={1}
						testID={`popoverContent__supportingText--${id}`}
					>
						{content}
					</Text>
				}
			</View>
		)

		const popoverContentElement =
			type !== POPOVER_TYPE.TOOLTIP ?
				<Pressable
					{...mainInteractionHandlers}
					className='relative flex-1 self-stretch outline-none'
					testID={`popoverContent_pressable--${id}`}
				>
					{mainElement}
				</Pressable>
			:	<View
					className='relative flex-1 self-stretch outline-none'
					testID={`popoverContent--${id}`}
				>
					{mainElement}
				</View>

		return (
			<>
				<LayoutAnimated
					{...containerProps}
					animatedType={animatedType}
					className={classesName('z-50 ', {
						['absolute']: Platform.OS !== 'web',
						['fixed']: Platform.OS === 'web',
						['min-h-[--typography-body-large-height]']: !menuOrPicker
					})}
					contentSize={contentSize}
					entry={entry}
					exit={exit}
					outputRanges={outputRanges}
					ref={ref}
					style={contentStyle}
					testID={testID ?? `popoverContent__content--${id}`}
					translate={!menuOrPicker}
					visible={isMainLayoutCompleted ? visible : undefined}
				>
					{menuOrPicker ? mainElement : popoverContentElement}
				</LayoutAnimated>

				{menuOrPicker && (
					<Mask
						backgroundColor={token.scheme.scrim}
						onPressOut={onMaskPressOut}
						opacity={token.opacity.level0}
						testID={`popoverContent__mask--${id}`}
						visible={visible}
					/>
				)}

				{menuOrPicker && (
					<View
						className={classesName('-z-20', {
							['absolute']: Platform.OS !== 'web',
							['fixed']: Platform.OS === 'web'
						})}
						style={elevationLayoutStyle}
						testID={`popoverContent_elevationLayout--${id}`}
					>
						<Elevation
							entry={entry}
							exit={exit}
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
