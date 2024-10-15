import {FC, RefAttributes} from 'react'
import {StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {SvgProps} from 'react-native-svg'
import {EventName} from '../Common'
import {outlined} from './icon.outlined'

export type IconName = keyof (typeof outlined)['outlined']
export type IconStyle = 'outlined' | 'rounded' | 'sharp'
export type IconType = 'filled' | 'outlined'
export interface IconProps extends Omit<SvgProps, 'width' | 'height' | 'hitSlop'>, RefAttributes<View>, ViewProps {
    densityScale?: number
    eventName?: EventName
    icon?: FC<SvgProps>
    iconStyle?: IconStyle
    name?: IconName
    svgStyle?: StyleProp<ViewStyle>
    type?: IconType
}

export interface RenderIconProps extends IconProps {
    containerAnimatedStyle: AnimatedStyle<ViewStyle>
    svgIconElement: JSX.Element
}

export interface IconBaseProps extends IconProps {
    render: (props: RenderIconProps) => JSX.Element
}

export type UseIconAnimatedOptions = Pick<RenderIconProps, 'eventName'>
export type IconContainerProps = Pick<IconProps, 'densityScale'>
