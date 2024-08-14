import {ViewStyle} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming, OnStateEvent, OnStateEventChangeOptions} from '../../hooks'
import {EventName} from '../Common'
import {TouchableProps} from '../Touchable'

export type IconButtonType = 'filled' | 'outlined' | 'standard' | 'tonal' | 'active'
export interface IconButtonProps extends TouchableProps {
    active?: boolean
    defaultActive?: boolean
    densityScale?: number
    fill?: string
    icon?: React.JSX.Element
    type?: IconButtonType
}

export interface RenderIconButtonProps extends IconButtonProps {
    activeColor?: string
    contentUnderlayAnimatedStyle: AnimatedStyle<ViewStyle>
    eventName?: EventName
    onStateEvent: OnStateEvent
}

export interface IconButtonBaseProps extends IconButtonProps {
    render: (props: RenderIconButtonProps) => React.JSX.Element
}

export interface InitialIconButtonState {
    eventName?: EventName
}

export interface RenderIconButtonIconOptions extends Pick<RenderIconButtonProps, 'disabled' | 'type' | 'fill'> {
    eventName?: EventName
}

export type HandleIconButtonStateChangeOptions = OnStateEventChangeOptions
export type UseIconButtonAnimatedOptions = Pick<RenderIconButtonProps, 'disabled' | 'type'>
export interface HandleIconButtonAnimatedTimingOptions extends Pick<UseIconButtonAnimatedOptions, 'type'> {
    animatedTiming: AnimatedTiming
}

export interface HandleIconButtonAnimatedTimingSharedValue {
    borderSharedValue: SharedValue<AnimatableValue>
    colorSharedValue: SharedValue<AnimatableValue>
}

export type IconButtonContainerProps = Pick<RenderIconButtonProps, 'densityScale'>
export type IconButtonContentProps = Pick<RenderIconButtonProps, 'densityScale'>
