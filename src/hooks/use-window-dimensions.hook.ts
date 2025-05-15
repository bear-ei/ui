import {useEffect, useMemo} from 'react'
import type {ScaledSize} from 'react-native'
import {Dimensions} from 'react-native'
import type {Updater} from 'use-immer'
import {useImmer} from 'use-immer'
import {createStableHandlerWithState} from '../utils'
import type {UseWindowDimensionsOptions} from './hooks.interface'

const updateWindowScaledSize =
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

const createDimensionsChangeListener = (onWindowScaledSize: ({window}: {window: ScaledSize}) => void) =>
	Dimensions.addEventListener('change', onWindowScaledSize)

export const useWindowDimensions = ({changeEventThrottle = 50}: UseWindowDimensionsOptions = {}) => {
	const [scaledSize, setState] = useImmer<ScaledSize>({fontScale: 0, height: 0, scale: 0, width: 0})
	const debounceUpdateWindowScaledSizeEffect = useMemo(
		() =>
			createStableHandlerWithState(updateWindowScaledSize)(setState)({
				debounceMillisecond: changeEventThrottle
			}),
		[changeEventThrottle, setState]
	)

	const updateWindowScaledSizeEffect = useMemo(
		() => createStableHandlerWithState(updateWindowScaledSize)(setState)(),
		[setState]
	)

	useEffect(() => {
		const subscription = createDimensionsChangeListener(debounceUpdateWindowScaledSizeEffect)

		return () => {
			if (subscription) {
				subscription.remove()
			}
		}
	}, [debounceUpdateWindowScaledSizeEffect])

	useEffect(() => {
		const initialWindow = Dimensions.get('window')

		updateWindowScaledSizeEffect({window: initialWindow})
	}, [updateWindowScaledSizeEffect])

	return scaledSize
}
