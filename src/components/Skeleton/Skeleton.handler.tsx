import type {Updater} from 'use-immer'

import {cancelAnimation, type SharedValue} from 'react-native-reanimated'

import type {AnimatedTiming} from '../../hooks'
import type {AnimateSkeletonOptions, SkeletonState} from './Skeleton.interface'

import {ANIMATED_TIMING} from '../../theme'

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

export const animateSkeleton = (
	sharedValue: SharedValue<number>,
	animatedTiming: AnimatedTiming,
	{enableAnimated}: AnimateSkeletonOptions
) => {
	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.LOOP)

	return (visible?: boolean) => {
		if (!enableAnimated || !visible) {
			cancelAnimation(sharedValue)

			return
		}

		animateSharedValueTo(2)
	}
}
