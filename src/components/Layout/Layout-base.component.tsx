import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {LayoutBaseProps} from './Layout.interface'

export const LayoutBase = forwardRef<View, LayoutBaseProps>(({render, ...renderProps}, ref) => {
	const id = useId()

	return render({...renderProps, ref, id})
})
