import type {FC, RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'

import type {PORTAL_TYPE} from './Portal-provider.enum'

export type PortalType = (typeof PORTAL_TYPE)[keyof typeof PORTAL_TYPE]
export interface PortalEntry {
	id: string
	props?: Record<string, unknown>
	shouldUnmount?: boolean
	type: PortalType
}

export type PortalEventMap = {
	portal: PortalEntry
}

export interface PortalState {
	portals: PortalEntry[]
}

export interface PortalItemProps extends Pick<ViewProps, 'testID'> {
	componentProps?: ViewProps & RefAttributes<View>
	type?: PortalType
}

export type PortalComponentType = FC<ViewProps & RefAttributes<View>>
