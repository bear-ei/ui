import {useEffect, useMemo} from 'react'
import {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {useAnimatedTiming} from '../../hooks'
import {handleIconButtonAnimatedTiming} from './Icon-button-handle'
import {IconButtonType} from './Icon-button.enum'
import {UseIconButtonAnimatedOptions} from './Icon-button.interface'

export const useIconButtonAnimated = ({disabled, type = IconButtonType.FILLED}: UseIconButtonAnimatedOptions) => {
        const animatedValue = disabled ? 0 : 1
        const borderSharedValue = useSharedValue(animatedValue)
        const colorSharedValue = useSharedValue(animatedValue)
        const theme = useTheme()
        const {palette, scheme, opacity} = theme.token
        const {hexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const disabledBackgroundColor = hexToRGBA(scheme.onSurface)(opacity.level2)
        const backgroundColorType = {
                [IconButtonType.FILLED]: {
                        inputRanges: [0, 1],
                        outputRanges: [disabledBackgroundColor, hexToRGBA(scheme.primary)(opacity.level10)]
                },
                [IconButtonType.OUTLINED]: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                hexToRGBA(scheme.primary)(opacity.level0),
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                [IconButtonType.STANDARD]: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                hexToRGBA(scheme.primary)(opacity.level0),
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                },
                [IconButtonType.TONAL]: {
                        inputRanges: [0, 1],
                        outputRanges: [disabledBackgroundColor, hexToRGBA(scheme.secondaryContainer)(opacity.level10)]
                },
                [IconButtonType.ACTIVE]: {
                        inputRanges: [0, 1],
                        outputRanges: [
                                hexToRGBA(scheme.primary)(opacity.level0),
                                hexToRGBA(scheme.primary)(opacity.level0)
                        ]
                }
        }

        const borderWidth = theme.adaptSize(theme.token.spacing.extraSmall / 4)
        const backgroundUnderlayAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(
                        colorSharedValue.value,
                        backgroundColorType[type].inputRanges,
                        backgroundColorType[type].outputRanges
                ),
                ...(type === IconButtonType.OUTLINED && {
                        borderColor: interpolateColor(
                                borderSharedValue.value,
                                [0, 1],
                                [disabledBackgroundColor, scheme.outline]
                        ),
                        borderStyle: 'solid',
                        borderWidth
                })
        }))

        const onIconButtonAnimatedTiming = useMemo(
                () =>
                        handleIconButtonAnimatedTiming({animatedTiming, type})({
                                borderSharedValue,
                                colorSharedValue
                        }),
                [animatedTiming, borderSharedValue, colorSharedValue, type]
        )

        useEffect(() => {
                onIconButtonAnimatedTiming(disabled)
        }, [disabled, onIconButtonAnimatedTiming, type])

        return {backgroundUnderlayAnimatedStyle}
}
