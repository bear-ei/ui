import {cancelAnimation, type SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'

import {EASING, LOOP} from '../../theme'

import type {AnimateSkeletonOptions, SkeletonState} from './Skeleton.interface'

export const updateSkeletonVisible = (setState: Updater<SkeletonState>) => {
	let timeoutId: ReturnType<typeof setTimeout> | number | undefined

	return (duration?: number) => {
		if (typeof duration !== 'number') {
			setState(draft => {
				if (!draft.visible) {
					draft.visible = true
				}
			})

			return
		}

		if (duration >= 0) {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId)
			}

			setState(draft => {
				draft.visible = true
			})

			timeoutId = setTimeout(
				() =>
					setState(draft => {
						draft.visible = false
					}),
				duration
			)

			return () => clearTimeout(timeoutId)
		}

		setState(draft => {
			draft.visible = true
		})
	}
}

export const animateSkeleton =
	({animatedTiming, enableAnimated}: AnimateSkeletonOptions) =>
	(opacitySharedValue: SharedValue<number>) => {
		const animateSharedValueTo = animatedTiming({duration: LOOP.LOOP_2, easing: EASING.LINEAR, repeat: -1})({
			sharedValue: opacitySharedValue
		})

		return (visible?: boolean) => {
			if (!enableAnimated || !visible) {
				cancelAnimation(opacitySharedValue)

				return
			}

			animateSharedValueTo(2)
		}
	}
