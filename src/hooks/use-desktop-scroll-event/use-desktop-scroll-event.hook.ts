import {useEffect, useMemo, useRef} from 'react'
import {Platform} from 'react-native'

import type {UseDesktopScrollEventOptions} from './use-desktop-scroll-event.interface'

import {handleDesktopScroll} from './use-desktop-scroll-event.handler'

export const useDesktopScrollEvent = ({onMomentumScrollEnd, onScroll}: UseDesktopScrollEventOptions) => {
	const momentumScrollEndTimer = useRef<ReturnType<typeof setTimeout>>(null)
	const onDesktopScroll = useMemo(
		() => handleDesktopScroll({momentumScrollEndTimer, onMomentumScrollEnd, onScroll}),
		[onMomentumScrollEnd, onScroll]
	)

	useEffect(
		() => () => {
			if (momentumScrollEndTimer.current) {
				clearTimeout(momentumScrollEndTimer.current)
				momentumScrollEndTimer.current = null
			}
		},
		[]
	)

	return {
		onMomentumScrollEnd,
		onScroll: ['macos', 'web', 'windows'].includes(Platform.OS) ? onDesktopScroll : onScroll
	}
}
