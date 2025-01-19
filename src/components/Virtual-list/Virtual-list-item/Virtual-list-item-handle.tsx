import {SharedValue} from 'react-native-reanimated'
import {Updater} from 'use-immer'
import {AnimatedTiming} from '../../../hooks'
import {runAfterInteractions} from '../../../utils'
import {VirtualListItemProps, VirtualListItemState} from './Virtual-list-item.interface'

export const handleVirtualListItemPropsEqual = (prevProps: VirtualListItemProps) => {
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

export const handleVirtualListItemClose =
        (setState: Updater<VirtualListItemState>) => (onClose?: (value?: string) => void) => (value?: string) => {
                const handleNextCloseEvent = () => onClose?.(value)

                setState(draft => {
                        draft.nextCloseEvent = handleNextCloseEvent
                        draft.visible = false
                })
        }

export const handleVirtualListItemUnmount = (onUnmount?: (value?: string) => void) => (indexKey?: string) => () => {
        runAfterInteractions(onUnmount)(indexKey)
}

export const handleVirtualListItemAnimated =
        (animatedTiming: AnimatedTiming) => (topSharedValue: SharedValue<number>) => (value: number) =>
                animatedTiming({duration: 'short2'})(topSharedValue)(value)
