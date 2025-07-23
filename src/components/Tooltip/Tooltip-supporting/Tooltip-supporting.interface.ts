import type {RefAttributes} from 'react'
import type {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo, HandleStateEventChangeOptions, InteractionHandlers} from '../../../hooks'
import type {ComponentStatus, ShapeType, TriggerEvent} from '../../Common'
import type {ElevationLevel} from '../../Elevation'
import type {TooltipType} from '../Tooltip.interface'
import type {SUPPORTING_POSITION} from './Tooltip-supporting.enum'

export type SupportingPosition = (typeof SUPPORTING_POSITION)[keyof typeof SUPPORTING_POSITION]
export interface TooltipSupportingProps extends ViewProps, RefAttributes<View>, InteractionHandlers {
	containerLayout?: LayoutRectangle & {pageX: number; pageY: number}
	elevation?: ElevationLevel
	onVisible?: (value?: boolean) => void
	shape?: ShapeType
	supporting?: string | JSX.Element
	supportingPosition?: SupportingPosition
	triggerEvent?: TriggerEvent
	type?: TooltipType
	visible?: boolean
}

export interface RenderTooltipSupportingProps extends TooltipSupportingProps {
	contentAnimatedStyle?: AnimatedStyle<ViewStyle>
	height?: number
	interactionHandlers: InteractionHandlers
	theme: DefaultTheme
	width?: number
}

export type TooltipSupportingBaseProps = TooltipSupportingProps
export interface TooltipSupportingState {
	invert?: boolean
	invertY?: boolean
	layout: LayoutRectangle
	status: ComponentStatus
	visible?: boolean
}

export type HandleTooltipSupportingStateEventChangeOptions = HandleStateEventChangeOptions &
	Pick<TooltipSupportingProps, 'onVisible' | 'triggerEvent'>

export interface UseTooltipSupportingAnimatedOptions extends Pick<RenderTooltipSupportingProps, 'type' | 'visible'> {
	height?: number
	onClose?: (value?: boolean) => void
	status?: ComponentStatus
}

export interface UpdateTooltipSupportingContainerLayoutOptions {
	setState: Updater<TooltipSupportingState>
	windowWidth: number
}

export interface AnimateTooltipSupportingOptions extends UseTooltipSupportingAnimatedOptions {
	createEntrySharedValueAnimator: AnimateSharedValueTo
	createExitSharedValueAnimator: AnimateSharedValueTo
}

export interface AnimateTooltipSupportingSharedValues {
	heightSharedValue: SharedValue<number>
	opacitySharedValue: SharedValue<number>
	transformSharedValue: SharedValue<number>
}

export interface UpdateTooltipSupportingInvertOptions {
	height: number
	pageX: number
	pageY: number
	width: number
	windowHeight: number
	windowWidth: number
}

export interface HandleTooltipSupportingPositionInvertOptions
	extends Pick<TooltipSupportingProps, 'supportingPosition'> {
	setState: Updater<TooltipSupportingState>
}

export interface HandleTooltipSupportingPositionInvertWindowOptions
	extends Pick<UpdateTooltipSupportingInvertOptions, 'width' | 'height'> {
	visible?: boolean
}

export type TooltipSupportingContentProps = Pick<
	RenderTooltipSupportingProps,
	'type' | 'supportingPosition' | 'width' | 'height' | 'containerLayout'
>

export type TooltipSupportingMainProps = Pick<RenderTooltipSupportingProps, 'type' | 'supportingPosition'>
