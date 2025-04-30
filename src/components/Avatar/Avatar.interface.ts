import type {RefAttributes} from 'react'
import type {ImageSourcePropType, ImageURISource, View, ViewProps} from 'react-native'
import type {CommonProps, ShapeProps} from '../Common'

export interface AvatarProps extends ViewProps, RefAttributes<View>, CommonProps, ShapeProps {
	backgroundColor?: string
	defaultSource?: ImageURISource | number
	labelText?: string
	size?: number
	source?: ImageSourcePropType
}

export type RenderAvatarProps = AvatarProps
export interface AvatarBaseProps extends AvatarProps {
	renderAvatar: (props: RenderAvatarProps) => React.JSX.Element
}

export type AvatarContainerProps = Pick<RenderAvatarProps, 'backgroundColor'>
export type AvatarContentProps = Pick<RenderAvatarProps, 'size' | 'density'>
