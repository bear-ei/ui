import {forwardRef, useId} from 'react'
import {View} from 'react-native'
import {DividerBaseProps} from './Divider.interface'

export const DividerBase = forwardRef<View, DividerBaseProps>(
        ({layout, render, size, subheader, ...renderProps}, ref) => {
                const id = useId()

                return render({...renderProps, layout, ref, size, subheader, id})
        }
)
