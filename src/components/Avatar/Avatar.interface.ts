import {RefAttributes} from 'react'
import {ImageSourcePropType, ImageURISource, View, ViewProps} from 'react-native'
import {ShapeProps} from '../Common'

export interface AvatarProps extends ViewProps, RefAttributes<View>, ShapeProps {
        backgroundColor?: string
        defaultSource?: ImageURISource | number
        labelText?: string
        size?: number
        source?: ImageSourcePropType
}

export type RenderAvatarProps = AvatarProps
export interface AvatarBaseProps extends AvatarProps {
        render: (props: RenderAvatarProps) => JSX.Element
}

export type AvatarContainerProps = Pick<RenderAvatarProps, 'backgroundColor' | 'size'>
