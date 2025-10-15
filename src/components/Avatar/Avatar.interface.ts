import type {CommonProps} from '@/constants'
import type {JSX, RefAttributes} from 'react'
import type {ImageSourcePropType, ImageURISource, View, ViewProps} from 'react-native'

export interface AvatarProps extends ViewProps, RefAttributes<View>, CommonProps {
        backgroundColor?: string
        defaultSource?: ImageURISource | number
        labelText?: string
        source?: ImageSourcePropType
        svgElement?: JSX.Element
}

export type AvatarBaseProps = AvatarProps
export type RenderAvatarProps = AvatarProps
