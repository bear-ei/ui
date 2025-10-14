import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {SkeletonElementBaseProps} from './Skeleton-element.interface'
import {RenderSkeletonElement} from './Skeleton-element.render'

export const SkeletonElementBase = forwardRef<View, SkeletonElementBaseProps>((props, ref) => {
        const id = useId()

        return (
                <RenderSkeletonElement
                        {...props}
                        id={id}
                        ref={ref}
                />
        )
})

SkeletonElementBase.displayName = 'SkeletonElementBase'
