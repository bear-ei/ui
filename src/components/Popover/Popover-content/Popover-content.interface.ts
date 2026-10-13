import type {LayoutRectangle, ViewProps} from 'react-native'
import type {Updater} from 'use-immer'
import type {PopoverProps} from '..'
import type {HandleStateEventChangeOptions, InteractionHandlers, UseHandleStateEventOptions} from '../../../hooks'
import type {Token} from '../../../theme'

export interface PopoverContentProps
	extends
		ViewProps,
		UseHandleStateEventOptions,
		Pick<
			PopoverProps,
			| 'content'
			| 'elevation'
			| 'onAnimationFinished'
			| 'onVisible'
			| 'popoverContentPosition'
			| 'radius'
			| 'shape'
			| 'triggerEvent'
			| 'type'
			| 'visible'
		> {
	containerLayout?: LayoutRectangle
	onElevationAnimationFinished?: (visible?: boolean) => void
}

export interface RenderPopoverContentProps extends PopoverContentProps {
	height?: number
	interactionHandlers: InteractionHandlers
	menuPosition: {top?: number; left?: number}
	onMaskPressOut?: () => void
	width?: number
	windowHeight?: number
	windowWidth?: number
}

export type PopoverContentBaseProps = PopoverContentProps
export interface PopoverContentState {
	invert?: boolean
	layout: Partial<LayoutRectangle>
	menuPosition: {top?: number; left?: number}
	nextAnimationFinishedEvent?: () => void
}

export type HandlePopoverContentStateEventChangeOptions = HandleStateEventChangeOptions &
	Pick<PopoverContentProps, 'onVisible' | 'triggerEvent'>

export interface UpdatePopoverContentInvertOptions {
	height: number
	width: number
	windowHeight: number
	windowWidth: number
	x: number
	y: number
}

export interface UpdatePopoverContentPositionOptions extends Pick<
	PopoverContentProps,
	'popoverContentPosition' | 'type' | 'containerLayout'
> {
	setState: Updater<PopoverContentState>
	token: Token
}

export interface HandlePopoverContentPositionWindowOptions extends Pick<PopoverContentState, 'layout'> {
	visible?: boolean
	windowHeight: number
	windowWidth: number
}

export interface GetSafeMenuPositionOptions {
	height: number
	margin?: number
	offset?: number
	width: number
	windowHeight?: number
	windowWidth?: number
	x?: number
	y?: number
}
