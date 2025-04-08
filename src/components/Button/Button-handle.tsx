import {WritableDraft} from 'immer'
import {cloneElement} from 'react'
import {SharedValue} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {Updater} from 'use-immer'
import {StateEvent} from '../../hooks'
import {EventName, State} from '../Common'
import {ElevationLevel} from '../Elevation'
import {IconProps} from '../Icon'
import {ButtonType} from './Button.enum'
import {
        ButtonState,
        HandleButtonAnimatedTimingOptions,
        HandleButtonAnimatedTimingSharedValue,
        HandleButtonStateChangeOptions,
        RenderButtonIconOptions
} from './Button.interface'

export const handleButtonStatus = (setState: Updater<ButtonState>) => (disabled?: boolean) => (type?: ButtonType) =>
        setState(draft => {
                if (draft.status !== 'idle') {
                        return
                }

                if (type === ButtonType.ELEVATED && !disabled) {
                        draft.elevation = ElevationLevel.LEVEL_1
                }

                draft.status = 'succeeded'
        })

export const handleButtonElevation = (draft: WritableDraft<ButtonState>) => (type?: ButtonType) => (state?: State) => {
        const elevationType = type && [ButtonType.ELEVATED, ButtonType.FILLED, ButtonType.TONAL].includes(type)

        if (!elevationType) {
                return
        }

        const level = {
                disabled: ElevationLevel.LEVEL_0,
                enabled: ElevationLevel.LEVEL_0,
                error: ElevationLevel.LEVEL_0,
                focused: ElevationLevel.LEVEL_0,
                hovered: ElevationLevel.LEVEL_1,
                longPressIn: ElevationLevel.LEVEL_0,
                pressIn: ElevationLevel.LEVEL_0
        }

        const correctionCoefficient = type === ButtonType.ELEVATED ? ElevationLevel.LEVEL_1 : ElevationLevel.LEVEL_0

        if (!state) {
                return
        }

        draft.elevation = (state === 'disabled' ? level[state] : level[state] + correctionCoefficient) as ElevationLevel
}

export const handleButtonStateChange =
        ({eventName, type, state}: HandleButtonStateChangeOptions) =>
        (setState: Updater<ButtonState>) =>
        (_event: StateEvent) => {
                if (eventName === 'layout') {
                        return
                }

                setState(draft => {
                        const prevEventName = draft.eventName

                        draft.eventName = eventName

                        if (prevEventName !== eventName) {
                                handleButtonElevation(draft)(type)(state)
                        }
                })
        }

export const handleButtonDisabled = (setState: Updater<ButtonState>) => (type?: ButtonType) => (disabled?: boolean) =>
        typeof disabled === 'boolean' &&
        setState(draft => {
                if (disabled) {
                        draft.eventName = 'none'
                }

                if (type === ButtonType.ELEVATED) {
                        draft.elevation = disabled ? ElevationLevel.LEVEL_0 : ElevationLevel.LEVEL_1
                }
        })

export const handleButtonUnderlayColor = (theme: DefaultTheme) => {
        const underlay = {
                [ButtonType.ELEVATED]: theme.token.scheme.primary,
                [ButtonType.FILLED]: theme.token.scheme.onPrimary,
                [ButtonType.LINK]: theme.token.scheme.primary,
                [ButtonType.OUTLINED]: theme.token.scheme.primary,
                [ButtonType.TEXT]: theme.token.scheme.primary,
                [ButtonType.TONAL]: theme.token.scheme.onSecondaryContainer
        }

        return (type: ButtonType) => underlay[type]
}

export const renderButtonIcon =
        ({disabled, eventName, type = ButtonType.FILLED, id}: RenderButtonIconOptions) =>
        (theme: DefaultTheme) => {
                const fillType = {
                        [ButtonType.ELEVATED]: theme.token.scheme.primary,
                        [ButtonType.FILLED]: theme.token.scheme.onPrimary,
                        [ButtonType.LINK]: theme.token.scheme.primary,
                        [ButtonType.TEXT]: theme.token.scheme.primary,
                        [ButtonType.TONAL]: theme.token.scheme.onSecondaryContainer
                } as Record<ButtonType, string>

                return (icon?: React.JSX.Element) => {
                        if (!icon) {
                                return icon
                        }

                        const size = theme.adaptSize(theme.token.spacing.large + -1.5 * theme.token.spacing.extraSmall)

                        return cloneElement<IconProps>(icon, {
                                disabled,
                                eventName,
                                fill: fillType[type],
                                size,
                                testID: `button__icon--${id}`
                        })
                }
        }

export const handleButtonOutlinedAnimatedTiming = ({
        animatedTiming,
        borderColorInputRanges,
        disabled
}: HandleButtonAnimatedTimingOptions) => {
        const value = disabled ? 0 : borderColorInputRanges[borderColorInputRanges.length - 2]

        return (borderSharedValue: SharedValue<number>) => (eventName?: EventName) => {
                const responseEvent = eventName === 'focus'
                const toValue = responseEvent ? borderColorInputRanges[2] : value

                return animatedTiming()(borderSharedValue)(toValue)
        }
}

export const handleButtonAnimatedTiming = ({
        animatedTiming,
        borderColorInputRanges,
        disabled,
        type
}: HandleButtonAnimatedTimingOptions) => {
        const toValue = disabled ? 0 : 1

        return ({borderSharedValue, colorSharedValue}: HandleButtonAnimatedTimingSharedValue) =>
                (eventName?: EventName) => {
                        if (type === ButtonType.OUTLINED) {
                                handleButtonOutlinedAnimatedTiming({animatedTiming, borderColorInputRanges, disabled})(
                                        borderSharedValue
                                )(eventName)

                                animatedTiming()(colorSharedValue)(toValue)

                                return
                        }

                        animatedTiming()(colorSharedValue)(toValue)
                }
}
