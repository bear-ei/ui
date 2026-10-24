import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent, View} from 'react-native'
import type {Updater} from 'use-immer'

import type {StateEvent} from '../../../hooks'
import type {
	GetSafeMenuPositionOptions,
	HandlePopoverContentPositionWindowOptions,
	HandlePopoverContentStateEventChangeOptions,
	PopoverContentState,
	UpdatePopoverContentInvertOptions,
	UpdatePopoverContentPositionOptions
} from './Popover-content.interface'

import {POPOVER_CONTENT_POSITION, POPOVER_TYPE, type PopoverContentPosition} from '..'
import {EVENT_NAME, TRIGGER_EVENT_NAMES, TRIGGER_ON} from '../../../constants'
import {DENSITY_SIZE} from '../../../theme'

export const handlePopoverContentStateChange = (
	event: StateEvent,
	setState: Updater<PopoverContentState>,
	{eventName, onVisible, triggerEvent = TRIGGER_ON.HOVER}: HandlePopoverContentStateEventChangeOptions
) => {
	if (eventName === EVENT_NAME.LAYOUT) {
		const {height, width} = (event as LayoutChangeEvent).nativeEvent.layout

		setState(draft => {
			const {height: prevHeight, width: prevWidth} = draft.layout

			if (prevWidth !== width || prevHeight !== height) {
				draft.layout.height = height
				draft.layout.width = width
			}
		})

		return
	}

	const triggerEventNames = TRIGGER_EVENT_NAMES[triggerEvent]

	if (triggerEventNames.includes(eventName)) {
		onVisible?.(eventName === triggerEventNames[0])
	}
}

export const handlePopoverContentAnimationFinished =
	(setState: Updater<PopoverContentState>, onAnimationFinished?: (visible?: boolean) => void) =>
	(visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		setState(draft => {
			if (draft.invert && !visible) {
				draft.invert = false
			}

			if (onAnimationFinished) {
				draft.pendingAnimationFinishedEvent = visible
			}
		})
	}

export const getSafeMenuPosition = ({
	height,
	margin = 8,
	offset = 0,
	width,
	windowHeight = 0,
	windowWidth = 0,
	x = 0,
	y = 0
}: GetSafeMenuPositionOptions) => {
	let left = x + offset
	let top = y + offset

	if (left < margin) {
		left = margin
	}

	if (left + width + margin > windowWidth) {
		left = Math.max(windowWidth - width - margin, margin)
	}

	if (top < margin) {
		top = margin
	}

	if (top + height + margin > windowHeight) {
		top = Math.max(windowHeight - height - margin, margin)
	}

	return {left, top}
}

export const updatePopoverContentPosition = (
	ref: React.RefObject<View | null>,
	{containerLayout, popoverContentPosition, setState, token, type}: UpdatePopoverContentPositionOptions
) => {
	const updatePopoverContentInvert =
		({height, width, windowHeight, windowWidth, x, y}: UpdatePopoverContentInvertOptions) =>
		(draft: WritableDraft<PopoverContentState>) => {
			draft.invert =
				popoverContentPosition?.startsWith('HORIZONTAL') ?
					width + x >= windowWidth && x > width
				:	height + y >= windowHeight && y > height
		}

	return ({isCancelled, layout, visible, windowHeight, windowWidth}: HandlePopoverContentPositionWindowOptions) => {
		if (!visible) {
			return
		}

		if (type === POPOVER_TYPE.CONTEXT_MENU) {
			setState(draft => {
				const {left, top} = getSafeMenuPosition({
					height: layout.height ?? 0,
					margin: token.density.spacing[DENSITY_SIZE.MEDIUM],
					offset: token.density.spacing[DENSITY_SIZE.XX_SMALL],
					width: layout.width ?? 0,
					windowHeight,
					windowWidth,
					x: containerLayout?.x,
					y: containerLayout?.y
				})

				draft.menuPosition = {left, top}
			})

			return
		}

		ref.current?.measureInWindow((x, y, width, height) => {
			if (isCancelled?.()) {
				return
			}

			setState(updatePopoverContentInvert({height, width, windowHeight, windowWidth, x, y}))
		})
	}
}

export const getPopoverContentPosition = (popoverContentPosition?: PopoverContentPosition, invert?: boolean) => {
	const position = {
		invertX:
			popoverContentPosition === POPOVER_CONTENT_POSITION.HORIZONTAL_END ?
				POPOVER_CONTENT_POSITION.HORIZONTAL_START
			:	POPOVER_CONTENT_POSITION.HORIZONTAL_END,

		invertY:
			popoverContentPosition === POPOVER_CONTENT_POSITION.VERTICAL_END ?
				POPOVER_CONTENT_POSITION.VERTICAL_START
			:	POPOVER_CONTENT_POSITION.VERTICAL_END
	}

	const invertPosition = (
		popoverContentPosition?.startsWith('HORIZONTAL') ?
			position.invertX
		:	position.invertY) as PopoverContentPosition

	return invert ? invertPosition : popoverContentPosition
}

export const handleMaskPressOut = (onVisible?: (value?: boolean) => void) => () => onVisible?.(false)
