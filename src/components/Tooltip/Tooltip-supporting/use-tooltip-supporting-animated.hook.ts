import {useEffect, useMemo} from 'react'
import {
    interpolate,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../../hooks'
import {
    HandleTooltipSupportingAnimatedTimingOptions,
    HandleTooltipSupportingAnimatedTimingSharedValue,
    UseTooltipSupportingAnimatedOptions
} from './Tooltip-supporting.interface'

const handleTooltipSupportingAnimatedTiming =
    ({
        animatedTiming,
        onClose,
        type
    }: HandleTooltipSupportingAnimatedTimingOptions) =>
    ({
        transformSharedValue,
        heightSharedValue,
        opacitySharedValue
    }: HandleTooltipSupportingAnimatedTimingSharedValue) =>
    (visible?: boolean) => {
        const toValue = visible ? 1 : 0

        if (typeof visible !== 'boolean') {
            return
        }

        if (type === 'menu') {
            animatedTiming()(heightSharedValue)(toValue)
        } else {
            animatedTiming()(transformSharedValue)(toValue)
        }

        animatedTiming({
            callback: (finished?: boolean) => {
                if (finished && !visible) {
                    onClose?.(true)
                }
            }
        })(opacitySharedValue)(toValue)
    }

export const useTooltipSupportingAnimated = ({
    height = 0,
    onClose,
    type = 'menu',
    visible
}: UseTooltipSupportingAnimatedOptions) => {
    const transformSharedValue = useSharedValue(visible ? 1 : 0)
    const heightSharedValue = useSharedValue(visible ? 1 : 0)
    const opacitySharedValue = useSharedValue(visible ? 1 : 0)
    const theme = useTheme()
    const animatedTiming = useAnimatedTiming(theme.token)
    const contentAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(opacitySharedValue.value, [0, 1], [0, 1]),

        ...(type === 'menu' ?
            {height: interpolate(heightSharedValue.value, [0, 1], [0, height])}
        :   {
                transform: [
                    {
                        scale: interpolate(
                            transformSharedValue.value,
                            [0, 1],
                            [0.8, 1]
                        )
                    }
                ]
            })
    }))

    const onTooltipSupportingAnimatedTiming = useMemo(
        () =>
            handleTooltipSupportingAnimatedTiming({
                animatedTiming,
                onClose,
                type
            })({
                heightSharedValue,
                opacitySharedValue,
                transformSharedValue
            }),
        [
            animatedTiming,
            heightSharedValue,
            onClose,
            opacitySharedValue,
            transformSharedValue,
            type
        ]
    )

    useEffect(() => {
        onTooltipSupportingAnimatedTiming(visible)
    }, [onTooltipSupportingAnimatedTiming, visible])

    return {contentAnimatedStyle}
}
