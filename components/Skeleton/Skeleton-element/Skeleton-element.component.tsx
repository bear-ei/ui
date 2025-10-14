import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {SkeletonElementBase} from './Skeleton-element-base.component'
import type {SkeletonElementProps} from './Skeleton-element.interface'

const SkeletonElementWithRef = forwardRef<View, SkeletonElementProps>((props, ref) => (
        <SkeletonElementBase
                {...props}
                ref={ref}
        />
))

export const SkeletonElement = typedMemo(SkeletonElementWithRef)()

SkeletonElementWithRef.displayName = 'SkeletonElementWithRef'
