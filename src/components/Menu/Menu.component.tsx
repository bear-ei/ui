import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {MenuBase} from './Menu-base.component'
import type {MenuProps} from './Menu.interface'

const MenuWithRef = forwardRef<View, MenuProps>((props, ref) => (
	<MenuBase
		{...props}
		ref={ref}
	/>
))

export const Menu = typedMemo(MenuWithRef)()
