import {Circle} from 'lucide-react-native'
import {cloneElement, useCallback, useId, useRef, type FC} from 'react'
import {useImmer} from 'use-immer'

import type {PressableType} from '../../Touchable'
import type {NavigationRailItemBaseProps, NavigationRailItemState} from './Navigation-rail-item.interface'

import {COMPONENT_STATUS, EVENT_NAME, type InteractionState} from '../../../constants'
import {
	useInteractionStateEvent,
	useMergeRefs,
	usePendingEvent,
	useTheme,
	type HandleInteractionStateChangeOptions,
	type InteractionEvent
} from '../../../hooks'
import {DENSITY_SIZE} from '../../../theme'
import {toPlatformUnit} from '../../../utils'
import {NAVIGATION_RAIL_ANIMATION, NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import {handleNavigationRailItemStateChange} from './Navigation-rail-item.handler'
import {RenderNavigationRailItem} from './Navigation-rail-item.render'
import {useNavigationRailItemAnimated} from './use-navigation-rail-item-animated.hook'

export const NavigationRailItemBase: FC<NavigationRailItemBaseProps> = ({
	activeKey,
	animation = NAVIGATION_RAIL_ANIMATION.NONE,
	icon,
	itemKey,
	onActiveKeyChange,
	ref,
	type = NAVIGATION_RAIL_TYPE.SEGMENT,
	...renderNavigationRailItemProps
}) => {
	const [{eventName, pendingPressOutEvent, status}, setState] = useImmer<NavigationRailItemState>({
		eventName: EVENT_NAME.NONE,
		status: COMPONENT_STATUS.IDLE
	})

	usePendingEvent('pendingPressOutEvent', onActiveKeyChange, {pendingEvent: pendingPressOutEvent, setState})

	const id = useId()
	const {token} = useTheme()
	const pressableRef = useRef<PressableType>(null)
	const mergedRef = useMergeRefs([ref, pressableRef])
	const isActive = typeof activeKey === 'string' && activeKey === itemKey
	const onInteractionStateChange = useCallback(
		(event: InteractionEvent, interactionState: InteractionState, options: HandleInteractionStateChangeOptions) =>
			handleNavigationRailItemStateChange(event, setState, {
				...options,
				interactionState,
				itemKey,
				onActiveKeyChange,
				ref: pressableRef
			}),
		[itemKey, onActiveKeyChange, setState]
	)

	const interactionHandlers = useInteractionStateEvent({...renderNavigationRailItemProps, onInteractionStateChange})
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
		color: token.colors.onSurfaceVariant,
		size: toPlatformUnit(size),
		testID: `navigationRailItem__icon--${id}`
	})

	return (
		<RenderNavigationRailItem
			{...renderNavigationRailItemProps}
			active={isActive}
			animation={animation}
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
