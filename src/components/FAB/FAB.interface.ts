import {Size} from '@bearei/material-token'
import {TextStyle, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {HandleStateEventChangeOptions, StateOnEvent} from '../../hooks'
import {CommonProps, ComponentStatus, EventName} from '../Common'
import {ElevationLevel} from '../Elevation'
import {TouchableProps} from '../Touchable'
import {FABType} from './FAB.enum'

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
        stateOnEvent: StateOnEvent
}

export interface FABBaseProps extends FABProps {
        render: (props: RenderFABProps) => React.JSX.Element
}

export interface FABState {
        elevation?: ElevationLevel
        eventName?: EventName
        status: ComponentStatus
}

export type FABContainerProps = Pick<RenderFABProps, 'size' | 'type' | 'extendedFAB' | 'densityScale'>
export type FABContentProps = Pick<RenderFABProps, 'size' | 'type' | 'extendedFAB' | 'densityScale'>
export type FABMainProps = Pick<RenderFABProps, 'size' | 'type' | 'extendedFAB'>
export type HandleFABStateChangeOptions = HandleStateEventChangeOptions & Pick<RenderFABProps, 'elevated'>
export type RenderFABIconOptions = Pick<RenderFABProps, 'size' | 'disabled' | 'type' | 'eventName' | 'id'>
export type UseFABAnimatedOptions = Pick<RenderFABProps, 'disabled' | 'type'>
