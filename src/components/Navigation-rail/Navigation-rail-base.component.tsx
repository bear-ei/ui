import {SIZE} from '@bearei/element-token'
import {cloneElement, forwardRef, useEffect, useId, useMemo} from 'react'
import type {View} from 'react-native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
import {COMPONENT_STATUS} from '../Common'
import type {FABProps} from '../FAB'
import type {NavigationRailBaseProps, NavigationRailState} from '././Navigation-rail.interface'
import {NAVIGATION_DESTINATION_POSITION} from './Navigation-rail.enum'
import {updateNavigationRailActiveKey, updateNavigationRailData} from './Navigation-rail.handler'
import {RenderNavigationRail, RenderNavigationRailItems} from './Navigation-rail.render'

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
			() => (
				<RenderNavigationRailItems
					activeKey={activeKey ?? defaultActiveKey}
					animatedType={animatedType}
					data={data}
					id={id}
					onActive={onActive}
					type={type}
				/>
			),
			[activeKey, animatedType, data, defaultActiveKey, id, onActive, type]
		)

		const fabElement = useMemo(
			() =>
				fab ?
					cloneElement<FABProps>(fab, {
						elevated: false,
						size: SIZE.MEDIUM,
						testID: `navigationRail__fab--${id}`
					})
				:	undefined,
			[fab, id]
		)

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

		return (
			<RenderNavigationRail
				{...renderNavigationRailProps}
				destinationPosition={destinationPosition}
				fabElement={fabElement}
				id={id}
				itemElements={itemElements}
				menuElement={menu}
				ref={ref}
			/>
		)
	}
)
