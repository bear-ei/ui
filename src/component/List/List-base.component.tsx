import {WritableDraft} from 'immer'
import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef} from 'react'
import {Updater, useImmer} from 'use-immer'
import {RenderVirtualListItemInfo} from '../Virtual-list'
import {ListItem} from './List-item'
import {
    HandleListActiveOptions,
    HandleRenderItemOptions,
    InitialListState,
    ListBaseProps,
    ListData,
    RenderListItemOptions,
    RenderListProps,
    VirtualListComponent
} from './List.interface'

const handlePrevListActiveKeysFilter = (value: string) => (key: string) => key !== value
const handleListSelect =
    (draft: WritableDraft<InitialListState>) => (deselect?: boolean) => (value?: string | string[]) => {
        if (Array.isArray(value)) {
            return
        }

        const prevListActiveKey = draft.listActiveKey

        draft.listActiveKey = value === prevListActiveKey && deselect ? undefined : value
        draft.afterAffordanceActiveKey !== value && (draft.afterAffordanceActiveKey = undefined)

        return prevListActiveKey !== value ? draft.listActiveKey : 'NOT_ACTIVE'
    }

const handleListMultiselect = (draft: WritableDraft<InitialListState>) => (value: string | string[]) => {
    const prevListActiveKeys = draft.listActiveKeys
    const nextListActiveKeys = Array.isArray(value) ? value : [...(prevListActiveKeys ?? []), value]

    typeof value === 'string' &&
        (draft.listActiveKeys =
            prevListActiveKeys?.includes(value) ?
                prevListActiveKeys?.filter(handlePrevListActiveKeysFilter(value))
            :   nextListActiveKeys)

    Array.isArray(value) && (draft.listActiveKeys = nextListActiveKeys)

    return prevListActiveKeys?.join() !== nextListActiveKeys?.join() ? draft.listActiveKeys : 'NOT_ACTIVES'
}

const createNextActiveEvent =
    ({onActive, onActives}: HandleListActiveOptions) =>
    (value: string | string[] | undefined) =>
    () =>
        typeof value === 'string' ? onActive?.(value) : onActives?.(value)

const handleListActive =
    ({onActive, type, onActives, deselect}: HandleListActiveOptions = {}) =>
    (setState: Updater<InitialListState>) =>
    (value?: string | string[]) => {
        setState(draft => {
            const callbackValue =
                type === 'select' ? handleListSelect(draft)(deselect)(value) : handleListMultiselect(draft)(value ?? [])

            !onActive && draft.status === 'idle' && (draft.status = 'succeeded')

            if (callbackValue && !['NOT_ACTIVE', 'NOT_ACTIVES'].includes(callbackValue?.toString())) {
                type === 'select' && (draft.nextActiveEvent = createNextActiveEvent({onActive})(callbackValue))
                type === 'multiselect' && (draft.nextActiveEvent = createNextActiveEvent({onActives})(callbackValue))
            }
        })
    }

const handleActiveListAfterAffordance = ({onActive, type}: HandleListActiveOptions) => {
    const createNextAfterAffordanceActiveEvent = (value?: string) => () => onActive?.(value)

    return (setState: Updater<InitialListState>) => (value?: string) =>
        type !== 'multiselect' &&
        setState(draft => {
            const prevListActiveKey = draft.listActiveKey

            if (draft.afterAffordanceActiveKey === value) {
                draft.afterAffordanceActiveKey = undefined

                return
            }

            draft.afterAffordanceActiveKey = value
            value && (draft.listActiveKey = value)
            prevListActiveKey !== draft.listActiveKey &&
                (draft.nextAfterAffordanceActiveEvent = createNextAfterAffordanceActiveEvent(value))
        })
}

const handleListClose = (onClose?: (value?: string) => void) => onClose
const renderCustomListItem = ({index, item, supportingTextNumberOfLines, ...props}: RenderListItemOptions) => (
    <ListItem
        {...(typeof item?.supportingTextNumberOfLines !== 'number' && {supportingTextNumberOfLines})}
        {...item}
        {...props}
        itemKey={item?.indexKey ?? index.toString()}
    />
)

const handleRenderListItem =
    ({renderItem, ...options}: HandleRenderItemOptions) =>
    (props: RenderVirtualListItemInfo<ListData>) =>
        renderItem ? renderItem({...options, ...props}) : renderCustomListItem({...options, ...props})

export const ListBase = forwardRef<VirtualListComponent<ListData>, ListBaseProps>(
    (
        {
            activeKey,
            activeKeys,
            afterAffordance,
            afterAffordancePrimaryButtonProps,
            afterAffordanceSecondaryButtonProps,
            beforeAffordance,
            closeTrailing,
            defaultActiveKey,
            defaultActiveKeys,
            densityScale,
            deselect,
            enableUnderlay,
            minSkeletonDuration = 300,
            onActive,
            onActives,
            onCancel,
            onClose,
            onConfirm,
            render,
            renderItem,
            shape,
            skeletonElement,
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
                status
            },
            setState
        ] = useImmer<InitialListState>({
            afterAffordanceActiveKey: undefined,
            listActiveKey: undefined,
            listActiveKeys: undefined,
            nextActiveEvent: undefined,
            nextAfterAffordanceActiveEvent: undefined,
            status: 'idle'
        })

        const listRef = useRef<VirtualListComponent<ListData>>(null)
        const id = useId()
        const onListActiveSource = useMemo(() => handleListActive({type})(setState), [setState, type])
        const onListActive = handleListActive({onActive, type, onActives, deselect})(setState)
        const onActiveAfterAffordance = handleActiveListAfterAffordance({onActive, type})(setState)
        const onListClose = handleListClose(onClose)
        const idle =
            [
                typeof defaultActiveKey === 'string' && !listActiveKey,
                typeof defaultActiveKeys === 'object' && !listActiveKeys
            ].some(Boolean) && status === 'idle'

        const renderListItem = handleRenderListItem({
            activeKey: listActiveKey,
            activeKeys: listActiveKeys,
            afterAffordance,
            afterAffordanceActiveKey,
            afterAffordancePrimaryButtonProps,
            afterAffordanceSecondaryButtonProps,
            beforeAffordance,
            closeTrailing,
            densityScale,
            enableUnderlay,
            minSkeletonDuration,
            onActive: onListActive,
            onActiveAfterAffordance,
            onCancel,
            onClose: onListClose,
            onConfirm,
            renderItem,
            shape,
            skeletonElement,
            supportingTextNumberOfLines,
            trailingTrigger,
            type
        })

        useImperativeHandle(ref, () => (listRef?.current ? listRef?.current : {}) as VirtualListComponent<ListData>, [])

        useEffect(() => {
            onListActiveSource(activeKey ?? defaultActiveKey ?? activeKeys ?? defaultActiveKeys)
        }, [activeKey, activeKeys, defaultActiveKey, defaultActiveKeys, onListActiveSource])

        useEffect(() => {
            nextActiveEvent?.()
        }, [nextActiveEvent])

        useEffect(() => {
            nextAfterAffordanceActiveEvent?.()
        }, [nextAfterAffordanceActiveEvent])

        if (idle) {
            return <></>
        }

        return render({
            ...renderProps,
            activeKey: listActiveKey,
            activeKeys: listActiveKeys,
            afterAffordanceActiveKey,
            id,
            ref: listRef as RenderListProps['ref'],
            renderItem: renderListItem
        })
    }
)
