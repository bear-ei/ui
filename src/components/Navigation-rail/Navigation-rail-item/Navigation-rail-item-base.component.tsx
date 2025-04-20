import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import {useStateEvent} from '../../../hooks'
import {runAfterInteractions} from '../../../utils'
import type {State} from '../../Common'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE} from '../../Icon'
import {NAVIGATION_RAIL_ANIMATED, NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import {
	handleNavigationRailItemStateChange,
	renderNavigationRailItemActiveIcon,
	renderNavigationRailItemIcon
} from './Navigation-rail-item-handle'
import type {NavigationRailItemBaseProps, NavigationRailItemState} from './Navigation-rail-item.interface'
import {useNavigationRailItemAnimated} from './use-navigation-rail-item-animated.hook'

export const NavigationRailItemBase = forwardRef<View, NavigationRailItemBaseProps>(
	(
		{
			activeKey,
			animatedType = NAVIGATION_RAIL_ANIMATED.STANDARD,
			icon = (
				<Icon
					iconStyle={ICON_STYLE.ROUNDED}
					name={ICON_NAME.CIRCLE}
					type={ICON_TYPE.OUTLINED}
				/>
			),
			indexKey,
			onActive,
			renderNavigationRailItem,
			type = NAVIGATION_RAIL_TYPE.SEGMENT,
			...renderNavigationRailItemProps
		},
		ref
	) => {
		const [{eventName, nextPressOutEvent}, setState] = useImmer<NavigationRailItemState>({})
		const isActive = useMemo(() => activeKey === indexKey, [activeKey, indexKey])
		const id = useId()
		const {labelTextAnimatedStyle} = useNavigationRailItemAnimated({active: isActive, type})
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

		const interactionHandlers = useStateEvent({
			...renderNavigationRailItemProps,
			disabled: false,
			onStateEventChange
		})

		const activeIconElement = renderNavigationRailItemActiveIcon(id)(icon)(eventName)
		const iconElement = renderNavigationRailItemIcon(id)(icon)(eventName)

		useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as View, [pressableRef])

		useEffect(() => {
			runAfterInteractions(nextPressOutEvent)()
		}, [nextPressOutEvent])

		return renderNavigationRailItem({
			...renderNavigationRailItemProps,
			active: isActive,
			activeIconElement,
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
