import {Easing} from '@bearei/material-token'
import {SharedValue} from 'react-native-reanimated'
import {Updater} from 'use-immer'
import {debounce} from '../../utils'
import {HandleSkeletonAnimatedTimingOptions, SkeletonState} from './Skeleton.interface'

const handleSkeletonVisible = (setState: Updater<SkeletonState>) => (duration?: number) => {
        if (typeof duration === 'number' && duration >= 0) {
                const handleNextSkeletonVisibleEvent = debounce(() =>
                        setState(nextDraft => {
                                nextDraft.visible = false
                        })
                )(duration)

                setState(draft => {
                        draft.nextSkeletonVisibleEvent = handleNextSkeletonVisibleEvent
                        draft.visible = true
                })

                return
        }

        if (typeof duration === 'number' && duration < 0) {
                setState(draft => {
                        draft.visible = true
                })
        }
}

export const handleSkeletonDurationChange = (setState: Updater<SkeletonState>) => (duration?: number) =>
        handleSkeletonVisible(setState)(duration)

export const handleSkeletonAnimatedTiming =
        ({animatedTiming, enableAnimated}: HandleSkeletonAnimatedTimingOptions) =>
        (opacitySharedValue: SharedValue<number>) =>
        (visible?: boolean) =>
                enableAnimated &&
                visible &&
                animatedTiming({repeat: 0, duration: 2000, easing: Easing.LINEAR})(opacitySharedValue)(2)
