import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {LayoutBaseProps} from './Layout.interface'

export const LayoutBase = forwardRef<View, LayoutBaseProps>(({render, ...renderProps}, ref) => {
        const id = useId()

        return render({...renderProps, id, ref})
})
