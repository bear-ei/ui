import type {FC, RefAttributes} from 'react'
import type {StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import type {SvgProps} from 'react-native-svg'
import type {CommonProps} from '../Common'
import type {ICON_NAME, ICON_STYLE, ICON_TYPE} from './Icon.enum'

export type IconName = (typeof ICON_NAME)[keyof typeof ICON_NAME]
export type IconStyle = (typeof ICON_STYLE)[keyof typeof ICON_STYLE]
export type IconType = (typeof ICON_TYPE)[keyof typeof ICON_TYPE]
export interface IconProps
	extends Omit<SvgProps, 'hitSlop' | 'width' | 'height'>,
		RefAttributes<View>,
		ViewProps,
		CommonProps {
	icon?: FC<SvgProps>
	iconStyle?: IconStyle
	name?: IconName
	size?: number
	svgStyle?: StyleProp<ViewStyle>
	type?: IconType
}

export interface RenderIconProps extends IconProps {
	iconElement: React.JSX.Element
}

export type IconBaseProps = IconProps
export type IconLayoutProps = Pick<IconProps, 'size' | 'density'> & RefAttributes<View>
