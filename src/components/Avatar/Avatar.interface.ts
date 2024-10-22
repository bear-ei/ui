import {RefAttributes} from 'react'
import {
    ImageSourcePropType,
    ImageURISource,
    View,
    ViewProps
} from 'react-native'

export interface AvatarProps extends ViewProps, RefAttributes<View> {
    backgroundColor?: string
    defaultSource?: ImageURISource | number
    labelText?: string
    source?: ImageSourcePropType
}

export type RenderAvatarProps = AvatarProps
export interface AvatarBaseProps extends AvatarProps {
    render: (props: RenderAvatarProps) => JSX.Element
}

export type AvatarContentProps = Pick<RenderAvatarProps, 'backgroundColor'>
