import type {Size} from '@bearei/material-token'
import type {TextStyle, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {HandleStateEventChangeOptions, InteractionHandler} from '../../hooks'
import type {CommonProps, ComponentStatus, EventName} from '../Common'
import type {ElevationLevel} from '../Elevation'
import type {TouchableProps} from '../Touchable'
import type {FAB_TYPE} from './FAB.enum'

export type FABType = (typeof FAB_TYPE)[keyof typeof FAB_TYPE]
export interface FABProps extends TouchableProps, CommonProps {
	disabled?: boolean
	elevated?: boolean
	extendedFAB?: boolean
	icon?: React.JSX.Element
	labelText?: string
	loading?: boolean
	size?: Size
	type?: FABType
}

export interface RenderFABProps extends FABProps {
	backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
	elevation?: ElevationLevel
	eventName?: EventName
	labelTextAnimatedStyle: AnimatedStyle<TextStyle>
	interactionHandlers: InteractionHandler
}

export interface FABBaseProps extends FABProps {
	renderFAB: (props: RenderFABProps) => React.JSX.Element
}

export interface FABState {
	elevation?: ElevationLevel
	eventName?: EventName
	status: ComponentStatus
}

export type FABContainerProps = Pick<RenderFABProps, 'size' | 'type' | 'extendedFAB' | 'density'>
export type FABContentProps = Pick<RenderFABProps, 'size' | 'type' | 'extendedFAB' | 'density'>
export type FABMainProps = Pick<RenderFABProps, 'size' | 'type' | 'extendedFAB'>
export type HandleFABStateChangeOptions = HandleStateEventChangeOptions & Pick<RenderFABProps, 'elevated'>
export type RenderFABIconOptions = Pick<RenderFABProps, 'size' | 'disabled' | 'type' | 'id'>
export type UseFABAnimatedOptions = Pick<RenderFABProps, 'disabled' | 'type'>
