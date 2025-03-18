import {useEffect, useRef} from 'react'
import {NativeScrollEvent, NativeSyntheticEvent, Platform} from 'react-native'
import {HandleScrollOptions, UseDesktopScrollEventOptions} from './hooks.interface'

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
        const onDesktopScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) =>
                handleScroll({momentumScrollEndTimer, onScroll, onMomentumScrollEnd})(event)

        useEffect(
                () => () => {
                        if (momentumScrollEndTimer.current) {
                                clearTimeout(momentumScrollEndTimer.current)
                        }
                },
                []
        )

        return {
                onScroll: new Set(['macos', 'web', 'windows']).has(Platform.OS) ? onDesktopScroll : onScroll,
                onMomentumScrollEnd
        }
}
