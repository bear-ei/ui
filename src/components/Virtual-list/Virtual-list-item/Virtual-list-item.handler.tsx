import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo} from '../../../hooks'
import {COMPONENT_STATUS} from '../../Common'
import type {VirtualListItemProps, VirtualListItemState} from './Virtual-list-item.interface'

export const compareVirtualListItemProps = (prevProps: VirtualListItemProps) => {
	const {dependencies: prevDependencies, index: prevIndex, item: prevItem} = prevProps

	return (nextProps: VirtualListItemProps) => {
		const {dependencies: nextDependencies, index: nextIndex, item: nextItem} = nextProps
		const isDependenciesChanged =
			prevDependencies?.length !== nextDependencies?.length ||
			prevDependencies?.some((dependence, index) => dependence !== nextDependencies?.[index])

		const isItemDependenciesChanged =
			prevItem?.dependencies?.length !== nextItem?.dependencies?.length ||
			prevItem?.dependencies?.some(
				(dependence, index) => dependence !== nextItem?.dependencies?.[index]
			)

		return ![isDependenciesChanged, prevIndex !== nextIndex, isItemDependenciesChanged].some(Boolean)
	}
}

export const triggerVirtualListItemClose = (setState: Updater<VirtualListItemState>) => () =>
	setState(draft => {
		draft.visible = false
	})

export const triggerVirtualListItemUnmount = (onUnmount?: (indexKey?: string) => void) => (indexKey?: string) => () =>
	onUnmount?.(indexKey)

export const animateVirtualListItem =
	(animateSharedValueTo: AnimateSharedValueTo) => (topSharedValue: SharedValue<number>) => (offsetY: number) =>
		animateSharedValueTo({sharedValue: topSharedValue})(offsetY)

export const updateVirtualListItemStatus = (setState: Updater<VirtualListItemState>) => () =>
	setState(draft => {
		if (draft.status === COMPONENT_STATUS.IDLE) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})
