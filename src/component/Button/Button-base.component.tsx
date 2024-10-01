import {WritableDraft} from 'immer'
import {cloneElement, forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {View} from 'react-native'
import {DefaultTheme, useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hook'
import {EventName, State} from '../Common'
import {ElevationLevel} from '../Elevation'
import {IconProps} from '../Icon'
import {
    ButtonBaseProps,
    ButtonState,
    ButtonType,
    HandleButtonStateChangeOptions,
    RenderButtonIconOptions
} from './Button.interface'
import {useButtonAnimated} from './use-button-animated.hook'

const handleButtonElevation = (draft: WritableDraft<ButtonState>) => (type?: ButtonType) => (state?: State) => {
    const elevationType = type && ['elevated', 'filled', 'tonal'].includes(type)

    if (!elevationType) {
        return
    }

    const level = {disabled: 0, enabled: 0, error: 0, focused: 0, hovered: 1, longPressIn: 0, pressIn: 0}
    const correctionCoefficient = type === 'elevated' ? 1 : 0

    if (state) {
        draft.elevation = (state === 'disabled' ? level[state] : level[state] + correctionCoefficient) as ElevationLevel
    }
}

const handleButtonStateChange = ({eventName, type, state, touchableRef}: HandleButtonStateChangeOptions) => {
    const nextEvent = {
        pressIn: () => touchableRef?.current?.focus()
    } as Record<EventName, () => void>

    return (setState: Updater<ButtonState>) => (_event: StateEvent) => {
        if (eventName === 'layout') {
            return
        }

        setState(draft => {
            const prevEventName = draft.eventName

            draft.eventName = eventName

            if (prevEventName !== eventName) {
                handleButtonElevation(draft)(type)(state)
            }

            if (prevEventName !== eventName && eventName === 'pressIn') {
                draft.nextPressInEvent = nextEvent[eventName]
            }
        })
    }
}

const handleButtonInit = (setState: Updater<ButtonState>) => (disabled?: boolean) => (type?: ButtonType) =>
    setState(draft => {
        if (draft.status !== 'idle') {
            return
        }

        if (type === 'elevated' && !disabled) {
            draft.elevation = 1
        }

        draft.status = 'succeeded'
    })

const handleButtonDisabled = (setState: Updater<ButtonState>) => (type?: ButtonType) => (disabled?: boolean) => {
    if (typeof disabled === 'boolean') {
        setState(draft => {
            if (disabled) {
                draft.eventName = 'none'
            }

            if (type === 'elevated') {
                draft.elevation = disabled ? 0 : 1
            }
        })
    }
}

const renderButtonIcon =
    ({disabled, eventName, type = 'filled'}: RenderButtonIconOptions) =>
    (theme: DefaultTheme) => {
        const fillType = {
            elevated: theme.token.scheme.primary,
            filled: theme.token.scheme.onPrimary,
            outlined: theme.token.scheme.primary,
            text: theme.token.scheme.primary,
            tonal: theme.token.scheme.onSecondaryContainer
        } as Record<ButtonType, string>

        return (icon?: JSX.Element) => {
            if (!icon) {
                return icon
            }

            return cloneElement<IconProps>(icon, {densityScale: -1.5, disabled, eventName, fill: fillType[type]})
        }
    }

const handleButtonUnderlayColor = (theme: DefaultTheme) => {
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

export const ButtonBase = forwardRef<View, ButtonBaseProps>(
    ({densityScale, disabled, icon, labelText = 'Label', render, type = 'filled', ...renderProps}, ref) => {
        const [{elevation, eventName, status, nextPressInEvent}, setState] = useImmer<ButtonState>({
            elevation: undefined,
            eventName: undefined,
            nextPressInEvent: undefined,
            status: 'idle'
        })

        const touchableRef = useRef<View>(null)
        const theme = useTheme()
        const iconButtonElement = renderButtonIcon({eventName, type, disabled})(theme)(icon)
        const id = useId()
        const onButtonDisabled = useMemo(() => handleButtonDisabled(setState)(type), [setState, type])
        const onButtonInit = useMemo(() => handleButtonInit(setState)(disabled), [disabled, setState])
        const underlayColor = handleButtonUnderlayColor(theme)(type)
        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleButtonStateChange({...options, state, type, touchableRef})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, disabled, onStateEventChange})
        const {contentUnderlayAnimatedStyle, labelTextAnimatedStyle} = useButtonAnimated({disabled, eventName, type})

        useImperativeHandle(ref, () => (touchableRef?.current ? touchableRef?.current : {}) as View, [])

        useEffect(() => {
            onButtonInit(type)
        }, [onButtonInit, type])

        useEffect(() => {
            onButtonDisabled(disabled)
        }, [disabled, onButtonDisabled])

        useEffect(() => {
            nextPressInEvent?.()
        }, [nextPressInEvent])

        if (status === 'idle') {
            return <></>
        }

        return render({
            ...renderProps,
            contentUnderlayAnimatedStyle,
            densityScale,
            disabled,
            elevation,
            eventName,
            icon: iconButtonElement,
            id,
            labelText,
            labelTextAnimatedStyle,
            onStateEvent,
            ref: touchableRef,
            type,
            underlayColor
        })
    }
)
