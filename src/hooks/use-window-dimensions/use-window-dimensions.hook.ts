import type {ScaledSize} from 'react-native'

import {useEffect, useMemo} from 'react'
import {Dimensions} from 'react-native'
import {useImmer} from 'use-immer'

import {debounce} from '../../utils'
import {handleWindowScaledSizeChange} from './use-window-dimensions.handler'

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
export const useWindowDimensions = (resizeDebounce = 100) => {
	const [scaledSize, setState] = useImmer<ScaledSize>(() => Dimensions.get('window'))
	const onUpdateWindowScaledSize = useMemo(
		() => debounce(handleWindowScaledSizeChange(setState), resizeDebounce),
		[setState, resizeDebounce]
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
