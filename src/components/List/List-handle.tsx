import {WritableDraft} from 'immer'
import {DefaultTheme} from 'styled-components/native'
import {Updater} from 'use-immer'
import {OnVirtualListCloseOptions, RenderVirtualListItemInfo} from '../Virtual-list'
import {ListItem} from './List-item'
import {
        HandleListActiveOptions,
        HandleRenderItemOptions,
        ListData,
        ListState,
        ListType,
        RenderListItemOptions
} from './List.interface'

const handlePrevListActiveKeysFilter = (value: string) => (key: string) => key !== value
const handleListSelect = (draft: WritableDraft<ListState>) => (deselect?: boolean) => (value?: string | string[]) => {
        const prevActiveKey = draft.activeKey

        if (Array.isArray(value) || value === prevActiveKey) {
                return
        }

        draft.activeKey = value === prevActiveKey && deselect ? undefined : value

        if (draft.afterAffordanceActiveKey !== value) {
                draft.afterAffordanceActiveKey = undefined
        }

        return draft.activeKey
}

const handleListMultiselect = (draft: WritableDraft<ListState>) => (value: string | string[]) => {
        const prevActiveKeys = draft.activeKeys
        const nextActiveKeys = Array.isArray(value) ? value : [...(prevActiveKeys ?? []), value]

        if (prevActiveKeys?.join() === nextActiveKeys?.join()) {
                return
        }

        if (typeof value === 'string') {
                draft.activeKeys =
                        prevActiveKeys?.includes(value) ?
                                prevActiveKeys?.filter(handlePrevListActiveKeysFilter(value))
                        :       nextActiveKeys
        }

        if (Array.isArray(value)) {
                draft.activeKeys = nextActiveKeys
        }

        return draft.activeKeys
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
                selectType &&
                setState(draft => {
                        const callbackValue =
                                selectType === 'select' ?
                                        handleListSelect(draft)(deselect)(value)
                                :       handleListMultiselect(draft)(value ?? [])

                        if (!callbackValue) {
                                return
                        }

                        draft.nextActiveEvent = handleNextActiveEvent(
                                selectType === 'multiselect' ? {onActives} : {onActive}
                        )(callbackValue)
                })

export const handleListActiveAfterAffordance =
        ({onActive, selectType}: HandleListActiveOptions) =>
        (setState: Updater<ListState>) =>
        (value?: string) => {
                const handleNextAfterAffordanceActiveEvent = () => onActive?.(value)

                if (selectType === 'multiselect') {
                        return
                }

                setState(draft => {
                        const prevActiveKey = draft.activeKey

                        if (draft.afterAffordanceActiveKey === value) {
                                draft.afterAffordanceActiveKey = undefined

                                return
                        }

                        draft.afterAffordanceActiveKey = value

                        if (value) {
                                draft.activeKey = value
                        }

                        if (prevActiveKey !== draft.activeKey) {
                                draft.nextAfterAffordanceActiveEvent = handleNextAfterAffordanceActiveEvent
                        }
                })
        }

export const handleListClose = (onClose?: (options: OnVirtualListCloseOptions) => void) => {
        const handleNextCloseEvent = (options: OnVirtualListCloseOptions) => () => onClose?.(options)

        return (setState: Updater<ListState>) =>
                ({activeKey, indexKey}: OnVirtualListCloseOptions) => {
                        setState(draft => {
                                draft.activeKey = activeKey
                                draft.nextCloseEvent = handleNextCloseEvent({indexKey, activeKey})
                        })
                }
}

const renderDefaultListItem = ({index, item, supportingTextNumberOfLines, ...props}: RenderListItemOptions) => (
        <ListItem
                {...(typeof item?.supportingTextNumberOfLines !== 'number' && {
                        supportingTextNumberOfLines
                })}
                {...item}
                {...props}
                itemIndex={index}
                itemKey={item?.indexKey ?? `${index}`}
        />
)

export const handleRenderListItem =
        ({renderItem, ...options}: HandleRenderItemOptions) =>
        (props: RenderVirtualListItemInfo<ListData>) =>
                renderItem ? renderItem({...options, ...props}) : renderDefaultListItem({...options, ...props})

export const handleListItemSize =
        (theme: DefaultTheme) =>
        (type = 'standard' as ListType) => {
                const itemSize = {
                        menu: theme.adaptSize(theme.token.spacing.extraSmall * 12),
                        standard: theme.adaptSize(theme.token.spacing.extraSmall * 14)
                }

                return itemSize[type]
        }
