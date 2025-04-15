import type {FC, RefAttributes} from 'react'
import type {StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import type {AnimatedStyle} from 'react-native-reanimated'
import type {SvgProps} from 'react-native-svg'
import type {EventName} from '../Common'
import type {ICON_NAME, ICON_STYLE, ICON_TYPE} from './Icon.enum'

export type IconName = (typeof ICON_NAME)[keyof typeof ICON_NAME]
export type IconStyle = (typeof ICON_STYLE)[keyof typeof ICON_STYLE]
export type IconType = (typeof ICON_TYPE)[keyof typeof ICON_TYPE]
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
