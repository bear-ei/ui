import {RefAttributes} from 'react'
import {LayoutRectangle, PressableProps, View, ViewProps, ViewStyle} from 'react-native'
import {Updater} from 'use-immer'
import {OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
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
export interface HandleTouchableStateChangeOptions
        extends Pick<TouchableRippleProps, 'touchableLocation'>,
                OnStateEventChangeOptions,
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
