import {debounce} from '@/utils'
import {cancelAnimation, type SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimateSkeletonOptions, SkeletonState} from './Skeleton.interface'

const updateSkeletonVisible = (setState: Updater<SkeletonState>) => (duration?: number) => {
        if (typeof duration === 'number' && duration >= 0) {
                setState(draft => {
                        draft.visible = true
                })

                debounce(() =>
                        setState(draft => {
                                draft.visible = false
                        })
                )(duration)()

                return
        }

        if (typeof duration === 'number' && duration < 0) {
                setState(draft => {
                        draft.visible = true
                })
        }
}

export const updateSkeletonDuration = (setState: Updater<SkeletonState>) => (duration?: number) =>
        updateSkeletonVisible(setState)(duration)

export const animateSkeleton =
        ({animateSharedValueTo, enableAnimated}: AnimateSkeletonOptions) =>
        (opacitySharedValue: SharedValue<number>) =>
        (visible?: boolean) => {
                if (!enableAnimated) {
                        return
                }

                if (visible) {
                        animateSharedValueTo({sharedValue: opacitySharedValue})(2)

                        return
                }

                cancelAnimation(opacitySharedValue)
        }
