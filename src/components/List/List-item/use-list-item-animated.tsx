import {useEffect, useMemo} from 'react'
import {
    AnimatableValue,
    Extrapolation,
    SharedValue,
    interpolate,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {HandleListItemAfterAffordanceVisibleAnimatedOptions, UseListItemAnimatedOptions} from './List-item.interface'

const handleListAfterAffordanceVisibleAnimated =
    ({animatedTiming, onListItemAfterAffordanceVisibleFinished}: HandleListItemAfterAffordanceVisibleAnimatedOptions) =>
    (contentLeftSharedValue: SharedValue<AnimatableValue>) =>
    (value?: boolean) =>
        animatedTiming({
            callback: (finished?: boolean) => finished && onListItemAfterAffordanceVisibleFinished?.(value),
            duration: value ? 'medium0' : 'short3',
            easing: value ? 'standardDecelerate' : 'standardAccelerate'
        })(contentLeftSharedValue)(value ? 1 : 0)

export const useListItemAnimated = ({
    afterAffordanceVisible,
    onListItemAfterAffordanceVisibleFinished
}: UseListItemAnimatedOptions) => {
    const theme = useTheme()
    const {spacing} = theme.token
    const animatedTiming = useAnimatedTiming(theme.token)
    const contentLeftSharedValue = useSharedValue(0)
    const contentLeftOutputRange = [theme.adaptSize(spacing.none), -theme.adaptSize(spacing.extraSmall * 28)]
    const contentAnimatedStyle = useAnimatedStyle(() => ({
        left: interpolate(contentLeftSharedValue.value, [0, 1], contentLeftOutputRange, Extrapolation.CLAMP)
    }))

    const onListAfterAffordanceVisibleAnimated = useMemo(
        () =>
            handleListAfterAffordanceVisibleAnimated({animatedTiming, onListItemAfterAffordanceVisibleFinished})(
                contentLeftSharedValue
            ),
        [animatedTiming, contentLeftSharedValue, onListItemAfterAffordanceVisibleFinished]
    )

    useEffect(() => {
        onListAfterAffordanceVisibleAnimated(afterAffordanceVisible)
    }, [afterAffordanceVisible, onListAfterAffordanceVisibleAnimated])

    return contentAnimatedStyle
}
