import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createStableHandlerWithState, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS} from '../Common'
import type {NavigationRailBaseProps, NavigationRailState} from '././Navigation-rail.interface'
import {NAVIGATION_DESTINATION_POSITION} from './Navigation-rail.enum'
import {updateNavigationRailActiveKey, updateNavigationRailData} from './Navigation-rail.handler'
import {renderNavigationRailFAB, renderNavigationRailItems} from './Navigation-rail.render'

export const NavigationRailBase = forwardRef<View, NavigationRailBaseProps>(
	(
		{
			activeKey: rawActiveKey,
			animatedType,
			data: rawData,
			defaultActiveKey,
			destinationPosition = NAVIGATION_DESTINATION_POSITION.TOP,
			fab,
			onActive,
			renderNavigationRail,
			type,
			menu,
			...renderNavigationRailProps
		},
		ref
	) => {
		const [{activeKey, nextActiveEvent, status, data}, setState] = useImmer<NavigationRailState>({
			status: COMPONENT_STATUS.IDLE
		})

		const id = useId()
		const onNavigationRailActiveKey = useMemo(
			() => createStableHandlerWithState(updateNavigationRailActiveKey(onActive))(setState)(),
			[onActive, setState]
		)

		const updateNavigationRailDataEffect = useMemo(
			() => createStableHandlerWithState(updateNavigationRailData)(setState)(),
			[setState]
		)

		const navigationRailActiveKeyEffect = useMemo(
			() => createStableHandlerWithState(updateNavigationRailActiveKey())(setState)(),
			[setState]
		)

		const itemElements = useMemo(
			() =>
				renderNavigationRailItems({
					activeKey: activeKey ?? defaultActiveKey,
					animatedType,
					id,
					onActive: onNavigationRailActiveKey,
					type
				})(data),
			[activeKey, animatedType, data, defaultActiveKey, id, onNavigationRailActiveKey, type]
		)

		const fabElement = useMemo(() => renderNavigationRailFAB(id)(fab), [fab, id])

		useEffect(() => {
			navigationRailActiveKeyEffect(rawActiveKey ?? defaultActiveKey)
		}, [defaultActiveKey, navigationRailActiveKeyEffect, rawActiveKey])

		useEffect(() => {
			updateNavigationRailDataEffect(rawData)
		}, [rawData, updateNavigationRailDataEffect])

		useEffect(() => {
			runAfterInteractions(nextActiveEvent)()
		}, [nextActiveEvent])

		if (status === COMPONENT_STATUS.IDLE) {
			return <></>
		}

		return renderNavigationRail({
			...renderNavigationRailProps,
			destinationPosition,
			fabElement,
			id,
			itemElements,
			menuElement: menu,
			ref
		})
	}
)
