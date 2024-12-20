import {RefAttributes} from 'react'
import {LayoutRectangle, NativeTouchEvent, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming} from '../../../hooks'

export interface TouchableRippleProps extends ViewProps, RefAttributes<View> {
        centered?: boolean
        containerLayout?: LayoutRectangle
        index: string
        onAnimatedFinished?: (value: string) => void
        touchableLocation?: Pick<NativeTouchEvent, 'locationX' | 'locationY'>
        underlayColor?: string
}

export interface RenderTouchableRippleProps extends Omit<TouchableRippleProps, 'index'> {
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
        height: number
        locationX: number
        locationY: number
        width: number
}

export interface TouchableRippleBaseProps extends TouchableRippleProps {
        render: (props: RenderTouchableRippleProps) => JSX.Element
}

export interface UseTouchableRippleAnimatedOptions
        extends Pick<RenderTouchableRippleProps, 'onAnimatedFinished' | 'containerLayout'> {
        index: string
        radius: number
}

export interface HandleTouchableRippleAnimatedTimingSharedValue {
        scaleSharedValue: SharedValue<number>
        opacitySharedValue: SharedValue<number>
}

export interface HandleTouchableRippleAnimatedTimingOptions
        extends Pick<RenderTouchableRippleProps, 'onAnimatedFinished' | 'containerLayout'> {
        animatedTiming: AnimatedTiming
}

export interface TouchableRippleContainerProps extends Pick<RenderTouchableRippleProps, 'underlayColor'> {
        height?: number
        locationX?: number
        locationY?: number
        width?: number
}
