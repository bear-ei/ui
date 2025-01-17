import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {LayoutPaneBaseProps} from './Layout-pane.interface'

export const LayoutPaneBase = forwardRef<View, LayoutPaneBaseProps>(({render, ...renderProps}, ref) => {
        const id = useId()

        return render({...renderProps, ref, id})
})
