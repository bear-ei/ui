import {useEffect, useMemo} from 'react'
import {Dimensions, Platform, ScaledSize} from 'react-native'
import {Updater, useImmer} from 'use-immer'
import {debounce} from '../util'
import {UseWindowDimensionsOptions} from './hook.interface'

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

const handleEventListener =
    (onWindowScaledSize: ({window}: {window: ScaledSize}) => void) => (inspectionPlatform: boolean) => {
        const subscription = () => Dimensions.addEventListener('change', onWindowScaledSize)

        return inspectionPlatform ? ['ios', 'android'].includes(Platform.OS) && subscription() : subscription()
    }

export const useWindowDimensions = ({
    changeEventThrottle = 50,
    inspectionPlatform = true
}: UseWindowDimensionsOptions = {}) => {
    const [scaledSize, setState] = useImmer<ScaledSize>({
        width: 0,
        height: 0,
        scale: 0,
        fontScale: 0
    })

    const onWindowScaledSize = useMemo(
        () =>
            scaledSize.width ?
                debounce(handleWindowScaledSize(setState))(changeEventThrottle)
            :   handleWindowScaledSize(setState),
        [changeEventThrottle, scaledSize.width, setState]
    )

    useEffect(() => {
        const subscription = handleEventListener(onWindowScaledSize)(inspectionPlatform)

        return () => {
            if (subscription) {
                subscription.remove()
            }
        }
    }, [inspectionPlatform, onWindowScaledSize])

    return scaledSize
}
