import {RefObject} from 'react'
import {View, ViewStyle} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {EventName} from '../Common'
import {TouchableProps} from '../Touchable'

export type IconButtonType = 'filled' | 'outlined' | 'standard' | 'tonal' | 'active'
export interface IconButtonProps extends TouchableProps {
        active?: boolean
        defaultActive?: boolean
        fill?: string
        height?: number
        icon?: JSX.Element
        loading?: boolean
        type?: IconButtonType
        width?: number
}

export interface RenderIconButtonProps extends IconButtonProps {
        activeColor?: string
        contentUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
        eventName?: EventName
        onStateEvent: OnStateEvent
}

export interface IconButtonBaseProps extends IconButtonProps {
        render: (props: RenderIconButtonProps) => JSX.Element
}

export interface IconButtonState {
        eventName?: EventName
        nextPressInEvent?: () => void
}

export interface RenderIconButtonIconOptions extends Pick<RenderIconButtonProps, 'disabled' | 'type' | 'fill'> {
        eventName?: EventName
}

export interface HandleIconButtonStateChangeOptions extends OnStateEventChangeOptions {
        touchableRef: RefObject<View>
}

export type UseIconButtonAnimatedOptions = Pick<RenderIconButtonProps, 'disabled' | 'type'>
export interface HandleIconButtonAnimatedTimingOptions extends Pick<UseIconButtonAnimatedOptions, 'type'> {
        animatedTiming: AnimatedTiming
}

export interface HandleIconButtonAnimatedTimingSharedValue {
        borderSharedValue: SharedValue<AnimatableValue>
        colorSharedValue: SharedValue<AnimatableValue>
}

export type IconButtonContentProps = Pick<IconButtonProps, 'width' | 'height'>
