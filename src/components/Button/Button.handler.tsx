import {COMPONENT_STATUS, EVENT_NAME, type EventName, type State, STATE} from '@/constants'
import type {Theme} from '@/contexts'
import type {StateEvent} from '@/hooks'
import type {WritableDraft} from 'immer'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import {ELEVATION, type ElevationLevel} from '../Elevation'
import {BUTTON_TYPE} from './Button.enum'
import type {
    AnimateButtonOptions,
    AnimateButtonSharedValues,
    ButtonState,
    ButtonType,
    HandleButtonStateChangeOptions
} from './Button.interface'

export const updateButtonStatus = (disabled?: boolean) => (setState: Updater<ButtonState>) => (type?: ButtonType) =>
    setState(draft => {
        if (draft.status !== COMPONENT_STATUS.IDLE) {
            return
        }

        if (type === BUTTON_TYPE.ELEVATED && !disabled) {
            draft.elevation = ELEVATION.LEVEL_1
        }

        draft.status = COMPONENT_STATUS.SUCCEEDED
    })

export const updateButtonElevation = (draft: WritableDraft<ButtonState>) => (type?: ButtonType) => (state?: State) => {
    const isElevated =
        type && ([BUTTON_TYPE.ELEVATED, BUTTON_TYPE.FILLED, BUTTON_TYPE.TONAL] as readonly ButtonType[]).includes(type)

    if (!isElevated) {
        return
    }

    const level = {
        [STATE.DISABLED]: ELEVATION.LEVEL_0,
        [STATE.ENABLED]: ELEVATION.LEVEL_0,
        [STATE.ERROR]: ELEVATION.LEVEL_0,
        [STATE.FOCUSED]: ELEVATION.LEVEL_0,
        [STATE.HOVERED]: ELEVATION.LEVEL_1,
        [STATE.LONG_PRESS_IN]: ELEVATION.LEVEL_0,
        [STATE.PRESS_IN]: ELEVATION.LEVEL_0
    }

    const correctionCoefficient = type === BUTTON_TYPE.ELEVATED ? ELEVATION.LEVEL_1 : ELEVATION.LEVEL_0

    if (!state) {
        return
    }

    draft.elevation = (state === STATE.DISABLED ? level[state] : level[state] + correctionCoefficient) as ElevationLevel
}

export const handleButtonStateChange =
    ({eventName, type, state}: HandleButtonStateChangeOptions) =>
    (setState: Updater<ButtonState>) =>
    (_event: StateEvent) =>
        eventName !== EVENT_NAME.LAYOUT &&
        setState(draft => {
            draft.eventName = eventName

            updateButtonElevation(draft)(type)(state)
        })

export const updateButtonDisabledState =
    (type?: ButtonType) => (setState: Updater<ButtonState>) => (disabled?: boolean) =>
        typeof disabled === 'boolean' &&
        setState(draft => {
            if (disabled) {
                draft.eventName = EVENT_NAME.NONE
            }

            if (type === BUTTON_TYPE.ELEVATED) {
                draft.elevation = disabled ? ELEVATION.LEVEL_0 : ELEVATION.LEVEL_1
            }
        })

export const getButtonUnderlayColor = (theme: Theme) => (linkColor?: string) => {
    const underlay = {
        [BUTTON_TYPE.ELEVATED]: theme.token.scheme.primary,
        [BUTTON_TYPE.FILLED]: theme.token.scheme.onPrimary,
        [BUTTON_TYPE.LINK]: linkColor ?? theme.token.scheme.primary,
        [BUTTON_TYPE.OUTLINED]: theme.token.scheme.primary,
        [BUTTON_TYPE.TEXT]: theme.token.scheme.primary,
        [BUTTON_TYPE.TONAL]: theme.token.scheme.onSecondaryContainer
    }

    return (type: ButtonType) => underlay[type]
}

export const animateButton = ({animateSharedValueTo, borderColorInputRanges, disabled, type}: AnimateButtonOptions) => {
    const toValue = disabled ? 0 : 1
    const animateOutlinedButton = (borderSharedValue: SharedValue<number>) => {
        const value = disabled ? 0 : borderColorInputRanges[borderColorInputRanges.length - 2]

        return (eventName?: EventName) =>
            animateSharedValueTo({sharedValue: borderSharedValue})(
                eventName === EVENT_NAME.FOCUS ? borderColorInputRanges[2] : value
            )
    }

    return ({borderSharedValue, colorSharedValue}: AnimateButtonSharedValues) =>
        (eventName?: EventName) => {
            if (type === BUTTON_TYPE.OUTLINED) {
                animateOutlinedButton(borderSharedValue)(eventName)
                animateSharedValueTo({sharedValue: colorSharedValue})(toValue)

                return
            }

            animateSharedValueTo({sharedValue: colorSharedValue})(toValue)
        }
}
