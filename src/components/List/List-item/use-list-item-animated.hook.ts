import {useEffect, useMemo} from 'react'
import {SharedValue, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
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
        (contentLeftSharedValue: SharedValue<number>) =>
        (value?: boolean) =>
                animatedTiming({
                        callback: (finished?: boolean) => {
                                if (finished) {
                                        onListItemAfterAffordanceVisibleFinished?.(value)
                                }
                        }
                })(contentLeftSharedValue)(value ? 1 : 0)

const handleListItemActiveAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (headlineTextSharedValue: SharedValue<number>) => (value?: boolean) =>
                animatedTiming()(headlineTextSharedValue)(value ? 1 : 0)

export const useListItemAnimated = ({
        active,
        afterAffordanceVisible,
        onListItemAfterAffordanceVisibleFinished
}: UseListItemAnimatedOptions) => {
        const theme = useTheme()
        const {spacing, palette, scheme, opacity} = theme.token
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const contentLeftSharedValue = useSharedValue(0)
        const headlineTextSharedValue = useSharedValue(active ? 1 : 0)
        const contentLeftOutputRange = [theme.adaptSize(spacing.none), -theme.adaptSize(spacing.extraSmall * 28)]
        const contentAnimatedStyle = useAnimatedStyle(() => ({
                left: interpolate(contentLeftSharedValue.value, [0, 1], contentLeftOutputRange)
        }))

        const headlineTextColorOutputRange = [
                palette.convertHexToRGBA(scheme.onSurface)(opacity.level10),
                palette.convertHexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
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
                onListItemAfterAffordanceVisibleAnimatedTiming(afterAffordanceVisible)
        }, [afterAffordanceVisible, onListItemAfterAffordanceVisibleAnimatedTiming])

        useEffect(() => {
                onListItemActiveAnimatedTiming(active)
        }, [active, onListItemActiveAnimatedTiming])

        return {contentAnimatedStyle, headlineTextAnimatedStyle}
}
