import {useEffect, useMemo} from 'react'
import type {ScaledSize} from 'react-native'
import {Dimensions} from 'react-native'
import {useImmer} from 'use-immer'
import {createStableHandlerWithState} from '../../utils'
import {createDimensionsChangeListener, updateWindowScaledSize} from './use-window-dimensions.handler'
import type {UseWindowDimensionsOptions} from './use-window-dimensions.interface'

export const useWindowDimensions = ({changeEventThrottle = 50}: UseWindowDimensionsOptions = {}) => {
	const [scaledSize, setState] = useImmer<ScaledSize>({fontScale: 0, height: 0, scale: 0, width: 0})
	const emitterSubscriptionEffect = useMemo(
		() =>
			createDimensionsChangeListener(
				createStableHandlerWithState(updateWindowScaledSize)(setState)({
					debounceMillisecond: changeEventThrottle
				})
			),
		[changeEventThrottle, setState]
	)

	const runUpdateWindowScaledSize = useMemo(
		() => createStableHandlerWithState(updateWindowScaledSize)(setState)(),
		[setState]
	)

	useEffect(() => {
		return () => emitterSubscriptionEffect && emitterSubscriptionEffect.remove()
	}, [emitterSubscriptionEffect])

	useEffect(() => {
		const initialWindow = Dimensions.get('window')

		runUpdateWindowScaledSize({window: initialWindow})
	}, [runUpdateWindowScaledSize])

	return scaledSize
}
