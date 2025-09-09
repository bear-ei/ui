import type {FC, RefAttributes} from 'react'
import type {StyleProp, View, ViewProps, ViewStyle} from 'react-native'
import type {SvgProps} from 'react-native-svg'
import type {CommonProps} from '../Common'
import type {IconName, IconType} from './icon'

export interface IconProps
	extends Omit<SvgProps, 'hitSlop' | 'width' | 'height'>,
		RefAttributes<View>,
		ViewProps,
		CommonProps {
	icon?: FC<SvgProps>
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
