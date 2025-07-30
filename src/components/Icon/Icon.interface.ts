import type {FC, RefAttributes} from 'react'
import type {StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import type {SvgProps} from 'react-native-svg'
import type {ICON_STYLE, ICON_TYPE} from './Icon.enum'
import type {outlined} from './Icon.outlined'

export type IconName = keyof typeof outlined.OUTLINED
export type IconStyle = (typeof ICON_STYLE)[keyof typeof ICON_STYLE]
export type IconType = (typeof ICON_TYPE)[keyof typeof ICON_TYPE]
export interface IconProps extends Omit<SvgProps, 'hitSlop' | 'width' | 'height'>, RefAttributes<View>, ViewProps {
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
export type IconLayoutProps = Pick<IconProps, 'size'> & RefAttributes<View>
