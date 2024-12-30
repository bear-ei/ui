import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {debounce} from '../../utils'
import {SkeletonBaseProps, SkeletonState} from './Skeleton.interface'
import {useSkeletonAnimated} from './use-skeleton-animated.hook'

const handleSkeletonVisible = (setState: Updater<SkeletonState>) => (duration?: number) => {
        if (typeof duration === 'number' && duration >= 0) {
                const handleNextSkeletonVisibleEvent = debounce(() =>
                        setState(nextDraft => {
                                nextDraft.skeletonVisible = false
                        })
                )(duration)

                setState(draft => {
                        draft.nextSkeletonVisibleEvent = handleNextSkeletonVisibleEvent
                        draft.skeletonVisible = true
                })

                return
        }

        if (typeof duration === 'number' && duration < 0) {
                setState(draft => {
                        draft.skeletonVisible = true
                })
        }
}

const handleSkeletonDurationChange = (setState: Updater<SkeletonState>) => (duration?: number) =>
        handleSkeletonVisible(setState)(duration)

export const SkeletonBase = forwardRef<View, SkeletonBaseProps>(
        ({render, enableAnimated = true, duration, ...renderProps}, ref) => {
                const id = useId()
                const [{skeletonVisible, nextSkeletonVisibleEvent}, setState] = useImmer<SkeletonState>({
                        nextSkeletonVisibleEvent: undefined,
                        skeletonVisible: true
                })

                const onSkeletonDurationChange = useMemo(() => handleSkeletonDurationChange(setState), [setState])
                const {containerAnimatedStyle} = useSkeletonAnimated({
                        enableAnimated,
                        skeletonVisible: typeof duration === 'number' && duration ? skeletonVisible : false
                })

                useEffect(() => {
                        onSkeletonDurationChange(duration)
                }, [duration, onSkeletonDurationChange])

                useEffect(() => {
                        nextSkeletonVisibleEvent?.()
                }, [nextSkeletonVisibleEvent])

                return render({
                        ...renderProps,
                        containerAnimatedStyle,
                        id,
                        ref,
                        skeletonVisible
                })
        }
)
