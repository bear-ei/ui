import {useCallback, useEffect, useId, useMemo, useRef, type FC} from 'react'
import {type LayoutRectangle, type View} from 'react-native'
import {useImmer} from 'use-immer'

import type {PopoverContentBaseProps, PopoverContentState} from './Popover-content.interface'

import {POPOVER_TYPE, type PopoverType} from '..'
import {type State} from '../../../constants'
import {
	useInteractionStateEvent,
	useMergeRefs,
	usePendingEvent,
	useTheme,
	useWindowDimensions,
	type HandleStateEventChangeOptions,
	type StateEvent
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
	onAnimationFinished: rawOnAnimationFinished,
	onVisible,
	popoverContentPosition,
	ref,
	triggerEvent,
	type = POPOVER_TYPE.TOOLTIP,
	visible,
	...renderPopoverContentProps
}) => {
	const [{invert: isInvert, layout, menuPosition, pendingAnimationFinishedEvent}, setState] =
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
	const isMenuOrPicker = (
		[POPOVER_TYPE.CONTEXT_MENU, POPOVER_TYPE.TEXT_INPUT_PICKER] as readonly PopoverType[]
	).includes(type)

	const position = getPopoverContentPosition(popoverContentPosition, isInvert)

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

	const onMaskPressOut = useMemo(() => handleMaskPressOut(onVisible), [onVisible])
	const onStateEventChange = useCallback(
		(event: StateEvent, state: State, options: HandleStateEventChangeOptions) =>
			handlePopoverContentStateChange(event, setState, {...options, onVisible, state, triggerEvent}),
		[onVisible, setState, triggerEvent]
	)

	const interactionHandlers = useInteractionStateEvent({...renderPopoverContentProps, onStateEventChange})
	const runUpdatePosition = useMemo(
		() =>
			updatePopoverContentPosition(containerRef, {
				containerLayout,
				popoverContentPosition,
				setState,
				token,
				type
			}),
		[containerLayout, setState, popoverContentPosition, token, type]
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
			height={layout.height}
			id={id}
			interactionHandlers={interactionHandlers}
			menuOrPicker={isMenuOrPicker}
			menuPosition={menuPosition}
			onAnimationFinished={onAnimationFinished}
			onMaskPressOut={onMaskPressOut}
			popoverContentPosition={position}
			ref={mergedRef}
			type={type}
			visible={visible}
			width={popoverWidth}
			windowHeight={windowHeight}
			windowWidth={windowWidth}
		/>
	)
}
