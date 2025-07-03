import type {JSX, RefAttributes} from 'react'
import type {ImageSourcePropType, ImageURISource, View, ViewProps} from 'react-native'
import type {CommonProps, ShapeProps} from '../Common'

export interface AvatarProps extends ViewProps, RefAttributes<View>, CommonProps, ShapeProps {
	backgroundColor?: string
	defaultSource?: ImageURISource | number
	labelText?: string
	size?: number
	source?: ImageSourcePropType
	svgElement?: JSX.Element
}

export type AvatarBaseProps = AvatarProps
export type AvatarContentProps = Pick<RenderAvatarProps, 'size' | 'density' | 'backgroundColor'>
export type RenderAvatarProps = AvatarProps
