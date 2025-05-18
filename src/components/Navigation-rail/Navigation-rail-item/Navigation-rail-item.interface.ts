import type {RefAttributes} from 'react'
import type {PressableProps, TextStyle, View, ViewProps} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {DefaultTheme} from 'styled-components/native'
import type {AnimatedTiming, HandleStateEventChangeOptions, InteractionHandlers} from '../../../hooks'
import type {EventName, TypographyProps} from '../../Common'
import type {NavigationRailProps} from '../Navigation-rail.interface'

export interface NavigationRailItemProps
	extends Partial<ViewProps & RefAttributes<View> & PressableProps & InteractionHandlers>,
		Pick<NavigationRailProps, 'activeKey' | 'onActive' | 'type' | 'animatedType'> {
	icon?: React.JSX.Element
	indexKey?: string
	labelText?: string
}

export interface RenderNavigationRailItemProps extends Omit<NavigationRailItemProps, 'indexKey'> {
	active?: boolean
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

export interface HandleNavigationRailItemStateChangeOptions
	extends HandleStateEventChangeOptions,
		Pick<NavigationRailItemProps, 'indexKey' | 'onActive'> {
	ref: React.RefObject<View>
}

export interface UseNavigationRailItemAnimatedOptions extends Pick<RenderNavigationRailItemProps, 'active' | 'type'> {
	defaultActive?: boolean
}

export interface AnimateNavigationRailItemLabelOptions extends UseNavigationRailItemAnimatedOptions {
	animatedTiming: AnimatedTiming
}

export type NavigationRailItemLabelTextProps = Pick<RenderNavigationRailItemProps, 'active'> & TypographyProps
export type NavigationRailItemHeaderProps = Pick<RenderNavigationRailItemProps, 'type'>
export interface NavigationTouchableContentProps {
	enableFocusRing?: boolean
}
