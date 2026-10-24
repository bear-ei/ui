import type {FC, RefAttributes} from 'react'
import type {View, ViewProps} from 'react-native'

import type {PORTAL_TYPE} from './Portal-provider.enum'

export type PortalType = (typeof PORTAL_TYPE)[keyof typeof PORTAL_TYPE]
export interface Portal {
	id: string
	props?: Record<string, unknown>
	type: PortalType
	unmount?: boolean
}

export type EmitterEvent = {
	portal: Portal
}

export interface PortalState {
	portals: Portal[]
}

export interface PortalItemProps extends Pick<ViewProps, 'testID'> {
	componentProps?: ViewProps & RefAttributes<View>
	type?: PortalType
}

export type PortalComponentType = FC<ViewProps & RefAttributes<View>>
