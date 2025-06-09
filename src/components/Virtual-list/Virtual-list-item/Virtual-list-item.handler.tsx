import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimateSharedValueTo} from '../../../hooks'
import {COMPONENT_STATUS} from '../../Common'
import type {VirtualListItemProps, VirtualListItemState} from './Virtual-list-item.interface'

export const compareVirtualListItemProps = (prevProps: VirtualListItemProps) => {
	const {extraData: prevExtraData, index: prevIndex, item: prevItem} = prevProps

	return (nextProps: VirtualListItemProps) => {
		const {extraData: nextExtraData, index: nextIndex, item: nextItem} = nextProps

		return ![
			prevExtraData?.join() !== nextExtraData?.join(),
			prevIndex !== nextIndex,
			prevItem?.extraData?.join() !== nextItem?.extraData?.join()
		].some(Boolean)
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
		animateSharedValueTo(topSharedValue)(offsetY)

export const updateVirtualListItemStatus = (setState: Updater<VirtualListItemState>) => () =>
	setState(draft => {
		if (draft.status === COMPONENT_STATUS.IDLE) {
			draft.status = COMPONENT_STATUS.SUCCEEDED
		}
	})
