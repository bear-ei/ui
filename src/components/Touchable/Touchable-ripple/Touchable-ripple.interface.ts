import {RefAttributes} from 'react'
import {LayoutRectangle, NativeTouchEvent, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle, SharedValue} from 'react-native-reanimated'
import {AnimatedTiming} from '../../../hooks'
import {TouchableProps} from '../Touchable.interface'

export interface TouchableRippleProps
        extends ViewProps,
                RefAttributes<View>,
                Pick<TouchableProps, 'centered' | 'underlayColor'> {
        containerLayout?: LayoutRectangle
        indexKey: string
        onAnimatedFinished?: (value: string) => void
        touchableLocation?: Pick<NativeTouchEvent, 'locationX' | 'locationY'>
}

export interface RenderTouchableRippleProps extends Omit<TouchableRippleProps, 'indexKey'> {
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
        locationX: number
        locationY: number
        size?: number
}

export interface TouchableRippleBaseProps extends TouchableRippleProps {
        render: (props: RenderTouchableRippleProps) => JSX.Element
}

export interface UseTouchableRippleAnimatedOptions
        extends Pick<RenderTouchableRippleProps, 'onAnimatedFinished'>,
                Pick<TouchableRippleProps, 'indexKey'> {
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

export interface TouchableRippleLayoutProps extends Pick<RenderTouchableRippleProps, 'underlayColor'> {
        size?: number
        locationX?: number
        locationY?: number
}
