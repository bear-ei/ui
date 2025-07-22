import type {RefAttributes} from 'react'
import type {LayoutRectangle, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo, HandleStateEventChangeOptions, InteractionHandlers} from '../../../hooks'
import type {ComponentStatus, ShapeType} from '../../Common'
import type {ElevationLevel} from '../../Elevation'
import type {TooltipType} from '../Tooltip.interface'
import type {SUPPORTING_POSITION} from './Tooltip-supporting.enum'

export type SupportingPosition = (typeof SUPPORTING_POSITION)[keyof typeof SUPPORTING_POSITION]
export interface TooltipSupportingProps extends ViewProps, RefAttributes<View> {
	containerCurrent?: View | null
	elevation?: ElevationLevel
	onVisible?: (value?: boolean) => void
	shape?: ShapeType
	supporting?: string | JSX.Element
	supportingPosition?: SupportingPosition
	type?: TooltipType
	visible?: boolean
}

export interface RenderTooltipSupportingProps extends Omit<TooltipSupportingProps, 'containerCurrent'> {
	closed?: boolean
	containerLayout: LayoutRectangle & {pageX: number; pageY: number}
	contentAnimatedStyle?: AnimatedStyle<ViewStyle>
	height?: number
	interactionHandlers: InteractionHandlers
	theme: DefaultTheme
	width?: number
}

export type TooltipSupportingBaseProps = TooltipSupportingProps
export interface TooltipSupportingState {
	closed?: boolean
	containerLayout: LayoutRectangle & {pageX: number; pageY: number}
	invert?: boolean
	invertY?: boolean
	layout: LayoutRectangle
	status: ComponentStatus
	visible?: boolean
}

export type HandleTooltipSupportingStateEventChangeOptions = HandleStateEventChangeOptions &
	Pick<TooltipSupportingProps, 'onVisible'>

export interface UseTooltipSupportingAnimatedOptions extends Pick<RenderTooltipSupportingProps, 'visible' | 'type'> {
	height?: number
	onClose?: (value?: boolean) => void
}

export interface UpdateTooltipSupportingContainerLayoutOptions {
	setState: Updater<TooltipSupportingState>
	windowWidth: number
}

export interface AnimateTooltipSupportingOptions extends UseTooltipSupportingAnimatedOptions {
	animateSharedValueTo: AnimateSharedValueTo
	animateSharedValueToWithCallback: AnimateSharedValueTo
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

export type HandleTooltipSupportingPositionInvertWindowOptions = Pick<
	UpdateTooltipSupportingInvertOptions,
	'width' | 'height'
>

export interface TooltipSupportingContainerProps {
	closed?: boolean
}

export interface TooltipSupportingContentProps
	extends Pick<RenderTooltipSupportingProps, 'type' | 'supportingPosition' | 'width' | 'height'> {
	closed?: boolean
	containerHeight?: number
	containerPageX?: number
	containerPageY?: number
	containerWidth?: number
}

export type TooltipSupportingMainProps = Pick<RenderTooltipSupportingProps, 'type' | 'supportingPosition'>
