import {forwardRef, useId} from 'react'
import type {View} from 'react-native'
import {useTheme} from 'styled-components/native'
import type {LayoutNavigationBaseProps} from './Layout-navigation.interface'

export const LayoutNavigationBase = forwardRef<View, LayoutNavigationBaseProps>(
	({renderLayoutNavigation, ...renderLayoutNavigationProps}, ref) => {
		const theme = useTheme()
		const id = useId()

		return renderLayoutNavigation({...renderLayoutNavigationProps, ref, theme, id})
	}
)
