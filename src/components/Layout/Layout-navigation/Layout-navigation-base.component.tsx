import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {useWindowSize} from '../../../hooks'
import {LayoutNavigationBaseProps} from './Layout-navigation.interface'

export const LayoutNavigationBase = forwardRef<View, LayoutNavigationBaseProps>(({render, ...renderProps}, ref) => {
    const id = useId()
    const windowSize = useWindowSize()

    return render({
        ...renderProps,
        id,
        ref,
        windowSize
    })
})
