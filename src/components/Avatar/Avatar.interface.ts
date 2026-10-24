import type {JSX, RefAttributes} from 'react'
import type {ImageSourcePropType, ImageURISource, View, ViewProps} from 'react-native'

import type {ThemeableProps, DensitySizeScale} from '../../theme'

export interface AvatarProps extends ViewProps, RefAttributes<View>, Omit<ThemeableProps, 'size'> {
	backgroundColor?: string
	defaultSource?: ImageURISource | number
	initialsText?: string
	size?: number | DensitySizeScale
	source?: ImageSourcePropType
	svgElement?: JSX.Element
}

export type AvatarBaseProps = AvatarProps
export type RenderAvatarProps = AvatarProps
