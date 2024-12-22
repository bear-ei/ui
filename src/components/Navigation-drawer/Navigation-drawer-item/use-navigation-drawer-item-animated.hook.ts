import {useEffect, useMemo} from 'react'
import {interpolateColor, SharedValue, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../../hooks'
import {UseNavigationDrawerItemAnimatedOptions} from './Navigation-drawer-item.interface'

const handleNavigationDrawerItemAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (labelTextColorSharedValue: SharedValue<number>) => (value?: boolean) => {
                const toValue = value ? 1 : 0

                animatedTiming()(labelTextColorSharedValue)(toValue)
        }

export const useNavigationDrawerItemAnimated = ({active}: UseNavigationDrawerItemAnimatedOptions) => {
        const labelValue = active ? 1 : 0
        const theme = useTheme()
        const {palette, scheme, opacity} = theme.token
        const {convertHexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const labelTextColorSharedValue = useSharedValue(labelValue)
        const labelTextColorOutputRange = [
                convertHexToRGBA(scheme.onSurfaceVariant)(opacity.level10),
                convertHexToRGBA(scheme.onSecondaryContainer)(opacity.level10)
        ]

        const labelTextAnimatedStyle = useAnimatedStyle(() => ({
                color: interpolateColor(labelTextColorSharedValue.value, [0, 1], labelTextColorOutputRange)
        }))

        const onNavigationDrawerItemAnimatedTiming = useMemo(
                () => handleNavigationDrawerItemAnimatedTiming(animatedTiming)(labelTextColorSharedValue),
                [animatedTiming, labelTextColorSharedValue]
        )

        useEffect(() => {
                onNavigationDrawerItemAnimatedTiming(active)
        }, [active, onNavigationDrawerItemAnimatedTiming])

        return {labelTextAnimatedStyle}
}
