import {cloneElement} from 'react'
import {Updater} from 'use-immer'
import {StateEvent} from '../../../hooks'
import {EventName} from '../../Common'
import {IconProps} from '../../Icon'
import {
        HandleNavigationRailItemAnimatedTimingOptions,
        HandleNavigationRailItemAnimatedTimingSharedValue,
        HandleNavigationRailItemStateEventChangeOptions,
        NavigationRailItemProps,
        NavigationRailItemState
} from './Navigation-rail-item.interface'

export const handleNavigationRailItemPropsEqual =
        (prevProps: NavigationRailItemProps) => (nextProps: NavigationRailItemProps) => {
                const {activeKey: prevActiveKey, itemKey: prevItemKey} = prevProps
                const {activeKey: nextActiveKey, itemKey: nextItemKey} = nextProps
                const activeChange =
                        prevActiveKey !== nextActiveKey &&
                        (nextActiveKey === nextItemKey || prevActiveKey === prevItemKey)

                return ![activeChange].some(Boolean)
        }

const handleNavigationRailItemPressOut = (onActive?: (value: string) => void) => (value: string) => onActive?.(value)

export const handleNavigationRailItemStateChange =
        ({eventName, itemKey, onActive}: HandleNavigationRailItemStateEventChangeOptions) =>
        (setState: Updater<NavigationRailItemState>) =>
        (_event: StateEvent) => {
                const nextEvent = {
                        pressOut: () => handleNavigationRailItemPressOut(onActive)(itemKey)
                } as Record<EventName, () => void>

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

export const handleNavigationRailItemIcon = (id: string) => (icon: JSX.Element) => (eventName?: EventName) =>
        cloneElement<IconProps>(icon, {
                eventName,
                iconStyle: 'rounded',
                testID: `navigationRailItem__icon--${id}`,
                type: 'outlined'
        })

export const handleNavigationRailItemActiveIcon = (id: string) => (icon: JSX.Element) => (eventName?: EventName) =>
        cloneElement<IconProps>(icon, {
                eventName,
                iconStyle: 'rounded',
                testID: `navigationRailItem__icon--${id}`,
                type: 'filled'
        })

export const handleNavigationRailItemAnimatedTiming =
        ({animatedTiming, type}: HandleNavigationRailItemAnimatedTimingOptions) =>
        ({labelHeightSharedValue, labelTextColorSharedValue}: HandleNavigationRailItemAnimatedTimingSharedValue) =>
        (value?: boolean) => {
                if (!(type === 'segment' && typeof value === 'boolean')) {
                        return
                }

                const toValue = value ? 1 : 0

                animatedTiming()(labelTextColorSharedValue)(toValue)
                animatedTiming()(labelHeightSharedValue)(toValue)
        }
