import {SHAPE} from '@bearei/theme-token'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {SkeletonBase} from './Skeleton-base.component'
import type {SkeletonElementProps} from './Skeleton-element'
import {SkeletonElement} from './Skeleton-element'
import type {SkeletonProps} from './Skeleton.interface'

const SkeletonWithRef = forwardRef<View, SkeletonProps>((props, ref) => (
        <SkeletonBase
                {...props}
                ref={ref}
        />
))

SkeletonWithRef.displayName = 'SkeletonWithRef'

export const Circle = forwardRef<View, SkeletonElementProps>((props: SkeletonElementProps, ref) => (
        <SkeletonElement
                {...props}
                className='h-10 w-10'
                ref={ref}
                shape={SHAPE.FULL}
        />
))

Circle.displayName = 'Circle'

export const Square = forwardRef<View, SkeletonElementProps>((props: SkeletonElementProps, ref) => (
        <SkeletonElement
                {...props}
                className='h-10 w-10'
                ref={ref}
                shape={SHAPE.SMALL}
        />
))

Square.displayName = 'Square'

export const Rectangular = forwardRef<View, SkeletonElementProps>((props: SkeletonElementProps, ref) => (
        <SkeletonElement
                {...props}
                className='h-10 min-w-10 flex-1 self-stretch'
                ref={ref}
                shape={SHAPE.SMALL}
        />
))

Rectangular.displayName = 'Rectangular'

export const Skeleton = typedMemo(SkeletonWithRef)()
