import {PressableType} from '@/components/Touchable'
import {COMPONENT_STATUS, State} from '@/constants'
import {
        HandleStateEventChangeOptions,
        StateEvent,
        useClearComponentEvent,
        useInteractionStateEvent,
        useTheme
} from '@/hooks'
import {platformValue} from '@/utils'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import {cloneElement, forwardRef, useCallback, useEffect, useId, useImperativeHandle, useRef} from 'react'
import {useImmer} from 'use-immer'
import {NAVIGATION_RAIL_ANIMATED, NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import {handleNavigationRailItemStateChange} from './Navigation-rail-item.handler'
import type {NavigationRailItemBaseProps, NavigationRailItemState} from './Navigation-rail-item.interface'
import {RenderNavigationRailItem} from './Navigation-rail-item.render'
import {useNavigationRailItemAnimated} from './use-navigation-rail-item-animated.hook'

export const NavigationRailItemBase = forwardRef<PressableType, NavigationRailItemBaseProps>(
        (
                {
                        activeKey,
                        animatedType = NAVIGATION_RAIL_ANIMATED.STANDARD,
                        icon,
                        indexKey,
                        onActive,
                        type = NAVIGATION_RAIL_TYPE.SEGMENT,
                        ...renderNavigationRailItemProps
                },
                ref
        ) => {
                const [{eventName, status, nextPressOutEvent}, setState] = useImmer<NavigationRailItemState>({
                        status: COMPONENT_STATUS.IDLE
                })

                useClearComponentEvent(setState)

                const id = useId()
                const theme = useTheme()
                const pressableRef = useRef<PressableType>(null)
                const isActive = activeKey === indexKey
                const onStateEventChange = useCallback(
                        (options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
                                handleNavigationRailItemStateChange({
                                        ...options,
                                        indexKey,
                                        onActive,
                                        ref: pressableRef,
                                        state
                                })(setState)(event),
                        [indexKey, onActive, setState]
                )

                const interactionHandlers = useInteractionStateEvent({
                        ...renderNavigationRailItemProps,
                        disabled: false,
                        onStateEventChange
                })

                const {labelTextAnimatedStyle, contentAnimatedStyle} = useNavigationRailItemAnimated({
                        active: isActive,
                        status,
                        type
                })

                const size =
                        type === NAVIGATION_RAIL_TYPE.BLOCK ?
                                theme.token.spacing.extraSmall * 7
                        :       theme.token.spacing.extraSmall * 5

                const iconElement = cloneElement(icon ?? <MaterialIcons name='circle' />, {
                        color: theme.token.scheme.onSurfaceVariant,
                        style: {fontSize: platformValue(size)},
                        testID: `navigationRailItem__icon--${id}`
                })

                useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as PressableType, [pressableRef])

                useEffect(() => {
                        nextPressOutEvent?.()
                }, [nextPressOutEvent])

                return (
                        <RenderNavigationRailItem
                                {...renderNavigationRailItemProps}
                                active={isActive}
                                animatedType={animatedType}
                                contentAnimatedStyle={contentAnimatedStyle}
                                eventName={eventName}
                                iconElement={iconElement}
                                id={id}
                                interactionHandlers={interactionHandlers}
                                labelTextAnimatedStyle={labelTextAnimatedStyle}
                                ref={pressableRef}
                                type={type}
                        />
                )
        }
)

NavigationRailItemBase.displayName = 'NavigationRailItemBase'
