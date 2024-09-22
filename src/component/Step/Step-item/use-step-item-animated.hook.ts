import {useEffect, useMemo} from 'react'
import {Extrapolation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hook'
import {
    ProcessStepItemAnimatedTimingOptions,
    ProcessStepItemAnimatedTimingSharedValue,
    UseStepItemAnimatedOptions
} from './Step-item.interface'

const processStepItemAnimatedTiming =
    ({animatedTiming, type}: ProcessStepItemAnimatedTimingOptions) =>
    ({labelHeightSharedValue, labelTextColorSharedValue}: ProcessStepItemAnimatedTimingSharedValue) =>
    (value?: boolean) => {
        if (!(type === 'segment' && typeof value === 'boolean')) {
            return
        }

        const toValue = value ? 1 : 0

        animatedTiming()(labelTextColorSharedValue)(toValue)
        animatedTiming({
            duration: value ? 'medium0' : 'short3',
            easing: value ? 'standardDecelerate' : 'standardAccelerate'
        })(labelHeightSharedValue)(toValue)
    }

export const useStepItemAnimated = ({active, type}: UseStepItemAnimatedOptions) => {
    const labelValue = active ? 1 : 0
    const theme = useTheme()
    const {palette, scheme, typography, spacing} = theme.token
    const {convertHexToRGBA} = palette
    const animatedTiming = useAnimatedTiming(theme.token)
    const labelHeightSharedValue = useSharedValue(labelValue)
    const labelTextColorSharedValue = useSharedValue(labelValue)
    const labelHeightOutputRange = [
        theme.adaptSize(spacing.none),
        theme.adaptSize(typography.label.medium.lineHeight + spacing.small)
    ]

    const labelAnimatedStyle = useAnimatedStyle(() => ({
        height: interpolate(labelHeightSharedValue.value, [0, 1], labelHeightOutputRange, Extrapolation.CLAMP)
    }))

    const labelTextColorOutputRange = [
        convertHexToRGBA(scheme.onSurfaceVariant)(1),
        convertHexToRGBA(scheme.onSurface)(1)
    ]

    const labelTextAnimatedStyle = useAnimatedStyle(() => ({
        color: interpolateColor(labelTextColorSharedValue.value, [0, 1], labelTextColorOutputRange)
    }))

    const onStepItemAnimatedTiming = useMemo(
        () =>
            processStepItemAnimatedTiming({
                animatedTiming,
                type
            })({labelHeightSharedValue, labelTextColorSharedValue}),
        [animatedTiming, labelHeightSharedValue, labelTextColorSharedValue, type]
    )

    useEffect(() => {
        onStepItemAnimatedTiming(active)
    }, [active, onStepItemAnimatedTiming])

    return {labelAnimatedStyle, labelTextAnimatedStyle}
}
