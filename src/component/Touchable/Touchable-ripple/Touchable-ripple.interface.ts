import {LayoutRectangle, NativeTouchEvent, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatableValue, AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming} from '../../../hook'

export interface TouchableRippleProps extends ViewProps, React.RefAttributes<View> {
    centered?: boolean
    containerLayout?: LayoutRectangle
    index: string
    onAnimatedFinished?: (value: string) => void
    touchableLocation?: Pick<NativeTouchEvent, 'locationX' | 'locationY'>
    underlayColor?: string
}

export interface RenderTouchableRippleProps extends Omit<TouchableRippleProps, 'index'> {
    animatedStyle: AnimatedStyle<ViewStyle>
    height: number
    locationX: number
    locationY: number
    width: number
}

export interface TouchableRippleBaseProps extends TouchableRippleProps {
    render: (props: RenderTouchableRippleProps) => React.JSX.Element
}

export interface UseTouchableRippleAnimatedOptions extends Pick<RenderTouchableRippleProps, 'onAnimatedFinished'> {
    containerWidth: number
    index: string
    radius: number
}

export interface HandleTouchableRippleAnimatedTimingSharedValue {
    scaleSharedValue: SharedValue<AnimatableValue>
    opacitySharedValue: SharedValue<AnimatableValue>
}

export interface HandleTouchableRippleAnimatedTimingOptions
    extends Pick<RenderTouchableRippleProps, 'onAnimatedFinished'> {
    animatedTiming: AnimatedTiming
}

export interface TouchableRippleContainerProps extends Pick<RenderTouchableRippleProps, 'underlayColor'> {
    height?: number
    locationX?: number
    locationY?: number
    width?: number
}
