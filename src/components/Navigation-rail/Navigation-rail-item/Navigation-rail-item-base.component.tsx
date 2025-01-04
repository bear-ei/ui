import {forwardRef, useEffect, useId, useMemo} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../../hooks'
import {State} from '../../Common'
import {Icon} from '../../Icon'
import {
        handleNavigationRailItemActiveIcon,
        handleNavigationRailItemIcon,
        handleNavigationRailItemStateChange
} from './Navigation-rail-item-handle'
import {NavigationRailItemBaseProps, NavigationRailItemState} from './Navigation-rail-item.interface'
import {useNavigationRailItemAnimated} from './use-navigation-rail-item-animated.hook'

export const NavigationRailItemBase = forwardRef<View, NavigationRailItemBaseProps>(
        (
                {activeKey, icon = <Icon name='circle' />, itemKey, onActive, render, type = 'segment', ...renderProps},
                ref
        ) => {
                const [{eventName, nextPressOutEvent}, setState] = useImmer<NavigationRailItemState>({})
                const id = useId()
                const theme = useTheme()
                const active = useMemo(() => activeKey === itemKey, [activeKey, itemKey])
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleNavigationRailItemStateChange({...options, itemKey, onActive, state})(setState)(
                                        event
                                )

                const onStateEvent = useOnStateEvent({...renderProps, disabled: false, onStateEventChange})
                const {labelTextAnimatedStyle} = useNavigationRailItemAnimated({active, type})
                const activeIconElement = handleNavigationRailItemActiveIcon(id)(icon)(eventName)
                const iconElement = handleNavigationRailItemIcon(id)(icon)(eventName)

                useEffect(() => {
                        nextPressOutEvent?.()
                }, [nextPressOutEvent])

                return render({
                        ...renderProps,
                        active,
                        activeIconElement,
                        eventName,
                        iconElement,
                        id,
                        labelTextAnimatedStyle,
                        onStateEvent,
                        ref,
                        theme,
                        type
                })
        }
)
