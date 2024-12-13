import {WritableDraft} from 'immer'
import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {DefaultTheme, useTheme} from 'styled-components/native'
import {Updater, useImmer} from 'use-immer'
import {RenderVirtualListItemInfo} from '../Virtual-list'
import {ListItem} from './List-item'
import {
        HandleListActiveOptions,
        HandleListCloseOptions,
        HandleRenderItemOptions,
        ListBaseProps,
        ListData,
        ListState,
        ListType,
        RenderListItemOptions,
        RenderListProps,
        VirtualListComponent
} from './List.interface'

const handlePrevListActiveKeysFilter = (value: string) => (key: string) => key !== value
const handleListSelect = (draft: WritableDraft<ListState>) => (deselect?: boolean) => (value?: string | string[]) => {
        if (Array.isArray(value)) {
                return
        }

        const prevListActiveKey = draft.listActiveKey

        draft.listActiveKey = value === prevListActiveKey && deselect ? undefined : value

        if (draft.afterAffordanceActiveKey !== value) {
                draft.afterAffordanceActiveKey = undefined
        }

        return prevListActiveKey !== value ? draft.listActiveKey : 'NOT_ACTIVE'
}

const handleListMultiselect = (draft: WritableDraft<ListState>) => (value: string | string[]) => {
        const prevListActiveKeys = draft.listActiveKeys
        const nextListActiveKeys = Array.isArray(value) ? value : [...(prevListActiveKeys ?? []), value]

        if (typeof value === 'string') {
                draft.listActiveKeys =
                        prevListActiveKeys?.includes(value) ?
                                prevListActiveKeys?.filter(handlePrevListActiveKeysFilter(value))
                        :       nextListActiveKeys
        }

        if (Array.isArray(value)) {
                draft.listActiveKeys = nextListActiveKeys
        }

        return prevListActiveKeys?.join() !== nextListActiveKeys?.join() ? draft.listActiveKeys : 'NOT_ACTIVES'
}

const handleNextActiveEvent =
        ({onActive, onActives}: HandleListActiveOptions) =>
        (value: string | string[] | undefined) =>
        () => {
                if (typeof value === 'string') {
                        onActive?.(value)
                } else {
                        onActives?.(value)
                }
        }

const handleListActive =
        ({onActive, selectType, onActives, deselect}: HandleListActiveOptions = {}) =>
        (setState: Updater<ListState>) =>
        (value?: string | string[]) =>
                setState(draft => {
                        const callbackValue =
                                selectType === 'select' ?
                                        handleListSelect(draft)(deselect)(value)
                                :       handleListMultiselect(draft)(value ?? [])

                        if (!onActive && draft.status === 'idle') {
                                draft.status = 'succeeded'
                        }

                        if (callbackValue && !['NOT_ACTIVE', 'NOT_ACTIVES'].includes(callbackValue?.toString())) {
                                if (selectType === 'select') {
                                        draft.nextActiveEvent = handleNextActiveEvent({onActive})(callbackValue)
                                }

                                if (selectType === 'multiselect') {
                                        draft.nextActiveEvent = handleNextActiveEvent({onActives})(callbackValue)
                                }
                        }
                })

const handleActiveListAfterAffordance =
        ({onActive, selectType}: HandleListActiveOptions) =>
        (setState: Updater<ListState>) =>
        (value?: string) => {
                const handleNextAfterAffordanceActiveEvent = () => onActive?.(value)

                if (selectType !== 'multiselect') {
                        setState(draft => {
                                const prevListActiveKey = draft.listActiveKey

                                if (draft.afterAffordanceActiveKey === value) {
                                        draft.afterAffordanceActiveKey = undefined

                                        return
                                }

                                draft.afterAffordanceActiveKey = value

                                if (value) {
                                        draft.listActiveKey = value
                                }

                                if (prevListActiveKey !== draft.listActiveKey) {
                                        draft.nextAfterAffordanceActiveEvent = handleNextAfterAffordanceActiveEvent
                                }
                        })
                }
        }

const handleListClose =
        ({selectType, onClose, relatedActive, data = [], onActive}: HandleListCloseOptions) =>
        (setState: Updater<ListState>) =>
        (value?: string) => {
                const findDataIndex = (datum: ListData) => datum.indexKey === value
                const handleNextCloseEvent = () => onClose?.(value)

                setState(draft => {
                        if (selectType === 'select' && relatedActive) {
                                const datumIndex = data.findIndex(findDataIndex)
                                const nextActiveKey = data[datumIndex + 1]?.indexKey ?? data[datumIndex - 1]?.indexKey

                                draft.listActiveKey = nextActiveKey
                                draft.nextActiveEvent = handleNextActiveEvent({onActive})(nextActiveKey)
                        }

                        draft.nextCloseEvent = handleNextCloseEvent
                })
        }

const renderDefaultListItem = ({index, item, supportingTextNumberOfLines, ...props}: RenderListItemOptions) => (
        <ListItem
                {...(typeof item?.supportingTextNumberOfLines !== 'number' && {
                        supportingTextNumberOfLines
                })}
                {...item}
                {...props}
                itemIndex={index}
                itemKey={item?.indexKey ?? index.toString()}
        />
)

const handleRenderListItem =
        ({renderItem, ...options}: HandleRenderItemOptions) =>
        (props: RenderVirtualListItemInfo<ListData>) =>
                renderItem ? renderItem({...options, ...props}) : renderDefaultListItem({...options, ...props})

const handleListItemSize =
        (theme: DefaultTheme) =>
        (type = 'standard' as ListType) => {
                const itemSize = {
                        menu: theme.adaptSize(theme.token.spacing.extraSmall * 12),
                        standard: theme.adaptSize(theme.token.spacing.extraSmall * 14)
                }

                return itemSize[type]
        }

export const ListBase = forwardRef<VirtualListComponent<ListData>, ListBaseProps>(
        (
                {
                        activeKey,
                        activeKeys,
                        afterAffordance,
                        afterAffordancePrimaryButtonProps,
                        afterAffordanceSecondaryButtonProps,
                        relatedActive = false,
                        beforeAffordance,
                        closeTrailing,
                        data,
                        defaultActiveKey,
                        defaultActiveKeys,
                        deselect,
                        disabled,
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
                        skeletonElement,
                        skeletonMinDuration = 300,
                        supportingTextNumberOfLines,
                        trailingTrigger,
                        type,
                        ...renderProps
                },
                ref
        ) => {
                const [
                        {
                                afterAffordanceActiveKey,
                                listActiveKey,
                                listActiveKeys,
                                nextActiveEvent,
                                nextAfterAffordanceActiveEvent,
                                nextCloseEvent,
                                status
                        },
                        setState
                ] = useImmer<ListState>({
                        afterAffordanceActiveKey: undefined,
                        listActiveKey: undefined,
                        listActiveKeys: undefined,
                        nextActiveEvent: undefined,
                        nextAfterAffordanceActiveEvent: undefined,
                        nextCloseEvent: undefined,
                        status: 'idle'
                })

                const id = useId()
                const listRef = useRef<VirtualListComponent<ListData>>(null)
                const onActiveAfterAffordance = handleActiveListAfterAffordance({onActive, selectType})(setState)
                const onListActive = handleListActive({onActive, selectType, onActives, deselect})(setState)
                const onListActiveSource = useMemo(
                        () => handleListActive({selectType})(setState),
                        [setState, selectType]
                )

                const onListClose = handleListClose({onClose, relatedActive, data, selectType, onActive})(setState)
                const theme = useTheme()
                const idle =
                        [
                                typeof defaultActiveKey === 'string' && !listActiveKey,
                                typeof defaultActiveKeys === 'object' && !listActiveKeys
                        ].some(Boolean) && status === 'idle'

                const renderListItem = handleRenderListItem({
                        ...onItemStateEvent,
                        activeKey: listActiveKey,
                        activeKeys: listActiveKeys,
                        afterAffordance,
                        afterAffordanceActiveKey,
                        afterAffordancePrimaryButtonProps,
                        afterAffordanceSecondaryButtonProps,
                        beforeAffordance,
                        closeTrailing,
                        disabled,
                        divider,
                        enableUnderlay,
                        enableUnderlayActive,
                        focusedIndex,
                        onActive: onListActive,
                        onActiveAfterAffordance,
                        onCancel,
                        onClose: onListClose,
                        onConfirm,
                        renderItem,
                        selectType,
                        shape,
                        skeletonElement,
                        skeletonMinDuration: loading && !loadingComponent ? -1 : skeletonMinDuration,
                        supportingTextNumberOfLines,
                        trailingTrigger,
                        type
                })

                useImperativeHandle(
                        ref,
                        () => (listRef?.current ? listRef?.current : {}) as VirtualListComponent<ListData>,
                        []
                )

                useEffect(() => {
                        onListActiveSource(activeKey ?? defaultActiveKey ?? activeKeys ?? defaultActiveKeys)
                }, [activeKey, activeKeys, defaultActiveKey, defaultActiveKeys, onListActiveSource])

                useEffect(() => {
                        nextActiveEvent?.()
                }, [nextActiveEvent])

                useEffect(() => {
                        nextAfterAffordanceActiveEvent?.()
                }, [nextAfterAffordanceActiveEvent])

                useEffect(() => {
                        nextCloseEvent?.()
                }, [nextCloseEvent])

                if (idle) {
                        return <></>
                }

                return render({
                        ...renderProps,
                        activeKey: listActiveKey,
                        activeKeys: listActiveKeys,
                        afterAffordanceActiveKey,
                        data,
                        disabled,
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
