import {COMPONENT_STATUS} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {platformValue} from '@/utils'
import {hexToRGBA} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import type {ViewStyle} from 'react-native'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {animateNavigationRailItem} from './Navigation-rail-item.handler'
import type {UseNavigationRailItemAnimatedOptions} from './Navigation-rail-item.interface'

export const useNavigationRailItemAnimated = ({active, type, status}: UseNavigationRailItemAnimatedOptions) => {
        const theme = useTheme()
        const {scheme, opacity} = theme.token
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
        const contentTranslateYSharedValue = useSharedValue(active ? 1 : 0)
        const labelTextSharedValue = useSharedValue(active ? 1 : 0)
        const labelTextColorOutputRanges = [
                hexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                hexToRGBA(scheme.onSurface)(opacity.level10)
        ]

        const contentTranslateYOutputRanges = [
                theme.token.spacing.medium + -1 * theme.token.spacing.extraSmall,
                theme.token.spacing.none
        ]

        const labelTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(labelTextSharedValue.value, [0, 1], labelTextColorOutputRanges),
                opacity: interpolate(labelTextSharedValue.value, [0, 1], [0, 1])
        }))

        const contentAnimatedStyle = useAnimatedStyle(
                () =>
                        ({
                                transform: [
                                        {
                                                translateY: platformValue(
                                                        interpolate(
                                                                contentTranslateYSharedValue.value,
                                                                [0, 1],
                                                                contentTranslateYOutputRanges
                                                        )
                                                )
                                        }
                                ]
                        }) as ViewStyle
        )

        const runAnimate = useMemo(
                () =>
                        animateNavigationRailItem({animateSharedValueTo, type})({
                                contentTranslateYSharedValue,
                                labelTextSharedValue
                        }),
                [animateSharedValueTo, contentTranslateYSharedValue, labelTextSharedValue, type]
        )

        useEffect(() => {
                if (status === COMPONENT_STATUS.SUCCEEDED) {
                        runAnimate(active)
                }
        }, [active, runAnimate, status])

        useEffect(
                () => () => {
                        requestIdleCallback(() => {
                                cancelAnimation(contentTranslateYSharedValue)
                                cancelAnimation(labelTextSharedValue)
                        })
                },
                [contentTranslateYSharedValue, labelTextSharedValue]
        )

        return {labelTextAnimatedStyle, contentAnimatedStyle}
}
