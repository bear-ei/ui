import type {RefAttributes} from 'react'
import type {LayoutRectangle, ViewProps} from 'react-native'
import type {View} from 'react-native'
import type {Updater} from 'use-immer'

import type {PopoverProps} from '..'
import type {
	HandleInteractionStateChangeOptions,
	InteractionHandlers,
	UseInteractionStateEventOptions
} from '../../../hooks'
import type {Token} from '../../../theme'

export interface PopoverContentProps
	extends
		ViewProps,
		UseInteractionStateEventOptions,
		RefAttributes<View>,
		Pick<
			PopoverProps,
			| 'content'
			| 'elevation'
			| 'onAnimationFinished'
			| 'onVisibleChange'
			| 'contentPosition'
			| 'radius'
			| 'shape'
			| 'triggerOn'
			| 'type'
			| 'visible'
		> {
	containerLayout?: LayoutRectangle
	onElevationAnimationFinished?: (visible?: boolean) => void
}

export interface RenderPopoverContentProps extends PopoverContentProps {
	height?: number
	interactionHandlers: InteractionHandlers
	isMenuOrPicker?: boolean
	menuPosition: {left?: number; top?: number}
	onMaskPressOut?: () => void
	width?: number
	windowHeight?: number
	windowWidth?: number
}

export type PopoverContentBaseProps = PopoverContentProps
export interface PopoverContentState {
	inverted?: boolean
	layout: Partial<LayoutRectangle>
	menuPosition: {left?: number; top?: number}
	pendingAnimationFinishedEvent?: boolean
}

export type HandlePopoverContentInteractionStateChangeOptions = HandleInteractionStateChangeOptions &
	Pick<PopoverContentProps, 'onVisibleChange' | 'triggerOn'>

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
	'contentPosition' | 'type' | 'containerLayout'
> {
	setState: Updater<PopoverContentState>
	token: Token
}

export interface HandlePopoverContentPositionWindowOptions extends Pick<PopoverContentState, 'layout'> {
	isCancelled?: () => boolean
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
