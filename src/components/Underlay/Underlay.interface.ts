import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, EventName, InteractionState} from '../../constants'
import type {InteractionHandlers} from '../../hooks'
import type {RadiusType, ThemeableProps} from '../../theme'
import type {ACTIVE_ANIMATION} from './Underlay.enum'

export type ActiveAnimationType = (typeof ACTIVE_ANIMATION)[keyof typeof ACTIVE_ANIMATION]
export interface UnderlayProps extends ViewProps, RefAttributes<View>, ThemeableProps {
	active?: boolean
	activeAnimation?: ActiveAnimationType
	activeColor?: string
	activeRadius?: RadiusType
	/**
	 * Scale factors for the active layer, keyed by `activeAnimation`:
	 *   - `scale`  → used by ACTIVE_ANIMATION.SCALE (uniform)
	 *   - `scaleX` → used by ACTIVE_ANIMATION.SCALE_X
	 *   - `scaleY` → used by ACTIVE_ANIMATION.SCALE_Y
	 *
	 * Defaults to 1.2 — not an M3 spec, but intentional: the active layer's
	 * shape may differ from its container's, so it needs to scale slightly
	 * beyond the container bounds to cover it visually.
	 */
	activeScale?: {scale?: number; scaleX?: number; scaleY?: number}
	defaultActive?: boolean
	interactionEventName?: EventName
	opacities?: [number, number, number] | [number, number]
	underlayColor?: string
}

export interface RenderUnderlayProps extends UnderlayProps {
	activeLayerAnimatedStyle: AnimatedStyle<ViewStyle>
	hoverLayerAnimatedStyle: AnimatedStyle<ViewStyle>
	interactionHandlers: InteractionHandlers
}

export type UnderlayBaseProps = UnderlayProps
export interface UnderlayState {
	active?: boolean
	interactionEventName: EventName
	interactionState?: InteractionState
	status: ComponentStatus
}

export interface UseUnderlayAnimatedOptions extends Pick<
	RenderUnderlayProps,
	'active' | 'activeAnimation' | 'activeScale' | 'interactionEventName' | 'opacities'
> {
	status: ComponentStatus
}
