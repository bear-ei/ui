import {WritableDraft} from 'immer'
import {DefaultTheme} from 'styled-components/native'
import {Updater} from 'use-immer'
import {RenderVirtualListItemInfo} from '../Virtual-list'
import {ListItem} from './List-item'
import {
        HandleListActiveOptions,
        HandleListCloseOptions,
        HandleListItemOptions,
        HandleRenderItemOptions,
        ListData,
        ListState,
        ListType,
        OnListCloseOptions
} from './List.interface'

const handlePrevListActiveKeysFilter = (value: string) => (key: string) => key !== value
const handleListSelect = (draft: WritableDraft<ListState>) => (deselect?: boolean) => (value?: string | string[]) => {
        if (Array.isArray(value)) {
                return
        }

        const prevListActiveKey = draft.activeKey

        draft.activeKey = value === prevListActiveKey && deselect ? undefined : value

        if (draft.afterAffordanceActiveKey !== value) {
                draft.afterAffordanceActiveKey = undefined
        }

        return prevListActiveKey !== value ? draft.activeKey : 'NOT_ACTIVE'
}

const handleListMultiselect = (draft: WritableDraft<ListState>) => (value: string | string[]) => {
        const prevListActiveKeys = draft.activeKeys
        const nextListActiveKeys = Array.isArray(value) ? value : [...(prevListActiveKeys ?? []), value]

        if (typeof value === 'string') {
                draft.activeKeys =
                        prevListActiveKeys?.includes(value) ?
                                prevListActiveKeys?.filter(handlePrevListActiveKeysFilter(value))
                        :       nextListActiveKeys
        }

        if (Array.isArray(value)) {
                draft.activeKeys = nextListActiveKeys
        }

        return prevListActiveKeys?.join() !== nextListActiveKeys?.join() ? draft.activeKeys : 'NOT_ACTIVES'
}

const handleNextActiveEvent =
        ({onActive, onActives}: HandleListActiveOptions) =>
        (value: string | string[] | undefined) =>
        () =>
                typeof value === 'string' ? onActive?.(value) : onActives?.(value)

export const handleListActive =
        ({onActive, selectType, onActives, deselect}: HandleListActiveOptions = {}) =>
        (setState: Updater<ListState>) =>
        (value?: string | string[]) =>
                setState(draft => {
                        const callbackValue =
                                selectType === 'select' ?
                                        handleListSelect(draft)(deselect)(value)
                                :       handleListMultiselect(draft)(value ?? [])

                        if (callbackValue && !['NOT_ACTIVE', 'NOT_ACTIVES'].includes(callbackValue?.toString())) {
                                if (selectType === 'select') {
                                        draft.nextActiveEvent = handleNextActiveEvent({onActive})(callbackValue)

                                        return
                                }

                                if (selectType === 'multiselect') {
                                        draft.nextActiveEvent = handleNextActiveEvent({onActives})(callbackValue)
                                }
                        }
                })

export const handleActiveListAfterAffordance =
        ({onActive, selectType}: HandleListActiveOptions) =>
        (setState: Updater<ListState>) =>
        (value?: string) => {
                const handleNextAfterAffordanceActiveEvent = () => onActive?.(value)

                if (selectType !== 'multiselect') {
                        setState(draft => {
                                const prevListActiveKey = draft.activeKey

                                if (draft.afterAffordanceActiveKey === value) {
                                        draft.afterAffordanceActiveKey = undefined

                                        return
                                }

                                draft.afterAffordanceActiveKey = value

                                if (value) {
                                        draft.activeKey = value
                                }

                                if (prevListActiveKey !== draft.activeKey) {
                                        draft.nextAfterAffordanceActiveEvent = handleNextAfterAffordanceActiveEvent
                                }
                        })
                }
        }

export const handleListClose = ({selectType, onClose, relatedActive}: HandleListCloseOptions) => {
        const handleNextCloseEvent = (options: OnListCloseOptions) => () => onClose?.(options)

        return (setState: Updater<ListState>) => (value?: string) => {
                const findDataIndex = (datum: ListData) => datum.indexKey === value

                setState(draft => {
                        if (selectType === 'select' && relatedActive) {
                                const data = (draft.listData ?? []) as ListData[]
                                const datumIndex = data.findIndex(findDataIndex)
                                const nextActiveKey = data[datumIndex + 1]?.indexKey ?? data[datumIndex - 1]?.indexKey

                                draft.activeKey = nextActiveKey
                                draft.nextCloseEvent = handleNextCloseEvent({indexKey: value, activeKey: nextActiveKey})

                                return
                        }

                        draft.nextCloseEvent = handleNextCloseEvent({indexKey: value})
                })
        }
}

export const handleListData = (setState: Updater<ListState>) => (loading?: boolean) => (data?: ListData[]) =>
        setState(draft => {
                if (loading) {
                        draft.status = 'loading'

                        return
                }

                draft.listData = data as WritableDraft<ListData>[]
                draft.status = 'succeeded'
        })

const handleDefaultListItem = ({index, item, supportingTextNumberOfLines, ...props}: HandleListItemOptions) => (
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

export const handleRenderListItem =
        ({renderItem, ...options}: HandleRenderItemOptions) =>
        (props: RenderVirtualListItemInfo<ListData>) =>
                renderItem ? renderItem({...options, ...props}) : handleDefaultListItem({...options, ...props})

export const handleListItemSize =
        (theme: DefaultTheme) =>
        (type = 'standard' as ListType) => {
                const itemSize = {
                        menu: theme.adaptSize(theme.token.spacing.extraSmall * 12),
                        standard: theme.adaptSize(theme.token.spacing.extraSmall * 14)
                }

                return itemSize[type]
        }
