import {LAYOUT} from '@/constants'
import {clsx} from 'clsx'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import Animated from 'react-native-reanimated'
import {LayoutAnimated} from '../Layout-animated'
import type {RenderSkeletonProps} from './Skeleton.interface'

export const RenderSkeleton = forwardRef<View, RenderSkeletonProps>(
        (
                {
                        children,
                        containerAnimatedStyle,
                        id,
                        layoutType = LAYOUT.HORIZONTAL,
                        skeleton,
                        style,
                        visible,
                        ...containerProps
                },
                ref
        ) => {
                const isSkeletonVisible = !!(skeleton && visible)

                return (
                        <>
                                {skeleton && (
                                        <LayoutAnimated
                                                className='absolute bottom-0 left-0 right-0 top-0'
                                                lazy={true}
                                                testID={`skeleton__contentItemLayoutVisible--${id}`}
                                                unmount={true}
                                                visible={isSkeletonVisible}
                                        >
                                                <Animated.View
                                                        {...containerProps}
                                                        className={clsx('flex min-h-6 min-w-6 flex-1 self-stretch', {
                                                                ['flex-row items-center']:
                                                                        layoutType === LAYOUT.HORIZONTAL,
                                                                ['flex-col justify-center']:
                                                                        layoutType === LAYOUT.HORIZONTAL
                                                        })}
                                                        style={[style, containerAnimatedStyle]}
                                                        testID={`skeleton__animatedSkeletonLayout--${id}`}
                                                >
                                                        {skeleton}
                                                </Animated.View>
                                        </LayoutAnimated>
                                )}

                                <LayoutAnimated
                                        className='absolute bottom-0 left-0 right-0 top-0'
                                        lazy={true}
                                        ref={ref}
                                        testID={`skeleton__contentItemLayoutNotVisible--${id}`}
                                        visible={!isSkeletonVisible}
                                >
                                        {children}
                                </LayoutAnimated>
                        </>
                )
        }
)

RenderSkeleton.displayName = 'RenderSkeleton'
