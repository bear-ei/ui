import {Circle} from 'lucide-react-native'
import {cloneElement, useCallback, useId, useRef, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {PressableType} from '../../Touchable'
import type {NavigationRailItemBaseProps, NavigationRailItemState} from './Navigation-rail-item.interface'

import {COMPONENT_STATUS, EVENT_NAME, type State} from '../../../constants'
import {
	useInteractionStateEvent,
	useMergeRefs,
	usePendingEvent,
	useTheme,
	type HandleStateEventChangeOptions,
	type StateEvent
} from '../../../hooks'
import {DENSITY_SIZE} from '../../../theme'
import {platformValue} from '../../../utils'
import {NAVIGATION_RAIL_ANIMATED, NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import {handleNavigationRailItemStateChange} from './Navigation-rail-item.handler'
import {RenderNavigationRailItem} from './Navigation-rail-item.render'
import {useNavigationRailItemAnimated} from './use-navigation-rail-item-animated.hook'

export const NavigationRailItemBase: FC<NavigationRailItemBaseProps> = ({
	activeKey,
	animatedType = NAVIGATION_RAIL_ANIMATED.NONE,
	icon,
	indexKey,
	onActive,
	ref,
	type = NAVIGATION_RAIL_TYPE.SEGMENT,
	...renderNavigationRailItemProps
}) => {
	const [{eventName, pendingPressOutEvent, status}, setState] = useImmer<NavigationRailItemState>({
		eventName: EVENT_NAME.NONE,
		status: COMPONENT_STATUS.IDLE
	})

	usePendingEvent('pendingPressOutEvent', onActive, {pendingEvent: pendingPressOutEvent, setState})

	const id = useId()
	const {token} = useTheme()
	const pressableRef = useRef<PressableType>(null)
	const mergedRef = useMergeRefs([ref, pressableRef])
	const isActive = typeof activeKey === 'string' && activeKey === indexKey
	const onStateEventChange = useCallback(
		(event: StateEvent, state: State, options: HandleStateEventChangeOptions) =>
			handleNavigationRailItemStateChange(event, setState, {
				...options,
				indexKey,
				onActive,
				ref: pressableRef,
				state
			}),
		[indexKey, onActive, setState]
	)

	const interactionHandlers = useInteractionStateEvent({...renderNavigationRailItemProps, onStateEventChange})
	const {contentAnimatedStyle, labelTextAnimatedStyle} = useNavigationRailItemAnimated({
		active: isActive,
		status,
		type
	})

	const size = token.density.icon[type === NAVIGATION_RAIL_TYPE.BLOCK ? DENSITY_SIZE.LARGE : DENSITY_SIZE.SMALL]

	// Intentional override: lock the icon's props to this component's rules.
	// - color stays `onSurfaceVariant` regardless of active state (M3 convention:
	//   only the background and label change when a destination becomes active)
	// - size is derived from `type` (BLOCK uses LARGE, SEGMENT uses SMALL)
	// - caller-set props on the icon element are ignored by design
	const iconElement = cloneElement(icon ?? <Circle />, {
		color: token.scheme.onSurfaceVariant,
		size: platformValue(size),
		testID: `navigationRailItem__icon--${id}`
	})

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
			ref={mergedRef}
			type={type}
		/>
	)
}
