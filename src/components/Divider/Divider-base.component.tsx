import {forwardRef} from 'react'
import {View} from 'react-native'
import {DividerBaseProps} from './Divider.interface'

export const DividerBase = forwardRef<View, DividerBaseProps>(
        ({layout, render, size, subheader, ...renderProps}, ref) =>
                render({...renderProps, layout, ref, size, subheader})
)
