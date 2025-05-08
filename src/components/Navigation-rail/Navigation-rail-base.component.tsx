import {forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
import type {NavigationRailBaseProps, NavigationRailState} from '././Navigation-rail.interface'
import {handleNavigationRailActive, handleNavigationRailData} from './Navigation-rail-handle'
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
			status: 'idle'
		})

		const id = useId()
		const onNavigationRailActive = handleNavigationRailActive(onActive)(setState)
		const onNavigationRailData = useMemo(() => handleNavigationRailData(setState), [setState])
		const onNavigationRailRawActive = useMemo(() => handleNavigationRailActive()(setState), [setState])
		const navigationRailItemElements = renderNavigationRailItems({
			activeKey: activeKey ?? defaultActiveKey,
			animatedType,
			id,
			onActive: onNavigationRailActive,
			type
		})(data)

		const fabElement = renderNavigationRailFAB(id)(fab)

		useEffect(() => {
			onNavigationRailRawActive(rawActiveKey ?? defaultActiveKey)
		}, [rawActiveKey, defaultActiveKey, onNavigationRailRawActive])

		useEffect(() => {
			onNavigationRailData(rawData)
		}, [onNavigationRailData, rawData])

		useEffect(() => {
			runAfterInteractions(nextActiveEvent)()
		}, [nextActiveEvent])

		if (status === 'idle') {
			return <></>
		}

		return renderNavigationRail({
			...renderNavigationRailProps,
			destinationPosition,
			fabElement,
			id,
			navigationRailItemElements,
			ref
		})
	}
)
