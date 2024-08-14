import {RefAttributes} from 'react'
import {View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {SvgProps} from 'react-native-svg'
import {EventName} from '../Common'
import {outlined} from './Icon.outlined'

export type IconName = keyof (typeof outlined)['outlined']
export type IconStyle = 'outlined' | 'rounded' | 'sharp'
export type IconType = 'filled' | 'outlined'
export interface IconProps extends Omit<SvgProps, 'width' | 'height'>, RefAttributes<View>, ViewProps {
    densityScale?: number
    eventName?: EventName
    horizontalStretch?: boolean
    icon?: React.FC<SvgProps>
    iconStyle?: IconStyle
    name?: IconName
    SvgIcon?: React.FC<SvgProps>
    svgIconElement?: React.JSX.Element
    type?: IconType
    verticalStretch?: boolean
}

export interface RenderIconProps extends IconProps {
    animatedStyle: AnimatedStyle<ViewStyle>
}

export interface IconBaseProps extends IconProps {
    render: (props: RenderIconProps) => React.JSX.Element
}

export type UseIconAnimatedOptions = Pick<RenderIconProps, 'eventName'>
export type IconContainerProps = Pick<IconProps, 'verticalStretch' | 'densityScale' | 'horizontalStretch'>
