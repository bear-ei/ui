import type {Updater} from 'use-immer'

import {cancelAnimation, type SharedValue} from 'react-native-reanimated'

import type {AnimatedTimingFactory} from '../../hooks'
import type {AnimateSkeletonOptions, SkeletonState} from './Skeleton.interface'

import {ANIMATED_TIMING} from '../../theme'

export const updateSkeletonVisible = (setState: Updater<SkeletonState>) => {
	let timeoutId: ReturnType<typeof setTimeout> | number | undefined

	return (autoHideDelay?: number) => {
		if (typeof autoHideDelay !== 'number') {
			setState(draft => {
				if (!draft.visible) {
					draft.visible = true
				}
			})

			return
		}

		if (autoHideDelay >= 0) {
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
				autoHideDelay
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
	animatedTiming: AnimatedTimingFactory,
	{enableLoop}: AnimateSkeletonOptions
) => {
	const animateSharedValueTo = animatedTiming(sharedValue, ANIMATED_TIMING.LOOP)

	return (visible?: boolean) => {
		if (!enableLoop || !visible) {
			cancelAnimation(sharedValue)

			return
		}

		animateSharedValueTo(2)
	}
}
