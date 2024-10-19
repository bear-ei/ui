import {forwardRef, KeyboardEvent, useId} from 'react'
import {Updater, useImmer} from 'use-immer'
import {ListData, VirtualListComponent} from '../List'
import {MenuBaseProps, MenuState} from './Menu.interface'

const handleMenuKeyDown = (data?: ListData[]) => (setState: Updater<MenuState>) => (event: KeyboardEvent) => {
    const {code} = event

    if (['ArrowUp', 'ArrowDown'].includes(code)) {
        event.preventDefault()
    }

    if (!data?.length) {
        return
    }

    setState(draft => {
        const curFocusedIndex = draft.focusedIndex ?? -1
        const lastIndex = data?.length - 1

        if (code === 'ArrowUp') {
            console.info('ArrowUp', curFocusedIndex - 1)
            draft.focusedIndex = curFocusedIndex - 1 < 0 ? lastIndex : curFocusedIndex - 1
        }

        if (code === 'ArrowDown') {
            console.info('ArrowDown', curFocusedIndex + 1)
            draft.focusedIndex = curFocusedIndex + 1 > lastIndex ? 0 : curFocusedIndex + 1
        }
    })
}

const handleMenuVisible = (setState: Updater<MenuState>) => (value?: boolean) => {
    if (typeof value === 'undefined' && !value) {
        setState(draft => {
            draft.focusedIndex = undefined
        })
    }
}

const handleMenuFocusedIndex = (setState: Updater<MenuState>) => (value?: number) =>
    setState(draft => {
        console.info('focusedIndex', value)
        draft.focusedIndex = value
    })

export const MenuBase = forwardRef<VirtualListComponent<ListData>, MenuBaseProps>(
    ({render, data, ...renderProps}, ref) => {
        const [{focusedIndex}, setState] = useImmer<MenuState>({focusedIndex: undefined})
        const id = useId()
        const onMenuKeyDown = handleMenuKeyDown(data)(setState)
        const onMenuVisible = handleMenuVisible(setState)
        const onMenuFocusedIndex = handleMenuFocusedIndex(setState)

        return render({
            ...renderProps,
            data,
            focusedIndex,
            id,
            onFocusedIndex: onMenuFocusedIndex,
            onKeyDown: onMenuKeyDown,
            onVisible: onMenuVisible,
            ref: ref as MenuBaseProps['ref']
        })
    }
)
