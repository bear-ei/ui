import {Circle} from 'lucide-react-native'
import {cloneElement, forwardRef, useCallback, useId, useRef} from 'react'
import {useImmer} from 'use-immer'
import {COMPONENT_STATUS, type State} from '../../../constants'
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
import type {PressableType} from '../../Touchable'
import {NAVIGATION_RAIL_ANIMATED, NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import {handleNavigationRailItemStateChange} from './Navigation-rail-item.handler'
import type {NavigationRailItemBaseProps, NavigationRailItemState} from './Navigation-rail-item.interface'
import {RenderNavigationRailItem} from './Navigation-rail-item.render'
import {useNavigationRailItemAnimated} from './use-navigation-rail-item-animated.hook'

export const NavigationRailItemBase = forwardRef<PressableType, NavigationRailItemBaseProps>(
	(
		{
			activeKey,
			animatedType = NAVIGATION_RAIL_ANIMATED.NONE,
			icon,
			indexKey,
			onActive,
			type = NAVIGATION_RAIL_TYPE.SEGMENT,
			...renderNavigationRailItemProps
		},
		ref
	) => {
		const [{eventName, status, pendingPressOutEvent}, setState] = useImmer<NavigationRailItemState>({
			status: COMPONENT_STATUS.IDLE
		})

		usePendingEvent({
			eventKey: 'pendingPressOutEvent',
			func: onActive,
			pendingEvent: pendingPressOutEvent,
			setState
		})

		const id = useId()
		const {token} = useTheme()
		const pressableRef = useRef<PressableType>(null)
		const mergedRef = useMergeRefs([ref, pressableRef])
		const isActive = typeof activeKey === 'string' && activeKey === indexKey
		const onStateEventChange = useCallback(
			(options: HandleStateEventChangeOptions) => (state: State) => (event: StateEvent) =>
				handleNavigationRailItemStateChange({...options, indexKey, onActive, ref: pressableRef, state})(
					setState
				)(event),
			[indexKey, onActive, setState]
		)

		const interactionHandlers = useInteractionStateEvent({...renderNavigationRailItemProps, onStateEventChange})
		const {labelTextAnimatedStyle, contentAnimatedStyle} = useNavigationRailItemAnimated({
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
)

NavigationRailItemBase.displayName = 'NavigationRailItemBase'
