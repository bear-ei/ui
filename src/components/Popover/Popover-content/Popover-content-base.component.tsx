import {useCallback, useEffect, useId, useMemo, useRef, type FC} from 'react'
import {type LayoutRectangle, type View} from 'react-native'
import {useImmer} from 'use-immer'

import type {PopoverContentBaseProps, PopoverContentState} from './Popover-content.interface'

import {POPOVER_TYPE} from '..'
import {type InteractionState} from '../../../constants'
import {
	useInteractionStateEvent,
	useMergeRefs,
	usePendingEvent,
	useTheme,
	useWindowDimensions,
	type HandleInteractionStateChangeOptions,
	type InteractionEvent
} from '../../../hooks'
import {DENSITY_SIZE, UI_DENSITY} from '../../../theme'
import {
	getPopoverContentPosition,
	handleMaskPressOut,
	handlePopoverContentAnimationFinished,
	handlePopoverContentStateChange,
	updatePopoverContentPosition
} from './Popover-content.handler'
import {RenderPopoverContent} from './Popover-content.render'

export const PopoverContentBase: FC<PopoverContentBaseProps> = ({
	containerLayout,
	contentPosition,
	onAnimationFinished: rawOnAnimationFinished,
	onVisibleChange,
	ref,
	triggerOn,
	type = POPOVER_TYPE.TOOLTIP,
	visible,
	...renderPopoverContentProps
}) => {
	const [{inverted: isInverted, layout, menuPosition, pendingAnimationFinishedEvent}, setState] =
		useImmer<PopoverContentState>({layout: {} as Partial<LayoutRectangle>, menuPosition: {}})

	usePendingEvent('pendingAnimationFinishedEvent', rawOnAnimationFinished, {
		pendingEvent: pendingAnimationFinishedEvent,
		setState
	})

	const {height: windowHeight, width: windowWidth} = useWindowDimensions()
	const containerRef = useRef<View>(null)
	const mergedRef = useMergeRefs([ref, containerRef])
	const id = useId()
	const {token, uiDensity} = useTheme()
	const isMenuOrPicker = type === POPOVER_TYPE.CONTEXT_MENU || type === POPOVER_TYPE.TEXT_INPUT_PICKER
	const position = getPopoverContentPosition(contentPosition, isInverted)

	// Menu width targets 180px on both densities:
	// desktop (spacing.XX_SMALL = 2) × 90, mobile (4) × 45.
	const popoverWidth =
		isMenuOrPicker ?
			type === POPOVER_TYPE.TEXT_INPUT_PICKER ?
				containerLayout?.width
			:	token.density.spacing[DENSITY_SIZE.XX_SMALL] * (uiDensity === UI_DENSITY.COMPACT ? 90 : 45)
		:	layout.width

	const onAnimationFinished = useMemo(
		() => handlePopoverContentAnimationFinished(setState, rawOnAnimationFinished),
		[rawOnAnimationFinished, setState]
	)

	const onMaskPressOut = useMemo(() => handleMaskPressOut(onVisibleChange), [onVisibleChange])
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handlePopoverContentStateChange(event, setState, {
				...options,
				interactionState,
				onVisibleChange,
				triggerOn
			}),
		[onVisibleChange, setState, triggerOn]
	)

	const interactionHandlers = useInteractionStateEvent({...renderPopoverContentProps, onInteractionStateChange})
	const runUpdatePosition = useMemo(
		() =>
			updatePopoverContentPosition(containerRef, {
				containerLayout,
				contentPosition,
				setState,
				token,
				type
			}),
		[containerLayout, setState, contentPosition, token, type]
	)

	useEffect(() => {
		let isCancelled = false

		runUpdatePosition({isCancelled: () => isCancelled, layout, visible, windowHeight, windowWidth})

		return () => {
			isCancelled = true
		}
	}, [visible, layout, runUpdatePosition, windowHeight, windowWidth])

	return (
		<RenderPopoverContent
			{...renderPopoverContentProps}
			containerLayout={containerLayout}
			contentPosition={position}
			height={layout.height}
			id={id}
			interactionHandlers={interactionHandlers}
			isMenuOrPicker={isMenuOrPicker}
			menuPosition={menuPosition}
			onAnimationFinished={onAnimationFinished}
			onMaskPressOut={onMaskPressOut}
			ref={mergedRef}
			type={type}
			visible={visible}
			width={popoverWidth}
			windowHeight={windowHeight}
			windowWidth={windowWidth}
		/>
	)
}
