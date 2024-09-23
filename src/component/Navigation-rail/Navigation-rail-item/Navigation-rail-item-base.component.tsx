import {cloneElement, forwardRef, useEffect, useId} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../../hook'
import {EventName, State} from '../../Common'
import {Icon, IconProps} from '../../Icon'
import {
    HandleNavigationRailItemStateEventChangeOptions,
    NavigationRailItemBaseProps,
    NavigationRailItemInitialState,
    NavigationRailItemProps
} from './Navigation-rail-item.interface'
import {useNavigationRailItemAnimated} from './use-navigation-rail-item-animated.hook'

export const handleNavigationRailItemPropsEqual =
    (prevProps: NavigationRailItemProps) => (nextProps: NavigationRailItemProps) => {
        const {activeKey: prevActiveKey, itemKey: prevItemKey} = prevProps
        const {activeKey: nextActiveKey, itemKey: nextItemKey} = nextProps
        const activeChange =
            prevActiveKey !== nextActiveKey && (nextActiveKey === nextItemKey || prevActiveKey === prevItemKey)

        return ![activeChange].some(Boolean)
    }

const handleNavigationRailItemPressOut = (onActive?: (value: string) => void) => (value: string) => onActive?.(value)
const handleNavigationRailItemStateChange =
    ({itemKey, eventName, onActive}: HandleNavigationRailItemStateEventChangeOptions) =>
    (setState: Updater<NavigationRailItemInitialState>) =>
    (_event: StateEvent) => {
        if (eventName === 'layout') {
            return
        }

        const nextEvent = {
            pressOut: () => handleNavigationRailItemPressOut(onActive)(itemKey)
        } as Record<EventName, () => void>

        setState(draft => {
            const prevEventName = draft.eventName

            eventName && (draft.eventName = eventName)
            prevEventName !== eventName && eventName === 'pressOut' && (draft.nextPressOutEvent = nextEvent[eventName])
        })
    }

const renderNavigationRailItemIcon = (icon: React.JSX.Element) => (eventName?: EventName) =>
    cloneElement<IconProps>(icon, {eventName, iconStyle: 'outlined', type: 'outlined'})

const renderNavigationRailItemActiveIcon = (icon: React.JSX.Element) => (eventName?: EventName) =>
    cloneElement<IconProps>(icon, {eventName, iconStyle: 'outlined', type: 'filled'})

export const NavigationRailItemBase = forwardRef<View, NavigationRailItemBaseProps>(
    ({activeKey, icon = <Icon name='circle' />, itemKey, onActive, render, type = 'segment', ...renderProps}, ref) => {
        const [{eventName, nextPressOutEvent}, setState] = useImmer<NavigationRailItemInitialState>({
            eventName: undefined,
            nextPressOutEvent: undefined
        })

        const id = useId()
        const theme = useTheme()
        const activeColor = theme.token.scheme.secondaryContainer
        const underlayColor = theme.token.scheme.onSurface
        const active = activeKey === itemKey
        const onStateEventChange = (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
            handleNavigationRailItemStateChange({...options, itemKey, onActive, state})(setState)(event)

        const onStateEvent = useOnStateEvent({...renderProps, disabled: false, onStateEventChange})
        const {labelAnimatedStyle, labelTextAnimatedStyle} = useNavigationRailItemAnimated({active, type})
        const iconElement = renderNavigationRailItemIcon(icon)(eventName)
        const activeIconElement = renderNavigationRailItemActiveIcon(icon)(eventName)

        useEffect(() => {
            nextPressOutEvent?.()
        }, [nextPressOutEvent])

        return render({
            ...renderProps,
            active,
            activeColor,
            activeIconElement,
            eventName,
            iconElement,
            id,
            labelAnimatedStyle,
            labelTextAnimatedStyle,
            onStateEvent,
            ref,
            type,
            underlayColor
        })
    }
)
