import {ViewStyle} from 'react-native'
import {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
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
        backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
        eventName?: EventName
        onStateEvent: OnStateEvent
        theme: DefaultTheme
}

export interface IconButtonBaseProps extends IconButtonProps {
        render: (props: RenderIconButtonProps) => JSX.Element
}

export interface IconButtonState {
        eventName?: EventName
}

export interface HandleIconButtonIconOptions
        extends Pick<RenderIconButtonProps, 'disabled' | 'type' | 'fill' | 'loading'> {
        eventName?: EventName
}

export type HandleIconButtonStateChangeOptions = OnStateEventChangeOptions
export type UseIconButtonAnimatedOptions = Pick<RenderIconButtonProps, 'disabled' | 'type'>
export interface HandleIconButtonAnimatedTimingOptions extends Pick<UseIconButtonAnimatedOptions, 'type'> {
        animatedTiming: AnimatedTiming
}

export interface HandleIconButtonAnimatedTimingSharedValue {
        borderSharedValue: SharedValue<number>
        colorSharedValue: SharedValue<number>
}

export type IconButtonContentProps = Pick<IconButtonProps, 'width' | 'height'>
