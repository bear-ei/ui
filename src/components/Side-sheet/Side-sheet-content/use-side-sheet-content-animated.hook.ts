import {useEffect, useMemo} from 'react'
import {SharedValue, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, useAnimatedTiming} from '../../../hooks'
import {UseSideSheetContentAnimatedOptions} from './Side-sheet-content.interface'

const handleSideSheetContentVisibleAnimatedTiming =
        (animatedTiming: AnimatedTiming) =>
        (backgroundColorSharedValue: SharedValue<number>) =>
        (visible?: boolean) => {
                if (typeof visible !== 'boolean') {
                        return
                }

                const toValue = visible ? 1 : 0

                animatedTiming()(backgroundColorSharedValue)(toValue)
        }

const handleSideSheetContentFooterVisibleAnimatedTiming =
        (animatedTiming: AnimatedTiming) => (footerSharedValue: SharedValue<number>) => (footerVisible?: boolean) => {
                if (typeof footerVisible === 'boolean') {
                        animatedTiming({
                                duration: footerVisible ? 'medium3' : 'short3',
                                easing: footerVisible ? 'emphasizedDecelerate' : 'emphasizedAccelerate'
                        })(footerSharedValue)(footerVisible ? 1 : 0)
                }
        }

export const useSideSheetContentAnimated = ({
        footerVisible,
        type = 'standard',
        visible
}: UseSideSheetContentAnimatedOptions) => {
        const animatedValue = visible ? 1 : 0
        const theme = useTheme()
        const {palette, scheme, spacing, opacity} = theme.token
        const {convertHexToRGBA} = palette
        const animatedTiming = useAnimatedTiming({token: theme.token})
        const backgroundColorSharedValue = useSharedValue(animatedValue)
        const footerSharedValue = useSharedValue(footerVisible ? 1 : 0)
        const standard = ['standard', 'standardContainer'].includes(type)
        const containerBackgroundColorOutputRange = [
                convertHexToRGBA(scheme.scrim)(opacity.level0),
                standard ?
                        convertHexToRGBA(scheme.scrim)(opacity.level0)
                :       convertHexToRGBA(scheme.scrim)(opacity.level4)
        ]

        const containerAnimatedStyle = useAnimatedStyle(() => ({
                backgroundColor: interpolateColor(
                        backgroundColorSharedValue.value,
                        [0, 1],
                        containerBackgroundColorOutputRange
                )
        }))

        const footerTranslateYOutputRange = [-theme.adaptSize(spacing.extraSmall * 20), theme.adaptSize(spacing.none)]
        const footerAnimatedStyle = useAnimatedStyle(() => ({
                bottom: interpolate(footerSharedValue.value, [0, 1], footerTranslateYOutputRange)
        }))

        const onSideSheetContentVisibleAnimatedTiming = useMemo(
                () => handleSideSheetContentVisibleAnimatedTiming(animatedTiming)(backgroundColorSharedValue),
                [animatedTiming, backgroundColorSharedValue]
        )

        const onSideSheetContentFooterVisibleAnimatedTiming = useMemo(
                () => handleSideSheetContentFooterVisibleAnimatedTiming(animatedTiming)(footerSharedValue),
                [animatedTiming, footerSharedValue]
        )

        useEffect(() => {
                onSideSheetContentVisibleAnimatedTiming(visible)
        }, [onSideSheetContentVisibleAnimatedTiming, visible])

        useEffect(() => {
                onSideSheetContentFooterVisibleAnimatedTiming(footerVisible)
        }, [footerVisible, onSideSheetContentFooterVisibleAnimatedTiming])

        return {containerAnimatedStyle, footerAnimatedStyle}
}
