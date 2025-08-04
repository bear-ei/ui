import {forwardRef} from 'react'
import type {View} from 'react-native'
import {typedMemo} from '../../utils'
import {LayoutBase} from './Layout-base.component'
import type {LayoutProps} from './Layout.interface'

const LayoutWithRef = forwardRef<View, LayoutProps>((props, ref) => (
	<LayoutBase
		{...props}
		ref={ref}
	/>
))

export const Layout = typedMemo(LayoutWithRef)()
