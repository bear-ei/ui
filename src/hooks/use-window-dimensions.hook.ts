import {useEffect, useMemo} from 'react'
import {Dimensions, ScaledSize} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {debounce} from '../utils'
import {UseWindowDimensionsOptions} from './hooks.interface'

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
        const [scaledSize, setState] = useImmer<ScaledSize>({
                width: 0,
                height: 0,
                scale: 0,
                fontScale: 0
        })

        const onWindowScaledSize = useMemo(
                () => debounce(handleWindowScaledSize(setState))(changeEventThrottle),
                [changeEventThrottle, setState]
        )

        useEffect(() => {
                const subscription = handleEventListener(onWindowScaledSize)

                return () => {
                        if (subscription) {
                                subscription.remove()
                        }
                }
        }, [onWindowScaledSize])

        useEffect(() => {
                const initialWindow = Dimensions.get('window')
                handleWindowScaledSize(setState)({window: initialWindow})
        }, [setState])

        return scaledSize
}
