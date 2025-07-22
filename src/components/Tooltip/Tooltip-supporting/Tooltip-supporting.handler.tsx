import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent, View} from 'react-native'
import type {Updater} from 'use-immer'
import type {StateEvent} from '../../../hooks'
import {COMPONENT_STATUS, EVENT_NAME} from '../../Common'
import {TOOLTIP_TYPE} from '../Tooltip.enum'
import {SUPPORTING_POSITION} from './Tooltip-supporting.enum'
import type {
	AnimateTooltipSupportingOptions,
	AnimateTooltipSupportingSharedValues,
	HandleTooltipSupportingPositionInvertOptions,
	HandleTooltipSupportingPositionInvertWindowOptions,
	HandleTooltipSupportingStateEventChangeOptions,
	SupportingPosition,
	TooltipSupportingState,
	UpdateTooltipSupportingContainerLayoutOptions,
	UpdateTooltipSupportingInvertOptions
} from './Tooltip-supporting.interface'

export const handleTooltipSupportingStateChange =
	({eventName, onVisible}: HandleTooltipSupportingStateEventChangeOptions) =>
	(setState: Updater<TooltipSupportingState>) => {
		const updateTooltipSupportingLayout = (event: LayoutChangeEvent) => {
			const {height, width} = event.nativeEvent.layout

			setState(draft => {
				const {width: prevWidth, height: prevHeight} = draft.layout

				if (prevWidth !== width || prevHeight !== height) {
					draft.layout.height = height
					draft.layout.width = width
				}
			})
		}

		return (event: StateEvent) => {
			if (eventName === EVENT_NAME.LAYOUT) {
				updateTooltipSupportingLayout(event as LayoutChangeEvent)
			}

			const triggerEventNames = ['hoverIn', 'hoverOut']

			if (eventName && triggerEventNames?.includes(eventName)) {
				onVisible?.(eventName === triggerEventNames[0])
			}
		}
	}

export const updateTooltipSupportingClosed = (setState: Updater<TooltipSupportingState>) => (value?: boolean) =>
	typeof value === 'boolean' &&
	value &&
	setState(draft => {
		draft.closed = value
	})

export const updateTooltipSupportingContainerLayout = ({
	setState,
	windowWidth
}: UpdateTooltipSupportingContainerLayoutOptions) => {
	const updateTooltipSupportingLayout = (containerCurrent?: View | null) =>
		containerCurrent?.measure((x, y, width, height, pageX, pageY) =>
			setState(draft => {
				draft.closed = false
				draft.containerLayout.height = height
				draft.containerLayout.pageX = pageX
				draft.containerLayout.pageY = pageY
				draft.containerLayout.width = width
				draft.containerLayout.x = x
				draft.containerLayout.y = y
				draft.status = COMPONENT_STATUS.SUCCEEDED
			})
		)

	return (containerCurrent?: View | null) => (visible?: boolean) =>
		windowWidth && visible && updateTooltipSupportingLayout(containerCurrent)
}

// TODO: Add more directional support.
export const handleTooltipSupportingPositionInvert =
	({supportingPosition, setState}: HandleTooltipSupportingPositionInvertOptions) =>
	(ref: React.MutableRefObject<View | undefined>) => {
		const updateTooltipSupportingInvert =
			({
				height,
				pageX,
				pageY,
				width,
				windowHeight,
				windowWidth
			}: UpdateTooltipSupportingInvertOptions) =>
			(draft: WritableDraft<TooltipSupportingState>) => {
				draft.invert =
					supportingPosition?.startsWith('HORIZONTAL') ?
						width + pageX >= windowWidth && pageX > width
					:	height + pageY >= windowHeight && pageY > height
			}

		return ({
			height: windowHeight,
			width: windowWidth
		}: HandleTooltipSupportingPositionInvertWindowOptions) =>
			ref?.current?.measure((_x, _y, width, height, pageX, pageY) =>
				setState(
					updateTooltipSupportingInvert({
						height,
						pageX,
						pageY,
						width,
						windowHeight,
						windowWidth
					})
				)
			)
	}

export const updateTooltipSupportingPosition = (supportingPosition?: SupportingPosition) => (invert?: boolean) => {
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

export const animateTooltipSupporting =
	({animateSharedValueTo, type, animateSharedValueToWithCallback}: AnimateTooltipSupportingOptions) =>
	({transformSharedValue, heightSharedValue, opacitySharedValue}: AnimateTooltipSupportingSharedValues) =>
	(visible?: boolean) => {
		const toValue = visible ? 1 : 0

		if (typeof visible !== 'boolean') {
			return
		}

		animateSharedValueTo({
			sharedValue: type === TOOLTIP_TYPE.MENU ? heightSharedValue : transformSharedValue
		})(toValue)

		animateSharedValueToWithCallback({sharedValue: opacitySharedValue})(toValue)
	}
