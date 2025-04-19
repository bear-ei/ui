import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import type {LayoutBaseProps} from './Layout.interface'

export const LayoutBase = forwardRef<View, LayoutBaseProps>(({renderLayout, ...renderLayoutProps}, ref) => {
	const id = useId()

	return renderLayout({...renderLayoutProps, ref, id})
})
