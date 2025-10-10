import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../../utils'
import {MenuListBase} from './Menu-list-base.component'
import type {MenuListProps} from './Menu-list.interface'

const MenuListWithRef = forwardRef<View, MenuListProps>((props, ref) => (
	<MenuListBase
		{...props}
		ref={ref}
	/>
))

export const MenuList = typedMemo(MenuListWithRef)()
