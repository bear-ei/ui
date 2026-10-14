import {useEffect, useMemo} from 'react'
import type {ScaledSize} from 'react-native'
import {Dimensions} from 'react-native'
import {useImmer} from 'use-immer'
import {debounce} from '../../utils'
import {updateWindowScaledSize} from './use-window-dimensions.handler'
import type {UseWindowDimensionsOptions} from './use-window-dimensions.interface'

/**
 * Window dimensions with desktop-aware debouncing.
 *
 * ⚠️ We do NOT use RN's built-in `useWindowDimensions` because:
 *   - It caused severe performance issues on RN for macOS (historical);
 *   - It is not tuned for desktop window-resize frequency.
 *
 * If the platform situation changes (e.g. RNW improves significantly),
 * re-evaluate this hook before keeping it — but do not delete it without
 * verification on the current target platforms.
 */
export const useWindowDimensions = ({changeEventThrottle = 100}: UseWindowDimensionsOptions = {}) => {
	const [scaledSize, setState] = useImmer<ScaledSize>(() => Dimensions.get('window'))
	const onUpdateWindowScaledSize = useMemo(
		() => debounce(updateWindowScaledSize(setState))(changeEventThrottle),
		[setState, changeEventThrottle]
	)

	useEffect(() => {
		const subscription = Dimensions.addEventListener('change', onUpdateWindowScaledSize)

		return () => {
			subscription.remove()
			onUpdateWindowScaledSize.cancel()
		}
	}, [onUpdateWindowScaledSize])

	return scaledSize
}
