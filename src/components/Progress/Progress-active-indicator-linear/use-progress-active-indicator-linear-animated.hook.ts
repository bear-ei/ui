import {useEffect, useMemo} from 'react'
import {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {
        handleOutputRange,
        handleProgressActiveIndicatorLinearAnimatedTiming
} from './Progress-active-indicator-linear-handle'
import {UseProgressActiveIndicatorLinearAnimatedOptions} from './Progress-active-indicator-linear.interface'

export const useProgressActiveIndicatorLinearAnimated = ({
        containerLayout,
        defaultValue = 0,
        increment = 1,
        value
}: UseProgressActiveIndicatorLinearAnimatedOptions) => {
        const widthSharedValue = useSharedValue(defaultValue)
        const theme = useTheme()
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const outputRange = handleOutputRange(containerLayout.width)(increment)
        const inputRange = outputRange.map((_value, index) => index)
        const contentAnimatedStyle = useAnimatedStyle(() => ({
                width: interpolate(widthSharedValue.value, inputRange, outputRange)
        }))

        const onProgressActiveIndicatorLinearAnimatedTiming = useMemo(
                () => handleProgressActiveIndicatorLinearAnimatedTiming(animatedTiming)(widthSharedValue),
                [animatedTiming, widthSharedValue]
        )

        useEffect(() => {
                onProgressActiveIndicatorLinearAnimatedTiming(value)
        }, [onProgressActiveIndicatorLinearAnimatedTiming, value])

        return {contentAnimatedStyle}
}
