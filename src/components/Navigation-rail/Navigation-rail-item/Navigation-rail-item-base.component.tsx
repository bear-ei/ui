import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {HandleStateEventChangeOptions, StateEvent, useStateEvent} from '../../../hooks'
import {runAfterInteractions} from '../../../utils'
import {State} from '../../Common'
import {Icon, IconName, IconStyle, IconType} from '../../Icon'
import {NavigationRailAnimatedType, NavigationRailType} from '../Navigation-rail.enum'
import {
        handleNavigationRailItemStateChange,
        renderNavigationRailItemActiveIcon,
        renderNavigationRailItemIcon
} from './Navigation-rail-item-handle'
import {NavigationRailItemBaseProps, NavigationRailItemState} from './Navigation-rail-item.interface'
import {useNavigationRailItemAnimated} from './use-navigation-rail-item-animated.hook'

export const NavigationRailItemBase = forwardRef<View, NavigationRailItemBaseProps>(
        (
                {
                        activeKey,
                        animatedType = NavigationRailAnimatedType.STANDARD,
                        icon = (
                                <Icon
                                        iconStyle={IconStyle.ROUNDED}
                                        name={IconName.CIRCLE}
                                        type={IconType.OUTLINED}
                                />
                        ),
                        indexKey,
                        onActive,
                        render,
                        type = NavigationRailType.SEGMENT,
                        ...renderProps
                },
                ref
        ) => {
                const [{eventName, nextPressOutEvent}, setState] = useImmer<NavigationRailItemState>({})
                const active = useMemo(() => activeKey === indexKey, [activeKey, indexKey])
                const id = useId()
                const {labelTextAnimatedStyle} = useNavigationRailItemAnimated({active, type})
                const pressableRef = useRef<View>(null)
                const theme = useTheme()
                const onStateEventChange =
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleNavigationRailItemStateChange({
                                        ...options,
                                        indexKey,
                                        onActive,
                                        ref: pressableRef,
                                        state
                                })(setState)(event)

                const stateOnEvent = useStateEvent({...renderProps, disabled: false, onStateEventChange})
                const activeIconElement = renderNavigationRailItemActiveIcon(id)(icon)(eventName)
                const iconElement = renderNavigationRailItemIcon(id)(icon)(eventName)

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
                        ref: pressableRef,
                        stateOnEvent,
                        theme,
                        type
                })
        }
)
