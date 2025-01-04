import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {InteractionManager} from 'react-native'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {
        handleListActive,
        handleListActiveAfterAffordance,
        handleListClose,
        handleListData,
        handleListItemSize,
        handleRenderListItem
} from './List-handle'
import {ListBaseProps, ListData, ListState, RenderListProps, VirtualListComponent} from './List.interface'

export const ListBase = forwardRef<VirtualListComponent<ListData>, ListBaseProps>(
        (
                {
                        activeKey: rawActiveKey,
                        activeKeys: rawActiveKeys,
                        activeTriggerEvenName = 'pressOut',
                        afterAffordance,
                        afterAffordancePrimaryButtonProps,
                        afterAffordanceSecondaryButtonProps,
                        beforeAffordance,
                        closeTrailing,
                        data,
                        defaultActiveKey,
                        defaultActiveKeys,
                        deselect,
                        divider,
                        enableUnderlay,
                        enableUnderlayActive,
                        focusedIndex,
                        itemSize,
                        loading,
                        loadingComponent,
                        onActive,
                        onActives,
                        onCancel,
                        onClose,
                        onConfirm,
                        onItemStateEvent,
                        relatedActive = false,
                        render,
                        renderItem,
                        selectType,
                        shape,
                        skeletonDuration = 0,
                        skeletonElement,
                        supportingTextNumberOfLines,
                        trailingTriggerEvenName,
                        type,
                        ...renderProps
                },
                ref
        ) => {
                const [
                        {
                                afterAffordanceActiveKey,
                                activeKey,
                                activeKeys,
                                listData,
                                nextActiveEvent,
                                nextAfterAffordanceActiveEvent,
                                nextCloseEvent,
                                status
                        },
                        setState
                ] = useImmer<ListState>({status: 'idle'})

                const id = useId()
                const listRef = useRef<VirtualListComponent<ListData>>(null)
                const theme = useTheme()
                const onListData = useMemo(() => handleListData(setState)(loading), [loading, setState])
                const onListActiveAfterAffordance = handleListActiveAfterAffordance({onActive, selectType})(setState)
                const onListActive = handleListActive({onActive, selectType, onActives, deselect})(setState)
                const onListRawActive = useMemo(() => handleListActive({selectType})(setState), [setState, selectType])
                const onListClose = handleListClose({onClose, relatedActive, selectType})(setState)
                const renderListItem = handleRenderListItem({
                        ...onItemStateEvent,
                        activeKey,
                        activeKeys,
                        activeTriggerEvenName,
                        afterAffordance,
                        afterAffordanceActiveKey,
                        afterAffordancePrimaryButtonProps,
                        afterAffordanceSecondaryButtonProps,
                        beforeAffordance,
                        closeTrailing,
                        divider,
                        enableUnderlay,
                        enableUnderlayActive,
                        focusedIndex,
                        onActive: onListActive,
                        onActiveAfterAffordance: onListActiveAfterAffordance,
                        onCancel,
                        onClose: onListClose,
                        onConfirm,
                        renderItem,
                        selectType,
                        shape,
                        skeletonDuration: loading && !loadingComponent ? -1 : skeletonDuration,
                        skeletonElement,
                        supportingTextNumberOfLines,
                        trailingTriggerEvenName,
                        type
                })

                useImperativeHandle(
                        ref,
                        () => (listRef?.current ? listRef?.current : {}) as VirtualListComponent<ListData>,
                        []
                )

                useEffect(() => {
                        onListData(data)
                }, [data, onListData])

                useEffect(() => {
                        onListRawActive(rawActiveKey ?? defaultActiveKey ?? rawActiveKeys ?? defaultActiveKeys)
                }, [rawActiveKey, rawActiveKeys, defaultActiveKey, defaultActiveKeys, onListRawActive])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextActiveEvent?.())
                }, [nextActiveEvent])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextAfterAffordanceActiveEvent?.())
                }, [nextAfterAffordanceActiveEvent])

                useEffect(() => {
                        InteractionManager.runAfterInteractions(() => nextCloseEvent?.())
                }, [nextCloseEvent])

                if (status === 'idle') {
                        return <></>
                }

                return render({
                        ...renderProps,
                        activeKey,
                        activeKeys,
                        afterAffordanceActiveKey,
                        data: listData,
                        focusedIndex,
                        id,
                        itemSize: itemSize ?? handleListItemSize(theme)(type),
                        loading,
                        loadingComponent,
                        ref: listRef as RenderListProps['ref'],
                        renderItem: renderListItem
                })
        }
)
