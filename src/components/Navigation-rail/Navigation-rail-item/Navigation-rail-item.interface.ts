import type {RefAttributes} from 'react'
import type {PressableProps, TextStyle, View, ViewProps} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import type {AnimatedTiming, HandleStateEventChangeOptions, InteractionHandlers} from '../../../hooks'
import type {EventName, TypographyProps} from '../../Common'
import type {
	NAVIGATION_DESTINATION_POSITION,
	NAVIGATION_RAIL_ANIMATED,
	NAVIGATION_RAIL_TYPE
} from '../Navigation-rail.enum'
import type {NavigationRailProps} from '../Navigation-rail.interface'

export type NavigationDestinationPosition =
	(typeof NAVIGATION_DESTINATION_POSITION)[keyof typeof NAVIGATION_DESTINATION_POSITION]

export type NavigationRailAnimated = (typeof NAVIGATION_RAIL_ANIMATED)[keyof typeof NAVIGATION_RAIL_ANIMATED]
export type NavigationRailType = (typeof NAVIGATION_RAIL_TYPE)[keyof typeof NAVIGATION_RAIL_TYPE]
export interface NavigationRailItemProps
	extends Partial<ViewProps & RefAttributes<View> & PressableProps & InteractionHandlers>,
		Pick<NavigationRailProps, 'activeKey' | 'onActive' | 'type' | 'animatedType'> {
	icon?: React.JSX.Element
	indexKey: string
	labelText?: string
}

export interface RenderNavigationRailItemProps extends Omit<NavigationRailItemProps, 'indexKey'> {
	active?: boolean
	activeIconElement: React.JSX.Element
	eventName?: EventName
	iconElement: React.JSX.Element
	labelTextAnimatedStyle: AnimatedStyle<TextStyle>
	interactionHandlers: InteractionHandlers
	theme: DefaultTheme
}

export interface NavigationRailItemBaseProps extends NavigationRailItemProps {
	renderNavigationRailItem: (props: RenderNavigationRailItemProps) => React.JSX.Element
}

export interface NavigationRailItemState {
	eventName?: EventName
	nextPressOutEvent?: () => void
}

export interface HandleNavigationRailItemStateEventChangeOptions
	extends HandleStateEventChangeOptions,
		Pick<NavigationRailItemProps, 'indexKey' | 'onActive'> {
	ref: React.RefObject<View>
}

export interface UseNavigationRailItemAnimatedOptions extends Pick<RenderNavigationRailItemProps, 'active' | 'type'> {
	defaultActive?: boolean
}

export interface HandleNavigationRailItemAnimatedTimingOptions extends UseNavigationRailItemAnimatedOptions {
	animatedTiming: AnimatedTiming
}

export type NavigationRailItemLabelTextProps = Pick<RenderNavigationRailItemProps, 'active'> & TypographyProps
export type NavigationRailItemHeaderProps = Pick<RenderNavigationRailItemProps, 'type'>
export interface NavigationRailItemIconProps {
	visible?: boolean
}

export interface NavigationTouchableContentProps {
	enableFocusRing?: boolean
}
