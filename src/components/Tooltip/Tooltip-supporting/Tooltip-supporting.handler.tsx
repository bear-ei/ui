import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent, LayoutRectangle, View} from 'react-native'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../../hooks'
import {COMPONENT_STATUS, EVENT_NAME, TRIGGER_EVENT, type EventName, type TriggerEvent} from '../../Common'
import {TOOLTIP_TYPE} from '../Tooltip.enum'
import {SUPPORTING_POSITION} from './Tooltip-supporting.enum'
import type {
	AnimateTooltipSupportingOptions,
	AnimateTooltipSupportingSharedValues,
	GetSafeMenuPositionOptions,
	HandleTooltipSupportingPositionWindowOptions,
	HandleTooltipSupportingStateEventChangeOptions,
	SupportingPosition,
	TooltipSupportingState,
	UpdateTooltipSupportingInvertOptions,
	UpdateTooltipSupportingPositionOptions,
	UpdateTooltipSupportingStatusOptions
} from './Tooltip-supporting.interface'

export const handleTooltipSupportingStateChange =
	({eventName, onVisible, triggerEvent = TRIGGER_EVENT.HOVER}: HandleTooltipSupportingStateEventChangeOptions) =>
	(setState: Updater<TooltipSupportingState>) => {
		const updateTooltipSupportingLayout = (event: LayoutChangeEvent) => {
			const {height, width} = event.nativeEvent.layout

			setState(draft => {
				const {width: prevWidth, height: prevHeight} = draft.layout

				if (prevWidth !== width || prevHeight !== height) {
					draft.layout.height = height
					draft.layout.width = width
					draft.status = COMPONENT_STATUS.SUCCEEDED
				}
			})
		}

		return (event: StateEvent) => {
			if (eventName === EVENT_NAME.LAYOUT) {
				updateTooltipSupportingLayout(event as LayoutChangeEvent)

				return
			}

			const trigger = {
				[TRIGGER_EVENT.FOCUS]: [EVENT_NAME.FOCUS, EVENT_NAME.BLUR],
				[TRIGGER_EVENT.HOVER]: [EVENT_NAME.HOVER_IN, EVENT_NAME.HOVER_OUT],
				[TRIGGER_EVENT.PRESS]: [EVENT_NAME.PRESS_IN]
			} as Record<TriggerEvent, readonly EventName[]>

			const triggerEventNames = trigger[triggerEvent]

			if (eventName && triggerEventNames?.includes(eventName)) {
				onVisible?.(eventName === triggerEventNames[0])
			}
		}
	}

export const updateTooltipSupportingClosed =
	(onClosed?: () => void) => (setState: Updater<TooltipSupportingState>) => (value?: boolean) => {
		const nextClosedEvent = () => onClosed?.()

		if (typeof value === 'boolean' && value) {
			setState(draft => {
				if (draft.invert) {
					draft.invert = false
				}

				draft.nextClosedEvent = nextClosedEvent
			})
		}
	}

export const updateTooltipSupportingStatus =
	({setState, windowWidth}: UpdateTooltipSupportingStatusOptions) =>
	(containerLayout?: LayoutRectangle) =>
	(visible?: boolean) =>
		windowWidth &&
		visible &&
		containerLayout &&
		setState(draft => {
			if (draft.status === COMPONENT_STATUS.IDLE) {
				draft.status = COMPONENT_STATUS.LOADING
			}
		})

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

export const updateTooltipSupportingPosition =
	({supportingPosition, setState, type, containerLayout, theme}: UpdateTooltipSupportingPositionOptions) =>
	(ref: React.MutableRefObject<View | undefined>) => {
		const updateTooltipSupportingInvert =
			({height, x, y, width, windowHeight, windowWidth}: UpdateTooltipSupportingInvertOptions) =>
			(draft: WritableDraft<TooltipSupportingState>) => {
				draft.invert =
					supportingPosition?.startsWith('HORIZONTAL') ?
						width + x >= windowWidth && x > width
					:	height + y >= windowHeight && y > height
			}

		return ({windowHeight, visible, windowWidth, layout}: HandleTooltipSupportingPositionWindowOptions) => {
			if (!visible) {
				return
			}

			if (type === TOOLTIP_TYPE.MENU) {
				setState(draft => {
					const {left, top} = getSafeMenuPosition({
						height: layout.height,
						margin: theme.adaptSize(theme.token.spacing.medium),
						offset: theme.adaptSize(theme.token.spacing.small),
						width: layout.width,
						windowHeight,
						windowWidth,
						x: containerLayout?.x,
						y: containerLayout?.y
					})

					draft.menuPosition = {left, top}
				})

				return
			}

			ref?.current?.measureInWindow((x, y, width, height) =>
				setState(
					updateTooltipSupportingInvert({
						height,
						width,
						windowHeight,
						windowWidth,
						x,
						y
					})
				)
			)
		}
	}

export const getTooltipSupportingPosition = (supportingPosition?: SupportingPosition) => (invert?: boolean) => {
	const position = {
		invertY:
			supportingPosition === SUPPORTING_POSITION.VERTICAL_END ?
				SUPPORTING_POSITION.VERTICAL_START
			:	SUPPORTING_POSITION.VERTICAL_END,

		invertX:
			supportingPosition === SUPPORTING_POSITION.HORIZONTAL_END ?
				SUPPORTING_POSITION.HORIZONTAL_START
			:	SUPPORTING_POSITION.HORIZONTAL_END
	}

	const invertPosition = (
		supportingPosition?.startsWith('HORIZONTAL') ?
			position.invertX
		:	position.invertY) as SupportingPosition

	return invert ? invertPosition : supportingPosition
}

export const handleMaskPressOut = (onTooltipVisible?: (value?: boolean) => void) => () => onTooltipVisible?.(false)
export const animateTooltipSupporting =
	({createEntrySharedValueAnimator, type, createExitSharedValueAnimator}: AnimateTooltipSupportingOptions) =>
	({transformSharedValue, heightSharedValue, opacitySharedValue}: AnimateTooltipSupportingSharedValues) =>
	(visible?: boolean) => {
		if (typeof visible !== 'boolean') {
			return
		}

		const sharedValue = type === TOOLTIP_TYPE.MENU ? heightSharedValue : transformSharedValue

		if (typeof visible === 'boolean' && visible) {
			createEntrySharedValueAnimator({sharedValue})(1)
			createEntrySharedValueAnimator({sharedValue: opacitySharedValue})(1)

			return
		}

		createExitSharedValueAnimator({sharedValue})(0)
		createExitSharedValueAnimator({sharedValue: opacitySharedValue})(0)
	}
