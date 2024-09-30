import {RefAttributes} from 'react'
import {LayoutRectangle, PressableProps, View, ViewProps} from 'react-native'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hook'
import {ShapeProps} from '../Common'
import {TouchableRippleProps} from './Touchable-ripple'

export interface TouchableProps
    extends Omit<
        PressableProps &
            Pick<TouchableRippleProps, 'underlayColor' | 'centered'> &
            Pick<ShapeProps, 'shape'> &
            RefAttributes<View> &
            ViewProps &
            OnStateEvent,
        'children' | 'disabled' | 'hitSlop'
    > {
    backgroundUnderlay?: JSX.Element
    children?: JSX.Element
    disabled?: boolean
    elevationUnderlay?: JSX.Element
    enableFocusRing?: boolean
    enableTouchableRipple?: boolean
    horizontalStretch?: boolean
    hotZone?: boolean
}

export interface RenderTouchableProps extends TouchableProps {
    onStateEvent: OnStateEvent
    rippleElements?: JSX.Element[]
}

export interface TouchableBaseProps extends TouchableProps {
    render: (props: RenderTouchableProps) => JSX.Element
}

export type TouchableRipple = Pick<TouchableRippleProps, 'touchableLocation'>
export type TouchableRippleSequence = Record<string, TouchableRipple>
export interface TouchableState {
    contentLayout: LayoutRectangle
    rippleSequence: TouchableRippleSequence
}

export type RenderTouchableRipplesOptions = Omit<TouchableRippleProps, 'index'>
export type HandleTouchableStateChangeOptions = Pick<TouchableRippleProps, 'touchableLocation'> &
    OnStateEventChangeOptions &
    Pick<TouchableProps, 'enableTouchableRipple'>

export type MainProps = Pick<RenderTouchableProps, 'horizontalStretch'>
export type ContentProps = Pick<RenderTouchableProps, 'hotZone'>
