import type {TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'

import type {ComponentStatus, EventName} from '../../../constants'
import type {HandleInteractionStateChangeOptions, InteractionHandlers} from '../../../hooks'
import type {PressableType, TouchableProps} from '../../Touchable'
import type {NavigationRailProps} from '../Navigation-rail.interface'

export interface NavigationRailItemProps
	extends TouchableProps, Pick<NavigationRailProps, 'activeKey' | 'onActiveKeyChange' | 'type' | 'animation'> {
	dependencies?: unknown[]
	icon?: React.JSX.Element
	itemKey?: string
	labelText?: string
}

export interface RenderNavigationRailItemProps extends Omit<NavigationRailItemProps, 'itemKey'> {
	active?: boolean
	contentAnimatedStyle: AnimatedStyle<ViewStyle>
	eventName: EventName
	iconElement?: React.JSX.Element
	interactionHandlers: InteractionHandlers
	labelTextAnimatedStyle: AnimatedStyle<TextStyle>
}

export type NavigationRailItemBaseProps = NavigationRailItemProps
export interface NavigationRailItemState {
	eventName: EventName
	pendingPressOutEvent?: string
	status: ComponentStatus
}

export interface HandleNavigationRailItemInteractionStateChangeOptions
	extends HandleInteractionStateChangeOptions, Pick<NavigationRailItemProps, 'itemKey' | 'onActiveKeyChange'> {
	ref: React.RefObject<PressableType | null>
}

export interface UseNavigationRailItemAnimatedOptions extends Pick<RenderNavigationRailItemProps, 'active' | 'type'> {
	status?: ComponentStatus
}

export type AnimateNavigationRailItemOptions = UseNavigationRailItemAnimatedOptions
