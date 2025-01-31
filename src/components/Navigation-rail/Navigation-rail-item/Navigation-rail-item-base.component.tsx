import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {OnStateEventChangeOptions, StateEvent, useOnStateEvent} from '../../../hooks'
import {runAfterInteractions} from '../../../utils'
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
                {
                        activeKey,
                        animatedType = 'standard',
                        icon = <Icon name='circle' />,
                        itemKey,
                        onActive,
                        render,
                        type = 'segment',
                        ...renderProps
                },
                ref
        ) => {
                const [{eventName, nextPressOutEvent}, setState] = useImmer<NavigationRailItemState>({})
                const active = useMemo(() => activeKey === itemKey, [activeKey, itemKey])
                const id = useId()
                const {labelTextAnimatedStyle} = useNavigationRailItemAnimated({active, type})
                const activeIconElement = handleNavigationRailItemActiveIcon(id)(icon)(eventName)
                const iconElement = handleNavigationRailItemIcon(id)(icon)(eventName)
                const pressableRef = useRef<View>(null)
                const theme = useTheme()
                const onStateEventChange =
                        (options: OnStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleNavigationRailItemStateChange({
                                        ...options,
                                        itemKey,
                                        onActive,
                                        ref: pressableRef,
                                        state
                                })(setState)(event)

                const onStateEvent = useOnStateEvent({...renderProps, disabled: false, onStateEventChange})

                useImperativeHandle(ref, () => (pressableRef?.current ? pressableRef?.current : {}) as View, [
                        pressableRef
                ])

                useEffect(() => {
                        runAfterInteractions(nextPressOutEvent)()
                }, [nextPressOutEvent])

                return render({
                        ...renderProps,
                        active,
                        activeIconElement,
                        animatedType,
                        eventName,
                        iconElement,
                        id,
                        labelTextAnimatedStyle,
                        onStateEvent,
                        ref: pressableRef,
                        theme,
                        type
                })
        }
)
