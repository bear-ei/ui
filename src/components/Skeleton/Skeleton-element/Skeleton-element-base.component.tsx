import {forwardRef} from 'react'
import {View} from 'react-native'
import {SkeletonElementBaseProps} from './Skeleton-element.interface'

export const SkeletonElementBase = forwardRef<View, SkeletonElementBaseProps>(({render, ...renderProps}, ref) =>
        render({...renderProps, ref})
)
