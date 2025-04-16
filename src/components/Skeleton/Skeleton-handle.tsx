import {EASING} from '@bearei/material-token'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {debounce} from '../../utils'
import type {HandleSkeletonAnimatedTimingOptions, SkeletonState} from './Skeleton.interface'

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
		animatedTiming({repeat: 0, duration: 2000, easing: EASING.LINEAR})(opacitySharedValue)(2)
