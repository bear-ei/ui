import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {useWindowSize} from '../../hooks'
import {LayoutBaseProps} from './Layout.interface'

export const LayoutBase = forwardRef<View, LayoutBaseProps>(({render, ...renderProps}, ref) => {
    const id = useId()
    const windowSize = useWindowSize()

    return render({
        ...renderProps,
        id,

        ref,
        windowSize
    })
})
