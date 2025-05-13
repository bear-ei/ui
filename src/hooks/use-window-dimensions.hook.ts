import {useEffect, useMemo} from 'react'
import type {ScaledSize} from 'react-native'
import {Dimensions} from 'react-native'
import type {Updater} from 'use-immer'
import {useImmer} from 'use-immer'

import {createHandler} from '../utils'
import type {UseWindowDimensionsOptions} from './hooks.interface'

const handleWindowScaledSize =
	(setState: Updater<ScaledSize>) =>
	({window}: {window: ScaledSize}) => {
		const {width, height, scale, fontScale} = window

		setState(draft => {
			draft.fontScale = fontScale
			draft.height = height
			draft.scale = scale
			draft.width = width
		})
	}

const handleEventListener = (onWindowScaledSize: ({window}: {window: ScaledSize}) => void) => {
	const subscription = () => Dimensions.addEventListener('change', onWindowScaledSize)

	return subscription()
}

export const useWindowDimensions = ({changeEventThrottle = 50}: UseWindowDimensionsOptions = {}) => {
	const [scaledSize, setState] = useImmer<ScaledSize>({fontScale: 0, height: 0, scale: 0, width: 0})
	const onDebounceWindowScaledSize = useMemo(
		() => createHandler(handleWindowScaledSize)(setState)({debounceMillisecond: changeEventThrottle}),
		[changeEventThrottle, setState]
	)

	const onWindowScaledSize = useMemo(() => createHandler(handleWindowScaledSize)(setState)(), [setState])

	useEffect(() => {
		const subscription = handleEventListener(onDebounceWindowScaledSize)

		return () => {
			if (subscription) {
				subscription.remove()
			}
		}
	}, [onDebounceWindowScaledSize])

	useEffect(() => {
		const initialWindow = Dimensions.get('window')

		onWindowScaledSize({window: initialWindow})
	}, [onWindowScaledSize])

	return scaledSize
}
