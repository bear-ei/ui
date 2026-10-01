import type {JSX, RefAttributes} from 'react'
import type {ImageSourcePropType, ImageURISource, View, ViewProps} from 'react-native'
import type {CommonProps} from '../../constants'
import type {Size} from '../../theme'

export interface AvatarProps extends ViewProps, RefAttributes<View>, Omit<CommonProps, 'size'> {
	backgroundColor?: string
	defaultSource?: ImageURISource | number
	labelText?: string
	size?: number | Exclude<Size, 'NONE'>
	source?: ImageSourcePropType
	svgElement?: JSX.Element
}

export type AvatarBaseProps = AvatarProps
export type RenderAvatarProps = AvatarProps
