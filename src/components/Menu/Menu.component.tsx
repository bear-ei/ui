import type {View} from 'react-native'

import {forwardRef} from 'react'

import type {MenuProps} from './Menu.interface'

import {typedMemo} from '../../utils'
import {MenuBase} from './Menu-base.component'

const MenuWithRef = forwardRef<View, MenuProps>((props, ref) => (
	<MenuBase
		{...props}
		ref={ref}
	/>
))

export const Menu = typedMemo(MenuWithRef)
