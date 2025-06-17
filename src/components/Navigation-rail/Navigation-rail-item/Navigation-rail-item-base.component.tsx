import {cloneElement, forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import type {Pressable} from 'react-native'
import {useImmer} from 'use-immer'
import type {HandleStateEventChangeOptions, StateEvent} from '../../../hooks'
import {useInteractionStateEvent} from '../../../hooks'
import {runAfterInteractions} from '../../../utils'
import {COMPONENT_STATUS, type State} from '../../Common'
import {Icon, ICON_NAME, ICON_STYLE, ICON_TYPE, type IconProps} from '../../Icon'
import {NAVIGATION_RAIL_ANIMATED, NAVIGATION_RAIL_TYPE} from '../Navigation-rail.enum'
import {handleNavigationRailItemStateChange} from './Navigation-rail-item.handler'
import type {NavigationRailItemBaseProps, NavigationRailItemState} from './Navigation-rail-item.interface'
import {RenderNavigationRailItem} from './Navigation-rail-item.render'
import {useNavigationRailItemAnimated} from './use-navigation-rail-item-animated.hook'

export const NavigationRailItemBase = forwardRef<typeof Pressable, NavigationRailItemBaseProps>(
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
		const pressableRef = useRef<typeof Pressable>(null)
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
							iconStyle={ICON_STYLE.ROUNDED}
							name={ICON_NAME.CIRCLE}
							type={ICON_TYPE.OUTLINED}
						/>
					),
					{
						iconStyle: ICON_STYLE.ROUNDED,
						testID: `navigationRailItem__icon--${id}`,
						type: isActive ? ICON_TYPE.FILLED : ICON_TYPE.OUTLINED
					}
				),
			[icon, id, isActive]
		)

		useImperativeHandle(ref, () => (pressableRef?.current ?? {}) as typeof Pressable, [pressableRef])

		useEffect(() => {
			runAfterInteractions(nextPressOutEvent)()
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
