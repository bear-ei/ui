import {forwardRef, useId} from 'react'
import {useTheme} from 'styled-components/native'
import {ListData, VirtualListComponent} from '../List'
import {MenuBaseProps, RenderMenuProps} from './Menu.interface'

export const MenuBase = forwardRef<VirtualListComponent<ListData>, MenuBaseProps>(({render, ...renderProps}, ref) => {
    const id = useId()
    const theme = useTheme()

    return render({...renderProps, theme, id, ref: ref as RenderMenuProps['ref']})
})
