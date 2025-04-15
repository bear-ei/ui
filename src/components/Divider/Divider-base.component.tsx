import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {DividerBaseProps} from './Divider.interface'

export const DividerBase = forwardRef<View, DividerBaseProps>(
	({layout, render, size, subheader, ...renderProps}, ref) => {
		const id = useId()

		return render({...renderProps, layout, ref, size, subheader, id})
	}
)
