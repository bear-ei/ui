import {COMPONENT_STATUS, EVENT_NAME} from '@/constants'
import {StateEvent} from '@/hooks'
import type {Updater} from 'use-immer'
import {NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import type {
        AnimateNavigationRailItemOptions,
        AnimateNavigationRailItemSharedValues,
        HandleNavigationRailItemStateChangeOptions,
        NavigationRailItemProps,
        NavigationRailItemState
} from './Navigation-rail-item.interface'

export const compareNavigationRailItemProps =
        (prevProps: NavigationRailItemProps) => (nextProps: NavigationRailItemProps) => {
                const {activeKey: prevActiveKey, indexKey: prevIndexKey, dependencies: prevDependencies} = prevProps
                const {activeKey: nextActiveKey, indexKey: nextIndexKey, dependencies: nextDependencies} = nextProps
                const isActiveChange =
                        prevActiveKey !== nextActiveKey &&
                        (nextActiveKey === nextIndexKey || prevActiveKey === prevIndexKey)

                const isDependenciesChanged =
                        prevDependencies?.length !== nextDependencies?.length ||
                        prevDependencies?.some((dependence, index) => dependence !== nextDependencies?.[index])

                return ![isActiveChange, isDependenciesChanged].some(Boolean)
        }

export const handleNavigationRailItemStateChange =
        ({eventName, indexKey, onActive, ref}: HandleNavigationRailItemStateChangeOptions) =>
        (setState: Updater<NavigationRailItemState>) =>
        (_event: StateEvent) => {
                setState(draft => {
                        if (eventName === EVENT_NAME.LAYOUT) {
                                if (draft.status !== COMPONENT_STATUS.SUCCEEDED) {
                                        draft.status = COMPONENT_STATUS.SUCCEEDED
                                }

                                return
                        }

                        if (eventName) {
                                draft.eventName = eventName
                        }

                        if (eventName === EVENT_NAME.PRESS_OUT && onActive) {
                                draft.nextPressOutEvent = () => onActive?.(indexKey)
                        }
                })

                if (eventName === EVENT_NAME.PRESS_IN) {
                        ref.current?.focus()
                }
        }

export const animateNavigationRailItem =
        ({animateSharedValueTo, type}: AnimateNavigationRailItemOptions) =>
        ({labelTextSharedValue, contentTranslateYSharedValue}: AnimateNavigationRailItemSharedValues) =>
        (active?: boolean) => {
                if (!(type === NAVIGATION_RAIL_TYPE.SEGMENT && typeof active === 'boolean')) {
                        return
                }

                const toValue = active ? 1 : 0

                animateSharedValueTo({sharedValue: contentTranslateYSharedValue})(toValue)
                animateSharedValueTo({sharedValue: labelTextSharedValue})(toValue)
        }
