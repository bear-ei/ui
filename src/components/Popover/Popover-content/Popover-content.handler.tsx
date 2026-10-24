import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent, View} from 'react-native'
import type {Updater} from 'use-immer'

import type {InteractionEvent} from '../../../hooks'
import type {
	GetSafeMenuPositionOptions,
	HandlePopoverContentPositionWindowOptions,
	HandlePopoverContentInteractionStateChangeOptions,
	PopoverContentState,
	UpdatePopoverContentInvertOptions,
	UpdatePopoverContentPositionOptions
} from './Popover-content.interface'

import {POPOVER_CONTENT_POSITION, POPOVER_TYPE, type PopoverContentPosition} from '..'
import {EVENT_NAME, TRIGGER_EVENT_NAMES, TRIGGER_ON} from '../../../constants'
import {DENSITY_SIZE} from '../../../theme'

export const handlePopoverContentStateChange = (
	event: InteractionEvent,
	setState: Updater<PopoverContentState>,
	{eventName, onVisibleChange, triggerOn = TRIGGER_ON.HOVER}: HandlePopoverContentInteractionStateChangeOptions
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

	const triggerEventNames = TRIGGER_EVENT_NAMES[triggerOn]

	if (triggerEventNames.includes(eventName)) {
		onVisibleChange?.(eventName === triggerEventNames[0])
	}
}

export const handlePopoverContentAnimationFinished =
	(setState: Updater<PopoverContentState>, onAnimationFinished?: (visible?: boolean) => void) =>
	(visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		setState(draft => {
			if (draft.inverted && !visible) {
				draft.inverted = false
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
	{containerLayout, contentPosition, setState, token, type}: UpdatePopoverContentPositionOptions
) => {
	const updatePopoverContentInvert =
		({height, width, windowHeight, windowWidth, x, y}: UpdatePopoverContentInvertOptions) =>
		(draft: WritableDraft<PopoverContentState>) => {
			draft.inverted =
				contentPosition?.startsWith('HORIZONTAL') ?
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

export const getPopoverContentPosition = (contentPosition?: PopoverContentPosition, invert?: boolean) => {
	const position = {
		invertX:
			contentPosition === POPOVER_CONTENT_POSITION.HORIZONTAL_END ?
				POPOVER_CONTENT_POSITION.HORIZONTAL_START
			:	POPOVER_CONTENT_POSITION.HORIZONTAL_END,

		invertY:
			contentPosition === POPOVER_CONTENT_POSITION.VERTICAL_END ?
				POPOVER_CONTENT_POSITION.VERTICAL_START
			:	POPOVER_CONTENT_POSITION.VERTICAL_END
	}

	const invertPosition = (
		contentPosition?.startsWith('HORIZONTAL') ?
			position.invertX
		:	position.invertY) as PopoverContentPosition

	return invert ? invertPosition : contentPosition
}

export const handleMaskPressOut = (onVisibleChange?: (visible?: boolean) => void) => () => onVisibleChange?.(false)
