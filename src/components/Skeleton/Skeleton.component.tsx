import {platformValue, typedMemo} from '@/utils'
import {SHAPE} from '@bearei/theme-token'
import {forwardRef} from 'react'
import type {View, ViewStyle} from 'react-native'
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

export const Circle = forwardRef<View, SkeletonElementProps>(({style, size, ...props}: SkeletonElementProps, ref) => (
        <SkeletonElement
                {...props}
                className='h-10 w-10'
                ref={ref}
                shape={SHAPE.FULL}
                style={[
                        style,
                        {
                                ...(typeof size === 'number' && {
                                        height: platformValue(size),
                                        width: platformValue(size)
                                })
                        } as ViewStyle
                ]}
        />
))

export const Square = forwardRef<View, SkeletonElementProps>(({style, size, ...props}: SkeletonElementProps, ref) => (
        <SkeletonElement
                {...props}
                className='h-10 w-10'
                ref={ref}
                shape={SHAPE.SMALL}
                style={[
                        style,
                        {
                                ...(typeof size === 'number' && {
                                        height: platformValue(size),
                                        width: platformValue(size)
                                })
                        } as ViewStyle
                ]}
        />
))

export const Rectangular = forwardRef<View, SkeletonElementProps>(
        ({style, size, ...props}: SkeletonElementProps, ref) => (
                <SkeletonElement
                        {...props}
                        className='h-10 min-w-10 flex-1 self-stretch'
                        ref={ref}
                        shape={SHAPE.SMALL}
                        style={[
                                style,
                                {
                                        ...(typeof size === 'number' && {height: platformValue(size)})
                                } as ViewStyle,
                                {
                                        ...(typeof size === 'object' &&
                                                typeof size.width === 'number' &&
                                                typeof size.height === 'number' && {
                                                        height: platformValue(size.height),
                                                        width: platformValue(size.width)
                                                })
                                } as ViewStyle
                        ]}
                />
        )
)

Circle.displayName = 'Circle'
Rectangular.displayName = 'Rectangular'
SkeletonWithRef.displayName = 'SkeletonWithRef'
Square.displayName = 'Square'

export const Skeleton = typedMemo(SkeletonWithRef)()
