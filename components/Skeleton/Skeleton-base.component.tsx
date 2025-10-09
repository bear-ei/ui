import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {debounce} from '../../utils'
import {updateSkeletonDuration} from './Skeleton.handler'
import type {SkeletonBaseProps, SkeletonState} from './Skeleton.interface'
import {RenderSkeleton} from './Skeleton.render'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

export const SkeletonBase = forwardRef<View, SkeletonBaseProps>(
        ({enableAnimated = true, duration, ...renderSkeletonProps}, ref) => {
                const [{visible: isVisible}, setState] = useImmer<SkeletonState>({visible: true})
                const id = useId()
                const {containerAnimatedStyle} = useSkeletonAnimated({
                        enableAnimated,
                        visible: typeof duration === 'number' && duration ? isVisible : false
                })

                const runUpdateDuration = useMemo(() => debounce(updateSkeletonDuration(setState))(50), [setState])

                useEffect(() => {
                        runUpdateDuration(duration)
                }, [duration, runUpdateDuration])

                return (
                        <RenderSkeleton
                                {...renderSkeletonProps}
                                containerAnimatedStyle={containerAnimatedStyle}
                                id={id}
                                ref={ref}
                                visible={isVisible}
                        />
                )
        }
)

SkeletonBase.displayName = 'SkeletonBase'
