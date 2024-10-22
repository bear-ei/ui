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
import {
    AnimatedTiming,
    AnimatedTimingOptions,
    useAnimatedTiming
} from '../../../hooks'
import {
    HandleSideSheetContentVisibleAnimatedTimingSharedValue,
    UseSideSheetContentAnimatedOptions
} from './Side-sheet-content.interface'

const handleSideSheetContentVisibleAnimatedTiming =
    (animatedTiming: AnimatedTiming) =>
    ({
        backgroundColorSharedValue,
        contentTranslateXSharedValue,
        widthSharedValue
    }: HandleSideSheetContentVisibleAnimatedTimingSharedValue) =>
    (visible?: boolean) => {
        if (typeof visible !== 'boolean') {
            return
        }

        const toValue = visible ? 1 : 0
        const animatedTimingOptions = {
            duration: visible ? 'medium3' : 'short3',
            easing: visible ? 'emphasizedDecelerate' : 'emphasizedAccelerate'
        } as AnimatedTimingOptions

        animatedTiming(animatedTimingOptions)(backgroundColorSharedValue)(
            toValue
        )

        animatedTiming(animatedTimingOptions)(contentTranslateXSharedValue)(
            toValue
        )

        animatedTiming(animatedTimingOptions)(widthSharedValue)(toValue)
    }

const handleSideSheetContentFooterVisibleAnimatedTiming =
    (animatedTiming: AnimatedTiming) =>
    (footerHeightSharedValue: SharedValue<AnimatableValue>) =>
    (footerVisible?: boolean) => {
        if (typeof footerVisible === 'boolean') {
            animatedTiming({
                duration: footerVisible ? 'medium0' : 'short3',
                easing:
                    footerVisible ? 'standardDecelerate' : 'standardAccelerate'
            })(footerHeightSharedValue)(footerVisible ? 1 : 0)
        }
    }

export const useSideSheetContentAnimated = ({
    footerVisible,
    sheetPosition,
    type = 'standard',
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
    const standard = ['standard', 'standardContainer'].includes(type)
    const containerBackgroundColorOutputRange = [
        convertHexToRGBA(scheme.scrim)(0),
        standard ?
            convertHexToRGBA(scheme.scrim)(0)
        :   convertHexToRGBA(scheme.scrim)(0.32)
    ]

    const contentWidth = theme.adaptSize(spacing.extraSmall * 80)
    const containerWidthOutputRange = [
        theme.adaptSize(spacing.none),
        contentWidth
    ]

    const containerAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            backgroundColorSharedValue.value,
            [0, 1],
            containerBackgroundColorOutputRange
        ),
        ...(standard && {
            width: interpolate(
                widthSharedValue.value,
                [0, 1],
                containerWidthOutputRange
            )
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
                        contentTranslateXOutputRange
                    )
                }
            ]
        })
    }))

    const footerHeightOutputRange = [
        theme.adaptSize(spacing.none),
        theme.adaptSize(spacing.extraSmall * 20)
    ]

    const footerAnimatedStyle = useAnimatedStyle(() => ({
        height: interpolate(
            footerHeightSharedValue.value,
            [0, 1],
            footerHeightOutputRange
        )
    }))

    const onSideSheetContentVisibleAnimatedTiming = useMemo(
        () =>
            handleSideSheetContentVisibleAnimatedTiming(animatedTiming)({
                backgroundColorSharedValue,
                contentTranslateXSharedValue,
                widthSharedValue
            }),
        [
            animatedTiming,
            backgroundColorSharedValue,
            contentTranslateXSharedValue,
            widthSharedValue
        ]
    )

    const onSideSheetContentFooterVisibleAnimatedTiming = useMemo(
        () =>
            handleSideSheetContentFooterVisibleAnimatedTiming(animatedTiming)(
                footerHeightSharedValue
            ),
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
