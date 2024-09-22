import {WritableDraft} from 'immer'
import {cloneElement, forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {DefaultTheme, useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hook'
import {State} from '../Common'
import {ElevationLevel} from '../Elevation'
import {IconProps} from '../Icon'
import {
    FABBaseProps,
    FABType,
    InitialFABState,
    ProcessFABStateChangeOptions,
    RenderFABIconOptions
} from './FAB.interface'
import {useFABAnimated} from './use-fab-animated.hook'

const processFABElevation = (draft: WritableDraft<InitialFABState>) => (elevated?: boolean) => (state?: State) => {
    if (!elevated) {
        return
    }

    const level = {disabled: 0, enabled: 0, error: 0, focused: 0, hovered: 1, longPressIn: 0, pressIn: 0}

    state && (draft.elevation = (state === 'disabled' ? level[state] : level[state] + 3) as ElevationLevel)
}

const processFABStateChange =
    ({eventName, elevated, state}: ProcessFABStateChangeOptions) =>
    (setState: Updater<InitialFABState>) =>
    (_event: StateEvent) => {
        if (eventName === 'layout') {
            return
        }

        setState(draft => {
            const prevEventName = draft.eventName

            eventName && (draft.eventName = eventName)
            prevEventName !== eventName && processFABElevation(draft)(elevated)(state)
        })
    }

const processFABInit = (setState: Updater<InitialFABState>) => (disabled?: boolean) => (elevated?: boolean) =>
    setState(draft => {
        if (draft.status !== 'idle') {
            return
        }

        elevated && !disabled && (draft.elevation = 3)
        draft.status = 'succeeded'
    })

const processFABDisabled = (setState: Updater<InitialFABState>) => (elevated?: boolean) => (disabled?: boolean) =>
    typeof disabled === 'boolean' &&
    setState(draft => {
        disabled && (draft.eventName = 'none')
        elevated && (draft.elevation = disabled ? 0 : 1)
    })

const processFABUnderlayColor = (theme: DefaultTheme) => (type: FABType) => {
    const underlay = {
        primary: theme.token.scheme.onPrimaryContainer,
        secondary: theme.token.scheme.onSecondaryContainer,
        surface: theme.token.scheme.primary,
        tertiary: theme.token.scheme.onTertiaryContainer
    }

    return underlay[type]
}

const renderFABIcon =
    ({disabled, eventName, size, type = 'primary'}: RenderFABIconOptions) =>
    (theme: DefaultTheme) =>
    (icon?: React.JSX.Element) => {
        const fillType = {
            primary: theme.token.scheme.onPrimaryContainer,
            secondary: theme.token.scheme.onSecondaryContainer,
            surface: theme.token.scheme.primary,
            tertiary: theme.token.scheme.onTertiaryContainer
        } as Record<FABType, string>

        if (!icon) {
            return icon
        }

        return cloneElement<IconProps>(icon, {
            densityScale: size === 'large' ? 3 : 0,
            disabled,
            eventName,
            fill: fillType[type]
        })
    }

export const FABBase = forwardRef<View, FABBaseProps>(
    (
        {densityScale, disabled, elevated = true, icon, render, size = 'medium', type = 'primary', ...renderProps},
        ref
    ) => {
        const [{elevation, eventName, status}, setState] = useImmer<InitialFABState>({
            elevation: undefined,
            eventName: undefined,
            status: 'idle'
        })

        const id = useId()
        const theme = useTheme()
        const underlayColor = processFABUnderlayColor(theme)(type)
        const onFABDisabled = useMemo(() => processFABDisabled(setState)(elevated), [elevated, setState])
        const onFABInit = useMemo(() => processFABInit(setState)(disabled), [disabled, setState])
        const fabIconElement = renderFABIcon({eventName, type, disabled, size})(theme)(icon)
        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            processFABStateChange({...options, state, elevated})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, disabled, onStateEventChange})
        const {contentUnderlayAnimatedStyle, labelTextAnimatedStyle} = useFABAnimated({disabled, type})

        useEffect(() => {
            onFABDisabled(disabled)
        }, [disabled, onFABDisabled])

        useEffect(() => {
            onFABInit(elevated)
        }, [elevated, onFABInit])

        if (status === 'idle') {
            return <></>
        }

        return render({
            ...renderProps,
            contentUnderlayAnimatedStyle,
            densityScale,
            elevation,
            eventName,
            icon: fabIconElement,
            id,
            labelTextAnimatedStyle,
            onStateEvent,
            ref,
            size,
            type,
            underlayColor
        })
    }
)
