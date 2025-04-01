import {WritableDraft} from 'immer'
import {cloneElement} from 'react'
import {SharedValue} from 'react-native-reanimated'
import {DefaultTheme} from 'styled-components/native'
import {Updater} from 'use-immer'
import {StateEvent} from '../../hooks'
import {EventName, State} from '../Common'
import {ElevationLevel} from '../Elevation'
import {IconProps} from '../Icon'
import {
        ButtonState,
        ButtonType,
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

                if (type === 'elevated' && !disabled) {
                        draft.elevation = 1
                }

                draft.status = 'succeeded'
        })

export const handleButtonElevation = (draft: WritableDraft<ButtonState>) => (type?: ButtonType) => (state?: State) => {
        const elevationType = type && ['elevated', 'filled', 'tonal'].includes(type)

        if (!elevationType) {
                return
        }

        const level = {
                disabled: 0,
                enabled: 0,
                error: 0,
                focused: 0,
                hovered: 1,
                longPressIn: 0,
                pressIn: 0
        }

        const correctionCoefficient = type === 'elevated' ? 1 : 0

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

                if (type === 'elevated') {
                        draft.elevation = disabled ? 0 : 1
                }
        })

export const handleButtonUnderlayColor = (theme: DefaultTheme) => {
        const underlay = {
                elevated: theme.token.scheme.primary,
                filled: theme.token.scheme.onPrimary,
                link: theme.token.scheme.primary,
                outlined: theme.token.scheme.primary,
                text: theme.token.scheme.primary,
                tonal: theme.token.scheme.onSecondaryContainer
        }

        return (type: ButtonType) => underlay[type]
}

export const renderButtonIcon =
        ({disabled, eventName, type = 'filled', id}: RenderButtonIconOptions) =>
        (theme: DefaultTheme) => {
                const fillType = {
                        elevated: theme.token.scheme.primary,
                        filled: theme.token.scheme.onPrimary,
                        outlined: theme.token.scheme.primary,
                        text: theme.token.scheme.primary,
                        tonal: theme.token.scheme.onSecondaryContainer
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
                        if (type === 'outlined') {
                                handleButtonOutlinedAnimatedTiming({animatedTiming, borderColorInputRanges, disabled})(
                                        borderSharedValue
                                )(eventName)

                                animatedTiming()(colorSharedValue)(toValue)

                                return
                        }

                        animatedTiming()(colorSharedValue)(toValue)
                }
}
