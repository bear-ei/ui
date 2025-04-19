import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {DividerBaseProps} from './Divider.interface'

export const DividerBase = forwardRef<View, DividerBaseProps>(
	({layout, renderDivider, size, subheader, ...renderDividerProps}, ref) => {
		const id = useId()

		return renderDivider({...renderDividerProps, layout, ref, size, subheader, id})
	}
)
