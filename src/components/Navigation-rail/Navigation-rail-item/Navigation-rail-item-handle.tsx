import {cloneElement} from 'react'
import {SharedValue} from 'react-native-reanimated'
import {Updater} from 'use-immer'
import {StateEvent} from '../../../hooks'
import {EventName} from '../../Common'
import {IconProps, IconStyle, IconType} from '../../Icon'
import {NavigationRailType} from '../Navigation-rail.enum'
import {
        HandleNavigationRailItemAnimatedTimingOptions,
        HandleNavigationRailItemStateEventChangeOptions,
        NavigationRailItemProps,
        NavigationRailItemState
} from './Navigation-rail-item.interface'

export const handleNavigationRailItemPropsEqual =
        (prevProps: NavigationRailItemProps) => (nextProps: NavigationRailItemProps) => {
                const {activeKey: prevActiveKey, indexKey: prevItemKey} = prevProps
                const {activeKey: nextActiveKey, indexKey: nextItemKey} = nextProps
                const activeChange =
                        prevActiveKey !== nextActiveKey &&
                        (nextActiveKey === nextItemKey || prevActiveKey === prevItemKey)

                return ![activeChange].some(Boolean)
        }

const handleNavigationRailItemPressOut = (onActive?: (activeKey: string) => void) => (activeKey: string) =>
        onActive?.(activeKey)

export const handleNavigationRailItemStateChange =
        ({eventName, indexKey, onActive, ref}: HandleNavigationRailItemStateEventChangeOptions) =>
        (setState: Updater<NavigationRailItemState>) =>
        (_event: StateEvent) => {
                const nextEvent = {
                        pressIn: () => ref.current?.focus(),
                        pressOut: () => handleNavigationRailItemPressOut(onActive)(indexKey)
                } as Record<EventName, () => void>

                if (eventName === 'layout') {
                        return
                }

                setState(draft => {
                        const prevEventName = draft.eventName

                        if (eventName) {
                                draft.eventName = eventName
                        }

                        if (eventName === 'pressIn') {
                                nextEvent[eventName]()
                        }

                        if (prevEventName !== eventName && eventName === 'pressOut') {
                                draft.nextPressOutEvent = nextEvent[eventName]
                        }
                })
        }

export const renderNavigationRailItemIcon = (id: string) => (icon: React.JSX.Element) => (eventName?: EventName) =>
        cloneElement<IconProps>(icon, {
                eventName,
                iconStyle: IconStyle.ROUNDED,
                testID: `navigationRailItem__icon--${id}`,
                type: IconType.OUTLINED
        })

export const renderNavigationRailItemActiveIcon =
        (id: string) => (icon: React.JSX.Element) => (eventName?: EventName) =>
                cloneElement<IconProps>(icon, {
                        eventName,
                        iconStyle: IconStyle.ROUNDED,
                        testID: `navigationRailItem__activeIcon--${id}`,
                        type: IconType.FILLED
                })

export const handleNavigationRailItemAnimatedTiming =
        ({animatedTiming, type}: HandleNavigationRailItemAnimatedTimingOptions) =>
        (labelTextColorSharedValue: SharedValue<number>) =>
        (active?: boolean) => {
                if (!(type === NavigationRailType.SEGMENT && typeof active === 'boolean')) {
                        return
                }

                const toValue = active ? 1 : 0

                animatedTiming()(labelTextColorSharedValue)(toValue)
        }
