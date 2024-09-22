import {useEffect, useMemo} from 'react'
import {
    AnimatableValue,
    Extrapolation,
    SharedValue,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated'
import {useTheme} from 'styled-components/native'
import {AnimatedTiming, AnimatedTimingOptions, useAnimatedTiming} from '../../../hook'
import {
    ProcessSideSheetContentVisibleAnimatedTimingSharedValue,
    UseSideSheetContentAnimatedOptions
} from './Side-sheet-content.interface'

const processSideSheetContentVisibleAnimatedTiming =
    (animatedTiming: AnimatedTiming) =>
    ({
        backgroundColorSharedValue,
        contentTranslateXSharedValue,
        widthSharedValue
    }: ProcessSideSheetContentVisibleAnimatedTimingSharedValue) =>
    (visible?: boolean) => {
        if (typeof visible !== 'boolean') {
            return
        }

        const toValue = visible ? 1 : 0
        const animatedTimingOptions = {
            duration: visible ? 'medium3' : 'short3',
            easing: visible ? 'emphasizedDecelerate' : 'emphasizedAccelerate'
        } as AnimatedTimingOptions

        animatedTiming(animatedTimingOptions)(backgroundColorSharedValue)(toValue)
        animatedTiming(animatedTimingOptions)(contentTranslateXSharedValue)(toValue)
        animatedTiming(animatedTimingOptions)(widthSharedValue)(toValue)
    }

const processSideSheetContentFooterVisibleAnimatedTiming =
    (animatedTiming: AnimatedTiming) =>
    (footerHeightSharedValue: SharedValue<AnimatableValue>) =>
    (footerVisible?: boolean) =>
        typeof footerVisible === 'boolean' &&
        animatedTiming({
            duration: footerVisible ? 'medium0' : 'short3',
            easing: footerVisible ? 'standardDecelerate' : 'standardAccelerate'
        })(footerHeightSharedValue)(footerVisible ? 1 : 0)

export const useSideSheetContentAnimated = ({
    densityScale = 0,
    footerVisible,
    sheetPosition,
    type,
    visible
}: UseSideSheetContentAnimatedOptions) => {
    const animatedValue = visible ? 1 : 0
    const theme = useTheme()
    const {palette, scheme, spacing} = theme.token
    const {convertHexToRGBA} = palette
    const animatedTiming = useAnimatedTiming(theme.token)
    const backgroundColorSharedValue = useSharedValue(animatedValue)
    const footerHeightSharedValue = useSharedValue(footerVisible ? 1 : 0)
    const contentTranslateXSharedValue = useSharedValue(animatedValue)
    const widthSharedValue = useSharedValue(animatedValue)
    const containerBackgroundColorOutputRange = [
        convertHexToRGBA(scheme.scrim)(0),
        type === 'standard' ? convertHexToRGBA(scheme.scrim)(0) : convertHexToRGBA(scheme.scrim)(0.32)
    ]

    const contentWidth = theme.adaptSize(spacing.extraSmall * 80 + densityScale * spacing.extraSmall)
    const containerWidthOutputRange = [theme.adaptSize(spacing.none), contentWidth]
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            backgroundColorSharedValue.value,
            [0, 1],
            containerBackgroundColorOutputRange
        ),
        ...(type === 'standard' && {
            width: interpolate(widthSharedValue.value, [0, 1], containerWidthOutputRange, Extrapolation.CLAMP)
        })
    }))

    const contentTranslateXOutputRange = [
        sheetPosition === 'horizontalEnd' ? contentWidth : -contentWidth,
        theme.adaptSize(spacing.none)
    ]

    const contentAnimatedStyle = useAnimatedStyle(() => ({
        ...(type === 'modal' && {
            transform: [
                {
                    translateX: interpolate(
                        contentTranslateXSharedValue.value,
                        [0, 1],
                        contentTranslateXOutputRange,
                        Extrapolation.CLAMP
                    )
                }
            ]
        })
    }))

    const footerHeightOutputRange = [theme.adaptSize(spacing.none), theme.adaptSize(spacing.extraSmall * 20)]
    const footerAnimatedStyle = useAnimatedStyle(() => ({
        height: interpolate(footerHeightSharedValue.value, [0, 1], footerHeightOutputRange, Extrapolation.CLAMP)
    }))

    const onSideSheetContentVisibleAnimatedTiming = useMemo(
        () =>
            processSideSheetContentVisibleAnimatedTiming(animatedTiming)({
                backgroundColorSharedValue,
                contentTranslateXSharedValue,
                widthSharedValue
            }),
        [animatedTiming, backgroundColorSharedValue, contentTranslateXSharedValue, widthSharedValue]
    )

    const onSideSheetContentFooterVisibleAnimatedTiming = useMemo(
        () => processSideSheetContentFooterVisibleAnimatedTiming(animatedTiming)(footerHeightSharedValue),
        [animatedTiming, footerHeightSharedValue]
    )

    useEffect(() => {
        onSideSheetContentVisibleAnimatedTiming(visible)
    }, [onSideSheetContentVisibleAnimatedTiming, visible])

    useEffect(() => {
        onSideSheetContentFooterVisibleAnimatedTiming(footerVisible)
    }, [footerVisible, onSideSheetContentFooterVisibleAnimatedTiming])

    return {containerAnimatedStyle, contentAnimatedStyle, footerAnimatedStyle}
}
