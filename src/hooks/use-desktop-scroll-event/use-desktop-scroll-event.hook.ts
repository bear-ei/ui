import {useEffect, useMemo, useRef} from 'react'
import {Platform} from 'react-native'
import {createStableHandler} from '../../utils'
import {handleThrottledScroll} from './use-desktop-scroll-event.handler'
import type {UseDesktopScrollEventOptions} from './use-desktop-scroll-event.interface'

export const useDesktopScrollEvent = ({onScroll, onMomentumScrollEnd}: UseDesktopScrollEventOptions) => {
	const momentumScrollEndTimer = useRef<ReturnType<typeof setTimeout>>(null)
	const onDesktopScroll = useMemo(
		() =>
			createStableHandler(
				handleThrottledScroll({momentumScrollEndTimer, onScroll, onMomentumScrollEnd})
			)(),
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
