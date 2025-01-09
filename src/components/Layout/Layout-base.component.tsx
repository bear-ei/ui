import {forwardRef} from 'react'
import {View} from 'react-native'
import {LayoutBaseProps} from './Layout.interface'

export const LayoutBase = forwardRef<View, LayoutBaseProps>(({render, ...renderProps}, ref) =>
        render({...renderProps, ref})
)
