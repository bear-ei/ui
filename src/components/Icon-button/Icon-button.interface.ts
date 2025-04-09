import {ViewStyle} from 'react-native'
import {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {AnimatedTiming, HandleStateEventChangeOptions, StateOnEvent} from '../../hooks'
import {CommonProps, EventName} from '../Common'
import {TouchableProps} from '../Touchable'
import {IconButtonType} from './Icon-button.enum'

export interface IconButtonProps extends TouchableProps, CommonProps {
        active?: boolean
        defaultActive?: boolean
        fill?: string
        icon?: React.JSX.Element
        loading?: boolean
        size?: number
        type?: IconButtonType
}

export interface RenderIconButtonProps extends IconButtonProps {
        backgroundUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
        eventName?: EventName
        stateOnEvent: StateOnEvent
        theme: DefaultTheme
}

export interface IconButtonBaseProps extends IconButtonProps {
        render: (props: RenderIconButtonProps) => React.JSX.Element
}

export interface IconButtonState {
        eventName?: EventName
}

export interface RenderIconButtonIconOptions
        extends Pick<RenderIconButtonProps, 'disabled' | 'type' | 'fill' | 'loading' | 'id'> {
        eventName?: EventName
}

export type HandleIconButtonStateChangeOptions = HandleStateEventChangeOptions
export type UseIconButtonAnimatedOptions = Pick<RenderIconButtonProps, 'disabled' | 'type'>
export interface HandleIconButtonAnimatedTimingOptions extends Pick<UseIconButtonAnimatedOptions, 'type'> {
        animatedTiming: AnimatedTiming
}

export interface HandleIconButtonAnimatedTimingSharedValue {
        borderSharedValue: SharedValue<number>
        colorSharedValue: SharedValue<number>
}

export type IconButtonContentProps = Pick<IconButtonProps, 'size' | 'density'>
