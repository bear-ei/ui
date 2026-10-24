import {cloneElement, isValidElement, useMemo, type FC} from 'react'
import {Platform, Pressable, Text, View, type ViewStyle} from 'react-native'

import type {MenuProps} from '../../Menu'
import type {RenderPopoverContentProps} from './Popover-content.interface'

import {POPOVER_CONTENT_POSITION, POPOVER_TYPE} from '..'
import {ORIENTATION, OFF_SCREEN_LAYOUT} from '../../../constants'
import {useTheme} from '../../../hooks'
import {DENSITY_SIZE, DENSITY_TYPE, ENTRY_EXIT, RADIUS, SHAPE, TYPOGRAPHY, TYPOGRAPHY_SIZE} from '../../../theme'
import {toPlatformUnit} from '../../../utils'
import {Elevation} from '../../Elevation'
import {LAYOUT_ANIMATION, LayoutAnimated} from '../../Layout-animated'
import {Mask} from '../../Mask'
import {getSafeMenuPosition} from './Popover-content.handler'

export const RenderPopoverContent: FC<RenderPopoverContentProps> = ({
	containerLayout,
	content,
	contentPosition = POPOVER_CONTENT_POSITION.VERTICAL_START,
	elevation,
	height = 0,
	id,
	interactionHandlers,
	isMenuOrPicker,
	menuPosition,
	onElevationAnimationFinished,
	onMaskPressOut,
	radius = RADIUS.MEDIUM,
	shape = SHAPE.ALL,
	testID,
	type,
	visible,
	width = 0,
	windowHeight = 0,
	windowWidth = 0,
	...containerProps
}) => {
	const {onLayout, ...mainInteractionHandlers} = interactionHandlers
	const {token} = useTheme()
	const {classNames, densityClasses, shapeClasses, typographyClasses} = token.classes
	const densityHorizontalInsetClasses = densityClasses(DENSITY_TYPE.INSET, ORIENTATION.HORIZONTAL)
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

	const resolvedContentPosition = useMemo(() => position[contentPosition](), [position, contentPosition])
	const isMainLayoutCompleted = type === POPOVER_TYPE.TEXT_INPUT_PICKER ? true : !!(height && width)
	const contentStyle = useMemo(
		() =>
			({
				height: toPlatformUnit(height),
				width: toPlatformUnit(width),
				...(type === POPOVER_TYPE.CONTEXT_MENU ?
					{
						left: toPlatformUnit(menuPosition.left ?? token.density.spacing[DENSITY_SIZE.NONE]),
						top: toPlatformUnit(menuPosition.top ?? token.density.spacing[DENSITY_SIZE.NONE])
					}
				:	{
						left:
							isMainLayoutCompleted ?
								toPlatformUnit(resolvedContentPosition.left)
							:	OFF_SCREEN_LAYOUT.position,
						top:
							isMainLayoutCompleted ?
								toPlatformUnit(resolvedContentPosition.top)
							:	OFF_SCREEN_LAYOUT.position,
						...(!isMainLayoutCompleted && {
							opacity: 0,
							pointerEvents: 'none',
							zIndex: OFF_SCREEN_LAYOUT.zIndex
						})
					})
			}) as ViewStyle,
		[height, isMainLayoutCompleted, menuPosition, resolvedContentPosition, token, type, width]
	)

	// For TEXT_INPUT_PICKER: elevation covers both the trigger and the dropdown,
	// forming a single continuous shadow surface.
	// NOTE: relies on the dropdown being flush with the trigger (gap = 0).
	// If gap changes, this style needs to account for it.
	const elevationLayoutStyle = {
		height: toPlatformUnit(height + containerHeight),
		width: toPlatformUnit(width),
		...(type === POPOVER_TYPE.CONTEXT_MENU ?
			{
				left: toPlatformUnit(menuPosition.left ?? token.density.spacing[DENSITY_SIZE.NONE]),
				top: toPlatformUnit(menuPosition.top ?? token.density.spacing[DENSITY_SIZE.NONE])
			}
		:	{left: toPlatformUnit(containerX), top: toPlatformUnit(containerY)})
	} as ViewStyle

	const verticalAnimation = isMenuOrPicker ? LAYOUT_ANIMATION.COLLAPSE_Y : LAYOUT_ANIMATION.COLLAPSE_Y_AND_FADE
	const horizontalAnimation = isMenuOrPicker ? LAYOUT_ANIMATION.COLLAPSE_X : LAYOUT_ANIMATION.COLLAPSE_X_AND_FADE
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
				animation: horizontalAnimation,
				outputRanges: endOutputRanges
			},
			[POPOVER_CONTENT_POSITION.HORIZONTAL_START]: {
				animation: horizontalAnimation,
				outputRanges: startOutputRanges
			},
			[POPOVER_CONTENT_POSITION.VERTICAL_END]: {
				animation: verticalAnimation,
				outputRanges: endOutputRanges
			},
			[POPOVER_CONTENT_POSITION.VERTICAL_START]: {
				animation: verticalAnimation,
				outputRanges: startOutputRanges
			}
		}),
		[startOutputRanges, verticalAnimation, endOutputRanges, horizontalAnimation]
	)

	const {animation, outputRanges} = positionOutputRanges[contentPosition]
	const {entry, exit} = ENTRY_EXIT.SHORT

	const contentSize = useMemo(() => ({height, width}), [height, width])
	const mainElement = (
		<View
			{...(type === POPOVER_TYPE.TOOLTIP && {onLayout})}
			className={classNames(
				'absolute bottom-0 top-0 flex justify-center overflow-hidden',
				{
					[`${densityHorizontalInsetClasses(DENSITY_SIZE.SMALL)} min-h-[--density-spacing-x-large] bg-[--color-inverse-surface]`]:
						type === POPOVER_TYPE.TOOLTIP,
					['left-0 right-0']: isMenuOrPicker
				},
				shapeClasses(type === POPOVER_TYPE.TEXT_INPUT_PICKER ? SHAPE.BOTTOM : shape)(radius)
			)}
			testID={`popoverContent__main--${id}`}
		>
			{isValidElement(content) && type !== POPOVER_TYPE.TOOLTIP ?
				<View
					{...(isMenuOrPicker && {onLayout})}
					testID={`popoverContent__supporting--${id}`}
				>
					{/* Intentional override: the Menu inside a Popover receives the popover's
							interaction handlers (except onLayout, which is handled separately) and
							mirrors the popover's visibility. User-provided handlers on the Menu are
							ignored — the popover owns the interaction state machine. */}
					{isMenuOrPicker ?
						cloneElement<MenuProps>(
							content as React.ReactElement<MenuProps, string | React.JSXElementConstructor<unknown>>,
							{...mainInteractionHandlers, visible}
						)
					:	content}
				</View>
			:	<Text
					className={classNames(
						'select-none text-center',
						typographyClasses(TYPOGRAPHY.BODY, {
							colorClasses: 'color-[--color-inverse-on-surface]'
						})(TYPOGRAPHY_SIZE.SMALL)
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
				animation={animation}
				className={classNames('z-50 ', {
					['absolute']: Platform.OS !== 'web',
					['fixed']: Platform.OS === 'web',
					['min-h-[--typography-body-large-height]']: !isMenuOrPicker
				})}
				contentSize={contentSize}
				entry={entry}
				exit={exit}
				outputRanges={outputRanges}
				style={contentStyle}
				testID={testID ?? `popoverContent__content--${id}`}
				translateOnCollapse={!isMenuOrPicker}
				visible={isMainLayoutCompleted ? visible : undefined}
			>
				{isMenuOrPicker ? mainElement : popoverContentElement}
			</LayoutAnimated>

			{isMenuOrPicker && (
				<Mask
					backgroundColor={token.colors.scrim}
					backgroundOpacity={token.opacity.level0}
					onPressOut={onMaskPressOut}
					testID={`popoverContent__mask--${id}`}
					visible={visible}
				/>
			)}

			{isMenuOrPicker && (
				<View
					className={classNames('-z-20', {
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
