import type {RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'

import type {NavigationRailItemProps} from './Navigation-rail-item'
import type {
	NAVIGATION_DESTINATION_POSITION,
	NAVIGATION_RAIL_ANIMATION,
	NAVIGATION_RAIL_TYPE
} from './Navigation-rail.enum'

export type NavigationRailAnimationType = (typeof NAVIGATION_RAIL_ANIMATION)[keyof typeof NAVIGATION_RAIL_ANIMATION]
export type NavigationRailType = (typeof NAVIGATION_RAIL_TYPE)[keyof typeof NAVIGATION_RAIL_TYPE]
export type NavigationDestinationPosition =
	(typeof NAVIGATION_DESTINATION_POSITION)[keyof typeof NAVIGATION_DESTINATION_POSITION]

export interface NavigationRailDestination extends Pick<NavigationRailItemProps, 'icon' | 'labelText'> {
	itemKey: string
}

export interface RenderNavigationRailItemsProps extends Omit<NavigationRailItemProps, 'itemKey'> {
	data?: NavigationRailDestination[]
}

export interface NavigationRailProps extends ViewProps, RefAttributes<View> {
	activeKey?: string
	// TODO: Add progress type COLLAPSE
	animation?: NavigationRailAnimationType
	data?: NavigationRailDestination[]
	defaultActiveKey?: string
	destinationPosition?: NavigationDestinationPosition
	fab?: React.JSX.Element
	menu?: React.JSX.Element
	onActiveKeyChange?: (activeKey?: string) => void
	type?: NavigationRailType
}

export interface RenderNavigationRailProps extends NavigationRailProps {
	fabElement?: React.JSX.Element
	itemElements?: React.JSX.Element
	menuElement?: React.JSX.Element
}

export type NavigationRailBaseProps = NavigationRailProps
export interface NavigationRailState {
	activeKey?: string
	data?: NavigationRailDestination[]
	pendingActiveEvent?: string
}

export interface UpdateNavigationRailActiveKeyOptions extends Pick<NavigationRailProps, 'onActiveKeyChange'> {
	notify?: boolean
}
