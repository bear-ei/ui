import {DURATION} from '@bearei/material-token'
import type {WritableDraft} from 'immer'
import type {LayoutChangeEvent, LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent} from 'react-native'
import {Platform} from 'react-native'
import type {SharedValue} from 'react-native-reanimated'
import type {Updater} from 'use-immer'
import type {AnimatedTiming, HandleStateEventChangeOptions, StateEvent} from '../../hooks'
import type {EventName} from '../Common'
import type {ListData} from '../List'
import type {RenderVirtualListItemInfo} from './Virtual-list-item'
import {VirtualListItem} from './Virtual-list-item'
import type {
	HandleVirtualListCloseOptions,
	HandleVirtualListScrollOptions,
	HandleVirtualListUnmountOptions,
	RenderVirtualListItemOptions,
	VirtualListData,
	VirtualListState
} from './Virtual-list.interface'

const handleVirtualListVisibleRanges =
	(itemSize = 0) =>
	(draft: WritableDraft<VirtualListState>) =>
	(scrollOffset?: number) => {
		if (!draft.layout.height) {
			return
		}

		const nextScrollOffset = scrollOffset ?? draft.scrollOffset ?? 0
		const baseStartIndex = Math.max(0, Math.floor((nextScrollOffset ?? 0) / itemSize))
		const dataSize = draft.virtualListData?.length ?? 0
		const windowSize = Math.max(draft.layout.height, 0)
		const visibleItemCount = Math.ceil(windowSize / itemSize)
		const extraItem = 32
		const endIndex = Math.min(dataSize, baseStartIndex + visibleItemCount + extraItem)
		const startIndex = Math.max(0, baseStartIndex - extraItem)
		const nextVisibleRangeData = (draft.virtualListData ?? []).slice(startIndex, endIndex)

		draft.emptyList = !draft.virtualListData?.length
		draft.endIndex = endIndex
		draft.scrollOffset = nextScrollOffset
		draft.startIndex = startIndex
		draft.status = 'succeeded'
		draft.visibleRangeData = nextVisibleRangeData
	}

export const handleVirtualListLayoutChange =
	(itemSize = 0) =>
	(setState: Updater<VirtualListState>) =>
	({width, height}: LayoutRectangle) => {
		setState(draft => {
			if (['web', 'macos', 'windows'].includes(Platform.OS) && draft.layout.height) {
				return
			}

			const {width: prevWidth, height: prevHeight} = draft.layout

			if (prevWidth !== width || prevHeight !== height) {
				draft.layout.height = height
				draft.layout.width = width
			}

			handleVirtualListVisibleRanges(itemSize)(draft)()
		})
	}

export const handleVirtualListStateChange =
	({eventName}: HandleStateEventChangeOptions) =>
	(onVirtualListLayoutChange: (layout: LayoutRectangle) => void) =>
	(event: StateEvent) => {
		const nextEvent = {
			layout: () => onVirtualListLayoutChange((event as LayoutChangeEvent).nativeEvent.layout)
		} as Record<EventName, () => void>

		if (!eventName) {
			return
		}

		nextEvent[eventName]?.()
	}

export const handleVirtualListScroll = ({onScroll, itemSize}: HandleVirtualListScrollOptions) => {
	const handleNextScrollEvent = (event: NativeSyntheticEvent<NativeScrollEvent>) => () => onScroll?.(event)

	return (setState: Updater<VirtualListState>) => (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const {contentSize, layoutMeasurement, contentOffset} = event.nativeEvent
		const isHitBottom = contentSize.height - layoutMeasurement.height - contentOffset.y < 1
		const scrollOffset = event.nativeEvent.contentOffset.y

		if (isHitBottom || contentOffset.y <= 0) {
			return
		}

		setState(draft => {
			draft.nextScrollEvent = handleNextScrollEvent(event)

			handleVirtualListVisibleRanges(itemSize)(draft)(scrollOffset)
		})
	}
}

export const handleVirtualListMomentumScrollEnd =
	(onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void) =>
	(event: NativeSyntheticEvent<NativeScrollEvent>) =>
		onMomentumScrollEnd?.(event)

export const handleVirtualListClose =
	({enableAutoSelect, onClose}: HandleVirtualListCloseOptions) =>
	(draft: WritableDraft<VirtualListState>) =>
	(indexKey?: string) => {
		const findDataIndex = (datum: ListData) => datum.indexKey === indexKey

		if (!enableAutoSelect) {
			const handleNextCloseEvent = () => onClose?.({indexKey})
			draft.nextCloseEvent = handleNextCloseEvent

			return
		}

		const data = (draft.virtualListData ?? []) as ListData[]
		const datumIndex = data.findIndex(findDataIndex)
		const nextActiveKey = data[datumIndex + 1]?.indexKey ?? data[datumIndex - 1]?.indexKey
		const handleNextEnableAutoSelectCloseEvent = () => onClose?.({activeKey: nextActiveKey, indexKey})

		draft.nextCloseEvent = handleNextEnableAutoSelectCloseEvent
	}

export const handleVirtualListUnmount = ({
	enableAutoSelect,
	itemSize = 0,
	onClose
}: HandleVirtualListUnmountOptions) => {
	const handleVisibleRangeDataFilter =
		(key: string) =>
		({indexKey}: VirtualListData) =>
			indexKey !== key

	return (setState: Updater<VirtualListState>) => (indexKey?: string) => {
		if (!indexKey) {
			return
		}

		setState(draft => {
			handleVirtualListClose({enableAutoSelect, onClose})(draft)(indexKey)

			const nextVirtualListData = draft.virtualListData?.filter(
				handleVisibleRangeDataFilter(indexKey)
			)

			draft.virtualListData = nextVirtualListData

			handleVirtualListVisibleRanges(itemSize)(draft)()
		})
	}
}

export const handleVirtualListData = (setState: Updater<VirtualListState>) => (data?: VirtualListData[]) =>
	setState(draft => {
		draft.virtualListData = data
		draft.status = 'loading'
	})

export const handleVirtualListLoadEnd = (setState: Updater<VirtualListState>) => {
	const findVisibleRangeDataIndex =
		(key: string) =>
		({indexKey}: VirtualListData) =>
			indexKey === key

	return (onLoadEnd?: (indexKey?: string) => void) => (indexKey?: string) => {
		if (indexKey) {
			setState(draft => {
				const visibleRangeDataIndex = draft.visibleRangeData?.findIndex(
					findVisibleRangeDataIndex(indexKey)
				)

				const isLoadEnd =
					(draft.visibleRangeData?.length ?? 0) - 1 === visibleRangeDataIndex &&
					visibleRangeDataIndex !== -1

				if (isLoadEnd) {
					onLoadEnd?.(indexKey)
				}
			})

			return
		}

		onLoadEnd?.(indexKey)
	}
}

export const handleVirtualListDataChange =
	(itemSize = 0) =>
	(setState: Updater<VirtualListState>) =>
	(virtualListData?: VirtualListData[]) =>
		virtualListData &&
		setState(draft => {
			if (draft.layout.height) {
				handleVirtualListVisibleRanges(itemSize)(draft)()
			}
		})

export const renderVirtualListItem =
	<T,>({onLoadEnd, renderItem, startIndex = 0, id, ...virtualListItemProps}: RenderVirtualListItemOptions<T>) =>
	(data?: VirtualListData[]) => {
		if (data?.length === 0) {
			onLoadEnd?.()

			return
		}

		return data?.map((item, index) => (
			<VirtualListItem
				{...virtualListItemProps}
				index={index}
				item={item as Record<string, unknown>}
				key={`${((item as Record<string, unknown>)?.indexKey as string) ?? index}`}
				onLoadEnd={onLoadEnd}
				startIndex={startIndex}
				testID={`virtualList__virtualListItem--${id}`}
				renderItem={
					renderItem as (
						options: RenderVirtualListItemInfo<Record<string, unknown>>
					) => React.JSX.Element
				}
			/>
		))
	}

export const handleVirtualListAnimated =
	(animatedTiming: AnimatedTiming) => (contentHeightSharedValue: SharedValue<number>) => (contentSize: number) =>
		animatedTiming({duration: DURATION.SHORT_2})(contentHeightSharedValue)(contentSize)
