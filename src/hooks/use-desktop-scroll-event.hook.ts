import {useEffect, useMemo, useRef} from 'react'
import type {NativeScrollEvent, NativeSyntheticEvent} from 'react-native'
import {Platform} from 'react-native'
import {createHandlerFinal} from '../utils'
import type {HandleScrollOptions, UseDesktopScrollEventOptions} from './hooks.interface'

const handleScroll =
	({momentumScrollEndTimer, onMomentumScrollEnd, onScroll}: HandleScrollOptions) =>
	(event: NativeSyntheticEvent<NativeScrollEvent>) => {
		onScroll?.(event)

		if (!onMomentumScrollEnd) {
			return
		}

		if (momentumScrollEndTimer.current) {
			clearTimeout(momentumScrollEndTimer.current)
		}

		momentumScrollEndTimer.current = setTimeout(() => onMomentumScrollEnd?.(event), 150)
	}

export const useDesktopScrollEvent = ({onScroll, onMomentumScrollEnd}: UseDesktopScrollEventOptions) => {
	const momentumScrollEndTimer = useRef<ReturnType<typeof setTimeout>>(null)
	const onDesktopScroll = useMemo(
		() => createHandlerFinal(handleScroll({momentumScrollEndTimer, onScroll, onMomentumScrollEnd}))(),
		[onMomentumScrollEnd, onScroll]
	)

	useEffect(
		() => () => {
			if (momentumScrollEndTimer.current) {
				clearTimeout(momentumScrollEndTimer.current)
			}
		},
		[]
	)

	return {
		onScroll: ['macos', 'web', 'windows'].includes(Platform.OS) ? onDesktopScroll : onScroll,
		onMomentumScrollEnd
	}
}
