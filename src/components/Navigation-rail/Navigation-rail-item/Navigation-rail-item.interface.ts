import type {RefAttributes} from 'react'
import type {TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import type {AnimateSharedValueTo, HandleStateEventChangeOptions, InteractionHandlers} from '../../../hooks'
import type {ComponentStatus, EventName, TypographyProps} from '../../Common'
import type {PressableType, TouchableProps} from '../../Touchable'
import type {NavigationRailProps} from '../Navigation-rail.interface'

export interface NavigationRailItemProps
	extends TouchableProps,
		Pick<NavigationRailProps, 'activeKey' | 'onActive' | 'type' | 'animatedType'> {
	icon?: React.JSX.Element
	indexKey?: string
	labelText?: string
}

export interface RenderNavigationRailItemProps extends Omit<NavigationRailItemProps, 'indexKey'> {
	active?: boolean
	contentAnimatedStyle: AnimatedStyle<ViewStyle>
	eventName?: EventName
	iconElement?: React.JSX.Element
	interactionHandlers: InteractionHandlers
	labelTextAnimatedStyle: AnimatedStyle<TextStyle>
}

export type NavigationRailItemBaseProps = NavigationRailItemProps
export interface NavigationRailItemState {
	eventName?: EventName
	nextPressOutEvent?: () => void
	status: ComponentStatus
}

export interface HandleNavigationRailItemStateChangeOptions
	extends HandleStateEventChangeOptions,
		Pick<NavigationRailItemProps, 'indexKey' | 'onActive'> {
	ref: React.RefObject<PressableType>
}

export interface UseNavigationRailItemAnimatedOptions extends Pick<RenderNavigationRailItemProps, 'active' | 'type'> {
	defaultActive?: boolean
	status?: ComponentStatus
}

export interface AnimateNavigationRailItemOptions extends UseNavigationRailItemAnimatedOptions {
	animateSharedValueTo: AnimateSharedValueTo
}

export interface AnimateNavigationRailItemSharedValues {
	contentTranslateYSharedValue: SharedValue<number>
	labelTextSharedValue: SharedValue<number>
}

export type NavigationRailItemHeaderProps = Pick<RenderNavigationRailItemProps, 'type'>
export type NavigationRailItemLabelTextProps = Pick<RenderNavigationRailItemProps, 'active'> & TypographyProps
export type NavigationRailItemTouchableProps = RefAttributes<PressableType>
