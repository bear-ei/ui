import {cloneElement, forwardRef, useEffect, useId} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../../hooks'
import {EventName, State} from '../../Common'
import {Icon, IconProps} from '../../Icon'
import {
        HandleNavigationDrawerItemStateEventChangeOptions,
        NavigationDrawerItemBaseProps,
        NavigationDrawerItemProps,
        NavigationDrawerItemState
} from './Navigation-drawer-item.interface'
import {useNavigationDrawerItemAnimated} from './use-navigation-drawer-item-animated.hook'

export const handleNavigationDrawerItemPropsEqual =
        (prevProps: NavigationDrawerItemProps) => (nextProps: NavigationDrawerItemProps) => {
                const {activeKey: prevActiveKey, itemKey: prevItemKey} = prevProps
                const {activeKey: nextActiveKey, itemKey: nextItemKey} = nextProps
                const activeChange =
                        prevActiveKey !== nextActiveKey &&
                        (nextActiveKey === nextItemKey || prevActiveKey === prevItemKey)

                return ![activeChange].some(Boolean)
        }

const handleNavigationDrawerItemPressOut = (onActive?: (value: string) => void) => (value: string) => onActive?.(value)
const handleNavigationDrawerItemStateChange = ({
        itemKey,
        eventName,
        onActive
}: HandleNavigationDrawerItemStateEventChangeOptions) => {
        const nextEvent = {
                pressOut: () => handleNavigationDrawerItemPressOut(onActive)(itemKey)
        } as Record<EventName, () => void>

        return (setState: Updater<NavigationDrawerItemState>) => (_event: StateEvent) => {
                if (eventName === 'layout') {
                        return
                }

                setState(draft => {
                        const prevEventName = draft.eventName

                        if (eventName) {
                                draft.eventName = eventName
                        }

                        if (prevEventName !== eventName && eventName === 'pressOut') {
                                draft.nextPressOutEvent = nextEvent[eventName]
                        }
                })
        }
}

const renderNavigationDrawerItemIcon = (icon: JSX.Element) => (eventName?: EventName) =>
        cloneElement<IconProps>(icon, {
                eventName,
                iconStyle: 'outlined',
                type: 'outlined'
        })

const renderNavigationDrawerItemActiveIcon = (icon: JSX.Element) => (eventName?: EventName) =>
        cloneElement<IconProps>(icon, {
                eventName,
                iconStyle: 'outlined',
                type: 'filled'
        })

export const NavigationDrawerItemBase = forwardRef<View, NavigationDrawerItemBaseProps>(
        ({activeKey, icon = <Icon name='circle' />, itemKey, onActive, render, ...renderProps}, ref) => {
                const [{eventName, nextPressOutEvent}, setState] = useImmer<NavigationDrawerItemState>({
                        eventName: undefined,
                        nextPressOutEvent: undefined
                })

                const id = useId()
                const theme = useTheme()
                const activeColor = theme.token.scheme.secondaryContainer
                const underlayColor = theme.token.scheme.onSurface
                const active = activeKey === itemKey
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleNavigationDrawerItemStateChange({...options, itemKey, onActive, state})(setState)(
                                        event
                                )

                const onStateEvent = useOnStateEvent({...renderProps, disabled: false, onStateEventChange})
                const {labelTextAnimatedStyle} = useNavigationDrawerItemAnimated({active})
                const iconElement = renderNavigationDrawerItemIcon(icon)(eventName)
                const activeIconElement = renderNavigationDrawerItemActiveIcon(icon)(eventName)

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
                        labelTextAnimatedStyle,
                        onStateEvent,
                        ref,
                        underlayColor
                })
        }
)
