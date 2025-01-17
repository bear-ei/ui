import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
import {handleSkeletonDurationChange} from './Skeleton-handle'
import {SkeletonBaseProps, SkeletonState} from './Skeleton.interface'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

export const SkeletonBase = forwardRef<View, SkeletonBaseProps>(
        ({render, enableAnimated = true, duration, ...renderProps}, ref) => {
                const [{visible, nextSkeletonVisibleEvent}, setState] = useImmer<SkeletonState>({visible: true})
                const id = useId()
                const onSkeletonDurationChange = useMemo(() => handleSkeletonDurationChange(setState), [setState])
                const {containerAnimatedStyle} = useSkeletonAnimated({
                        enableAnimated,
                        visible: typeof duration === 'number' && duration ? visible : false
                })

                useEffect(() => {
                        onSkeletonDurationChange(duration)
                }, [duration, onSkeletonDurationChange])

                useEffect(() => {
                        runAfterInteractions(nextSkeletonVisibleEvent)()
                }, [nextSkeletonVisibleEvent])

                return render({...renderProps, containerAnimatedStyle, ref, visible, id})
        }
)
