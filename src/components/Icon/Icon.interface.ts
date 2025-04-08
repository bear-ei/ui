import {FC, RefAttributes} from 'react'
import {StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import {AnimatedStyle} from 'react-native-reanimated'
import {SvgProps} from 'react-native-svg'
import {EventName} from '../Common'
import {IconName, IconStyle, IconType} from './Icon.enum'

export interface IconProps extends Omit<SvgProps, 'hitSlop' | 'width' | 'height'>, RefAttributes<View>, ViewProps {
        eventName?: EventName
        icon?: FC<SvgProps>
        iconStyle?: IconStyle
        name?: IconName
        size?: number
        svgStyle?: StyleProp<ViewStyle>
        type?: IconType
}

export interface RenderIconProps extends IconProps {
        containerAnimatedStyle: AnimatedStyle<ViewStyle>
        svgIconElement: React.JSX.Element
}

export interface IconBaseProps extends IconProps {
        render: (props: RenderIconProps) => React.JSX.Element
}

export type UseIconAnimatedOptions = Pick<RenderIconProps, 'eventName'>
export type IconLayoutProps = Pick<IconProps, 'size'>
