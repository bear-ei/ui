import {TextStyle, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import {ComponentStatus, EventName, Size} from '../Common'
import {ElevationLevel} from '../Elevation'
import {TouchableProps} from '../Touchable'

export type FABType = 'surface' | 'primary' | 'secondary' | 'tertiary'
export interface FABProps extends TouchableProps {
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
        stateEvent: StateEvent
}

export interface FABBaseProps extends FABProps {
        render: (props: RenderFABProps) => React.JSX.Element
}

export interface FABState {
        elevation?: ElevationLevel
        eventName?: EventName
        status: ComponentStatus
}

export type FABContainerProps = Pick<RenderFABProps, 'size' | 'type' | 'extendedFAB'>
export type FABContentProps = Pick<RenderFABProps, 'size' | 'type' | 'extendedFAB'>
export type FABMainProps = Pick<RenderFABProps, 'size' | 'type' | 'extendedFAB'>
export type HandleFABStateChangeOptions = HandleStateEventChangeOptions & Pick<RenderFABProps, 'elevated'>
export type RenderFABIconOptions = Pick<RenderFABProps, 'size' | 'disabled' | 'type' | 'eventName' | 'id'>
export type UseFABAnimatedOptions = Pick<RenderFABProps, 'disabled' | 'type'>
