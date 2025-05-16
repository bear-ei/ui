import {EASING} from '@bearei/material-token'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {debounce} from '../../utils'
import type {AnimateSkeletonOptions, SkeletonState} from './Skeleton.interface'

const updateSkeletonVisibility = (setState: Updater<SkeletonState>) => (duration?: number) => {
	if (typeof duration === 'number' && duration >= 0) {
		const nextSkeletonVisibleEvent = debounce(() =>
			setState(nextDraft => {
				nextDraft.visible = false
			})
		)(duration)

		setState(draft => {
			draft.nextSkeletonVisibilityEvent = nextSkeletonVisibleEvent
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

export const updateSkeletonDuration = (setState: Updater<SkeletonState>) => (duration?: number) =>
	updateSkeletonVisibility(setState)(duration)

export const animateSkeleton =
	({animatedTiming, enableAnimated}: AnimateSkeletonOptions) =>
	(opacitySharedValue: SharedValue<number>) =>
	(visible?: boolean) =>
		enableAnimated &&
		visible &&
		animatedTiming({repeat: 0, duration: 2000, easing: EASING.LINEAR})(opacitySharedValue)(2)
