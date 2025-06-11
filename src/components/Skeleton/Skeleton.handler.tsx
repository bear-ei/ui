import {cancelAnimation, type SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {debounce} from '../../utils'
import type {AnimateSkeletonOptions, SkeletonState} from './Skeleton.interface'

const updateSkeletonVisibility = (setState: Updater<SkeletonState>) => (duration?: number) => {
	if (typeof duration === 'number' && duration >= 0) {
		const nextDebounceSkeletonVisibilityEvent = debounce(() =>
			setState(nextDraft => {
				nextDraft.visible = false
			})
		)(duration)

		setState(draft => {
			draft.nextSkeletonVisibilityEvent = nextDebounceSkeletonVisibilityEvent
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
