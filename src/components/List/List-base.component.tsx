import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {useTheme} from 'styled-components/native'
import {useImmer} from 'use-immer'
import {runAfterInteractions} from '../../utils'
import {
        handleListActive,
        handleListActiveAfterAffordance,
        handleListClose,
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
                                activeKey,
                                activeKeys,
                                afterAffordanceActiveKey,
                                nextActiveEvent,
                                nextAfterAffordanceActiveEvent,
                                nextAfterAffordanceCallbackEvent,
                                nextCloseEvent
                        },
                        setState
                ] = useImmer<ListState>({})

                const listRef = useRef<VirtualListComponent<ListData>>(null)
                const id = useId()
                const theme = useTheme()
                const onListActive = handleListActive({onActive, selectType, onActives, deselect})(setState)
                const onListActiveAfterAffordance = handleListActiveAfterAffordance({onActive, selectType})(setState)
                const onListClose = handleListClose(onClose)(setState)
                const onListRawActive = useMemo(() => handleListActive({selectType})(setState), [setState, selectType])
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
                        [listRef]
                )

                useEffect(() => {
                        onListRawActive(rawActiveKey ?? defaultActiveKey ?? rawActiveKeys ?? defaultActiveKeys)
                }, [rawActiveKey, rawActiveKeys, defaultActiveKey, defaultActiveKeys, onListRawActive])

                useEffect(() => {
                        runAfterInteractions(nextActiveEvent)()
                }, [nextActiveEvent])

                useEffect(() => {
                        runAfterInteractions(nextAfterAffordanceActiveEvent)()
                }, [nextAfterAffordanceActiveEvent])

                useEffect(() => {
                        runAfterInteractions(nextCloseEvent)()
                }, [nextCloseEvent])

                useEffect(() => {
                        runAfterInteractions(nextAfterAffordanceCallbackEvent)()
                }, [nextAfterAffordanceCallbackEvent])

                return render({
                        ...renderProps,
                        activeKey,
                        activeKeys,
                        afterAffordanceActiveKey,
                        focusedIndex,
                        id,
                        itemSize: itemSize ?? handleListItemSize(theme)(type),
                        loading,
                        loadingComponent,
                        onClose: onListClose,
                        ref: listRef as RenderListProps['ref'],
                        renderItem: renderListItem
                })
        }
)
