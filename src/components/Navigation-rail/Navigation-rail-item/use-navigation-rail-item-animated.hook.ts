import {useEffect, useMemo} from 'react'
import {interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {handleNavigationRailItemAnimatedTiming} from './Navigation-rail-item-handle'
import {UseNavigationRailItemAnimatedOptions} from './Navigation-rail-item.interface'

export const useNavigationRailItemAnimated = ({active, type}: UseNavigationRailItemAnimatedOptions) => {
        const labelValue = active ? 1 : 0
        const theme = useTheme()
        const {palette, scheme, typography, spacing, opacity} = theme.token
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
                convertHexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                convertHexToRGBA(scheme.onSurface)(opacity.level10)
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
                onNavigationRailItemAnimatedTiming(active)
        }, [active, onNavigationRailItemAnimatedTiming])

        return {labelAnimatedStyle, labelTextAnimatedStyle}
}
