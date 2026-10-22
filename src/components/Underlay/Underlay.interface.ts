import type {RefAttributes} from 'react'
import type {View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, EventName, State} from '../../constants'
import type {InteractionHandlers} from '../../hooks'
import type {RadiusType, ThemeProps} from '../../theme'
import type {ACTIVE_ANIMATED} from './Underlay.enum'

export type ActiveAnimatedType = (typeof ACTIVE_ANIMATED)[keyof typeof ACTIVE_ANIMATED]
export interface UnderlayProps extends ViewProps, RefAttributes<View>, ThemeProps {
	active?: boolean
	activeAnimatedType?: ActiveAnimatedType
	activeColor?: string
	activeRadius?: RadiusType
	/**
	 * Scale factors for the active layer, keyed by `activeAnimatedType`:
	 *   - `scale`  → used by ACTIVE_ANIMATED.SCALE (uniform)
	 *   - `scaleX` → used by ACTIVE_ANIMATED.SCALE_X
	 *   - `scaleY` → used by ACTIVE_ANIMATED.SCALE_Y
	 *
	 * Defaults to 1.2 — not an M3 spec, but intentional: the active layer's
	 * shape may differ from its container's, so it needs to scale slightly
	 * beyond the container bounds to cover it visually.
	 */
	activeScale?: {scale?: number; scaleX?: number; scaleY?: number}
	defaultActive?: boolean
	eventName?: EventName
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
	eventName: EventName
	state?: State
	status: ComponentStatus
}

export interface UseUnderlayAnimatedOptions extends Pick<
	RenderUnderlayProps,
	'active' | 'activeAnimatedType' | 'activeScale' | 'eventName' | 'opacities'
> {
	status: ComponentStatus
}
