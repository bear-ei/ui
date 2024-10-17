import {forwardRef, useId} from 'react'
import {ListData, VirtualListComponent} from '../List'
import {MenuBaseProps} from './Menu.interface'

export const MenuBase = forwardRef<VirtualListComponent<ListData>, MenuBaseProps>(({render, ...renderProps}, ref) => {
    const id = useId()

    return render({
        ...renderProps,
        id,
        ref: ref as MenuBaseProps['ref']
    })
})
