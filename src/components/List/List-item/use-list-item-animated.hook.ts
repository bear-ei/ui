import {useEffect, useMemo} from 'react'
import {InteractionManager} from 'react-native'
import {
        AnimatableValue,
        SharedValue,
        interpolate,
        interpolateColor,
        useAnimatedStyle,
        useSharedValue
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../../hooks'
import {
        HandleListItemAfterAffordanceVisibleAnimatedTimingOptions,
        UseListItemAnimatedOptions
} from './List-item.interface'

const handleListItemAfterAffordanceVisibleAnimatedTiming =
        ({
                animatedTiming,
                onListItemAfterAffordanceVisibleFinished
        }: HandleListItemAfterAffordanceVisibleAnimatedTimingOptions) =>
        (contentLeftSharedValue: SharedValue<AnimatableValue>) =>
        (value?: boolean) =>
                animatedTiming({
                        callback: (finished?: boolean) => {
                                if (finished) {
                                        onListItemAfterAffordanceVisibleFinished?.(value)
                                }
                        },
                        duration: value ? 'medium0' : 'short3',
                        easing: value ? 'standardDecelerate' : 'standardAccelerate'
                })(contentLeftSharedValue)(value ? 1 : 0)

const handleListItemActiveAnimatedTiming =
        (animatedTiming: AnimatedTiming) =>
        (headlineTextSharedValue: SharedValue<AnimatableValue>) =>
        (value?: boolean) =>
                animatedTiming()(headlineTextSharedValue)(value ? 1 : 0)

export const useListItemAnimated = ({
        active,
        afterAffordanceVisible,
        onListItemAfterAffordanceVisibleFinished
}: UseListItemAnimatedOptions) => {
        const theme = useTheme()
        const {spacing, palette, scheme} = theme.token
        const animatedTiming = useAnimatedTiming(theme.token)
        const contentLeftSharedValue = useSharedValue(0)
        const headlineTextSharedValue = useSharedValue(active ? 1 : 0)
        const contentLeftOutputRange = [theme.adaptSize(spacing.none), -theme.adaptSize(spacing.extraSmall * 28)]
        const contentAnimatedStyle = useAnimatedStyle(() => ({
                left: interpolate(contentLeftSharedValue.value, [0, 1], contentLeftOutputRange)
        }))

        const headlineTextColorOutputRange = [
                palette.convertHexToRGBA(scheme.onSurface)(1),
                palette.convertHexToRGBA(scheme.onSecondaryContainer)(1)
        ]

        const headlineTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(headlineTextSharedValue.value, [0, 1], headlineTextColorOutputRange)
        }))

        const onListItemAfterAffordanceVisibleAnimatedTiming = useMemo(
                () =>
                        handleListItemAfterAffordanceVisibleAnimatedTiming({
                                animatedTiming,
                                onListItemAfterAffordanceVisibleFinished
                        })(contentLeftSharedValue),
                [animatedTiming, contentLeftSharedValue, onListItemAfterAffordanceVisibleFinished]
        )

        const onListItemActiveAnimatedTiming = useMemo(
                () => handleListItemActiveAnimatedTiming(animatedTiming)(headlineTextSharedValue),
                [animatedTiming, headlineTextSharedValue]
        )

        useEffect(() => {
                InteractionManager.runAfterInteractions(() =>
                        onListItemAfterAffordanceVisibleAnimatedTiming(afterAffordanceVisible)
                )
        }, [afterAffordanceVisible, onListItemAfterAffordanceVisibleAnimatedTiming])

        useEffect(() => {
                InteractionManager.runAfterInteractions(() => onListItemActiveAnimatedTiming(active))
        }, [active, onListItemActiveAnimatedTiming])

        return {contentAnimatedStyle, headlineTextAnimatedStyle}
}
