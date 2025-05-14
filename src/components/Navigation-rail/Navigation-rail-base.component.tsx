import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {createStableHandlerWithState, runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS} from '../Common'
import type {NavigationRailBaseProps, NavigationRailState} from '././Navigation-rail.interface'

import {handleActiveKeyChange, updateNavigationRailData} from './Navigation-rail-handler'
import {NAVIGATION_DESTINATION_POSITION} from './Navigation-rail.enum'
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
			...renderNavigationRailProps
		},
		ref
	) => {
		const [{activeKey, nextActiveEvent, status, data}, setState] = useImmer<NavigationRailState>({
			status: COMPONENT_STATUS.IDLE
		})

		const id = useId()
		const onActiveKeyChange = useMemo(
			() => createStableHandlerWithState(handleActiveKeyChange(onActive))(setState)(),
			[onActive, setState]
		)

		const updateNavigationRailDataEffect = useMemo(
			() => createStableHandlerWithState(updateNavigationRailData)(setState)(),
			[setState]
		)

		const handleActiveKeyChangeEffect = useMemo(
			() => createStableHandlerWithState(handleActiveKeyChange())(setState)(),
			[setState]
		)

		const itemElements = useMemo(
			() =>
				renderNavigationRailItems({
					activeKey: activeKey ?? defaultActiveKey,
					animatedType,
					id,
					onActive: onActiveKeyChange,
					type
				})(data),
			[activeKey, animatedType, data, defaultActiveKey, id, onActiveKeyChange, type]
		)

		const fabElement = useMemo(() => renderNavigationRailFAB(id)(fab), [fab, id])

		useEffect(() => {
			handleActiveKeyChangeEffect(rawActiveKey ?? defaultActiveKey)
		}, [rawActiveKey, defaultActiveKey, handleActiveKeyChangeEffect])

		useEffect(() => {
			updateNavigationRailDataEffect(rawData)
		}, [updateNavigationRailDataEffect, rawData])

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
			navigationRailItemElements: itemElements,
			ref
		})
	}
)
