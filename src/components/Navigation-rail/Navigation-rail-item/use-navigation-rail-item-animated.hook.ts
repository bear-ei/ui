import {useEffect, useMemo} from 'react'
import {InteractionManager} from 'react-native'
import {interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {
        HandleNavigationRailItemAnimatedTimingOptions,
        HandleNavigationRailItemAnimatedTimingSharedValue,
        UseNavigationRailItemAnimatedOptions
} from './Navigation-rail-item.interface'

const handleNavigationRailItemAnimatedTiming =
        ({animatedTiming, type}: HandleNavigationRailItemAnimatedTimingOptions) =>
        ({labelHeightSharedValue, labelTextColorSharedValue}: HandleNavigationRailItemAnimatedTimingSharedValue) =>
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

export const useNavigationRailItemAnimated = ({active, type}: UseNavigationRailItemAnimatedOptions) => {
        const labelValue = active ? 1 : 0
        const theme = useTheme()
        const {palette, scheme, typography, spacing} = theme.token
        const {convertHexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const labelHeightSharedValue = useSharedValue(labelValue)
        const labelTextColorSharedValue = useSharedValue(labelValue)
        const labelHeightOutputRange = [
                theme.adaptSize(spacing.none),
                theme.adaptSize(typography.label.medium.lineHeight + spacing.small)
        ]

        const labelAnimatedStyle = useAnimatedStyle(() => ({
                height: interpolate(labelHeightSharedValue.value, [0, 1], labelHeightOutputRange)
        }))

        const labelTextColorOutputRange = [
                convertHexToRGBA(scheme.onSurfaceVariant)(1),
                convertHexToRGBA(scheme.onSurface)(1)
        ]

        const labelTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(labelTextColorSharedValue.value, [0, 1], labelTextColorOutputRange)
        }))

        const onNavigationRailItemAnimatedTiming = useMemo(
                () =>
                        handleNavigationRailItemAnimatedTiming({
                                animatedTiming,
                                type
                        })({labelHeightSharedValue, labelTextColorSharedValue}),
                [animatedTiming, labelHeightSharedValue, labelTextColorSharedValue, type]
        )

        useEffect(() => {
                InteractionManager.runAfterInteractions(() => onNavigationRailItemAnimatedTiming(active))
        }, [active, onNavigationRailItemAnimatedTiming])

        return {labelAnimatedStyle, labelTextAnimatedStyle}
}
