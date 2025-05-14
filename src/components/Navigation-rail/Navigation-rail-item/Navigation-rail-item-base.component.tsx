import {forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import {useStateEvent} from '../../../hooks'
import {runAfterInteractions} from '../../../utils'
import type {State} from '../../Common'
import {NAVIGATION_RAIL_ANIMATED, NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import {handleNavigationRailItemStateChange} from './Navigation-rail-item-handle'
import type {NavigationRailItemBaseProps, NavigationRailItemState} from './Navigation-rail-item.interface'
import {renderNavigationRailItemIcon} from './Navigation-rail-item.render'
import {useNavigationRailItemAnimated} from './use-navigation-rail-item-animated.hook'

export const NavigationRailItemBase = forwardRef<View, NavigationRailItemBaseProps>(
	(
		{
			activeKey,
			animatedType = NAVIGATION_RAIL_ANIMATED.STANDARD,
			icon,
			indexKey,
			onActive,
			renderNavigationRailItem,
			type = NAVIGATION_RAIL_TYPE.SEGMENT,
			...renderNavigationRailItemProps
		},
		ref
	) => {
		const [{eventName, nextPressOutEvent}, setState] = useImmer<NavigationRailItemState>({})
		const isActive = activeKey === indexKey
		const id = useId()
		const pressableRef = useRef<View>(null)
		const theme = useTheme()
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

		const interactionHandlers = useStateEvent({
			...renderNavigationRailItemProps,
			disabled: false,
			onStateEventChange
		})

		const {labelTextAnimatedStyle} = useNavigationRailItemAnimated({active: isActive, type})
		const iconElement = useMemo(
			() => renderNavigationRailItemIcon(id)(icon)(isActive),
			[icon, id, isActive]
		)

		useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as View, [pressableRef])

		useEffect(() => {
			runAfterInteractions(nextPressOutEvent)()
		}, [nextPressOutEvent])

		return renderNavigationRailItem({
			...renderNavigationRailItemProps,
			active: isActive,
			animatedType,
			eventName,
			iconElement,
			id,
			interactionHandlers,
			labelTextAnimatedStyle,
			ref: pressableRef,
			theme,
			type
		})
	}
)
