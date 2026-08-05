import {debounce} from '@/utils'
import {useEffect, useMemo} from 'react'
import type {ScaledSize} from 'react-native'
import {Dimensions} from 'react-native'
import {useImmer} from 'use-immer'
import {createDimensionsChangeListener, updateWindowScaledSize} from './use-window-dimensions.handler'
import type {UseWindowDimensionsOptions} from './use-window-dimensions.interface'

export const useWindowDimensions = ({changeEventThrottle = 50}: UseWindowDimensionsOptions = {}) => {
    const [scaledSize, setState] = useImmer<ScaledSize>({fontScale: 0, height: 0, scale: 0, width: 0})
    const runEmitterSubscription = useMemo(
        () => createDimensionsChangeListener(debounce(updateWindowScaledSize(setState))(changeEventThrottle)),
        [changeEventThrottle, setState]
    )

    const runUpdateWindowScaledSize = useMemo(() => updateWindowScaledSize(setState), [setState])

    useEffect(() => () => runEmitterSubscription.remove(), [runEmitterSubscription])
    useEffect(() => {
        const initialWindow = Dimensions.get('window')

        runUpdateWindowScaledSize({window: initialWindow})
    }, [runUpdateWindowScaledSize])

    return scaledSize
}
