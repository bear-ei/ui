import {RefAttributes} from 'react'
import {ImageSourcePropType, ImageURISource, View, ViewProps} from 'react-native'
import {CommonProps, ShapeProps} from '../Common'

export interface AvatarProps extends ViewProps, RefAttributes<View>, CommonProps, ShapeProps {
        backgroundColor?: string
        defaultSource?: ImageURISource | number
        labelText?: string
        size?: number
        source?: ImageSourcePropType
}

export type RenderAvatarProps = AvatarProps
export interface AvatarBaseProps extends AvatarProps {
        render: (props: RenderAvatarProps) => React.JSX.Element
}

export type AvatarContentProps = Pick<RenderAvatarProps, 'backgroundColor' | 'size' | 'densityScale'>
