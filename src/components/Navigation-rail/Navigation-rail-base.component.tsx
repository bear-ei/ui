import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
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
			menu,
			onActive: rawOnActive,
			renderNavigationRail,
			type,
			...renderNavigationRailProps
		},
		ref
	) => {
		const [{activeKey, data, nextActiveEvent, status}, setState] = useImmer<NavigationRailState>({
			status: COMPONENT_STATUS.IDLE
		})

		const id = useId()
		const onActive = useMemo(
			() => updateNavigationRailActiveKey(rawOnActive)(setState),
			[rawOnActive, setState]
		)

		const runUpdateData = useMemo(() => updateNavigationRailData(setState), [setState])
		const runUpdateActiveKey = useMemo(() => updateNavigationRailActiveKey()(setState), [setState])
		const itemElements = useMemo(
			() =>
				renderNavigationRailItems({
					activeKey: activeKey ?? defaultActiveKey,
					animatedType,
					id,
					onActive,
					type
				})(data),
			[activeKey, animatedType, data, defaultActiveKey, id, onActive, type]
		)

		const fabElement = useMemo(() => renderNavigationRailFAB(id)(fab), [fab, id])

		useEffect(() => {
			runUpdateActiveKey(rawActiveKey ?? defaultActiveKey)
		}, [defaultActiveKey, rawActiveKey, runUpdateActiveKey])

		useEffect(() => {
			runUpdateData(rawData)
		}, [runUpdateData, rawData])

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
