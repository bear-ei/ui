import {typedMemo} from '@/utils'
import {forwardRef} from 'react'
import type {View} from 'react-native'
import {MenuBase} from './Menu-base.component'
import type {MenuProps} from './Menu.interface'

const MenuWithRef = forwardRef<View, MenuProps>((props, ref) => (
    <MenuBase
        {...props}
        ref={ref}
    />
))

MenuWithRef.displayName = 'MenuWithRef'

export const Menu = typedMemo(MenuWithRef)()
