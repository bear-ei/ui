import {cloneElement, forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import {useInteractionStateEvent} from '../../../hooks'
import {createDeferredHandlerWithState, runAfterInteractions} from '../../../utils'
import {COMPONENT_STATUS, type State} from '../../Common'
import {Icon, ICON_NAME, ICON_TYPE, type IconProps} from '../../Icon'
import type {PressableType} from '../../Touchable'
import {NAVIGATION_RAIL_ANIMATED, NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import {clearNavigationRailItemEvent, handleNavigationRailItemStateChange} from './Navigation-rail-item.handler'
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

		const id = useId()
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

		const iconElement = useMemo(
			() =>
				cloneElement<IconProps>(
					icon ?? (
						<Icon
							name={ICON_NAME.CIRCLE}
							type={ICON_TYPE.OUTLINED}
						/>
					),
					{
						testID: `navigationRailItem__icon--${id}`,
						type: isActive ? ICON_TYPE.FILLED : ICON_TYPE.OUTLINED
					}
				),
			[icon, id, isActive]
		)

		const runClearNavigationRailItemEvent = useMemo(
			() => createDeferredHandlerWithState(clearNavigationRailItemEvent)(setState)(),
			[setState]
		)

		useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as PressableType, [pressableRef])

		useEffect(() => {
			runAfterInteractions(nextPressOutEvent)().then(() =>
				runClearNavigationRailItemEvent('pressOut')
			)
		}, [nextPressOutEvent, runClearNavigationRailItemEvent])

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
