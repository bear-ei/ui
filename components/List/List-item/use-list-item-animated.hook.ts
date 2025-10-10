import {COMPONENT_STATUS} from '@/constants'
import {useAnimatedTiming, useTheme} from '@/hooks'
import {hexToRGBA} from '@bearei/theme-token'
import {useEffect, useMemo} from 'react'
import {cancelAnimation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {animateListItemActiveState, animateListItemAffordanceVisibility} from './List-item.handler'
import type {UseListItemAnimatedOptions} from './List-item.interface'

export const useListItemAnimated = ({active, afterAffordanceVisible, status}: UseListItemAnimatedOptions) => {
        const theme = useTheme()
        const {spacing, scheme, opacity} = theme.token
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const animateSharedValueTo = useMemo(() => animatedTiming(), [animatedTiming])
        const contentTransformXSharedValue = useSharedValue(0)
        const headlineTextSharedValue = useSharedValue(active ? 1 : 0)
        const contentTranslateXOutputRanges = [spacing.none, -spacing.extraSmall * 40]
        const contentAnimatedStyle = useAnimatedStyle(() => ({
                transform: [
                        {
                                translateX: interpolate(
                                        contentTransformXSharedValue.value,
                                        [0, 1],
                                        contentTranslateXOutputRanges
                                )
                        }
                ]
        }))

        const headlineTextColorOutputRanges = [
                hexToRGBA(scheme.onSurface)(opacity.level10),
                hexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
        ]

        const headlineTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(headlineTextSharedValue.value, [0, 1], headlineTextColorOutputRanges)
        }))

        const runAnimateVisibility = useMemo(
                () => animateListItemAffordanceVisibility(animateSharedValueTo)(contentTransformXSharedValue),
                [animateSharedValueTo, contentTransformXSharedValue]
        )

        const runAnimateActiveState = useMemo(
                () => animateListItemActiveState(animateSharedValueTo)(headlineTextSharedValue),
                [animateSharedValueTo, headlineTextSharedValue]
        )

        useEffect(() => {
                if (status === COMPONENT_STATUS.SUCCEEDED) {
                        runAnimateVisibility(afterAffordanceVisible)
                }
        }, [afterAffordanceVisible, runAnimateVisibility, status])

        useEffect(() => {
                if (status === COMPONENT_STATUS.SUCCEEDED) {
                        runAnimateActiveState(active)
                }
        }, [active, runAnimateActiveState, status])

        useEffect(
                () => () => {
                        cancelAnimation(contentTransformXSharedValue)
                        cancelAnimation(headlineTextSharedValue)
                },
                [contentTransformXSharedValue, headlineTextSharedValue]
        )

        return {contentAnimatedStyle, headlineTextAnimatedStyle}
}
