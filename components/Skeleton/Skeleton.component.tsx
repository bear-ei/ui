import {typedMemo} from '@/utils'
import {pxToRem, SHAPE} from '@bearei/theme-token'
import {forwardRef} from 'react'
import {Platform, ViewStyle, type View} from 'react-native'
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

export const Circle = forwardRef<View, SkeletonElementProps>(({style, size, ...props}: SkeletonElementProps, ref) => (
        <SkeletonElement
                {...props}
                className='h-10 w-10'
                ref={ref}
                shape={SHAPE.FULL}
                style={[
                        style,
                        {
                                ...(typeof size === 'number' &&
                                        Platform.select({
                                                default: {width: size, height: size},
                                                web: {width: `${pxToRem()(size)}rem`, height: `${pxToRem()(size)}rem`}
                                        }))
                        } as ViewStyle
                ]}
        />
))

Circle.displayName = 'Circle'

export const Square = forwardRef<View, SkeletonElementProps>(({style, size, ...props}: SkeletonElementProps, ref) => (
        <SkeletonElement
                {...props}
                className='h-10 w-10'
                ref={ref}
                shape={SHAPE.SMALL}
                style={[
                        style,
                        {
                                ...(typeof size === 'number' &&
                                        Platform.select({
                                                default: {width: size, height: size},
                                                web: {width: `${pxToRem()(size)}rem`, height: `${pxToRem()(size)}rem`}
                                        }))
                        } as ViewStyle
                ]}
        />
))

Square.displayName = 'Square'

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
                                        ...(typeof size === 'number' &&
                                                Platform.select({
                                                        default: {height: size},
                                                        web: {height: `${pxToRem()(size)}rem`}
                                                }))
                                } as ViewStyle,
                                {
                                        ...(typeof size === 'object' &&
                                                typeof size.width === 'number' &&
                                                typeof size.height === 'number' &&
                                                Platform.select({
                                                        default: {width: size, height: size},
                                                        web: {
                                                                width: `${pxToRem()(size.width)}rem`,
                                                                height: `${pxToRem()(size.height)}rem`
                                                        }
                                                }))
                                } as ViewStyle
                        ]}
                />
        )
)

Rectangular.displayName = 'Rectangular'

export const Skeleton = typedMemo(SkeletonWithRef)()
