import {RefAttributes} from 'react'
import {LayoutRectangle, NativeTouchEvent, PressableProps, View, ViewProps, ViewStyle} from 'react-native'
import {Updater} from 'use-immer'
import {HandleStateEventChangeOptions, StateOnEvent} from '../../hooks'
import {ShapeProps} from '../Common'
import {TouchableRippleProps} from './Touchable-ripple'

export interface TouchableProps
        extends Omit<
                PressableProps & Pick<ShapeProps, 'shape'> & RefAttributes<View> & ViewProps & StateOnEvent,
                'children' | 'disabled' | 'hitSlop'
        > {
        backgroundUnderlay?: React.JSX.Element
        centered?: boolean
        children?: React.JSX.Element
        disabled?: boolean
        elevationUnderlay?: React.JSX.Element
        /**
         * enableFocusRing is used to disable the focus style in macOS,
         * this parameter has been implemented and is available.
         * However, react-native-macos does not have an official typescript declaration for this parameter,
         * so using it directly in a typescript will result in an undefined parameter.
         */
        enableFocusRing?: boolean
        enableTouchableRipple?: boolean
        hotZone?: boolean
        mainAlignSelf?: ViewStyle['alignSelf']
        underlayColor?: string
}

export interface RenderTouchableProps extends TouchableProps {
        stateOnEvent: StateOnEvent
        rippleElements?: React.JSX.Element[]
}

export interface TouchableBaseProps extends TouchableProps {
        render: (props: RenderTouchableProps) => React.JSX.Element
}

export type TouchableRipple = TouchableRippleProps['touchableLocation']
export type TouchableRippleSequence = Record<string, TouchableRipple>
export interface TouchableState {
        contentLayout: LayoutRectangle
        rippleSequence: TouchableRippleSequence
}

export type RenderTouchableRippleOptions = Omit<TouchableRippleProps, 'indexKey'>
export interface HandleTouchableStateChangeOptions
        extends Pick<TouchableRippleProps, 'touchableLocation'>,
                HandleStateEventChangeOptions,
                Pick<TouchableProps, 'enableTouchableRipple'> {
        ref: React.RefObject<View>
}

export type TouchableContentProps = Pick<RenderTouchableProps, 'hotZone' | 'enableFocusRing'>
export interface TouchableMainProps {
        alignSelf?: ViewStyle['alignSelf']
}

export interface HandleTouchablePressInOptions extends Pick<HandleTouchableStateChangeOptions, 'ref'> {
        setState: Updater<TouchableState>
}

export interface HandleAddTouchableRippleOptions extends Pick<TouchableState, 'contentLayout'> {
        touchableLocation?: Pick<NativeTouchEvent, 'locationX' | 'locationY'>
}
