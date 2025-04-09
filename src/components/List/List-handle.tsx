import {WritableDraft} from 'immer'
import {DefaultTheme} from 'styled-components/native'
import {Updater} from 'use-immer'
import {Density, DensityScale} from '../../contexts'
import {OnVirtualListCloseOptions, RenderVirtualListItemInfo} from '../Virtual-list'
import {ListItem} from './List-item'
import {SelectType} from './List.enum'
import {
        HandleListActiveOptions,
        HandleRenderItemOptions,
        ListData,
        ListState,
        OnActiveAfterAffordanceOptions,
        RenderListItemOptions
} from './List.interface'

const handleListSelect =
        (draft: WritableDraft<ListState>) => (deselect?: boolean) => (activeKeys?: string | string[]) => {
                const prevActiveKey = draft.activeKey

                if (Array.isArray(activeKeys) || activeKeys === prevActiveKey) {
                        return
                }

                draft.activeKey = activeKeys === prevActiveKey && deselect ? undefined : activeKeys

                if (draft.afterAffordanceActiveKey !== activeKeys) {
                        draft.afterAffordanceActiveKey = undefined
                }

                return draft.activeKey
        }

const handlePrevListActiveKeysFilter = (activeKey: string) => (key: string) => key !== activeKey
const handleListMultiselect = (draft: WritableDraft<ListState>) => (activeKeys: string | string[]) => {
        const prevActiveKeys = draft.activeKeys
        const nextActiveKeys = Array.isArray(activeKeys) ? activeKeys : [...(prevActiveKeys ?? []), activeKeys]

        if (prevActiveKeys?.join() === nextActiveKeys?.join()) {
                return
        }

        if (typeof activeKeys === 'string') {
                draft.activeKeys =
                        prevActiveKeys?.includes(activeKeys) ?
                                prevActiveKeys?.filter(handlePrevListActiveKeysFilter(activeKeys))
                        :       nextActiveKeys
        }

        if (Array.isArray(activeKeys)) {
                draft.activeKeys = nextActiveKeys
        }

        return draft.activeKeys
}

const handleNextActiveEvent =
        ({onActive, onActives}: HandleListActiveOptions) =>
        (activeKeys?: string | string[]) =>
        () =>
                typeof activeKeys === 'string' ? onActive?.(activeKeys) : onActives?.(activeKeys)

export const handleListActive =
        ({onActive, selectType, onActives, deselect}: HandleListActiveOptions = {}) =>
        (setState: Updater<ListState>) =>
        (activeKeys?: string | string[]) =>
                selectType &&
                setState(draft => {
                        const callbackValue =
                                selectType === SelectType.SINGLE ?
                                        handleListSelect(draft)(deselect)(activeKeys)
                                :       handleListMultiselect(draft)(activeKeys ?? [])

                        if (!callbackValue) {
                                return
                        }

                        draft.nextActiveEvent = handleNextActiveEvent(
                                selectType === SelectType.MULTIPLE ? {onActives} : {onActive}
                        )(callbackValue)
                })

export const handleListItemSize = (theme: DefaultTheme) => (density?: Density) => (itemSize?: number) =>
        itemSize ??
        theme.adaptSize(
                theme.token.spacing.extraSmall * 14 +
                        DensityScale[density ?? theme.density] * theme.token.spacing.extraSmall
        )

export const handleListActiveAfterAffordance =
        ({onActive, selectType}: HandleListActiveOptions) =>
        (setState: Updater<ListState>) =>
        ({activeKey, callback} = {} as OnActiveAfterAffordanceOptions) => {
                const handleNextAfterAffordanceActiveEvent = () => onActive?.(activeKey)

                if (selectType === SelectType.MULTIPLE) {
                        return
                }

                setState(draft => {
                        const prevActiveKey = draft.activeKey

                        if (draft.afterAffordanceActiveKey === activeKey) {
                                draft.afterAffordanceActiveKey = undefined

                                return
                        }

                        draft.afterAffordanceActiveKey = activeKey

                        if (activeKey) {
                                draft.activeKey = activeKey
                        }

                        if (prevActiveKey !== draft.activeKey) {
                                draft.nextAfterAffordanceActiveEvent = handleNextAfterAffordanceActiveEvent
                        }

                        if (callback) {
                                draft.nextAfterAffordanceCallbackEvent = callback
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
                indexKey={item?.indexKey ?? `${index}`}
        />
)

export const handleRenderListItem =
        ({renderItem, ...options}: HandleRenderItemOptions) =>
        (props: RenderVirtualListItemInfo<ListData>) =>
                renderItem ? renderItem({...options, ...props}) : renderDefaultListItem({...options, ...props})
