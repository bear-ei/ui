import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {LayoutNavigationBaseProps} from './Layout-navigation.interface'

export const LayoutNavigationBase = forwardRef<View, LayoutNavigationBaseProps>(
    ({render, ...renderProps}, ref) => {
        const id = useId()

        return render({
            ...renderProps,
            id,
            ref
        })
    }
)
