import {useEffect, useMemo} from 'react'
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
import {HandleListItemAfterAffordanceVisibleAnimatedOptions, UseListItemAnimatedOptions} from './List-item.interface'

const handleListItemAfterAffordanceVisibleAnimated =
    ({animatedTiming, onListItemAfterAffordanceVisibleFinished}: HandleListItemAfterAffordanceVisibleAnimatedOptions) =>
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

const handleListItemActiveAnimated =
    (animatedTiming: AnimatedTiming) => (headlineTextSharedValue: SharedValue<AnimatableValue>) => (value?: boolean) =>
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

    const onListItemAfterAffordanceVisibleAnimated = useMemo(
        () =>
            handleListItemAfterAffordanceVisibleAnimated({animatedTiming, onListItemAfterAffordanceVisibleFinished})(
                contentLeftSharedValue
            ),
        [animatedTiming, contentLeftSharedValue, onListItemAfterAffordanceVisibleFinished]
    )

    const onListItemActiveAnimated = useMemo(
        () => handleListItemActiveAnimated(animatedTiming)(headlineTextSharedValue),
        [animatedTiming, headlineTextSharedValue]
    )

    useEffect(() => {
        onListItemAfterAffordanceVisibleAnimated(afterAffordanceVisible)
    }, [afterAffordanceVisible, onListItemAfterAffordanceVisibleAnimated])

    useEffect(() => {
        console.info(active, 'active')

        onListItemActiveAnimated(active)
    }, [active, onListItemActiveAnimated])

    return {contentAnimatedStyle, headlineTextAnimatedStyle}
}
