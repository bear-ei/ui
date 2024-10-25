import {forwardRef, useId} from 'react'
import {useTheme} from 'styled-components/native'
import {ListData, VirtualListComponent} from '../../List'
import {MenuListBaseProps, RenderMenuListProps} from './Menu-list.interface'

export const MenuListBase = forwardRef<VirtualListComponent<ListData>, MenuListBaseProps>(
        ({render, ...renderProps}, ref) => {
                const id = useId()
                const theme = useTheme()

                return render({
                        ...renderProps,
                        id,
                        ref: ref as RenderMenuListProps['ref'],
                        theme
                })
        }
)
