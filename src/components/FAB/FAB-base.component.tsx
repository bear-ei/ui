import {WritableDraft} from 'immer'
import {cloneElement, forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {InteractionManager, View} from 'react-native'
import {DefaultTheme, useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../hooks'
import {EventName, State} from '../Common'
import {ElevationLevel} from '../Elevation'
import {IconProps} from '../Icon'
import {FABBaseProps, FABState, FABType, HandleFABStateChangeOptions, RenderFABIconOptions} from './FAB.interface'
import {useFABAnimated} from './use-fab-animated.hook'

const handleFABElevation = (draft: WritableDraft<FABState>) => (elevated?: boolean) => (state?: State) => {
        if (!elevated) {
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

        if (state) {
                draft.elevation = (state === 'disabled' ? level[state] : level[state] + 3) as ElevationLevel
        }
}

const handleFABStateChange = ({eventName, elevated, state, touchableRef}: HandleFABStateChangeOptions) => {
        const nextEvent = {
                pressIn: () => touchableRef?.current?.focus()
        } as Record<EventName, () => void>

        return (setState: Updater<FABState>) => (_event: StateEvent) => {
                if (eventName === 'layout') {
                        return
                }

                setState(draft => {
                        const prevEventName = draft.eventName

                        if (eventName) {
                                draft.eventName = eventName
                        }

                        if (prevEventName !== eventName) {
                                handleFABElevation(draft)(elevated)(state)
                        }

                        if (prevEventName !== eventName && eventName === 'pressIn') {
                                draft.nextPressInEvent = nextEvent[eventName]
                        }
                })
        }
}

const handleFABInit = (setState: Updater<FABState>) => (disabled?: boolean) => (elevated?: boolean) =>
        setState(draft => {
                if (draft.status !== 'idle') {
                        return
                }

                if (elevated && !disabled) {
                        draft.elevation = 3
                }

                draft.status = 'succeeded'
        })

const handleFABDisabled = (setState: Updater<FABState>) => (elevated?: boolean) => (disabled?: boolean) => {
        if (typeof disabled === 'boolean') {
                setState(draft => {
                        if (disabled) {
                                draft.eventName = 'none'
                        }

                        if (elevated) {
                                draft.elevation = disabled ? 0 : 1
                        }
                })
        }
}

const handleFABUnderlayColor = (theme: DefaultTheme) => {
        const underlay = {
                primary: theme.token.scheme.onPrimaryContainer,
                secondary: theme.token.scheme.onSecondaryContainer,
                surface: theme.token.scheme.primary,
                tertiary: theme.token.scheme.onTertiaryContainer
        }

        return (type: FABType) => underlay[type]
}

const renderFABIcon =
        ({disabled, eventName, size, type = 'primary'}: RenderFABIconOptions) =>
        (theme: DefaultTheme) => {
                const fillType = {
                        primary: theme.token.scheme.onPrimaryContainer,
                        secondary: theme.token.scheme.onSecondaryContainer,
                        surface: theme.token.scheme.primary,
                        tertiary: theme.token.scheme.onTertiaryContainer
                } as Record<FABType, string>

                return (icon?: JSX.Element) => {
                        if (!icon) {
                                return icon
                        }

                        const iconSize = theme.adaptSize(theme.token.spacing.large + 3 * theme.token.spacing.extraSmall)

                        return cloneElement<IconProps>(icon, {
                                ...(size === 'large' && {width: iconSize, height: iconSize}),
                                disabled,
                                eventName,
                                fill: fillType[type]
                        })
                }
        }

export const FABBase = forwardRef<View, FABBaseProps>(
        ({disabled, elevated = true, icon, render, size = 'medium', type = 'primary', ...renderProps}, ref) => {
                const [{elevation, eventName, status, nextPressInEvent}, setState] = useImmer<FABState>({
                        elevation: undefined,
                        eventName: undefined,
                        nextPressInEvent: undefined,
                        status: 'idle'
                })

                const touchableRef = useRef<View>(null)
                const id = useId()
                const theme = useTheme()
                const underlayColor = handleFABUnderlayColor(theme)(type)
                const onFABDisabled = useMemo(() => handleFABDisabled(setState)(elevated), [elevated, setState])
                const onFABInit = useMemo(() => handleFABInit(setState)(disabled), [disabled, setState])
                const fabIconElement = renderFABIcon({eventName, type, disabled, size})(theme)(icon)
                const onStateEventChange = useCallback(
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleFABStateChange({
                                        ...options,
                                        state,
                                        elevated,
                                        touchableRef
                                })(setState)(event),
                        [elevated, setState]
                )

                const onStateEvent = useOnStateEvent({
                        ...renderProps,
                        disabled,
                        onStateEventChange
                })

                const {contentUnderlayAnimatedStyle, labelTextAnimatedStyle} = useFABAnimated({disabled, type})

                useImperativeHandle(ref, () => (touchableRef?.current ? touchableRef?.current : {}) as View, [])

                useEffect(() => {
                        onFABDisabled(disabled)
                }, [disabled, onFABDisabled])

                useEffect(() => {
                        onFABInit(elevated)
                }, [elevated, onFABInit])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextPressInEvent?.())
                }, [nextPressInEvent])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        ...renderProps,
                        contentUnderlayAnimatedStyle,
                        elevation,
                        eventName,
                        icon: fabIconElement,
                        id,
                        labelTextAnimatedStyle,
                        onStateEvent,
                        ref: touchableRef,
                        size,
                        type,
                        underlayColor
                })
        }
)
