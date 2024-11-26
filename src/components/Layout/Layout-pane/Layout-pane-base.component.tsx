import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import {LayoutPaneBaseProps} from './Layout-pane.interface'

export const LayoutPaneBase = forwardRef<View, LayoutPaneBaseProps>(({render, ...renderProps}, ref) => {
        const id = useId()
        const theme = useTheme()

        return render({
                ...renderProps,
                id,
                ref,
                theme
        })
})
